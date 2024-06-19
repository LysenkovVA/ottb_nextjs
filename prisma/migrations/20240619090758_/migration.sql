/*
  Warnings:

  - Added the required column `globalRoleId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "globalRoleId" TEXT NOT NULL,
ADD COLUMN     "role" TEXT;

-- CreateTable
CREATE TABLE "GlobalRole" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "GlobalRole_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GlobalRole_name_key" ON "GlobalRole"("name");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_globalRoleId_fkey" FOREIGN KEY ("globalRoleId") REFERENCES "GlobalRole"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
