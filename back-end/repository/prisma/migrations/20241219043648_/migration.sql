/*
  Warnings:

  - Added the required column `characterClass` to the `Character` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Character" ADD COLUMN     "characterClass" TEXT NOT NULL;
