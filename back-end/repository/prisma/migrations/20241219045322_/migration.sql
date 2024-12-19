/*
  Warnings:

  - You are about to drop the `Battle` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BattleEnemy` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Enemy` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EnemyMove` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Move` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "BattleEnemy" DROP CONSTRAINT "BattleEnemy_battleId_fkey";

-- DropForeignKey
ALTER TABLE "BattleEnemy" DROP CONSTRAINT "BattleEnemy_enemyId_fkey";

-- DropForeignKey
ALTER TABLE "EnemyMove" DROP CONSTRAINT "EnemyMove_enemyId_fkey";

-- DropForeignKey
ALTER TABLE "EnemyMove" DROP CONSTRAINT "EnemyMove_moveId_fkey";

-- DropTable
DROP TABLE "Battle";

-- DropTable
DROP TABLE "BattleEnemy";

-- DropTable
DROP TABLE "Enemy";

-- DropTable
DROP TABLE "EnemyMove";

-- DropTable
DROP TABLE "Move";
