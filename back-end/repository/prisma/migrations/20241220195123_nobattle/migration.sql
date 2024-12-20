/*
  Warnings:

  - You are about to drop the `Battle` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_BattleToEnemy` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Battle" DROP CONSTRAINT "Battle_characterId_fkey";

-- DropForeignKey
ALTER TABLE "_BattleToEnemy" DROP CONSTRAINT "_BattleToEnemy_A_fkey";

-- DropForeignKey
ALTER TABLE "_BattleToEnemy" DROP CONSTRAINT "_BattleToEnemy_B_fkey";

-- DropTable
DROP TABLE "Battle";

-- DropTable
DROP TABLE "_BattleToEnemy";
