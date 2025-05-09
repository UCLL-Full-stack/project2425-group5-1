/*
  Warnings:

  - You are about to drop the column `character` on the `Battle` table. All the data in the column will be lost.
  - Added the required column `characterId` to the `Battle` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Battle" DROP COLUMN "character",
ADD COLUMN     "characterId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Battle" ADD CONSTRAINT "Battle_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
