import { fail } from '@sveltejs/kit';
import { z } from 'zod';
import { Image, Product, ProductState, sequelize } from 'models';
import { parseForm, requireAdmin } from 'utils';
import { findProducts } from '$lib/server/catalog';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => ({ products: await findProducts() });

const DeleteSchema = z.object({ productId: z.string().min(1) });

export const actions = {
	delete: async ({ locals, request }) => {
		requireAdmin(locals);
		const form = await parseForm(DeleteSchema, request);
		if (!form.ok) return form.failure;
		const { productId } = form.data;

		const deleted = await sequelize.transaction(async (transaction) => {
			await ProductState.destroy({ where: { productId }, transaction });
			await Image.destroy({ where: { productId }, transaction });
			return Product.destroy({ where: { id: productId }, transaction });
		});
		if (!deleted) return fail(404, { error: 'Product not found' });
		return { message: 'Product deleted.' };
	}
} satisfies Actions;
