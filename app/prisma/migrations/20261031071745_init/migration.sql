-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "fullname" VARCHAR(20) NOT NULL,
    "Email" VARCHAR(30) NOT NULL,
    "password" VARCHAR(30) NOT NULL,
    "IsAdmin" BOOLEAN NOT NULL DEFAULT false,
    "Address" VARCHAR(30) NOT NULL,
    "PhoneNo" VARCHAR(10) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_Email_key" ON "User"("Email");
