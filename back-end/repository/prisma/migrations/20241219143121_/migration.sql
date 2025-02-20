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
CREATE TABLE "Enemy" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "level" INTEGER NOT NULL,
    "strength" INTEGER NOT NULL,
    "speed" INTEGER NOT NULL,
    "magic" INTEGER NOT NULL,
    "dexterity" INTEGER NOT NULL,
    "healthPoints" INTEGER NOT NULL,
    "manaPoints" INTEGER NOT NULL,
    "luck" INTEGER NOT NULL,
    "defense" INTEGER NOT NULL,
    "magicDefense" INTEGER NOT NULL,

    CONSTRAINT "Enemy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CharacterToMove" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_BattleToEnemy" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_EnemyToMove" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CharacterToMove_AB_unique" ON "_CharacterToMove"("A", "B");

-- CreateIndex
CREATE INDEX "_CharacterToMove_B_index" ON "_CharacterToMove"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_BattleToEnemy_AB_unique" ON "_BattleToEnemy"("A", "B");

-- CreateIndex
CREATE INDEX "_BattleToEnemy_B_index" ON "_BattleToEnemy"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_EnemyToMove_AB_unique" ON "_EnemyToMove"("A", "B");

-- CreateIndex
CREATE INDEX "_EnemyToMove_B_index" ON "_EnemyToMove"("B");

-- AddForeignKey
ALTER TABLE "_CharacterToMove" ADD CONSTRAINT "_CharacterToMove_A_fkey" FOREIGN KEY ("A") REFERENCES "Character"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CharacterToMove" ADD CONSTRAINT "_CharacterToMove_B_fkey" FOREIGN KEY ("B") REFERENCES "Move"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BattleToEnemy" ADD CONSTRAINT "_BattleToEnemy_A_fkey" FOREIGN KEY ("A") REFERENCES "Battle"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BattleToEnemy" ADD CONSTRAINT "_BattleToEnemy_B_fkey" FOREIGN KEY ("B") REFERENCES "Enemy"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EnemyToMove" ADD CONSTRAINT "_EnemyToMove_A_fkey" FOREIGN KEY ("A") REFERENCES "Enemy"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EnemyToMove" ADD CONSTRAINT "_EnemyToMove_B_fkey" FOREIGN KEY ("B") REFERENCES "Move"("id") ON DELETE CASCADE ON UPDATE CASCADE;
