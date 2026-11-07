import { ProductState } from 'models';
import type { TProductState, TPublicUser } from '$lib/types';
import { USER_PRODUCTS } from '$lib/shop.svelte';
import { listCategories } from '$lib/server/catalog';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals, depends }) => {
	depends(USER_PRODUCTS);
	const { user } = locals;
	const categories = await listCategories();
	if (!user) return { categories, user: undefined, userProducts: [] as TProductState[] };

	const states = await ProductState.findAll({
		where: { userId: user.id },
		order: [['addedAt', 'DESC']]
	});
	return {
		categories,
		user: user.get({ plain: true }) as TPublicUser,
		userProducts: states.map((s) => s.get({ plain: true })) as TProductState[]
	};
};
