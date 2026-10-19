-- ========================================================
-- PRODUCTION DATABASE SCHEMA & INITIAL SEED DATA
-- Target Database: labh_ac_service
-- Compatible with MySQL 5.7, 8.0, 8.4, MariaDB
-- ========================================================

SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS `reminders`;
DROP TABLE IF EXISTS `notifications`;
DROP TABLE IF EXISTS `booking_notes`;
DROP TABLE IF EXISTS `booking_status_histories`;
DROP TABLE IF EXISTS `bookings`;
DROP TABLE IF EXISTS `customer_addresses`;
DROP TABLE IF EXISTS `customers`;
DROP TABLE IF EXISTS `technicians`;
DROP TABLE IF EXISTS `services`;
DROP TABLE IF EXISTS `business_settings`;
DROP TABLE IF EXISTS `users`;

SET FOREIGN_KEY_CHECKS = 1;

-- 1. Users Table
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `passwordHash` VARCHAR(255) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `role` VARCHAR(50) NOT NULL DEFAULT 'ADMIN',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 2. Customers Table
CREATE TABLE `customers` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(30) NOT NULL,
    `email` VARCHAR(191) NULL,
    `notes` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
    INDEX `customers_phone_idx`(`phone`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 3. Customer Addresses Table
CREATE TABLE `customer_addresses` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `customerId` INTEGER NOT NULL,
    `addressLine` TEXT NOT NULL,
    `landmark` VARCHAR(255) NULL,
    `city` VARCHAR(100) NOT NULL DEFAULT 'Ahmedabad',
    `pincode` VARCHAR(20) NULL,
    `isDefault` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
    INDEX `customer_addresses_customerId_idx`(`customerId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 4. Technicians Table
CREATE TABLE `technicians` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(30) NOT NULL,
    `email` VARCHAR(191) NULL,
    `skills` VARCHAR(255) NULL,
    `status` VARCHAR(50) NOT NULL DEFAULT 'ACTIVE',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 5. Services Table
CREATE TABLE `services` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `slug` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `shortDescription` TEXT NOT NULL,
    `fullDescription` TEXT NULL,
    `features` TEXT NULL,
    `faqs` TEXT NULL,
    `startingPrice` DECIMAL(10, 2) NULL,
    `estimatedDuration` VARCHAR(100) NULL,
    `imageUrl` VARCHAR(500) NULL,
    `icon` VARCHAR(100) NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `sortOrder` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
    UNIQUE INDEX `services_slug_key`(`slug`),
    INDEX `services_slug_idx`(`slug`),
    INDEX `services_isActive_idx`(`isActive`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 6. Bookings Table
CREATE TABLE `bookings` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `bookingRef` VARCHAR(50) NOT NULL,
    `customerId` INTEGER NOT NULL,
    `customerAddressId` INTEGER NULL,
    `serviceId` INTEGER NOT NULL,
    `technicianId` INTEGER NULL,
    `acType` VARCHAR(50) NULL,
    `unitCount` INTEGER NOT NULL DEFAULT 1,
    `serviceAddress` TEXT NOT NULL,
    `preferredDate` DATE NOT NULL,
    `preferredTimeSlot` VARCHAR(100) NOT NULL,
    `problemDescription` TEXT NULL,
    `status` VARCHAR(50) NOT NULL DEFAULT 'PENDING',
    `totalAmount` DECIMAL(10, 2) NULL,
    `cancellationReason` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
    UNIQUE INDEX `bookings_bookingRef_key`(`bookingRef`),
    INDEX `bookings_bookingRef_idx`(`bookingRef`),
    INDEX `bookings_customerId_idx`(`customerId`),
    INDEX `bookings_serviceId_idx`(`serviceId`),
    INDEX `bookings_technicianId_idx`(`technicianId`),
    INDEX `bookings_status_idx`(`status`),
    INDEX `bookings_preferredDate_idx`(`preferredDate`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 7. Booking Status Histories Table
CREATE TABLE `booking_status_histories` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `bookingId` INTEGER NOT NULL,
    `oldStatus` VARCHAR(50) NULL,
    `newStatus` VARCHAR(50) NOT NULL,
    `changedByUserId` INTEGER NULL,
    `changedByName` VARCHAR(191) NOT NULL DEFAULT 'System',
    `reason` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    INDEX `booking_status_histories_bookingId_idx`(`bookingId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 8. Booking Notes Table
CREATE TABLE `booking_notes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `bookingId` INTEGER NOT NULL,
    `note` TEXT NOT NULL,
    `authorId` INTEGER NULL,
    `authorName` VARCHAR(191) NOT NULL DEFAULT 'Admin',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    INDEX `booking_notes_bookingId_idx`(`bookingId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 9. Notifications Table
CREATE TABLE `notifications` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `bookingId` INTEGER NULL,
    `recipientPhone` VARCHAR(30) NOT NULL,
    `recipientType` VARCHAR(50) NOT NULL,
    `channel` VARCHAR(50) NOT NULL DEFAULT 'WHATSAPP',
    `templateName` VARCHAR(100) NULL,
    `messageContent` TEXT NOT NULL,
    `status` VARCHAR(50) NOT NULL DEFAULT 'PENDING',
    `whatsappMessageId` VARCHAR(191) NULL,
    `errorMessage` TEXT NULL,
    `sentAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    INDEX `notifications_bookingId_idx`(`bookingId`),
    INDEX `notifications_recipientPhone_idx`(`recipientPhone`),
    INDEX `notifications_status_idx`(`status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 10. Reminders Table
CREATE TABLE `reminders` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `bookingId` INTEGER NOT NULL,
    `scheduledFor` DATETIME(3) NOT NULL,
    `reminderType` VARCHAR(100) NOT NULL DEFAULT 'UPCOMING_APPOINTMENT_24H',
    `status` VARCHAR(50) NOT NULL DEFAULT 'PENDING',
    `sentAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
    INDEX `reminders_bookingId_idx`(`bookingId`),
    INDEX `reminders_scheduledFor_idx`(`scheduledFor`),
    INDEX `reminders_status_idx`(`status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 11. Business Settings Table
CREATE TABLE `business_settings` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `businessName` VARCHAR(191) NOT NULL DEFAULT 'Labh Air Conditioning Services',
    `vendorPhone` VARCHAR(30) NOT NULL DEFAULT '918758866744',
    `vendorEmail` VARCHAR(191) NOT NULL DEFAULT 'contact@laabhservices.com',
    `address` TEXT NULL,
    `whatsappCloudApiToken` TEXT NULL,
    `whatsappPhoneNumberId` VARCHAR(100) NULL,
    `whatsappBusinessAccountId` VARCHAR(100) NULL,
    `mockModeEnabled` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Foreign Keys
ALTER TABLE `customer_addresses` ADD CONSTRAINT `customer_addresses_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `customers`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `bookings` ADD CONSTRAINT `bookings_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `customers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE `bookings` ADD CONSTRAINT `bookings_customerAddressId_fkey` FOREIGN KEY (`customerAddressId`) REFERENCES `customer_addresses`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE `bookings` ADD CONSTRAINT `bookings_serviceId_fkey` FOREIGN KEY (`serviceId`) REFERENCES `services`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE `bookings` ADD CONSTRAINT `bookings_technicianId_fkey` FOREIGN KEY (`technicianId`) REFERENCES `technicians`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE `booking_status_histories` ADD CONSTRAINT `booking_status_histories_bookingId_fkey` FOREIGN KEY (`bookingId`) REFERENCES `bookings`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `booking_status_histories` ADD CONSTRAINT `booking_status_histories_changedByUserId_fkey` FOREIGN KEY (`changedByUserId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE `booking_notes` ADD CONSTRAINT `booking_notes_bookingId_fkey` FOREIGN KEY (`bookingId`) REFERENCES `bookings`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `booking_notes` ADD CONSTRAINT `booking_notes_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE `notifications` ADD CONSTRAINT `notifications_bookingId_fkey` FOREIGN KEY (`bookingId`) REFERENCES `bookings`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE `reminders` ADD CONSTRAINT `reminders_bookingId_fkey` FOREIGN KEY (`bookingId`) REFERENCES `bookings`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- ========================================================
-- INITIAL SEED DATA
-- ========================================================

-- Default Admin User (admin@laabhservices.com / admin123)
INSERT INTO `users` (`id`, `email`, `passwordHash`, `name`, `role`)
VALUES (1, 'admin@laabhservices.com', '$2a$10$wVb743e4983uYc79yXmG6OKq0JzQ7Zk8Yl1w0Pz5xM8l7wK1b6A5e', 'Labh Administrator', 'SUPER_ADMIN')
ON DUPLICATE KEY UPDATE `email` = `email`;

-- Default Business Settings
INSERT INTO `business_settings` (`id`, `businessName`, `vendorPhone`, `vendorEmail`, `address`, `whatsappPhoneNumberId`, `whatsappBusinessAccountId`, `mockModeEnabled`)
VALUES (
    1,
    'Labh Air Conditioning Services',
    '918758866744',
    'contact@laabhservices.com',
    'Shop No. 12, Commercial Complex, Bodakdev, SG Highway, Ahmedabad, Gujarat 380054',
    '103130985835292',
    '103347332435388',
    false
)
ON DUPLICATE KEY UPDATE `id` = `id`;

-- Insert Core AC Services
INSERT INTO `services` (`id`, `slug`, `name`, `shortDescription`, `fullDescription`, `features`, `startingPrice`, `estimatedDuration`, `imageUrl`, `icon`, `isActive`, `sortOrder`) VALUES
(1, 'ac-installation', 'AC Installation', 'Professional split and window AC mounting, outdoor bracket installation, and leak-proof copper flaring.', 'Certified technicians ensure vibration-free bracket anchoring, precise copper tubing connection, nitrogen pressure leak testing, and vacuum pump moisture evacuation before commissioning.', '[\"Bracket mounting & anti-vibration rubber pads\",\"Precision copper pipe flaring & connection\",\"Vacuum pump system dehydration (500 microns)\",\"Gas pressure & cooling delta-T verification\",\"Clean indoor wall drilling with dust collector\"]', 1499.00, '90 - 120 mins', '/ac_installation_img_1791893014247.jpg', 'Wrench', 1, 1),
(2, 'ac-fitting', 'AC Fitting', 'Dismantling, re-routing, and re-installation of AC units during house relocation or interior renovation.', 'Complete end-to-end relocation service including refrigerant pump-down lock, safe indoor/outdoor unit unmounting, wall hole sealing, transport preparation, and re-mounting at your new address.', '[\"Refrigerant recovery pump-down (zero gas loss)\",\"Safe dismounting of indoor & outdoor units\",\"Wall repair & hole sealing\",\"Fresh re-installation at new site\",\"Performance and cooling verification\"]', 1799.00, '120 - 150 mins', '/concealed_copper_piping_1791893109154.jpg', 'Sparkles', 1, 2),
(3, 'ac-service', 'AC Service & Jet Cleaning', 'Deep high-pressure water jet washing of indoor cooling coils, blower fan, and outdoor condenser fins.', 'Restores cooling efficiency and eliminates foul odors. Uses specialized waterproof jackets to protect your walls and furniture while blasting out clogged mud, fungus, and dust.', '[\"High-pressure jet wash with foam jacket\",\"Blower wheel and drain tray deep disinfection\",\"Outdoor condenser coil chemical cleaning\",\"Air filter sanitization with antimicrobial spray\",\"Amperage & refrigerant pressure audit\"]', 599.00, '45 - 60 mins', '/ac_service_jetwash_1791892912860.jpg', 'Sparkles', 1, 3),
(4, 'ac-maintenance', 'Preventive AC Maintenance', 'Comprehensive seasonal health audit, electrical safety check, gas pressure check, and performance tuning.', 'Avoid expensive breakdown repairs during peak Ahmedabad summers. Thorough inspection of compressor capacitors, electrical contactors, thermostat calibration, and airflow balance.', '[\"21-point electrical & cooling diagnostic checklist\",\"Capacitor & compressor current draw test\",\"Refrigerant top-up assessment (R32/R410A)\",\"Thermostat accuracy & temperature delta check\",\"Vibration & noise reduction tuning\"]', 799.00, '60 mins', '/ac_repair_diagnostic_1791893066527.jpg', 'ShieldCheck', 1, 4),
(5, 'ac-repair', 'AC Repair & Diagnostics', 'Fast root-cause diagnosis and repair for non-cooling, gas leakage, compressor tripping, or water leakage.', 'Equipped with digital manifold gauges, electronic refrigerant sniffers, and genuine OEM replacement parts for Daikin, Voltas, Mitsubishi, Panasonic, LG, and Hitachi.', '[\"Sensor & PCB board diagnosis & repair\",\"Indoor unit water dripping & drain tray unblocking\",\"Refrigerant leak pinpointing & brazing repair\",\"Compressor magnetic contactor & capacitor replacement\",\"Immediate 90-minute doorstep emergency response\"]', 499.00, '60 - 90 mins', '/ac_repair_diagnostic_1791893066527.jpg', 'Wrench', 1, 5),
(6, 'concealed-ac-piping', 'Concealed Copper Piping', 'In-wall architectural copper line installation with nitrile rubber insulation during building construction.', 'High-grade 99.9% pure seamless copper tubes (0.8mm gauge) pressure-tested at 450 PSI. Clean concealed runs prevent unsightly external pipes and ensure maximum architectural beauty.', '[\"Heavy-gauge seamless copper tubing (0.8mm)\",\"Class-O nitrile rubber insulation (anti-condensation)\",\"Concealed PVC drainage line layout\",\"Nitrogen pressure hold test at 450 PSI\",\"Site coordination with architects & interior designers\"]', 2499.00, 'Half day / Full day', '/concealed_copper_piping_1791893109154.jpg', 'Layers', 1, 6),
(7, 'split-ac-installation', 'Split AC Installation', 'Dedicated installation service tailored specifically for inverter and non-inverter split air conditioners.', 'Specialized dual-technician team handling all split capacities from 1.0 Ton to 2.5 Ton with heavy-duty MS wall brackets and vacuuming.', '[\"Heavy-duty powder-coated outdoor wall brackets\",\"Accurate spirit-level indoor backplate mounting\",\"Refrigerant line flare nut torque calibration\",\"Electrical wiring connection with isolator check\",\"Complete cooling airflow demonstration\"]', 1399.00, '90 mins', '/ac_installation_img_1791893014247.jpg', 'Snowflake', 1, 7),
(8, 'window-ac-installation', 'Window AC Installation', 'Sturdy wooden frame or window sill mounting, side panel sealing, and vibration-proof alignment.', 'Includes custom wooden or aluminum sub-frame reinforcement, expanding foam weather sealing around window gaps, and electrical plug load verification.', '[\"Window sill or wall opening structural alignment\",\"Wooden / aluminum frame fixing & leveling\",\"Weather-strip & acoustic foam gap sealing\",\"Drain tray slope adjustment to prevent water pooling\",\"3-pin 16A power socket load check\"]', 999.00, '60 - 75 mins', '/window_ac_install_1791893174884.jpg', 'Wrench', 1, 8)
ON DUPLICATE KEY UPDATE `slug` = `slug`;
