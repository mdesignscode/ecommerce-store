import prisma from "@/lib/prisma"

export const getUser = async (userId: string) => await prisma.user.findUnique({
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
