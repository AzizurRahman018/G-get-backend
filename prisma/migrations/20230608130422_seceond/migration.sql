/*
  Warnings:

  - A unique constraint covering the columns `[wishListId]` on the table `WishListPId` will be added. If there are existing duplicate values, this will fail.
  - Made the column `wishListId` on table `WishListPId` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "WishListPId" DROP CONSTRAINT "WishListPId_wishListId_fkey";

-- DropIndex
DROP INDEX "WishListPId_product_id_key";

-- AlterTable
ALTER TABLE "WishListPId" ALTER COLUMN "wishListId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "WishListPId_wishListId_key" ON "WishListPId"("wishListId");

-- AddForeignKey
ALTER TABLE "WishListPId" ADD CONSTRAINT "WishListPId_wishListId_fkey" FOREIGN KEY ("wishListId") REFERENCES "WishList"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
