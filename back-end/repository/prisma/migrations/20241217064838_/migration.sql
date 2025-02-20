/*
  Warnings:

  - You are about to drop the column `userId` on the `Character` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[characterId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Character" DROP CONSTRAINT "Character_userId_fkey";

-- DropIndex
DROP INDEX "Character_userId_key";

-- AlterTable
ALTER TABLE "Character" DROP COLUMN "userId";

-- CreateIndex
CREATE UNIQUE INDEX "User_characterId_key" ON "User"("characterId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE SET NULL ON UPDATE CASCADE;
