"use server";

import prisma from "@/lib/prisma";
import { unlink } from "fs/promises";

export async function deleteProductImage(filename: string, imageId: number | undefined) {
  const scriptPath = ".next/server/app/admin/products/[productId]",
    imageFullPath = "public" + filename,
    filePath = __dirname.replace(scriptPath, imageFullPath);
    console.log({ scriptPath, __dirname })

  try {
    await unlink(filePath);
    console.log(filePath, " deleted.")
  } catch (error: any) {
    throw new Error(error.message);
  }

  await prisma.image.delete({
    where: {
      id: imageId,
    },
  });

  console.log("Image deleted.")
}
