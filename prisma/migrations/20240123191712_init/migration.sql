-- CreateTable
CREATE TABLE "Product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "discountPercentage" INTEGER,
    "stock" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Image" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "url" TEXT NOT NULL,
    "productId" INTEGER,
    CONSTRAINT "Image_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "shoppingCartId" INTEGER,
    "wishListId" INTEGER,
    "purchaseHistoryId" INTEGER,
    CONSTRAINT "User_shoppingCartId_fkey" FOREIGN KEY ("shoppingCartId") REFERENCES "ShoppingCart" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "User_wishListId_fkey" FOREIGN KEY ("wishListId") REFERENCES "WishList" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "User_purchaseHistoryId_fkey" FOREIGN KEY ("purchaseHistoryId") REFERENCES "PurchaseHistory" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ShoppingCart" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT
);

-- CreateTable
CREATE TABLE "WishList" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT
);

-- CreateTable
CREATE TABLE "PurchaseHistory" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT
);

-- CreateTable
CREATE TABLE "ProductId" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "productId" INTEGER NOT NULL,
    "shoppingCartId" INTEGER,
    "wishListId" INTEGER,
    "purchaseHistoryId" INTEGER,
    CONSTRAINT "ProductId_shoppingCartId_fkey" FOREIGN KEY ("shoppingCartId") REFERENCES "ShoppingCart" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "ProductId_wishListId_fkey" FOREIGN KEY ("wishListId") REFERENCES "WishList" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "ProductId_purchaseHistoryId_fkey" FOREIGN KEY ("purchaseHistoryId") REFERENCES "PurchaseHistory" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
