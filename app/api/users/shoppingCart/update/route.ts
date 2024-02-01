import prisma from "@/lib/prisma";
import { IUpdateUserList, UpdateUserListRequest } from "@/models/customRequests";
import { updatedUserResponse } from "@/utils";

export async function POST(request: UpdateUserListRequest) {
  const body: IUpdateUserList = await request.json();

  const { userId, product, listId } = body

  if (!product)
    return new Response("Product not found", { status: 404 })

  // first get user
  const user = await prisma.user.findUnique({
    where: {
      id: userId
    }
  });

  if (!user)
    return new Response("User not found", { status: 404 })

  // create a new shopping cart if user does not have one
  if (!listId) {
    await prisma.user.update({
      where: { id: userId },
      data: {
        shoppingCart: {
          create: {
            products: { create: { productId: product?.id } }
          }
        },
      },
    })

    return updatedUserResponse(userId)
  }

  // now get the user's shopping cart
  const userShoppingCart = await prisma.shoppingCart.findUnique({
    where: {
      id: listId
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

    return updatedUserResponse(userId)
  } else {
    // add product to existing list
    await prisma.shoppingCart.update({
      where: { id: listId },
      data: { products: { create: { productId: product.id } } }
    })

    return updatedUserResponse(userId)
  }
}
