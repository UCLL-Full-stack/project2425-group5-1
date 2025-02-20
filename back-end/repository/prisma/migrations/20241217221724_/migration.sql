-- CreateTable
CREATE TABLE "BattleEnemy" (
    "battleId" INTEGER NOT NULL,
    "enemyId" INTEGER NOT NULL,

    CONSTRAINT "BattleEnemy_pkey" PRIMARY KEY ("battleId","enemyId")
);

-- CreateTable
CREATE TABLE "_BattleEnemy" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_BattleEnemy_AB_unique" ON "_BattleEnemy"("A", "B");

-- CreateIndex
CREATE INDEX "_BattleEnemy_B_index" ON "_BattleEnemy"("B");

-- AddForeignKey
ALTER TABLE "BattleEnemy" ADD CONSTRAINT "BattleEnemy_battleId_fkey" FOREIGN KEY ("battleId") REFERENCES "Battle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BattleEnemy" ADD CONSTRAINT "BattleEnemy_enemyId_fkey" FOREIGN KEY ("enemyId") REFERENCES "Enemy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BattleEnemy" ADD CONSTRAINT "_BattleEnemy_A_fkey" FOREIGN KEY ("A") REFERENCES "Battle"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BattleEnemy" ADD CONSTRAINT "_BattleEnemy_B_fkey" FOREIGN KEY ("B") REFERENCES "Enemy"("id") ON DELETE CASCADE ON UPDATE CASCADE;
