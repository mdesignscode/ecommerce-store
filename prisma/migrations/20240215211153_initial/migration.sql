-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "discountPercentage" INTEGER,
    "stock" INTEGER NOT NULL,
    "priceId" TEXT NOT NULL,
    CONSTRAINT "Product_priceId_fkey" FOREIGN KEY ("priceId") REFERENCES "Price" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Image" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "url" TEXT NOT NULL,
    "productId" TEXT,
    CONSTRAINT "Image_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Price" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "amount" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "shoppingCartId" INTEGER,
    "wishListId" INTEGER,
    "purchaseHistoryId" INTEGER,
    "checkoutId" TEXT,
    CONSTRAINT "User_shoppingCartId_fkey" FOREIGN KEY ("shoppingCartId") REFERENCES "ShoppingCart" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "User_wishListId_fkey" FOREIGN KEY ("wishListId") REFERENCES "WishList" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "User_purchaseHistoryId_fkey" FOREIGN KEY ("purchaseHistoryId") REFERENCES "PurchaseHistory" ("id") ON DELETE CASCADE ON UPDATE CASCADE
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
CREATE TABLE "PurchasedItem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "quantity" INTEGER NOT NULL,
    "productId" TEXT NOT NULL,
    "purchaseHistoryId" INTEGER,
    CONSTRAINT "PurchasedItem_purchaseHistoryId_fkey" FOREIGN KEY ("purchaseHistoryId") REFERENCES "PurchaseHistory" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ProductId" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "productId" TEXT NOT NULL,
    "shoppingCartId" INTEGER,
    "wishListId" INTEGER,
    CONSTRAINT "ProductId_shoppingCartId_fkey" FOREIGN KEY ("shoppingCartId") REFERENCES "ShoppingCart" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "ProductId_wishListId_fkey" FOREIGN KEY ("wishListId") REFERENCES "WishList" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Product_title_key" ON "Product"("title");
