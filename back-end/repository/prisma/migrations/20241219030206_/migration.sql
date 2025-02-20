/*
  Warnings:

  - You are about to drop the column `characterId` on the `Battle` table. All the data in the column will be lost.
  - You are about to drop the `CharacterMove` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Battle" DROP CONSTRAINT "Battle_characterId_fkey";

-- DropForeignKey
ALTER TABLE "CharacterMove" DROP CONSTRAINT "CharacterMove_characterId_fkey";

-- DropForeignKey
ALTER TABLE "CharacterMove" DROP CONSTRAINT "CharacterMove_moveId_fkey";

-- AlterTable
ALTER TABLE "Battle" DROP COLUMN "characterId";

-- DropTable
DROP TABLE "CharacterMove";
