/*
  Warnings:

  - You are about to drop the column `characterClassId` on the `Character` table. All the data in the column will be lost.
  - You are about to drop the `CharacterClass` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Character" DROP CONSTRAINT "Character_characterClassId_fkey";

-- AlterTable
ALTER TABLE "Character" DROP COLUMN "characterClassId";

-- DropTable
DROP TABLE "CharacterClass";
