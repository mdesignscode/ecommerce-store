import { error, json } from '@sveltejs/kit';
import type Stripe from 'stripe';
import { env } from '$env/dynamic/private';
import { Product, ProductState, sequelize } from 'models';
import { stripe } from '$lib/server/stripe';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	if (!env.WEBHOOK_SECRET) error(500, 'WEBHOOK_SECRET is not set');

	let event: Stripe.Event;
	try {
		event = await stripe().webhooks.constructEventAsync(
			await request.text(),
			request.headers.get('stripe-signature') ?? '',
			env.WEBHOOK_SECRET
		);
	} catch (err) {
		console.warn('Rejected Stripe webhook:', err instanceof Error ? err.message : err);
		error(400, 'Invalid signature');
	}

	if (event.type === 'checkout.session.completed') {
		const session = event.data.object;
		if (session.payment_status === 'paid' && session.client_reference_id) {
			await fulfil(session.id, session.client_reference_id);
		}
	}

	return json({ received: true });
};

/** Mark the purchased products as ordered and decrement stock. Idempotent per product. */
async function fulfil(sessionId: string, userId: string) {
	const lineItems = await stripe().checkout.sessions.listLineItems(sessionId, { limit: 100 });

	await sequelize.transaction(async (transaction) => {
		for (const item of lineItems.data) {
			const product = item.price?.product;
			const productId = typeof product === 'string' ? product : product?.id;
			if (!productId) continue;

			const state = await ProductState.findOne({ where: { userId, productId }, transaction });
			if (!state || (state.get('isPurchased') && !state.get('isInCart'))) continue;

			await state.update({ isPurchased: true, isInCart: false }, { transaction });
			await Product.decrement('stock', {
				by: item.quantity ?? 1,
				where: { id: productId },
				transaction
			});
		}
	});
}
