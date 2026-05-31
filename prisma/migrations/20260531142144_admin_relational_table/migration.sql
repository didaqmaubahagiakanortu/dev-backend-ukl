/*
  Warnings:

  - You are about to drop the column `email` on the `Passenger` table. All the data in the column will be lost.
  - You are about to drop the column `passengerId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Passenger` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_passengerId_fkey";

-- DropIndex
DROP INDEX "User_passengerId_key";

-- DropIndex
DROP INDEX "User_username_key";

-- AlterTable
ALTER TABLE "Passenger" DROP COLUMN "email",
ADD COLUMN     "userId" INTEGER;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "passengerId",
DROP COLUMN "username",
ADD COLUMN     "email" TEXT;

-- CreateTable
CREATE TABLE "Admin" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_userId_key" ON "Admin"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Passenger_userId_key" ON "Passenger"("userId");

-- AddForeignKey
ALTER TABLE "Admin" ADD CONSTRAINT "Admin_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Passenger" ADD CONSTRAINT "Passenger_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
