import { error } from '@sveltejs/kit';
import { Op } from 'sequelize';
import { findProducts } from '$lib/server/catalog';
import { finalPrice } from '$lib/pricing';
import type { TProduct } from '$lib/types';
import type { PageServerLoad } from './$types';

const sorters = {
	featured: () => 0,
	'price-asc': (a: TProduct, b: TProduct) => finalPrice(a) - finalPrice(b),
	'price-desc': (a: TProduct, b: TProduct) => finalPrice(b) - finalPrice(a),
	rating: (a: TProduct, b: TProduct) => b.rating - a.rating,
	discount: (a: TProduct, b: TProduct) => (b.discountPercentage ?? 0) - (a.discountPercentage ?? 0)
};
export type TSort = keyof typeof sorters;

export const load: PageServerLoad = async ({ params, url }) => {
	const category = params.categoryTitle;
	const isDeals = category === 'deals';

	const products = await findProducts(
		isDeals ? { discountPercentage: { [Op.not]: null } } : { category }
	);
	if (!isDeals && products.length === 0) error(404, 'Category not found');

	const requested = url.searchParams.get('sort') as TSort | null;
	const sort: TSort =
		requested && requested in sorters ? requested : isDeals ? 'discount' : 'featured';
	products.sort(sorters[sort]);

	return { category, isDeals, products, sort };
};
