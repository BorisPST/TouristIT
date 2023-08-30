/*
  Warnings:

  - The values [HOSPITALITY,HOUSE,POOL,GRILL,OTHER] on the enum `Expense_type` will be removed. If these variants are still used in the database, this will fail.
  - The values [GOOGLE,REFERRAL,DIRECT_CONTACT,OLD_GUEST,OTHER] on the enum `Reservation_source` will be removed. If these variants are still used in the database, this will fail.
  - The values [CASH,BANK_TRANSFER,PARTNER] on the enum `Reservation_paymentType` will be removed. If these variants are still used in the database, this will fail.
  - The values [IN_PROGRESS,BOOKED,CANCELLED] on the enum `Reservation_status` will be removed. If these variants are still used in the database, this will fail.
  - The values [CASH,BANK_TRANSFER,PARTNER] on the enum `Reservation_Assistance_paymentType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `expense` MODIFY `type` ENUM('Hospitality', 'House', 'Pool', 'Grill', 'Other') NOT NULL;

-- AlterTable
ALTER TABLE `reservation` MODIFY `source` ENUM('Vrbo', 'Google', 'Referral', 'Direct Contact', 'Old Guest', 'Other') NOT NULL,
    MODIFY `paymentType` ENUM('Cash', 'Bank Transfer', 'Partner') NOT NULL,
    MODIFY `status` ENUM('In Progress', 'Booked', 'Cancelled') NOT NULL;

-- AlterTable
ALTER TABLE `reservation_assistance` MODIFY `paymentType` ENUM('Cash', 'Bank Transfer', 'Partner') NOT NULL;
