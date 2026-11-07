"use server"

import { readdirSync } from "fs";
import { copy } from "fs-extra";
import { readdir, stat } from "fs/promises";
import { join } from "path";

export async function findAndCopyFile(originalFileName: string, newFileName?: string, dirname?: string): Promise<string> {
  const scriptPath = dirname || ".next/server/app/admin/products/create",
    destinationDirectory = __dirname.replace(scriptPath, "public/products/"),
    productImageName = newFileName || originalFileName

  try {
    // Start searching from the home directory
    await searchAndCopy(process.env.HOME);
    throw new Error("File not found")
  } catch (err: any) {
    if (err.message.includes("File found")) {
      return err.message.split(": ")[1]
    }
    throw new Error(err.message);
  }

  // Use a recursive function to search for the file
  async function searchAndCopy(currentDir: string | undefined): Promise<void> {
    const relativePath = currentDir?.replace(`${process.env.HOME}/`, "")
    if (!currentDir || relativePath?.startsWith("."))
      return
    const files = await readdir(currentDir);

    for (const file of files) {
      const filePath = join(currentDir, file);
      const isDirectory = (await stat(filePath)).isDirectory();

      if (isDirectory) {
        await searchAndCopy(filePath);
      } else if (file === originalFileName) {
        let uniqueFilename = ""
        if (fileExist(destinationDirectory, productImageName)) {
          // get the file extension
          const [filename, extension] = productImageName.split(".")
          uniqueFilename = `${filename}(1)${extension ? `.${extension}` : ""}`
        }

        const uniqueImageName = uniqueFilename || productImageName

        // Copy the file to the specified directory
        const destinationFilePath = join(destinationDirectory, productImageName);
        await copy(filePath, destinationFilePath);
        throw new Error("File found: " + productImageName)
      }
    }
  }

  function fileExist(folderPath: string, fileName: string): boolean {
    try {
      const filesInFolder = readdirSync(folderPath);
      return filesInFolder.includes(fileName);
    } catch (err: any) {
      console.error('Error:', err.message);
      return false;
    }
  }
}
