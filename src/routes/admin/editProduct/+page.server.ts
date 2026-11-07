import { fail, redirect, type Actions } from "@sveltejs/kit";
import { Product, type TUser } from "models";
import type { TProductState } from "store";
import { validateFormSubmission, type ExtractSuccess } from "utils";
import z from "zod";

const EditProductSchema = z.object({
        productId: z.string(),
        stock: z.number().optional(),
        title: z.string().optional(),
        description: z.string().optional(),
        category: z.string().optional(),
        discountPercentage: z.number().optional(),
});

const RemoveProductSchema = z.object({
        productId: z.string(),
});

export const actions = {
        removeProduct: async ({ locals, request }) => {
                const validator = await validateAdminOperation({
                        schema: RemoveProductSchema,
                        user: locals.user,
                        request,
                });
                if (validator.invalid) return validator.failure();

                const { productId } = validator.data;
                await Product.destroy({
                        where: {
                                id: productId,
                        }
                });
                return { product: null, message: 'Product removed by admin' };
        },
        editProduct: async ({ locals, request }) => {
                const validator = await validateAdminOperation({
                        schema: EditProductSchema,
                        user: locals.user,
                        request,
                });
                if (validator.invalid) return validator.failure();

                const { newData, productById } = validator.data;

                productById.update(newData);

                const product = productById.get({ plain: true }) as TProductState['Product'];
                return { product, message: 'Product modified' };
        }
} satisfies Actions;

export type TEditProductSuccess = ExtractSuccess<typeof actions.editProduct>;
export type TRemoveProductSuccess = ExtractSuccess<typeof actions.removeProduct>;

type TAdminOpProps = {
        user: TUser;
        schema: typeof RemoveProductSchema | typeof EditProductSchema;
        request: Request;
}
async function validateAdminOperation({ user, schema, request }: TAdminOpProps) {
        if (!user) throw redirect(302, '/sign-in');
        if (user.get('role') !== 'admin') throw redirect(401, '/sign-in');

        const formParser = await validateFormSubmission<z.infer<typeof schema>>(
                schema,
                request,
                ''
        );
        if (formParser.isInvalid) return {
                invalid: true as const,
                failure: formParser.failure,
        }
        const { productId, ...newData } = formParser.result;

        const productById = await Product.findOne({
                where: {
                        id: productId,
                }
        });
        if (!productById) {
                return {
                        failure: () => fail(400, { error: 'Invalid product id provided' }),
                        invalid: true as const,
                }
        }

        return {
                invalid: false as const,
                data: {
                        productId,
                        newData,
                        productById,
                }
        }
}

