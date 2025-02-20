-- CreateTable
CREATE TABLE "Battle" (
    "id" SERIAL NOT NULL,
    "turnCount" INTEGER NOT NULL,
    "currentTurn" TEXT NOT NULL,
    "enemies" TEXT[],
    "character" TEXT NOT NULL,
    "reward" TEXT NOT NULL,

    CONSTRAINT "Battle_pkey" PRIMARY KEY ("id")
);
