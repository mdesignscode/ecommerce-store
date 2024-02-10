import prisma from "@/lib/prisma";
import { DeleteImage, IDeleteImage } from "@/models/customRequests";
import { promises as fsPromises } from 'fs';

export async function POST(request: DeleteImage) {
  const body: IDeleteImage = await request.json(),
    { imageId, imagePath } = body

  const scriptPath = ".next/server/app/api/products/images/delete",
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
