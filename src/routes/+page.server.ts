import { Product } from "models";
import { Op } from "sequelize";
import type { TProductState } from "store";

export const load = async () => {
        const allCategories = await Product.findAll({
                group: 'category',
                attributes: ['category'],
        });
        const categoryProductPairs = await Promise.all(
                allCategories.map(async (c) => {
                        const category = c.get('category');
                        const allProducts = await Product.findAll({ where: { category }, limit: 4, });
                        const products = allProducts.map(p => p.get({ plain: true })) as TProductState['Product'][];
                        return { category, products };
                })
        );
        const discountedProductsRaw = await Product.findAll({
                where: {
                        discountPercentage: {
                                [Op.not]: null,
                        }
                },
                limit: 4,
        })
        const discountedProducts = discountedProductsRaw.map(p => p.get({ plain: true })) as TProductState['Product'][];
        return { products: categoryProductPairs, discountedProducts };
}
export type THomePageProducts = Awaited<ReturnType<typeof load>>;

