import { error } from '@sveltejs/kit';
import { findProduct, findProducts, excluding } from '$lib/server/catalog';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const product = await findProduct(params.productId);
	if (!product) error(404, 'Product not found');

	const related = await findProducts({ category: product.category, ...excluding(product.id) });
	return { product, related: related.slice(0, 4) };
};
