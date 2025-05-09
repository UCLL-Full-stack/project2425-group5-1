/*
  Warnings:

  - The `element` column on the `EnemyType` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "EnemyType" DROP COLUMN "element",
ADD COLUMN     "element" TEXT[];
