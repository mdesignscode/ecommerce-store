import { PrismaClient } from '@prisma/client'
import axios from 'axios';
import { writeFileSync } from 'fs';

const stripe = require('stripe')(process.env.STRIPE_SECRET);

const prisma = new PrismaClient()

interface IProduct {
  id: string;
  title: string;
  price: { id: string, amount: number };
  description: string;
  images: { url: string }[];
  category: string;
  rating: number;
  discountPercentage?: number;
  stock: number;
}

async function downloadImage(url: string, destinationPath: string) {
  try {
    // Make a GET request to the image URL
    const response = await axios.get(url === "https://placeimg.com/640/480/any" ? "https://random.imagecdn.app/1080/1080" : url, { responseType: 'arraybuffer' });

    // Write the image data to a file
    writeFileSync(destinationPath, response.data);

    console.log('Image downloaded successfully!');
  } catch (error: any) {
    try {// Make a GET request to the image URL
      const response = await axios.get("https://random.imagecdn.app/1080/1080", { responseType: 'arraybuffer' });

      // Write the image data to a file
      writeFileSync(destinationPath, response.data);

      console.log('Image downloaded successfully!');
    } catch (error) {
      console.error('Error downloading image:', error);
    }
  }
}

const randomNumber = (start: number, end: number) => Math.floor(Math.random() * (end - start + 1)) + start

async function getProductsFromDummyJSON() {
  const url = "https://dummyjson.com/products";
  const request = await fetch(url);
  const response = await request.json();

  const products: IProduct[] = await Promise.all(
    response.products.map(async (product: any, index: number) => {
      // get product images
      const images = await Promise.all(
        product.images.map(async (url: string, index: number) => {
          const imagePath = `/products/product-${product.id}-${index}`;
          await downloadImage(url, "./public" + imagePath)

          return { url: imagePath };
        })
      );

      const { stripeProduct, stripePrice } = await createStripeObjects(product, product.images.map((image: string) => image))

      return {
        id: stripeProduct.id,
        title: product.title,
        price: { amount: product.price, id: stripePrice.id },
        description: product.description,
        images,
        category: product.category,
        rating: randomNumber(3, 5),
        discountPercentage: !(index % 5) ? randomNumber(15, 40) : null,
        stock: randomNumber(10, 100),
      } as IProduct;
    })
  );

  return products;
}

async function getProductsFromEscuelaJS() {
  const url = "https://api.escuelajs.co/api/v1/products";
  const request = await fetch(url);
  const response = await request.json();

  const products: IProduct[] = await Promise.all(
    response.map(async (product: any, index: number) => {
      // get product images
      const imagesList: string[] = []
      const images = await Promise.all(
        // find all image urls
        product.images.map(async (url: string, index: number) => {
          const imagePath = `/products/product-${product.id}-${index}`;
          let imageUrl = "";

          try {
            const json = JSON.parse(url);
            imageUrl = typeof json === "string" ? json : json[0];
          } catch (error) {
            imageUrl = url.replace(/[\[\]"]/g, "");
          }

          imagesList.push(imageUrl)

          await downloadImage(imageUrl, "./public" + imagePath);
          return { url: imagePath };
        })
      );

      const { stripeProduct, stripePrice } = await createStripeObjects(product, imagesList)

      return {
        id: stripeProduct.id,
        title: product.title,
        price: { amount: product.price, id: stripePrice.id },
        description: product.description,
        images,
        category: product.category.name,
        rating: randomNumber(3, 5),
        discountPercentage: !(index % 5) ? randomNumber(15, 40) : null,
        stock: randomNumber(10, 100),
      } as IProduct;
    })
  );

  return products;
}


async function main() {
  const escuelaProducts = await getProductsFromEscuelaJS(),
    dummyProducts = await getProductsFromDummyJSON(),
    allProducts = dummyProducts.concat(escuelaProducts)

  allProducts.forEach(async product => {
    console.log(await prisma.product.create({
      data: {
        ...product,
        images: {
          create: product.images
        },
        price: {
          create: product.price
        }
      }
    }))
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

async function createStripeProduct(title: string, description: string, images: string[]) {
  const product = await stripe.products.create({
    name: title,
    description,
    images
  });
  return product
}

async function createStripePrice(amount: number, productId: string) {
  const price = await stripe.prices.create({
    currency: 'usd',
    unit_amount: amount,
    product: productId,
    billing_scheme: "per_unit"
  });
  return price
}

async function createStripeObjects(product: any, images: string[]) {
  // create stripe product
  const stripeProduct = await createStripeProduct(product.title, product.description, images)

  // create stripe price
  const stripePrice = await createStripePrice(product.price, stripeProduct.id)

  return { stripeProduct, stripePrice }
}
