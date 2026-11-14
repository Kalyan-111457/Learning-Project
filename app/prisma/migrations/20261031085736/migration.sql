/*
  Warnings:

  - You are about to drop the column `address` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `isAdmin` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `isDeleted` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `phoneNo` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[Email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `Address` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Email` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `PhoneNo` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_email_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "address",
DROP COLUMN "email",
DROP COLUMN "isAdmin",
DROP COLUMN "isDeleted",
DROP COLUMN "phoneNo",
ADD COLUMN     "Address" VARCHAR(255) NOT NULL,
ADD COLUMN     "Email" VARCHAR(255) NOT NULL,
ADD COLUMN     "IsAdmin" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "PhoneNo" VARCHAR(15) NOT NULL,
ADD COLUMN     "isdeleted" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX "User_Email_key" ON "User"("Email");
