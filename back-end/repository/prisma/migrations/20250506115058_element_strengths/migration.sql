/*
  Warnings:

  - You are about to drop the `_ElementWeaknesses` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ElementWeaknesses" DROP CONSTRAINT "_ElementWeaknesses_A_fkey";

-- DropForeignKey
ALTER TABLE "_ElementWeaknesses" DROP CONSTRAINT "_ElementWeaknesses_B_fkey";

-- DropTable
DROP TABLE "_ElementWeaknesses";
