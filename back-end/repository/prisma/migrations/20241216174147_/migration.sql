/*
  Warnings:

  - You are about to drop the column `armorId` on the `Character` table. All the data in the column will be lost.
  - You are about to drop the column `classId` on the `Character` table. All the data in the column will be lost.
  - You are about to drop the column `weaponId` on the `Character` table. All the data in the column will be lost.
  - You are about to drop the `Armor` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Battle` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BattleEnemy` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CharacterItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CharacterMove` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Class` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Consumable` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Enemy` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EnemyItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EnemyMove` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Item` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Move` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Weapon` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Battle" DROP CONSTRAINT "Battle_characterId_fkey";

-- DropForeignKey
ALTER TABLE "BattleEnemy" DROP CONSTRAINT "BattleEnemy_battleId_fkey";

-- DropForeignKey
ALTER TABLE "BattleEnemy" DROP CONSTRAINT "BattleEnemy_enemyId_fkey";

-- DropForeignKey
ALTER TABLE "Character" DROP CONSTRAINT "Character_armorId_fkey";

-- DropForeignKey
ALTER TABLE "Character" DROP CONSTRAINT "Character_classId_fkey";

-- DropForeignKey
ALTER TABLE "Character" DROP CONSTRAINT "Character_weaponId_fkey";

-- DropForeignKey
ALTER TABLE "CharacterItem" DROP CONSTRAINT "CharacterItem_characterId_fkey";

-- DropForeignKey
ALTER TABLE "CharacterItem" DROP CONSTRAINT "CharacterItem_itemId_fkey";

-- DropForeignKey
ALTER TABLE "CharacterMove" DROP CONSTRAINT "CharacterMove_characterId_fkey";

-- DropForeignKey
ALTER TABLE "CharacterMove" DROP CONSTRAINT "CharacterMove_moveId_fkey";

-- DropForeignKey
ALTER TABLE "Class" DROP CONSTRAINT "Class_armorId_fkey";

-- DropForeignKey
ALTER TABLE "Class" DROP CONSTRAINT "Class_weaponId_fkey";

-- DropForeignKey
ALTER TABLE "Consumable" DROP CONSTRAINT "Consumable_itemId_fkey";

-- DropForeignKey
ALTER TABLE "EnemyItem" DROP CONSTRAINT "EnemyItem_enemyId_fkey";

-- DropForeignKey
ALTER TABLE "EnemyItem" DROP CONSTRAINT "EnemyItem_itemId_fkey";

-- DropForeignKey
ALTER TABLE "EnemyMove" DROP CONSTRAINT "EnemyMove_enemyId_fkey";

-- DropForeignKey
ALTER TABLE "EnemyMove" DROP CONSTRAINT "EnemyMove_moveId_fkey";

-- AlterTable
ALTER TABLE "Character" DROP COLUMN "armorId",
DROP COLUMN "classId",
DROP COLUMN "weaponId";

-- DropTable
DROP TABLE "Armor";

-- DropTable
DROP TABLE "Battle";

-- DropTable
DROP TABLE "BattleEnemy";

-- DropTable
DROP TABLE "CharacterItem";

-- DropTable
DROP TABLE "CharacterMove";

-- DropTable
DROP TABLE "Class";

-- DropTable
DROP TABLE "Consumable";

-- DropTable
DROP TABLE "Enemy";

-- DropTable
DROP TABLE "EnemyItem";

-- DropTable
DROP TABLE "EnemyMove";

-- DropTable
DROP TABLE "Item";

-- DropTable
DROP TABLE "Move";

-- DropTable
DROP TABLE "Weapon";
