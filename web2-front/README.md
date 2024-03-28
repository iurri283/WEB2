# React + Vite

-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

---

-- Schema mydb

---

---

-- Schema cefetMoney

---

---

-- Schema cefetMoney

---

CREATE SCHEMA IF NOT EXISTS `cefetMoney` DEFAULT CHARACTER SET utf8 ;
USE `cefetMoney` ;

---

-- Table `cefetMoney`.`Usuario`

---

CREATE TABLE IF NOT EXISTS `cefetMoney`.`Usuario` (
`idUsuario` INT(11) NOT NULL AUTO_INCREMENT,
`nomeUsuario` VARCHAR(100) NOT NULL,
`cpfUsuario` VARCHAR(14) NOT NULL,
`senhaUsuario` VARCHAR(255) NOT NULL,
`emailUsuario` VARCHAR(100) NOT NULL,
PRIMARY KEY (`idUsuario`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

---

-- Table `cefetMoney`.`Acoes`

---

CREATE TABLE IF NOT EXISTS `cefetMoney`.`Acoes` (
`idAcoes` INT(11) NOT NULL AUTO_INCREMENT,
`tipoAcao` VARCHAR(45) NOT NULL,
`valorAcao` VARCHAR(45) NOT NULL,
`dataAcao` VARCHAR(45) NOT NULL,
`Usuario_Acoes_idUsuario` INT(11) NOT NULL,
PRIMARY KEY (`idAcoes`, `Usuario_Acoes_idUsuario`),
INDEX `fk_Acoes_Usuario1_idx` (`Usuario_Acoes_idUsuario` ASC),
CONSTRAINT `fk_Acoes_Usuario1`
FOREIGN KEY (`Usuario_Acoes_idUsuario`)
REFERENCES `cefetMoney`.`Usuario` (`idUsuario`)
ON DELETE NO ACTION
ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

---

-- Table `cefetMoney`.`Conta`

---

CREATE TABLE IF NOT EXISTS `cefetMoney`.`Conta` (
`idConta` INT(11) NOT NULL AUTO_INCREMENT,
`agConta` INT(11) NOT NULL,
`numeroConta` VARCHAR(10) NOT NULL,
`saldoConta` DOUBLE NOT NULL,
`Usuario_Conta_idUsuario` INT(11) NOT NULL,
PRIMARY KEY (`idConta`, `Usuario_Conta_idUsuario`),
INDEX `fk_Conta_Usuario1_idx` (`Usuario_Conta_idUsuario` ASC),
CONSTRAINT `fk_Conta_Usuario1`
FOREIGN KEY (`Usuario_Conta_idUsuario`)
REFERENCES `cefetMoney`.`Usuario` (`idUsuario`)
ON DELETE NO ACTION
ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

---

-- Table `cefetMoney`.`Transferencia`

---

CREATE TABLE IF NOT EXISTS `cefetMoney`.`Transferencia` (
`idTransferencia` INT(11) NOT NULL AUTO_INCREMENT,
`valorTransf` DOUBLE NOT NULL,
`dataTransf` VARCHAR(45) NOT NULL,
`agDestTrans` INT(11) NOT NULL,
`numeroDestTransf` VARCHAR(45) NOT NULL,
`Usuario_Transf_idUsuario` INT(11) NOT NULL,
PRIMARY KEY (`idTransferencia`, `Usuario_Transf_idUsuario`),
INDEX `fk_Transferencia_Usuario1_idx` (`Usuario_Transf_idUsuario` ASC),
CONSTRAINT `fk_Transferencia_Usuario1`
FOREIGN KEY (`Usuario_Transf_idUsuario`)
REFERENCES `cefetMoney`.`Usuario` (`idUsuario`)
ON DELETE NO ACTION
ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
