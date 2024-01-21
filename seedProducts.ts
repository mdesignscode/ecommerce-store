import { PrismaClient } from '@prisma/client'
import axios from 'axios';
import { writeFileSync } from 'fs';


const prisma = new PrismaClient()

interface IProduct {
  title: string;
  price: number;
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
      const images = await Promise.all(
        product.images.map(async (url: string, index: number) => {
          const imagePath = `/products/product-${product.id}-${index}`;
          await downloadImage(url, "./public" + imagePath)

          return { url: imagePath };
        })
      );

      return {
        title: product.title,
        price: product.price,
        description: product.description,
        images,
        category: product.category,
        rating: randomNumber(3, 5),
        discountPercentage: !(index % 5) ? randomNumber(15, 60) : null,
        stock: randomNumber(10, 100),
      };
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
      const images = await Promise.all(
        product.images.map(async (url: string, index: number) => {
          const imagePath = `/products/product-${product.id}-${index}`;
          let imageUrl = "";

          try {
            const json = JSON.parse(url);
            imageUrl = typeof json === "string" ? json : json[0];
          } catch (error) {
            imageUrl = url.replace(/[\[\]"]/g, "");
          }

          await downloadImage(imageUrl, "./public" + imagePath);
          return { url: imagePath };
        })
      );

      return {
        title: product.title,
        price: product.price,
        description: product.description,
        images,
        category: product.category.name,
        rating: randomNumber(3, 5),
        discountPercentage: !(index % 5) ? randomNumber(15, 60) : null,
        stock: randomNumber(10, 100),
      };
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
