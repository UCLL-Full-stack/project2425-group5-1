-- AlterTable
ALTER TABLE "Move" ADD COLUMN     "EnemyType" TEXT,
ADD COLUMN     "cooldown" INTEGER,
ADD COLUMN     "statusEffect" TEXT,
ALTER COLUMN "attack" SET DEFAULT 0,
ALTER COLUMN "magicAttack" SET DEFAULT 0,
ALTER COLUMN "manaPoints" SET DEFAULT 0;
