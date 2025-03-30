/*
  Warnings:

  - You are about to drop the column `transactionTypeId` on the `categories` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[description]` on the table `categories` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `transactionTypeId` to the `transactions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "categories" DROP CONSTRAINT "categories_transactionTypeId_fkey";

-- DropIndex
DROP INDEX "categories_description_transactionTypeId_key";

-- AlterTable
ALTER TABLE "categories" DROP COLUMN "transactionTypeId";

-- AlterTable
ALTER TABLE "transactions" ADD COLUMN     "transactionTypeId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "categories_description_key" ON "categories"("description");

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_transactionTypeId_fkey" FOREIGN KEY ("transactionTypeId") REFERENCES "transaction_types"("id") ON DELETE CASCADE ON UPDATE CASCADE;
