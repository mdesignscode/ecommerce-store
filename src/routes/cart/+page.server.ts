import { fail, redirect } from '@sveltejs/kit';
import { ProductState } from 'models';
import { requireUser } from 'utils';
import { finalPrice } from '$lib/pricing';
import { stripe } from '$lib/server/stripe';
import type { TProduct } from '$lib/types';
import type { Actions } from './$types';

export const actions = {
	checkout: async ({ locals, url }) => {
		const user = requireUser(locals);
		if (!user.get('isVerified')) redirect(303, '/signup/validate-email');

		const items = await ProductState.findAll({ where: { userId: user.id, isInCart: true } });
		if (items.length === 0) return fail(400, { error: 'Your cart is empty.' });

		let session;
		try {
			// Charge the price computed here, so Stripe always matches what the store shows.
			session = await stripe().checkout.sessions.create({
				mode: 'payment',
				client_reference_id: user.id,
				customer_email: user.get('email'),
				line_items: items.map((item) => {
					const product = item.Product!.get({ plain: true }) as TProduct;
					return {
						quantity: Math.min(item.get('quantity'), product.stock),
						price_data: {
							currency: 'usd',
							unit_amount: finalPrice(product) * 100,
							product: product.id
						}
					};
				}),
				success_url: `${url.origin}/orders?checkout=success`,
				cancel_url: `${url.origin}/cart`
			});
		} catch (error) {
			console.error('Stripe checkout failed:', error);
			return fail(502, { error: 'Checkout is unavailable right now. Please try again.' });
		}

		await user.update({ checkoutId: session.id });
		redirect(303, session.url!);
	}
} satisfies Actions;
