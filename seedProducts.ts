import { PrismaClient } from '@prisma/client'


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

const randomNumber = (start: number, end: number) => Math.floor(Math.random() * (end - start + 1)) + start,
  shuffleArray = (array: IProduct[]) => array.sort(() => Math.random() - 0.5);


async function getProductsFromDummyJSON() {
  const url = "https://dummyjson.com/products",
    request = await fetch(url),
    response = await request.json(),
    products: IProduct[] = response.products.map((product: any, index: number) => {
      return {
        title: product.title,
        price: product.price,
        description: product.description,
        images: product.images.map((url: string) => ({ url })),
        category: product.category,
        rating: randomNumber(3, 5),
        discountPercentage: index % 5 ? randomNumber(15, 60) : null,
        stock: randomNumber(10, 100)
      }
    })

  return products;
}

async function getProductsFromEscuelaJS() {
  const url = "https://api.escuelajs.co/api/v1/products",
    request = await fetch(url),
    response = await request.json(),
    products: IProduct[] = response.map((product: any, index: number) => ({
      title: product.title,
      price: product.price,
      description: product.description,
      images: product.images.map((url: string) => ({ url })),
      category: product.category.name,
      rating: randomNumber(3, 5),
      discountPercentage: index % 5 ? randomNumber(15, 60) : null,
      stock: randomNumber(10, 100)
    }))

  return products
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
