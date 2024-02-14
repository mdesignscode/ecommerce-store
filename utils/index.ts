import prisma from "@/lib/prisma"

export const getUser = async (userId: string | undefined): Promise<TUser> => await prisma.user.findUnique({
  where: { id: userId }, include: {
    wishList: { include: { products: true } },
    shoppingCart: { include: { products: true } },
    purchaseHistory: { include: { products: true } }
  }
})

export async function updatedUserResponse(userId: string) {
  const updatedUser = await getUser(userId)
  return new Response(JSON.stringify(updatedUser), { status: 201 })
}

export function capitalizeAndReplace(str: string) {
  // Split the string by hyphens, capitalize each word, and join them with spaces
  const formattedString = str
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return formattedString;
}

export function isTextAttribute(attr: string): attr is TTextAttributes {
  return ["title", "description", "category"].includes(attr);
}

export function isNumberAttribute(attr: string): attr is TNumberAttributes {
  return ["rating", "discountPercentage", "stock", "price"].includes(attr);
}

export const getDiscountPrice = (price: number, discountPercentage: number) => Math.round(price - (price * (discountPercentage / 100)))
