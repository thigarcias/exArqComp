create database cervejaria;
use cervejaria;

create table lager (
idLager int primary key auto_increment,
dtHora datetime default current_timestamp,
processo1 float,
processo2 float,
processo3 float,
processo4 float,
processo5 float,
processo6 float,
processo7 float,
processo8 float,
processo9 float,
processo10 float,
processo11 float,
processo12 float,
processo13 float,
processo14 float,
processo15 float
);

select * from lager;
