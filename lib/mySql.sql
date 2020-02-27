CREATE TABLE `shelves`(
    `rfidShelf` VARCHAR(20) NOT NULL PRIMARY KEY,
    `shelfName` VARCHAR(20) NOT NULL
)

CREATE TABLE `bundles`(
    `rfidBundle` VARCHAR(255) NOT NULL PRIMARY KEY,
    `style` VARCHAR(20) NOT NULL,
    `color` VARCHAR(20) NOT NULL,
    `size` VARCHAR(20) NOT NULL,
    `qty` VARCHAR(20) NOT NULL,
    `shelf_id` VARCHAR(20) NOT NULL,
    FOREIGN KEY(`shelf_id`) REFERENCES `shelves`(`rfidShelf`)
)