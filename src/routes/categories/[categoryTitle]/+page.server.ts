import { Product } from "models";
import type { TProductState } from "store";
import type { PageServerLoad } from "./$types";
import { Op } from "sequelize";

export const load = (async ({ params }) => {
        const { categoryTitle } = params;

        const decodedTitle = decodeURI(categoryTitle);
        const isDiscountedProducts = decodedTitle === "discountedProducts";
        const categoryProductsRaw = await Product.findAll({
                where: isDiscountedProducts
                        ? {
                                discountPercentage: {
                                        [Op.not]: null,
                                },
                        }
                        : { category: decodedTitle },
        });
        const categoryProducts = categoryProductsRaw.map(p => p.get({ plain: true })) as TProductState['Product'][];

        return { categoryProducts, isDiscountedProducts, category: decodedTitle };
}) satisfies PageServerLoad;

export type TCategoryProducts = Awaited<ReturnType<typeof load>>;

