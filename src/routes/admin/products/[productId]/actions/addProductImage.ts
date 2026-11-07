"use server"

import prisma from '@/lib/prisma';
import { findAndCopyFile } from './findAndCopyImage';

export async function addProductImage(filename: string, productId: string): Promise<string> {
  // get product
  const product = await prisma.product.findUnique({
    where: { id: productId },
    include: { images: true }
  })

  if (!product)
    throw new Error("Product not found")

  const newFilename = `product-${product.id}-${product.images.length + 1}.jpg`
  let productImageName = ""

  try {
    // copy image to public folder
    productImageName = await findAndCopyFile(filename, newFilename, ".next/server/app/admin/products/[productId]")
  } catch (error: any) {
    console.log(error.message)
  }

  // add image to product's images list
  await prisma.product.update({
    where: { id: productId },
    data: {
      images: {
        create: {
          url: "/products/" + newFilename
        }
      }
    },
    include: {
      images: true,
      price: true
    }
  })

  return productImageName
}
