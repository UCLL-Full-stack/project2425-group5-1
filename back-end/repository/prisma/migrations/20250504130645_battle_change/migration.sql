/*
  Warnings:

  - You are about to drop the column `level` on the `EnemyType` table. All the data in the column will be lost.
  - Changed the type of `reward` on the `Battle` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `progress` on the `Character` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Battle" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
DROP COLUMN "reward",
ADD COLUMN     "reward" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "Character" DROP COLUMN "progress",
ADD COLUMN     "progress" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "EnemyType" DROP COLUMN "level";
