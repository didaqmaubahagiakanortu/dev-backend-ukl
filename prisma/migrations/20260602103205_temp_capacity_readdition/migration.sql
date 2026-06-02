/*
  Warnings:

  - Added the required column `capacity` to the `Carriage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Carriage" ADD COLUMN     "capacity" INTEGER NOT NULL;
