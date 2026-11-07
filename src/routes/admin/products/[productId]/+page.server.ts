import { Product } from "models";
import type { TProductState } from "store";

export const load = async ({ params }) => {
        const allCategories = await Product.findAll({
                group: 'category',
                attributes: ['category'],
        });
        const categories = allCategories.map(c => c.category);

        const { productId } = params;
        const productRaw = await Product.findOne({
                where: {
                        id: productId,
                }
        });

        const product = productRaw
                ? productRaw.get({ plain: true }) as TProductState['Product']
                : null
        return { categories, product };
}

export type TAdminPageProduct = Awaited<ReturnType<typeof load>>;

