
-- -----------------------------------------------------
-- Schema bancoLojaTony
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `bancoLojaTony` DEFAULT CHARACTER SET utf8 ;
USE `bancoLojaTony` ;

CREATE TABLE IF NOT EXISTS `bancoLojaTony`.`produto` (
  `id` INT NOT NULL,
  `nomeProduto` VARCHAR(256) NOT NULL,
  `valorProduto` DOUBLE NOT NULL,
  `marcaProduto` VARCHAR(256) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `bancoLojaTony`.`tipoMovimentacao` (
  `id` INT NOT NULL,
  `dsc_movimentacao` VARCHAR(128) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `bancoLojaTony`.`Movimentacao` (
  `id` INT NOT NULL,
  `valorMovimentacao` VARCHAR(45) NOT NULL,
  `dataMovimentacao` VARCHAR(45) NOT NULL,
  `tipoMovimentacao_id` INT NOT NULL,
  `produto_id` INT NOT NULL,
  PRIMARY KEY (`id`, `tipoMovimentacao_id`, `produto_id`),
  INDEX `fk_Movimentacao_tipoMovimentacao1_idx` (`tipoMovimentacao_id` ASC) VISIBLE,
  INDEX `fk_Movimentacao_produto1_idx` (`produto_id` ASC) VISIBLE,
  CONSTRAINT `fk_Movimentacao_tipoMovimentacao1`
    FOREIGN KEY (`tipoMovimentacao_id`)
    REFERENCES `bancoLojaTony`.`tipoMovimentacao` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Movimentacao_produto1`
    FOREIGN KEY (`produto_id`)
    REFERENCES `bancoLojaTony`.`produto` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

