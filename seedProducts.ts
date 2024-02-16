import axios from 'axios';
import { writeFileSync } from 'fs';
import { createStripeObjects } from './createStripeObjects';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { PrismaClient } from './prisma/generated/client'

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
    const response = await axios.get(url === "https://placeimg.com/640/480/any" ? "https://picsum.photos/200" : url, { responseType: 'arraybuffer' });

    // Write the image data to a file
    writeFileSync(destinationPath, response.data);

    console.log('Image downloaded successfully!');
  } catch (error: any) {
    try {// Make a GET request to the image URL
      const response = await axios.get("https://picsum.photos/200", { responseType: 'arraybuffer' });

      // Write the image data to a file
      writeFileSync(destinationPath, response.data);

      console.log('Image downloaded successfully!');
    } catch (error) {
      console.error('Error downloading image:', error);
    }
  }
}

const getDiscountPrice = (price: number, discountPercentage: number) => Math.round(price - (price * (discountPercentage / 100)))

const randomNumber = (start: number, end: number) => Math.floor(Math.random() * (end - start + 1)) + start

async function getProductsFromDummyJSON() {
  const url = "https://dummyjson.com/products";
  const request = await fetch(url);
  const response = await request.json();

  const products: IProduct[] = await Promise.all(
    response.products.map(async (product: any, index: number) => {
      if (product.price > 10000)
        product.price = randomNumber(20, 200)
      // get product images
      const images = await Promise.all(
        product.images.map(async (url: string, index: number) => {
          const imagePath = `/products/product-${product.id}-${index}.jpg`;
          await downloadImage(url, "./public" + imagePath)

          return { url: imagePath };
        })
      );

      try {
        const IS_DISCOUNTED_PRODUCT = !(index % 5),
          DISCOUNTED_PERCENTAGE = randomNumber(15, 30),
          DISCOUNTED_VALUE = getDiscountPrice(product.price, DISCOUNTED_PERCENTAGE)

        const { stripeProduct, stripePrice } = await createStripeObjects({
          description: product.description, title: product.title, price: IS_DISCOUNTED_PRODUCT ? DISCOUNTED_VALUE * 100 : product.price * 100
        }, product.images.map((image: string) => image))

        return {
          id: stripeProduct.id,
          title: product.title,
          price: { amount: IS_DISCOUNTED_PRODUCT ? DISCOUNTED_VALUE : product.price, id: stripePrice.id },
          description: product.description,
          images,
          category: product.category,
          rating: randomNumber(3, 5),
          discountPercentage: IS_DISCOUNTED_PRODUCT ? DISCOUNTED_PERCENTAGE : null,
          stock: randomNumber(10, 100),
        } as IProduct;
      } catch (error: any) {
        console.log(error.message)
        return
      }
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
      if (product.price > 10000)
        product.price = randomNumber(20, 200)
      // get product images
      const imagesList: string[] = []
      const images = await Promise.all(
        // find all image urls
        product.images.map(async (url: string, index: number) => {
          const imagePath = `/products/product-${product.id}-${index}.jpg`;
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

      try {
        const IS_DISCOUNTED_PRODUCT = !(index % 5),
          DISCOUNTED_PERCENTAGE = randomNumber(15, 30),
          DISCOUNTED_VALUE = getDiscountPrice(product.price, DISCOUNTED_PERCENTAGE)

        const { stripeProduct, stripePrice } = await createStripeObjects({
          description: product.description, title: product.title, price: IS_DISCOUNTED_PRODUCT ? DISCOUNTED_VALUE * 100 : product.price * 100
        }, imagesList)

        return {
          id: stripeProduct.id,
          title: product.title,
          price: {
            amount: IS_DISCOUNTED_PRODUCT ? DISCOUNTED_VALUE : product.price,
            id: stripePrice.id
          },
          description: product.description,
          images,
          category: product.category.name,
          rating: randomNumber(3, 5),
          discountPercentage: IS_DISCOUNTED_PRODUCT ? DISCOUNTED_PERCENTAGE : null,
          stock: randomNumber(10, 100),
        } as IProduct;
      } catch (error: any) {
        console.log(error.message)
        return
      }
    })
  );

  return products;
}

async function main() {
  const escuelaProducts = await getProductsFromEscuelaJS(),
    dummyProducts = await getProductsFromDummyJSON(),
    allProducts = dummyProducts.concat(escuelaProducts)

  allProducts.filter(Boolean).forEach(async product => {
    try {
      console.log("Creating product")
      const newProduct = await prisma.product.create({
        data: {
          ...product,
          images: {
            create: product.images
          },
          price: {
            create: product.price
          }
        }
      })
      console.log("New product: ", newProduct)
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          ;
        }
      }
    }
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
