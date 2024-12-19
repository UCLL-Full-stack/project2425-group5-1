/*
  Warnings:

  - A unique constraint covering the columns `[characterId]` on the table `Battle` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `characterId` to the `Battle` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Battle" ADD COLUMN     "characterId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Battle_characterId_key" ON "Battle"("characterId");

-- AddForeignKey
ALTER TABLE "Battle" ADD CONSTRAINT "Battle_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
