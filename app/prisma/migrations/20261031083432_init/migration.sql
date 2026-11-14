/*
  Warnings:

  - You are about to drop the column `Address` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `Email` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `IsAdmin` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `PhoneNo` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `isdeleted` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_Email_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "Address",
DROP COLUMN "Email",
DROP COLUMN "IsAdmin",
DROP COLUMN "PhoneNo",
DROP COLUMN "isdeleted",
ADD COLUMN     "address" VARCHAR(255),
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "email" VARCHAR(255) NOT NULL,
ADD COLUMN     "isAdmin" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "phoneNo" VARCHAR(15),
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "fullname" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "password" SET DATA TYPE VARCHAR(255);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
