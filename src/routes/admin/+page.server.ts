import { redirect } from "@sveltejs/kit";
import { Product } from "models";
import type { TProductState } from "store";

export const load = async ({ locals }) => {
        const { user } = locals;

        if (!user) throw redirect(302, '/sign-in');
        if (user.get('role') !== 'admin') throw redirect(401, '/sign-in');

        const allProductsRaw = await Product.findAll();
        const allProducts = allProductsRaw.map(p => p.get({ plain: true })) as TProductState['Product'][];
        return { products: allProducts };
}

