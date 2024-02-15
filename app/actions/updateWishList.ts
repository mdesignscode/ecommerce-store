"use server"

import prisma from "@/lib/prisma";
import { getUser } from "@/utils";
import { currentUser } from "@clerk/nextjs";

export async function updateWishList(product: TProduct): Promise<{ user: TUser; productInWishList: boolean } | null> {
  if (!product) return null;

  const user = await currentUser()

  if (!user) return null;

  // first get user
  const customer = await prisma.user.findUnique({
    where: {
      id: user.id
    }
  });

  if (!customer) return null;

  const { wishListId } = customer

  // create a new shopping cart if user does not have one
  if (!wishListId) {
    await prisma.user.update({
      where: { id: customer.id },
      data: {
        wishList: {
          create: {
            products: { create: { productId: product.id } }
          }
        },
      },
    })

    return { user: await getUser(user.id), productInWishList: true }
  }

  // now get the user's shopping cart
  const userWishList = await prisma.wishList.findUnique({
    where: {
      id: wishListId
    },
    include: {
      products: true
    }
  }),
    productInWishList = userWishList?.products.filter(item => product.id === item.productId)[0]

  // delete product if exists
  if (productInWishList) {
    await prisma.productId.delete({
      where: {
        id: productInWishList.id
      }
    })

    return { user: await getUser(user.id), productInWishList: false }
  } else {
    // add product to existing list
    await prisma.wishList.update({
      where: { id: wishListId },
      data: { products: { create: { productId: product.id } } }
    })

    return { user: await getUser(user.id), productInWishList: true }
  }
}
