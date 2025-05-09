/*
  Warnings:

  - You are about to drop the column `type` on the `Move` table. All the data in the column will be lost.
  - You are about to drop the `EnemyType` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_BattleToEnemyType` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_EnemyTypeToMove` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_BattleToEnemyType" DROP CONSTRAINT "_BattleToEnemyType_A_fkey";

-- DropForeignKey
ALTER TABLE "_BattleToEnemyType" DROP CONSTRAINT "_BattleToEnemyType_B_fkey";

-- DropForeignKey
ALTER TABLE "_EnemyTypeToMove" DROP CONSTRAINT "_EnemyTypeToMove_A_fkey";

-- DropForeignKey
ALTER TABLE "_EnemyTypeToMove" DROP CONSTRAINT "_EnemyTypeToMove_B_fkey";

-- AlterTable
ALTER TABLE "Move" DROP COLUMN "type";

-- DropTable
DROP TABLE "EnemyType";

-- DropTable
DROP TABLE "_BattleToEnemyType";

-- DropTable
DROP TABLE "_EnemyTypeToMove";

-- CreateTable
CREATE TABLE "Element" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Element_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Enemy" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "strength" INTEGER NOT NULL,
    "speed" INTEGER NOT NULL,
    "magic" INTEGER NOT NULL,
    "dexterity" INTEGER NOT NULL,
    "healthPoints" INTEGER NOT NULL,
    "manaPoints" INTEGER NOT NULL,
    "luck" INTEGER NOT NULL,
    "defense" INTEGER NOT NULL,
    "magicDefense" INTEGER NOT NULL,

    CONSTRAINT "Enemy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_EnemyElement" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_MoveElement" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ElementStrengths" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ElementWeaknesses" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_EnemyToMove" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_BattleToEnemy" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Element_name_key" ON "Element"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_EnemyElement_AB_unique" ON "_EnemyElement"("A", "B");

-- CreateIndex
CREATE INDEX "_EnemyElement_B_index" ON "_EnemyElement"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_MoveElement_AB_unique" ON "_MoveElement"("A", "B");

-- CreateIndex
CREATE INDEX "_MoveElement_B_index" ON "_MoveElement"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ElementStrengths_AB_unique" ON "_ElementStrengths"("A", "B");

-- CreateIndex
CREATE INDEX "_ElementStrengths_B_index" ON "_ElementStrengths"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ElementWeaknesses_AB_unique" ON "_ElementWeaknesses"("A", "B");

-- CreateIndex
CREATE INDEX "_ElementWeaknesses_B_index" ON "_ElementWeaknesses"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_EnemyToMove_AB_unique" ON "_EnemyToMove"("A", "B");

-- CreateIndex
CREATE INDEX "_EnemyToMove_B_index" ON "_EnemyToMove"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_BattleToEnemy_AB_unique" ON "_BattleToEnemy"("A", "B");

-- CreateIndex
CREATE INDEX "_BattleToEnemy_B_index" ON "_BattleToEnemy"("B");

-- AddForeignKey
ALTER TABLE "_EnemyElement" ADD CONSTRAINT "_EnemyElement_A_fkey" FOREIGN KEY ("A") REFERENCES "Element"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EnemyElement" ADD CONSTRAINT "_EnemyElement_B_fkey" FOREIGN KEY ("B") REFERENCES "Enemy"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MoveElement" ADD CONSTRAINT "_MoveElement_A_fkey" FOREIGN KEY ("A") REFERENCES "Element"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MoveElement" ADD CONSTRAINT "_MoveElement_B_fkey" FOREIGN KEY ("B") REFERENCES "Move"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ElementStrengths" ADD CONSTRAINT "_ElementStrengths_A_fkey" FOREIGN KEY ("A") REFERENCES "Element"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ElementStrengths" ADD CONSTRAINT "_ElementStrengths_B_fkey" FOREIGN KEY ("B") REFERENCES "Element"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ElementWeaknesses" ADD CONSTRAINT "_ElementWeaknesses_A_fkey" FOREIGN KEY ("A") REFERENCES "Element"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ElementWeaknesses" ADD CONSTRAINT "_ElementWeaknesses_B_fkey" FOREIGN KEY ("B") REFERENCES "Element"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EnemyToMove" ADD CONSTRAINT "_EnemyToMove_A_fkey" FOREIGN KEY ("A") REFERENCES "Enemy"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EnemyToMove" ADD CONSTRAINT "_EnemyToMove_B_fkey" FOREIGN KEY ("B") REFERENCES "Move"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BattleToEnemy" ADD CONSTRAINT "_BattleToEnemy_A_fkey" FOREIGN KEY ("A") REFERENCES "Battle"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BattleToEnemy" ADD CONSTRAINT "_BattleToEnemy_B_fkey" FOREIGN KEY ("B") REFERENCES "Enemy"("id") ON DELETE CASCADE ON UPDATE CASCADE;
