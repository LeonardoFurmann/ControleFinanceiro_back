/*
  Warnings:

  - A unique constraint covering the columns `[description,transactionTypeId]` on the table `categories` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "categories_description_transactionTypeId_key" ON "categories"("description", "transactionTypeId");
