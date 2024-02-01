import prisma from "@/lib/prisma";
import { GetUserListRequest, IGetUserList } from "@/models/customRequests";
import { NextResponse } from "next/server";

export async function POST(request: GetUserListRequest) {
  const body: IGetUserList = await request.json();

  const userWishList = await prisma.wishList.findUnique({
    where: {
      id: body.listId
    },
    include: {
      products: true
    }
  })

  if (!userWishList) {
    return new Response("User shopping cart not found", { status: 404 })
  }

  const wishListItems = userWishList.products.map(async (product) => prisma.product.findUnique({
    where: { id: product.productId },
    include: {
      images: true,
      price: true
    }
  }))

  return NextResponse.json(await Promise.all(wishListItems))
}
