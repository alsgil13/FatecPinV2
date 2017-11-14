CREATE TABLE `tb_admins` (
  `idtb_admins` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `senha` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `excluido` tinyint(1) NOT NULL,
  PRIMARY KEY (`idtb_admins`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `tb_dispositivos` (
  `idtb_dispositivos` varchar(100) NOT NULL,
  PRIMARY KEY (`idtb_dispositivos`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `tb_empregos` (
  `idtb_empregos` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `tb_empresa_idtb_empresa` int(10) unsigned NOT NULL,
  `tb_admins_idtb_admins` int(10) unsigned NOT NULL,
  `titulo` text NOT NULL,
  `texto` text NOT NULL,
  `data_postagem` datetime NOT NULL,
  `excluido` tinyint(1) NOT NULL,
  `link_vaga` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`idtb_empregos`),
  KEY `tb_empregos_FKIndex1` (`tb_admins_idtb_admins`),
  KEY `tb_empregos_FKIndex2` (`tb_empresa_idtb_empresa`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `tb_empresas` (
  `idtb_empresas` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nome` varchar(50) DEFAULT NULL,
  `telefone` varchar(11) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `cidade` varchar(40) DEFAULT NULL,
  `estado` varchar(2) DEFAULT NULL,
  PRIMARY KEY (`idtb_empresas`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `tb_eventos` (
  `idtb_eventos` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `tb_admins_idtb_admins` int(10) unsigned NOT NULL,
  `titulo` text NOT NULL,
  `texto` text NOT NULL,
  `data_postagem` datetime NOT NULL,
  `data_evento` datetime NOT NULL,
  `local_evento` varchar(50) DEFAULT NULL,
  `link_evento` varchar(100) DEFAULT NULL,
  `excluido` tinyint(1) NOT NULL,
  PRIMARY KEY (`idtb_eventos`),
  KEY `tb_eventos_FKIndex1` (`tb_admins_idtb_admins`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `tb_noticias` (
  `idtb_noticias` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `tb_admins_idtb_admins` int(10) unsigned NOT NULL,
  `titulo` text NOT NULL,
  `texto` text NOT NULL,
  `data_postagem` datetime NOT NULL,
  `imagem` blob,
  `excluido` tinyint(1) NOT NULL,
  PRIMARY KEY (`idtb_noticias`),
  KEY `tb_noticias_FKIndex1` (`tb_admins_idtb_admins`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `tb_pins` (
  `idtb_pins` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `tb_admins_idtb_admins` int(10) unsigned NOT NULL,
  `descricao` varchar(160) NOT NULL,
  `data_postagem` datetime NOT NULL,
  `excluido` tinyint(1) NOT NULL,
  PRIMARY KEY (`idtb_pins`),
  KEY `tb_pins_FKIndex1` (`tb_admins_idtb_admins`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
