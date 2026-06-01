-- CreateEnum
CREATE TYPE "Class" AS ENUM ('EKONOMI', 'BISNIS', 'EKSEKUTIF');

-- CreateTable
CREATE TABLE "Train" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Train_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Carriage" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "class" "Class" NOT NULL,
    "price" INTEGER NOT NULL,
    "capacity" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "trainId" INTEGER NOT NULL,

    CONSTRAINT "Carriage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Carriage" ADD CONSTRAINT "Carriage_trainId_fkey" FOREIGN KEY ("trainId") REFERENCES "Train"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
