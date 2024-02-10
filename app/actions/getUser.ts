"use server"

import { getUser as getUserData } from "@/utils"
import { currentUser } from "@clerk/nextjs"

export async function getUser() {
  const user = await currentUser()
  if (!user) return null

  return await getUserData(user.id)
}
