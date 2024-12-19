-- CreateTable
CREATE TABLE "EnemyMove" (
    "enemyId" INTEGER NOT NULL,
    "moveId" INTEGER NOT NULL,

    CONSTRAINT "EnemyMove_pkey" PRIMARY KEY ("enemyId","moveId")
);

-- CreateTable
CREATE TABLE "_EnemyMoves" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_EnemyMoves_AB_unique" ON "_EnemyMoves"("A", "B");

-- CreateIndex
CREATE INDEX "_EnemyMoves_B_index" ON "_EnemyMoves"("B");

-- AddForeignKey
ALTER TABLE "EnemyMove" ADD CONSTRAINT "EnemyMove_enemyId_fkey" FOREIGN KEY ("enemyId") REFERENCES "Enemy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EnemyMove" ADD CONSTRAINT "EnemyMove_moveId_fkey" FOREIGN KEY ("moveId") REFERENCES "Move"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EnemyMoves" ADD CONSTRAINT "_EnemyMoves_A_fkey" FOREIGN KEY ("A") REFERENCES "Enemy"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EnemyMoves" ADD CONSTRAINT "_EnemyMoves_B_fkey" FOREIGN KEY ("B") REFERENCES "Move"("id") ON DELETE CASCADE ON UPDATE CASCADE;
