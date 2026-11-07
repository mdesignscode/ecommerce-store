import { error, fail } from '@sveltejs/kit';
import { z } from 'zod';
import { Price, Product, sequelize } from 'models';
import { parseForm, requireAdmin } from 'utils';
import { findProduct, listCategories } from '$lib/server/catalog';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const product = await findProduct(params.productId);
	if (!product) error(404, 'Product not found');
	return { product, categories: await listCategories() };
};

const ProductSchema = z.object({
	title: z.string().trim().min(2, 'Title must be at least 2 characters'),
	description: z
		.string()
		.trim()
		.min(1, 'Description is required')
		.max(255, 'Keep the description under 255 characters'),
	category: z.string().trim().min(1, 'Category is required'),
	rating: z.coerce.number().int().min(1).max(5, 'Rating must be between 1 and 5'),
	stock: z.coerce.number().int().min(0, 'Stock cannot be negative'),
	price: z.coerce.number().int().min(1, 'Price must be at least $1'),
	discountPercentage: z
		.union([z.literal(''), z.coerce.number().int().min(1).max(90, 'Discount must be 1–90%')])
		.transform((v) => (v === '' ? null : v))
});

export const actions = {
	save: async ({ locals, request, params }) => {
		requireAdmin(locals);
		const form = await parseForm(ProductSchema, request);
		if (!form.ok) return form.failure;

		const product = await Product.findByPk(params.productId);
		if (!product) return fail(404, { error: 'Product not found' });

		const { price, ...fields } = form.data;
		try {
			await sequelize.transaction(async (transaction) => {
				await product.update(fields, { transaction });
				await Price.update(
					{ amount: price },
					{ where: { id: product.get('priceId') }, transaction }
				);
			});
		} catch (err) {
			if (err instanceof Error && err.name === 'SequelizeUniqueConstraintError') {
				return fail(400, { error: 'Another product already uses that title.' });
			}
			throw err;
		}
		return { message: 'Product saved.' };
	}
} satisfies Actions;
