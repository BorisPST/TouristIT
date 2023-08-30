/*
  Warnings:

  - The values [VRBO] on the enum `Reservation_source` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `reservation` MODIFY `source` ENUM('Vrbo', 'GOOGLE', 'REFERRAL', 'DIRECT_CONTACT', 'OLD_GUEST', 'OTHER') NOT NULL;
