/*
  Warnings:

  - You are about to drop the `_BattleEnemy` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CharacterMoves` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_EnemyMoves` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_BattleEnemy" DROP CONSTRAINT "_BattleEnemy_A_fkey";

-- DropForeignKey
ALTER TABLE "_BattleEnemy" DROP CONSTRAINT "_BattleEnemy_B_fkey";

-- DropForeignKey
ALTER TABLE "_CharacterMoves" DROP CONSTRAINT "_CharacterMoves_A_fkey";

-- DropForeignKey
ALTER TABLE "_CharacterMoves" DROP CONSTRAINT "_CharacterMoves_B_fkey";

-- DropForeignKey
ALTER TABLE "_EnemyMoves" DROP CONSTRAINT "_EnemyMoves_A_fkey";

-- DropForeignKey
ALTER TABLE "_EnemyMoves" DROP CONSTRAINT "_EnemyMoves_B_fkey";

-- DropTable
DROP TABLE "_BattleEnemy";

-- DropTable
DROP TABLE "_CharacterMoves";

-- DropTable
DROP TABLE "_EnemyMoves";
