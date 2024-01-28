import prisma from "@/lib/prisma";
import { IUpdateUserList, UpdateListRequest } from "@/models/customRequests";
import { updatedUserResponse } from "@/utils";

export async function POST(request: UpdateListRequest) {
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

  // create a new wish list if user does not have one
  if (!listId) {
    await prisma.user.update({
      where: { id: userId },
      data: {
        wishList: {
          create: {
            products: { create: { productId: product.id } }
          }
        },
      },
    })

    return updatedUserResponse(userId)
  }

  // now get the user's wish list
  const userWishList = await prisma.wishList.findUnique({
    where: {
      id: listId
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

    return updatedUserResponse(userId)
  } else {
    // add product to existing list
    await prisma.wishList.update({
      where: { id: listId },
      data: { products: { create: { productId: product.id } } }
    })

    return updatedUserResponse(userId)
  }
}
