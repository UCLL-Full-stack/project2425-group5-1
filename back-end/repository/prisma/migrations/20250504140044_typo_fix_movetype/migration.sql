/*
  Warnings:

  - You are about to drop the column `EnemyType` on the `Move` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Move" DROP COLUMN "EnemyType",
ADD COLUMN     "type" TEXT;
