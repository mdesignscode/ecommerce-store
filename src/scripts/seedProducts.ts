import { writeFileSync } from 'fs';
import { createStripeObjects } from '../utils/createStripeObjects';
import sequelize from '../models/sequelize';
import { Product, Price, Image } from 'models';

interface IProduct {
        id: string;
        title: string;
        price: { id: string; amount: number };
        description: string;
        images: { url: string }[];
        category: string;
        rating: number;
        discountPercentage?: number | null;
        stock: number;
}

async function getImageBuffer(url: string) {
        const response = await fetch(url);
        const arrayBuffer = await response.arrayBuffer();
        const imageBuffer = Buffer.from(arrayBuffer)
        return imageBuffer;
}

async function downloadImage(_url: string, destinationPath: string) {
        try {
                const url = _url === 'https://placeimg.com/640/480/any'
                        ? 'https://picsum.photos/200'
                        : _url
                const imageBuffer = await getImageBuffer(url);

                writeFileSync(destinationPath, imageBuffer);
                console.log('Image downloaded successfully!');
        } catch {
                try {
                        const url = 'https://picsum.photos/200';
                        const imageBuffer = await getImageBuffer(url);

                        writeFileSync(destinationPath, imageBuffer);
                        console.log('Image downloaded successfully!');
                } catch (error) {
                        console.error('Error downloading image:', error);
                }
        }
}

const getDiscountPrice = (price: number, discountPercentage: number) =>
        Math.round(price - price * (discountPercentage / 100));

const randomNumber = (start: number, end: number) =>
        Math.floor(Math.random() * (end - start + 1)) + start;

async function getProductsFromDummyJSON(): Promise<IProduct[]> {
        const url = 'https://dummyjson.com/products';
        const request = await fetch(url);
        const response = await request.json();

        const products: IProduct[] = await Promise.all(
                response.products.map(async (product: any, index: number) => {
                        if (product.price > 10000) product.price = randomNumber(20, 200);

                        const images = await Promise.all(
                                product.images.map(async (url: string, idx: number) => {
                                        const imagePath = `/products/product-${product.id}-${idx}.jpg`;
                                        await downloadImage(url, './static' + imagePath);
                                        return { url: imagePath };
                                })
                        );

                        try {
                                const IS_DISCOUNTED_PRODUCT = !(index % 5);
                                const DISCOUNTED_PERCENTAGE = randomNumber(15, 30);
                                const DISCOUNTED_VALUE = getDiscountPrice(
                                        product.price,
                                        DISCOUNTED_PERCENTAGE
                                );

                                const { stripeProduct, stripePrice } = await createStripeObjects(
                                        {
                                                description: product.description,
                                                title: product.title,
                                                price: IS_DISCOUNTED_PRODUCT
                                                        ? DISCOUNTED_VALUE * 100
                                                        : product.price * 100,
                                        },
                                        product.images
                                );

                                return {
                                        id: stripeProduct.id,
                                        title: product.title,
                                        price: {
                                                amount: IS_DISCOUNTED_PRODUCT ? DISCOUNTED_VALUE : product.price,
                                                id: stripePrice.id,
                                        },
                                        description: product.description,
                                        images,
                                        category: product.category,
                                        rating: randomNumber(3, 5),
                                        discountPercentage: IS_DISCOUNTED_PRODUCT
                                                ? DISCOUNTED_PERCENTAGE
                                                : null,
                                        stock: randomNumber(10, 100),
                                } as IProduct;
                        } catch (error: any) {
                                console.log(error.message);
                                return null as any;
                        }
                })
        );

        return products.filter(Boolean);
}

async function getProductsFromEscuelaJS(): Promise<IProduct[]> {
        const url = 'https://api.escuelajs.co/api/v1/products';
        const request = await fetch(url);
        const response = await request.json();

        const products: IProduct[] = await Promise.all(
                response.map(async (product: any, index: number) => {
                        if (product.price > 10000) product.price = randomNumber(20, 200);

                        const imagesList: string[] = [];
                        const images = await Promise.all(
                                product.images.map(async (url: string, idx: number) => {
                                        const imagePath = `/products/product-${product.id}-${idx}.jpg`;
                                        let imageUrl = '';

                                        try {
                                                const json = JSON.parse(url);
                                                imageUrl = typeof json === 'string' ? json : json[0];
                                        } catch {
                                                imageUrl = url.replace(/[\[\]"]/g, '');
                                        }

                                        imagesList.push(imageUrl);
                                        await downloadImage(imageUrl, './static' + imagePath);

                                        return { url: imagePath };
                                })
                        );

                        try {
                                const IS_DISCOUNTED_PRODUCT = !(index % 5);
                                const DISCOUNTED_PERCENTAGE = randomNumber(15, 30);
                                const DISCOUNTED_VALUE = getDiscountPrice(
                                        product.price,
                                        DISCOUNTED_PERCENTAGE
                                );

                                const { stripeProduct, stripePrice } = await createStripeObjects(
                                        {
                                                description: product.description,
                                                title: product.title,
                                                price: IS_DISCOUNTED_PRODUCT
                                                        ? DISCOUNTED_VALUE * 100
                                                        : product.price * 100,
                                        },
                                        imagesList
                                );

                                return {
                                        id: stripeProduct.id,
                                        title: product.title,
                                        price: {
                                                amount: IS_DISCOUNTED_PRODUCT ? DISCOUNTED_VALUE : product.price,
                                                id: stripePrice.id,
                                        },
                                        description: product.description,
                                        images,
                                        category: product.category.name,
                                        rating: randomNumber(3, 5),
                                        discountPercentage: IS_DISCOUNTED_PRODUCT
                                                ? DISCOUNTED_PERCENTAGE
                                                : null,
                                        stock: randomNumber(10, 100),
                                } as IProduct;
                        } catch (error: any) {
                                console.log(error.message);
                                return null as any;
                        }
                })
        );

        return products.filter(Boolean);
}

export async function seedProducts() {
        // check if db already filled with products
        const count = await Product.count();
        if (count > 0) {
                console.log('✅ Database seeded already!');
                return;
        }

        const escuelaProducts = await getProductsFromEscuelaJS();
        const dummyProducts = await getProductsFromDummyJSON();
        const allProducts = escuelaProducts.concat(dummyProducts);

        for (const product of allProducts) {
                try {
                        console.log('Creating product');

                        await sequelize.transaction(async (t) => {
                                const price = await Price.create(
                                        {
                                                id: product.price.id,
                                                amount: product.price.amount,
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
                                                priceId: price.id,
                                        },
                                        { transaction: t }
                                );

                                await Image.bulkCreate(
                                        product.images.map((img) => ({
                                                url: img.url,
                                                productId: newProduct.id,
                                        })),
                                        { transaction: t }
                                );

                                console.log('New product: ', newProduct.toJSON());
                        });
                } catch (e: any) {
                        // Sequelize equivalent of Prisma unique constraint
                        if (e.name === 'SequelizeUniqueConstraintError') {
                                console.log(`Duplicate product skipped: ${product.title}`);
                        } else {
                                console.error(e);
                        }
                }
        }
}

