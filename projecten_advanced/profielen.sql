-- MySQL Administrator dump 1.4
--
-- ------------------------------------------------------
-- Server version	5.1.41


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


--
-- Create schema profielen
--

CREATE DATABASE IF NOT EXISTS profielen;
USE profielen;

--
-- Definition of table `profiel`
--

DROP TABLE IF EXISTS `profiel`;
CREATE TABLE `profiel` (
  `idpersoon` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `voornaam` varchar(45) DEFAULT NULL,
  `familienaam` varchar(45) DEFAULT NULL,
  `tel` varchar(45) DEFAULT NULL,
  `gsm` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `adres` varchar(45) DEFAULT NULL,
  `postnr` varchar(45) DEFAULT NULL,
  `gemeente` varchar(45) DEFAULT NULL,
  `foto` varchar(45) DEFAULT NULL,
  `interesses` text,
  PRIMARY KEY (`idpersoon`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `profiel`
--

/*!40000 ALTER TABLE `profiel` DISABLE KEYS */;
INSERT INTO `profiel` (`idpersoon`,`voornaam`,`familienaam`,`tel`,`gsm`,`email`,`adres`,`postnr`,`gemeente`,`foto`,`interesses`) VALUES 
 (1,'Jan','Vandorpe','059775523','0486112233','openleren@skynet.be','Archimedesstraat 6','8333','Sint-Michiels','profiel3.jpg','Ik heb een aantal hobbies, nl.<br>    <ul>      <li>succulenten kweken (cactussen en vetplanten)</li>      <li>fotografie</li>      <li>reizen</li>    </ul>'),
 (2,'Jean','Smits','024564328','0488556677','jean@gmail.com','linkeroever 55','2000','Antwerpen','jean.jpg',NULL);
/*!40000 ALTER TABLE `profiel` ENABLE KEYS */;




/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
