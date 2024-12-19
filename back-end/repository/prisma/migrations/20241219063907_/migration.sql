-- CreateTable
CREATE TABLE "Battle" (
    "id" SERIAL NOT NULL,
    "turn" INTEGER NOT NULL,
    "currentTurn" INTEGER NOT NULL,
    "state" TEXT NOT NULL,
    "characterId" INTEGER NOT NULL,

    CONSTRAINT "Battle_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Battle" ADD CONSTRAINT "Battle_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
