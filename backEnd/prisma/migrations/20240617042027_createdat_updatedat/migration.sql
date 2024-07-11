/*
  Warnings:

  - Added the required column `updatedAt` to the `todolist` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `todolist` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL,
    MODIFY `status` BOOLEAN NOT NULL DEFAULT false;
