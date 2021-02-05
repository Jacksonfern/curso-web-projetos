DROP DATABASE IF EXISTS dbreservasalas;

CREATE DATABASE IF NOT EXISTS dbreservasalas;

USE dbreservasalas;

CREATE TABLE tbusuario(
	id int not null primary key auto_increment,
	matricula int unique,
	email varchar(255) unique,
	nome varchar(25),
	sobrenome varchar(50),
	senha varchar(20)
);

CREATE TABLE tbsala(
	id int not null primary key auto_increment,
	sala varchar(50),
	bloco varchar(50),
	localizacao varchar(100)
);

CREATE TABLE tbsalareservada(
	id int not null primary key auto_increment,
	id_sala int not null,
	id_usuario int not null,
	horario_inicio datetime not null,
	horario_fim datetime not null,
	descricao varchar(255),
	foreign key(id_sala) references tbsala(id),
	foreign key(id_usuario) references tbusuario(id)
);