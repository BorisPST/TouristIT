/*
  Warnings:

  - The values [Hospitality,House,Pool,Grill,Other] on the enum `Expense_type` will be removed. If these variants are still used in the database, this will fail.
  - The values [Vrbo,Google,Referral,Direct Contact,Old Guest,Other] on the enum `Reservation_source` will be removed. If these variants are still used in the database, this will fail.
  - The values [Cash,Bank Transfer,Partner] on the enum `Reservation_paymentType` will be removed. If these variants are still used in the database, this will fail.
  - The values [In Progress,Booked,Cancelled] on the enum `Reservation_status` will be removed. If these variants are still used in the database, this will fail.
  - The values [Cash,Bank Transfer,Partner] on the enum `Reservation_Assistance_paymentType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `expense` MODIFY `type` ENUM('HOSPITALITY', 'HOUSE', 'POOL', 'GRILL', 'OTHER') NOT NULL;

-- AlterTable
ALTER TABLE `reservation` MODIFY `source` ENUM('VRBO', 'GOOGLE', 'REFERRAL', 'DIRECT_CONTACT', 'OLD_GUEST', 'OTHER') NOT NULL,
    MODIFY `paymentType` ENUM('CASH', 'BANK_TRANSFER', 'PARTNER') NOT NULL,
    MODIFY `status` ENUM('IN_PROGRESS', 'BOOKED', 'CANCELLED') NOT NULL;

-- AlterTable
ALTER TABLE `reservation_assistance` MODIFY `paymentType` ENUM('CASH', 'BANK_TRANSFER', 'PARTNER') NOT NULL;
