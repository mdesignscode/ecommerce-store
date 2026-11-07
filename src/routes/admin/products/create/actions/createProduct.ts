"use server"

import { createStripeObjects } from "@/createStripeObjects";
import prisma from "@/lib/prisma";
import { isNumberAttribute, isTextAttribute } from "@/utils";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { redirect } from "next/navigation";

type TProductAttributes = {
  title: string;
  description: string;
  category: string;
  rating: number;
  discountPercentage: number;
  stock: number;
  id: string;
};

export async function createProduct(
  prevState: any,
  formData: FormData
) {
  const productData = Object.fromEntries(formData) as Record<string, any>;

  const hostname = process.env.NEXT_PUBLIC_HOST_URL
  if (!hostname)
    throw new Error("Please provide NEXT_PUBLIC_HOST_URL environment variable")

  // check if user added 3 images minimum
  for (let index = 0; index < 3; index++) {
    const imageName = `image-${index}`
    if (!productData[imageName]) {
      return {
        errors: {
          ...prevState.errors,
          [imageName]: "Please add at least 3 preview images"
        }
      }
    }

  }

  // hide state properties
  Object.defineProperties(productData, {
    '$ACTION_REF_1': {
      enumerable: false
    },
    '$ACTION_1:0': {
      enumerable: false
    },
    '$ACTION_1:1': {
      enumerable: false
    },
    '$ACTION_KEY': {
      enumerable: false
    },
    price: {
      enumerable: false
    }
  })

  // create images list
  const imagesList: ({
    url: string;
  } | undefined)[] = Object.keys(productData)
    .map(attr => {
      if (!attr.includes("image")) return;

      // hide attribute from data object
      Object.defineProperties(productData, { [attr]: { enumerable: false } })

      return { url: productData[attr] }
    })
    .filter(Boolean)

  // process form attributes
  const processedProductData = {} as TProductAttributes

  for (const attr of Object.keys(productData)) {
    // create number attributes
    if (isNumberAttribute(attr)) {
      try {
        if (attr === "price") continue;
        processedProductData[attr] = parseInt(productData[attr])
      } catch (error) {
        return {
          errors: {
            ...prevState.errors,
            [attr]: `${attr} must be number`
          }
        }
      }
    }

    else if (isTextAttribute(attr)) {
      // other attributes are already string
      processedProductData[attr] = productData[attr]
    }
  }

  let priceNumber: number;

  // add price
  try {
    priceNumber = parseInt(productData.price)
  } catch (error) {
    return {
      errors: {
        ...prevState.errors,
        price: "Price must be number"
      }
    }
  }

  // create stripe objects to link with product
  const { stripeProduct, stripePrice } = await createStripeObjects({
    description: processedProductData.description,
    title: processedProductData.title,
    price: priceNumber
  }, imagesList.map(i => hostname + i?.url))

  // link product with stripe
  const price = { amount: priceNumber, id: stripePrice.id }
  processedProductData.id = stripeProduct.id

  // create new product
  try {
    const newProduct = await prisma.product.create({
      data: {
        ...processedProductData,
        price: {
          create: price
        },
        images: {
          create: imagesList as {
            url: string;
          }[]
        }
      }
    })

    return {
      success: {
        product: newProduct
      }
    }
  } catch (e) {
    console.log(e)
    if (e instanceof PrismaClientKnownRequestError) {
      if (e.code === 'P2002') {
        return {
          errors: {
            ...prevState.errors,
            title: 'Product with title exists'
          }
        };
      }
    }
  }
}
