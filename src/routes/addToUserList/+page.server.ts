import { fail, redirect } from "@sveltejs/kit";
import { Product, ProductState } from "models";
import { validateFormSubmission, type ExtractSuccess } from "utils";
import z from "zod";
import type { Actions } from "./$types";
import type { TProductState } from "store";

const AddToUserListSchema = z.object({
        productId: z.string(),
        listKey: z.literal(['isWishlisted', 'isInCart'], 'Only `isWishlisted` and `isInCart` keys allowed'),
});
type TAddToListData = z.infer<typeof AddToUserListSchema>;

export const actions = {
        addToList: async ({ locals, request }) => {
                const { user } = locals;
                if (!user) throw redirect(302, '/sign-in');

                const userId = user.get('id');

                const formParser = await validateFormSubmission<TAddToListData>(
                        AddToUserListSchema,
                        request,
                        ''
                );
                if (formParser.isInvalid) return formParser.failure();
                const { productId, listKey } = formParser.result;
                const listType = listKey === 'isInCart' ? 'Shopping Cart' : 'Wish list';

                const productById = await Product.findOne({
                        where: {
                                id: productId,
                        }
                });
                if (!productById) return fail(400, { error: 'Invalid product id provided' });

                const userProductState = await ProductState.findOne({
                        where: {
                                productId,
                                userId,
                        }
                });

                if (!userProductState) {
                        const newProductState = await ProductState.create({
                                userId,
                                productId,
                                [listKey]: true,
                        });

                        // get new product state with default include scopes
                        const productStateRaw = await ProductState.findOne({
                                where: {
                                        id: newProductState.get('id')
                                }
                        });
                        const productState = productStateRaw!.get({ plain: true }) as TProductState;
                        return { productState, message: 'Product added to ' + listType };
                } else {
                        userProductState.update({
                                [listKey]: !userProductState.get(listKey),
                        });
                        userProductState.save();

                        const productState = userProductState.get({ plain: true }) as TProductState;
                        return { productState, message: 'Product removed from ' + listType };
                }
        }
} satisfies Actions;

export type TAddToListSuccess = ExtractSuccess<typeof actions.addToList>;

