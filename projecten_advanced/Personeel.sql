create database Personeel
go
use Personeel
go
Create table afdeling (
   afdnr integer not null constraint pkAfdNr primary key,
   naam nvarchar(50) not null,
   verdieping smallint)
go
insert into afdeling(afdnr,naam,verdieping) values (1,'Administratie',0)
insert into afdeling(afdnr,naam,verdieping) values (2,'Boekhouding',0)
go
Create table werknemer(nr integer not null constraint pkNr primary key,
   naam nvarchar(50) not null,
   geslacht nchar(1) not null,
   indienst datetime not null,
   wedde money not null,
   afdnr integer not null constraint FkAfdNr references afdeling(afdNr))
go
insert into werknemer(nr,naam,geslacht,indienst,wedde,afdnr)
   values(1,'Marc','M','1966-01-01',2000.2,1)
insert into werknemer(nr,naam,geslacht,indienst,wedde,afdnr)
   values(2,'Gabriel','M','1974-03-01',2100.1,1)
insert into werknemer(nr,naam,geslacht,indienst,wedde,afdnr)
   values(3,'Roos','V','1980-05-15',1900.5,2)
go
quit

