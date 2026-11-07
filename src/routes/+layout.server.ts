import { ProductState } from "models";

export const load = async ({ locals }) => {
        const user = locals.user;
        if (user) {
                const allProducts = await ProductState.findAll({
                        where: { userId: user.id },
                });
                const userProducts = allProducts.map(p => p.get({ plain: true }));
                return { userProducts, user: user.get({ plain: true }) };
        }
}

