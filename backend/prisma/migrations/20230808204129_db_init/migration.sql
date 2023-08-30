-- CreateTable
CREATE TABLE `Assistance` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `provider` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CostCenter` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Expense` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `isSeasonal` BOOLEAN NOT NULL DEFAULT true,
    `type` ENUM('HOSPITALITY', 'HOUSE', 'POOL', 'GRILL', 'OTHER') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MessageTemplate` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `body` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Payment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `reservationId` INTEGER NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `amount` DECIMAL(65, 30) NOT NULL,

    INDEX `Payment_reservationId_fkey`(`reservationId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Property` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(50) NOT NULL,
    `address` VARCHAR(80) NOT NULL,
    `city` VARCHAR(50) NOT NULL,
    `description` VARCHAR(500) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Provision` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(50) NOT NULL,
    `description` VARCHAR(500) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Renter` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
    `propertyId` INTEGER NOT NULL,
    `oib` VARCHAR(11) NOT NULL,
    `iban` VARCHAR(35) NOT NULL,
    `address` VARCHAR(80) NOT NULL,
    `city` VARCHAR(50) NOT NULL,

    INDEX `Renter_propertyId_fkey`(`propertyId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Reservation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `renterId` INTEGER NOT NULL,
    `startDate` DATE NOT NULL,
    `endDate` DATE NOT NULL,
    `source` ENUM('VRBO', 'GOOGLE', 'REFERRAL', 'DIRECT_CONTACT', 'OLD_GUEST', 'OTHER') NOT NULL,
    `amount` DECIMAL(65, 30) NOT NULL,
    `bookingDate` DATE NOT NULL,
    `description` VARCHAR(500) NOT NULL,
    `guestEmail` VARCHAR(80) NOT NULL,
    `guestName` VARCHAR(50) NOT NULL,
    `guestPhone` VARCHAR(20) NOT NULL,
    `paymentType` ENUM('CASH', 'BANK_TRANSFER', 'PARTNER') NOT NULL,
    `persons` VARCHAR(5) NOT NULL,
    `propertyId` INTEGER NOT NULL,
    `status` ENUM('IN_PROGRESS', 'BOOKED', 'CANCELLED') NOT NULL,
    `vrboReservationId` VARCHAR(30) NULL,

    UNIQUE INDEX `Reservation_vrboReservationId_key`(`vrboReservationId`),
    INDEX `Reservation_propertyId_fkey`(`propertyId`),
    INDEX `Reservation_renterId_fkey`(`renterId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Reservation_Assistance` (
    `reservationId` INTEGER NOT NULL,
    `assistanceId` INTEGER NOT NULL,
    `startDate` DATE NOT NULL,
    `endDate` DATE NOT NULL,
    `price` DECIMAL(65, 30) NOT NULL,
    `amountPaid` DECIMAL(65, 30) NULL,
    `paymentType` ENUM('CASH', 'BANK_TRANSFER', 'PARTNER') NOT NULL,
    `notes` VARCHAR(2000) NOT NULL,

    INDEX `Reservation_Assistance_assistanceId_fkey`(`assistanceId`),
    PRIMARY KEY (`reservationId`, `assistanceId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Reservation_Provision` (
    `reservationId` INTEGER NOT NULL,
    `provisionId` INTEGER NOT NULL,

    INDEX `Reservation_Provision_provisionId_fkey`(`provisionId`),
    PRIMARY KEY (`reservationId`, `provisionId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Reservation_Utility` (
    `reservationId` INTEGER NOT NULL,
    `utilityId` INTEGER NOT NULL,
    `startValue` DECIMAL(65, 30) NOT NULL,
    `endValue` DECIMAL(65, 30) NOT NULL,

    INDEX `Reservation_Utility_utilityId_fkey`(`utilityId`),
    PRIMARY KEY (`reservationId`, `utilityId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Utility` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `unitPrice` DECIMAL(65, 30) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Payment` ADD CONSTRAINT `Payment_reservationId_fkey` FOREIGN KEY (`reservationId`) REFERENCES `Reservation`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Renter` ADD CONSTRAINT `Renter_propertyId_fkey` FOREIGN KEY (`propertyId`) REFERENCES `Property`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reservation` ADD CONSTRAINT `Reservation_propertyId_fkey` FOREIGN KEY (`propertyId`) REFERENCES `Property`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reservation` ADD CONSTRAINT `Reservation_renterId_fkey` FOREIGN KEY (`renterId`) REFERENCES `Renter`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reservation_Assistance` ADD CONSTRAINT `Reservation_Assistance_assistanceId_fkey` FOREIGN KEY (`assistanceId`) REFERENCES `Assistance`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reservation_Assistance` ADD CONSTRAINT `Reservation_Assistance_reservationId_fkey` FOREIGN KEY (`reservationId`) REFERENCES `Reservation`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reservation_Provision` ADD CONSTRAINT `Reservation_Provision_provisionId_fkey` FOREIGN KEY (`provisionId`) REFERENCES `Provision`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reservation_Provision` ADD CONSTRAINT `Reservation_Provision_reservationId_fkey` FOREIGN KEY (`reservationId`) REFERENCES `Reservation`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reservation_Utility` ADD CONSTRAINT `Reservation_Utility_reservationId_fkey` FOREIGN KEY (`reservationId`) REFERENCES `Reservation`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reservation_Utility` ADD CONSTRAINT `Reservation_Utility_utilityId_fkey` FOREIGN KEY (`utilityId`) REFERENCES `Utility`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
