import { fail, type SubmitFunction } from "@sveltejs/kit";
import { globalStore, type TProductState } from "store";
import type z from "zod";

export const updateUserLists = (products: TProductState[]) => {
        globalStore.history = products.filter(({ isPurchased }) => isPurchased);
        globalStore.wishList = products.filter(({ isWishlisted }) => isWishlisted);
        globalStore.shoppingCart = products.filter(({ isInCart }) => isInCart);
}

export const getUser = async () => { };

export function customEnhanceHandler<TActionData, TSuccessBody>(
        onSuccess: (result: TSuccessBody) => void,
        formState: { loading: boolean; error: string }
): SubmitFunction<
        Extract<TActionData, { error?: undefined }>,
        Extract<TActionData, { error: string }>
> {
        return () => {
                formState.loading = true;

                return async ({ result, update }) => {
                        if (result.type === 'failure') {
                                if (result.data?.error) {
                                        formState.error = result.data.error;
                                        formState.loading = false;
                                }
                        } else if (result.type === 'success') {
                                if (result.data) {
                                        update();
                                        onSuccess(result.data as TSuccessBody);
                                        formState.loading = false;
                                }
                        }
                };
        };
}


export async function validateFormSubmission<TFormData>(Schema: z.ZodObject, request: Request, error: string) {
        const form = await request.formData();
        const data = Object.fromEntries(form.entries())

        const formParseResult = Schema.safeParse(data);
        if (!formParseResult.success) {
                return {
                        failure: () => fail(400, {
                                error,
                                issues: formParseResult.error.issues,
                        }),
                        isInvalid: true,
                };
        }
        return formParseResult.data as TFormData;
}

export type ExtractSuccess<T extends (...args: any[]) => any> =
        Extract<Awaited<ReturnType<T>>, { message: string }>;

/*export const getUser = async (userId: string | undefined): Promise<TUser> => await prisma.user.findUnique({
  where: { id: userId }, include: {
    wishList: { include: { products: true } },
    shoppingCart: { include: { products: true } },
    purchaseHistory: { include: { products: true } }
  }
})*/

// export async function updatedUserResponse(userId: string) {
//   const updatedUser = await getUser(userId)
//   return new Response(JSON.stringify(updatedUser), { status: 201 })
// }

// export function capitalizeAndReplace(str: string) {
//   // Split the string by hyphens, capitalize each word, and join them with spaces
//   const formattedString = str
//     .split("-")
//     .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
//     .join(" ");
//
//   return formattedString;
// }
//
// export function isTextAttribute(attr: string): attr is TTextAttributes {
//   return ["title", "description", "category"].includes(attr);
// }
//
// export function isNumberAttribute(attr: string): attr is TNumberAttributes {
//   return ["rating", "discountPercentage", "stock", "price"].includes(attr);
// }

export const getDiscountPrice = (price: number, discountPercentage: number) => Math.round(price - (price * (discountPercentage / 100)))


