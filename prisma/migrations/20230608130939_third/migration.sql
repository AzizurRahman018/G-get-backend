/*
  Warnings:

  - A unique constraint covering the columns `[product_id]` on the table `WishListPId` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "WishListPId_wishListId_key";

-- CreateIndex
CREATE UNIQUE INDEX "WishListPId_product_id_key" ON "WishListPId"("product_id");
