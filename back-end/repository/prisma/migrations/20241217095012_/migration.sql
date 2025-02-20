-- CreateTable
CREATE TABLE "Move" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "attack" INTEGER NOT NULL,
    "magicAttack" INTEGER NOT NULL,
    "manaPoints" INTEGER NOT NULL,
    "aoe" BOOLEAN NOT NULL,

    CONSTRAINT "Move_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Battle" (
    "id" SERIAL NOT NULL,
    "turn" INTEGER NOT NULL,
    "currentTurn" INTEGER NOT NULL,
    "state" TEXT NOT NULL,

    CONSTRAINT "Battle_pkey" PRIMARY KEY ("id")
);
