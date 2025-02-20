-- CreateTable
CREATE TABLE "CharacterMove" (
    "characterId" INTEGER NOT NULL,
    "moveId" INTEGER NOT NULL,

    CONSTRAINT "CharacterMove_pkey" PRIMARY KEY ("characterId","moveId")
);

-- CreateTable
CREATE TABLE "_CharacterMoves" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CharacterMoves_AB_unique" ON "_CharacterMoves"("A", "B");

-- CreateIndex
CREATE INDEX "_CharacterMoves_B_index" ON "_CharacterMoves"("B");

-- AddForeignKey
ALTER TABLE "CharacterMove" ADD CONSTRAINT "CharacterMove_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharacterMove" ADD CONSTRAINT "CharacterMove_moveId_fkey" FOREIGN KEY ("moveId") REFERENCES "Move"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CharacterMoves" ADD CONSTRAINT "_CharacterMoves_A_fkey" FOREIGN KEY ("A") REFERENCES "Character"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CharacterMoves" ADD CONSTRAINT "_CharacterMoves_B_fkey" FOREIGN KEY ("B") REFERENCES "Move"("id") ON DELETE CASCADE ON UPDATE CASCADE;
