-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_characterId_fkey";

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
