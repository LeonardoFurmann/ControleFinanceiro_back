/*
  Warnings:

  - A unique constraint covering the columns `[userId,description]` on the table `categories` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "categories_description_key";

-- CreateIndex
CREATE UNIQUE INDEX "categories_userId_description_key" ON "categories"("userId", "description");
