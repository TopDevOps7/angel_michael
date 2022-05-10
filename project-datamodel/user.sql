create database `taskmgr`;
use `taskmgr`;

CREATE TABLE `taskmgr`.`user` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `age` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`)
)
DEFAULT CHARACTER SET = utf8mb4;
