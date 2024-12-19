/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Character` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Character" ADD COLUMN     "userId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Character_userId_key" ON "Character"("userId");
