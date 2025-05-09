/*
  Warnings:

  - Added the required column `isBoss` to the `Enemy` table without a default value. This is not possible if the table is not empty.
  - Added the required column `world` to the `Enemy` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Enemy" ADD COLUMN     "isBoss" BOOLEAN NOT NULL,
ADD COLUMN     "world" INTEGER NOT NULL;
