import { faker } from '@faker-js/faker';
import { writeFile } from 'fs/promises';
import { Image, Price, Product, sequelize } from 'models';
import { createStripeObjects } from 'utils/createStripeObjects';

const getDiscountPrice = (price: number, discountPercentage: number) =>
	Math.round(price - price * (discountPercentage / 100));

const randomNumber = (start: number, end: number) =>
	Math.floor(Math.random() * (end - start + 1)) + start;

async function downloadProductImages(index: number, count = 5, size = 512) {
	const imagePaths = [];
	const imageUrls = [];

	for (let i = 0; i < count; i++) {
		// Use random query to avoid caching
		const url = `https://picsum.photos/${size}?random=${Math.random()}`;

		const res = await fetch(url);
		if (!res.ok) {
			throw new Error(`Failed to fetch image: ${res.statusText}`);
		}

		const buffer = Buffer.from(await res.arrayBuffer());
		const filePath = `/products/product-${index}-${i}.jpg`;

		imagePaths.push(filePath);
		imageUrls.push(url);

		await writeFile('./static' + filePath, buffer);
		console.log(`✅ Saved ${filePath}`);
	}

	return { imagePaths, imageUrls };
}

const productFaker = async (index: number) => {
	const estore = faker.commerce;
	const title = estore.productName();
	const description = estore.productDescription();
	const price = Math.ceil(parseFloat(estore.price()));
	const category = estore.department();
	const rating = randomNumber(1, 5);
	const stock = randomNumber(20, 100);

	const { imageUrls, imagePaths } = await downloadProductImages(index);

	const IS_DISCOUNTED_PRODUCT = Boolean(randomNumber(0, 1));
	const DISCOUNTED_PERCENTAGE = randomNumber(15, 40);
	const DISCOUNTED_VALUE = getDiscountPrice(price, DISCOUNTED_PERCENTAGE);

	const { stripeProduct, stripePrice } = await createStripeObjects(
		{
			description: description,
			title: title,
			price: IS_DISCOUNTED_PRODUCT ? DISCOUNTED_VALUE * 100 : price * 100
		},
		imageUrls
	);

	return {
		title,
		category,
		rating,
		description,
		id: stripeProduct.id,
		// Only store a discount when the Stripe price was actually discounted.
		discountPercentage: IS_DISCOUNTED_PRODUCT ? DISCOUNTED_PERCENTAGE : null,
		stock,
		images: imagePaths,
		price: {
			id: stripePrice.id,
			amount: price
		}
	};
};

export async function createFakeProducts() {
	// check if db already filled with products
	const count = await Product.count();
	if (count > 0) {
		console.log('✅ Database seeded already!');
		return;
	}

	const productsCount = 100;
	for (let i = 0; i < productsCount; i++) {
		try {
			console.log('Creating product ' + (i + 1));

			const product = await productFaker(i);

			if (!product) {
				console.log('Failed to create product ' + (i + 1));
				continue;
			}

			await sequelize.transaction(async (t) => {
				const price = await Price.create(
					{
						id: product.price.id,
						amount: product.price.amount
					},
					{ transaction: t }
				);

				const newProduct = await Product.create(
					{
						id: product.id,
						title: product.title,
						description: product.description,
						category: product.category,
						rating: product.rating,
						discountPercentage: product.discountPercentage,
						stock: product.stock,
						priceId: price.id
					},
					{ transaction: t }
				);

				await Image.bulkCreate(
					product.images.map((img) => ({
						url: img,
						productId: newProduct.id
					})),
					{ transaction: t }
				);

				console.log('New product: ', newProduct.toJSON());
			});
		} catch (e) {
			// Sequelize equivalent of Prisma unique constraint
			if (e instanceof Error && e.name === 'SequelizeUniqueConstraintError') {
				console.log(`Duplicate product skipped`);
			} else {
				console.error(e);
			}
		}
	}
}
