-- DropForeignKey
ALTER TABLE "Carriage" DROP CONSTRAINT "Carriage_trainId_fkey";

-- AlterTable
ALTER TABLE "Carriage" ALTER COLUMN "trainId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Carriage" ADD CONSTRAINT "Carriage_trainId_fkey" FOREIGN KEY ("trainId") REFERENCES "Train"("id") ON DELETE SET NULL ON UPDATE CASCADE;
