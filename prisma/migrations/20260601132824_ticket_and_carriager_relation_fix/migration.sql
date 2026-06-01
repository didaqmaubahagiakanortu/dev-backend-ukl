-- AlterTable
ALTER TABLE "Ticket" ADD COLUMN     "carriageId" INTEGER;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_carriageId_fkey" FOREIGN KEY ("carriageId") REFERENCES "Carriage"("id") ON DELETE SET NULL ON UPDATE CASCADE;
