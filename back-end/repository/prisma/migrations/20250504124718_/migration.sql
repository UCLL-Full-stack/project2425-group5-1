/*
  Warnings:

  - You are about to drop the `Enemy` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_BattleEnemies` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_EnemyToMove` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[characterId]` on the table `Battle` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "_BattleEnemies" DROP CONSTRAINT "_BattleEnemies_A_fkey";

-- DropForeignKey
ALTER TABLE "_BattleEnemies" DROP CONSTRAINT "_BattleEnemies_B_fkey";

-- DropForeignKey
ALTER TABLE "_EnemyToMove" DROP CONSTRAINT "_EnemyToMove_A_fkey";

-- DropForeignKey
ALTER TABLE "_EnemyToMove" DROP CONSTRAINT "_EnemyToMove_B_fkey";

-- DropTable
DROP TABLE "Enemy";

-- DropTable
DROP TABLE "_BattleEnemies";

-- DropTable
DROP TABLE "_EnemyToMove";

-- CreateTable
CREATE TABLE "EnemyType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "level" INTEGER NOT NULL,
    "strength" INTEGER NOT NULL,
    "speed" INTEGER NOT NULL,
    "magic" INTEGER NOT NULL,
    "dexterity" INTEGER NOT NULL,
    "healthPoints" INTEGER NOT NULL,
    "manaPoints" INTEGER NOT NULL,
    "luck" INTEGER NOT NULL,
    "defense" INTEGER NOT NULL,
    "magicDefense" INTEGER NOT NULL,

    CONSTRAINT "EnemyType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_EnemyTypeToMove" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_BattleToEnemyType" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_EnemyTypeToMove_AB_unique" ON "_EnemyTypeToMove"("A", "B");

-- CreateIndex
CREATE INDEX "_EnemyTypeToMove_B_index" ON "_EnemyTypeToMove"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_BattleToEnemyType_AB_unique" ON "_BattleToEnemyType"("A", "B");

-- CreateIndex
CREATE INDEX "_BattleToEnemyType_B_index" ON "_BattleToEnemyType"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Battle_characterId_key" ON "Battle"("characterId");

-- AddForeignKey
ALTER TABLE "_EnemyTypeToMove" ADD CONSTRAINT "_EnemyTypeToMove_A_fkey" FOREIGN KEY ("A") REFERENCES "EnemyType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EnemyTypeToMove" ADD CONSTRAINT "_EnemyTypeToMove_B_fkey" FOREIGN KEY ("B") REFERENCES "Move"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BattleToEnemyType" ADD CONSTRAINT "_BattleToEnemyType_A_fkey" FOREIGN KEY ("A") REFERENCES "Battle"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BattleToEnemyType" ADD CONSTRAINT "_BattleToEnemyType_B_fkey" FOREIGN KEY ("B") REFERENCES "EnemyType"("id") ON DELETE CASCADE ON UPDATE CASCADE;
