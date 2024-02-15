import prisma from "@/lib/prisma";
import { promises as fsPromises } from 'fs';

export async function deleteImage({ imagePath, imageId }: {
  imageId: number;
  imagePath: string
}) {
  const scriptPath = ".next/server/app/app/actions",
    imageFullPath = "public" + imagePath,
    filePath = __dirname.replace(scriptPath, imageFullPath);

  try {
    await fsPromises.unlink(filePath)
  } catch (error: any) {
    console.error(error.message);
    return new Response(error.message, { status: 404 })
  }

  await prisma.image.delete({
    where: {
      id: imageId
    }
  })

  return new Response("Image deleted", { status: 201 })
}
