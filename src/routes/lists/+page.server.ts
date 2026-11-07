import { fail, redirect } from '@sveltejs/kit';
import { z } from 'zod';
import { Product, ProductState } from 'models';
import { parseForm, requireUser } from 'utils';
import type { Actions } from './$types';

export const load = () => redirect(303, '/');

const ToggleSchema = z.object({
	productId: z.string().min(1),
	list: z.enum(['isInCart', 'isWishlisted'])
});

const QuantitySchema = z.object({
	productId: z.string().min(1),
	quantity: z.coerce.number().int().min(1, 'Quantity must be at least 1')
});

export const actions = {
	toggle: async ({ locals, request }) => {
		const user = requireUser(locals);
		const form = await parseForm(ToggleSchema, request);
		if (!form.ok) return form.failure;
		const { productId, list } = form.data;

		if (!(await Product.findByPk(productId))) return fail(404, { error: 'Product not found' });

		const [state, created] = await ProductState.findOrCreate({
			where: { userId: user.id, productId },
			defaults: { userId: user.id, productId, [list]: true }
		});
		if (!created) {
			const patch: Partial<ProductState> = { [list]: !state.get(list) };
			if (list === 'isInCart' && patch.isInCart) patch.quantity = 1;
			await state.update(patch);
		}
		return { added: Boolean(state.get(list)) };
	},
	setQuantity: async ({ locals, request }) => {
		const user = requireUser(locals);
		const form = await parseForm(QuantitySchema, request);
		if (!form.ok) return form.failure;
		const { productId, quantity } = form.data;

		const state = await ProductState.findOne({
			where: { userId: user.id, productId, isInCart: true }
		});
		if (!state?.Product) return fail(404, { error: 'Item is not in your cart' });

		await state.update({ quantity: Math.min(quantity, state.Product.get('stock')) });
		return { quantity: state.get('quantity') };
	}
} satisfies Actions;
