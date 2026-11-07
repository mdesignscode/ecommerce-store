import { Product } from "models";
import type { TProductState } from "store";

export const load = async ({ params }) => {
        const { productId } = params;

        const productRaw = await Product.findOne({
                where: {
                        id: productId,
                }
        });
        if (!productRaw) return;

        const product = productRaw.get({ plain: true }) as TProductState['Product'];
        return { product };
}

