import Stripe from 'stripe';
import { env } from '$env/dynamic/private';

let client: Stripe | undefined;

export function stripe() {
	if (!env.STRIPE_SECRET) throw new Error('STRIPE_SECRET is not set');
	client ??= new Stripe(env.STRIPE_SECRET);
	return client;
}
