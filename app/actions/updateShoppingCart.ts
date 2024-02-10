"use server"

import prisma from "@/lib/prisma";
import { getUser } from "@/utils";
import { currentUser } from "@clerk/nextjs";
import { TProduct } from "../Components/ProductsGroup";
import { TUser } from "@/lib/store";

export async function updateShoppingCart(product: TProduct): Promise<{ user: TUser; productInShoppingCart: boolean } | null> {
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

  const { shoppingCartId } = customer

  // create a new shopping cart if user does not have one
  if (!shoppingCartId) {
    await prisma.user.update({
      where: { id: customer.id },
      data: {
        shoppingCart: {
          create: {
            products: { create: { productId: product.id } }
          }
        },
      },
    })

    return { user: await getUser(user.id), productInShoppingCart: true }
  }

  // now get the user's shopping cart
  const userShoppingCart = await prisma.shoppingCart.findUnique({
    where: {
      id: shoppingCartId
    },
    include: {
      products: true
    }
  }),
    productInShoppingCart = userShoppingCart?.products.filter(item => product.id === item.productId)[0]

  // delete product if exists
  if (productInShoppingCart) {
    await prisma.productId.delete({
      where: {
        id: productInShoppingCart.id
      }
    })

    return { user: await getUser(user.id), productInShoppingCart: false }
  } else {
    // add product to existing list
    await prisma.shoppingCart.update({
      where: { id: shoppingCartId },
      data: { products: { create: { productId: product.id } } }
    })

    return { user: await getUser(user.id), productInShoppingCart: true }
  }
}
