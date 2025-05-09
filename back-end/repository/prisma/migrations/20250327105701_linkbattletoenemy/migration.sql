/*
  Warnings:

  - You are about to drop the column `enemies` on the `Battle` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Battle" DROP COLUMN "enemies";

-- CreateTable
CREATE TABLE "_BattleEnemies" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_BattleEnemies_AB_unique" ON "_BattleEnemies"("A", "B");

-- CreateIndex
CREATE INDEX "_BattleEnemies_B_index" ON "_BattleEnemies"("B");

-- AddForeignKey
ALTER TABLE "_BattleEnemies" ADD CONSTRAINT "_BattleEnemies_A_fkey" FOREIGN KEY ("A") REFERENCES "Battle"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BattleEnemies" ADD CONSTRAINT "_BattleEnemies_B_fkey" FOREIGN KEY ("B") REFERENCES "Enemy"("id") ON DELETE CASCADE ON UPDATE CASCADE;
