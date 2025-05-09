/*
  Warnings:

  - Added the required column `element` to the `EnemyType` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "EnemyType" ADD COLUMN     "element" TEXT NOT NULL;
