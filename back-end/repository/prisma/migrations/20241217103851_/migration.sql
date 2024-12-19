/*
  Warnings:

  - You are about to drop the column `userId` on the `Character` table. All the data in the column will be lost.
  - Made the column `characterId` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Character" DROP CONSTRAINT "Character_userId_fkey";

-- DropIndex
DROP INDEX "Character_userId_key";

-- AlterTable
ALTER TABLE "Character" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "characterId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
