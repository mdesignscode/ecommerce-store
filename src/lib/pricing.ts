type Priced = { discountPercentage: number | null; Price: { amount: number } };

/** Price actually charged, in whole dollars. Shared by the UI and Stripe checkout. */
export function finalPrice({ discountPercentage, Price }: Priced) {
	if (!discountPercentage) return Price.amount;
	return Math.round(Price.amount - Price.amount * (discountPercentage / 100));
}

const usd = new Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'USD',
	maximumFractionDigits: 0
});

export const money = (amount: number) => usd.format(amount);

export function titleCase(str: string) {
	return str
		.split(/[-\s]+/)
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ');
}
