import { findProducts } from '$lib/server/catalog';
import type { TProduct } from '$lib/types';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const products = await findProducts();

	const byCategory = new Map<string, TProduct[]>();
	for (const product of products) {
		byCategory.set(product.category, [...(byCategory.get(product.category) ?? []), product]);
	}
	const categories = [...byCategory.entries()]
		.map(([name, items]) => ({ name, count: items.length, cover: items[0], items }))
		.sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));

	const deals = products
		.filter((p) => p.discountPercentage)
		.sort((a, b) => (b.discountPercentage ?? 0) - (a.discountPercentage ?? 0))
		.slice(0, 8);

	return {
		deals,
		categories: categories.map(({ name, count, cover }) => ({ name, count, cover })),
		featured: categories.slice(0, 3).map(({ name, items }) => ({ name, items: items.slice(0, 4) }))
	};
};
