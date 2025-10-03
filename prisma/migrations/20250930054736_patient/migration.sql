/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Patient` table. All the data in the column will be lost.
  - You are about to drop the column `doctorId` on the `Patient` table. All the data in the column will be lost.
  - You are about to drop the `Appointment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Doctor` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Patient" DROP CONSTRAINT "Patient_doctorId_fkey";

-- AlterTable
ALTER TABLE "public"."Patient" DROP COLUMN "createdAt",
DROP COLUMN "doctorId";

-- DropTable
DROP TABLE "public"."Appointment";

-- DropTable
DROP TABLE "public"."Doctor";

-- DropTable
DROP TABLE "public"."User";
