/*
  Warnings:

  - You are about to drop the `_TicketToTransaction` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `ticketAmount` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_TicketToTransaction" DROP CONSTRAINT "_TicketToTransaction_A_fkey";

-- DropForeignKey
ALTER TABLE "_TicketToTransaction" DROP CONSTRAINT "_TicketToTransaction_B_fkey";

-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "ticketAmount" INTEGER NOT NULL,
ADD COLUMN     "ticketId" INTEGER;

-- DropTable
DROP TABLE "_TicketToTransaction";

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "Ticket"("id") ON DELETE SET NULL ON UPDATE CASCADE;
