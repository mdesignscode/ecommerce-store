import Stripe from 'stripe';

// Seed scripts run under Bun, which loads .env automatically.
const stripe = new Stripe(process.env.STRIPE_SECRET!);

/** Retry once after a short pause when Stripe rate-limits us (HTTP 429). */
async function withRateLimitRetry<T>(request: () => Promise<T>): Promise<T> {
	try {
		return await request();
	} catch (error) {
		if (error instanceof Stripe.errors.StripeError && error.statusCode === 429) {
			await new Promise((resolve) => setTimeout(resolve, 1500));
			return request();
		}
		throw error;
	}
}

export async function createStripeObjects(
	product: { title: string; description: string; price: number },
	images: string[]
) {
	const stripeProduct = await withRateLimitRetry(() =>
		stripe.products.create({ name: product.title, description: product.description, images })
	);
	const stripePrice = await withRateLimitRetry(() =>
		stripe.prices.create({
			currency: 'usd',
			unit_amount: product.price,
			product: stripeProduct.id,
			billing_scheme: 'per_unit'
		})
	);
	return { stripeProduct, stripePrice };
}
