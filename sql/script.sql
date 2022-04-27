<<<<<<< HEAD
--Crear base de datos
/* DROP DATABASE IF EXISTS BadajozUnida;
CREATE DATABASE IF NOT EXISTS BadajozUnida DEFAULT CHARACTER SET utf8 COLLATE utf8_spanish_ci;
USE BadajozUnida; */

--Tabla Usuario
CREATE TABLE Usuario(
	idUsuario mediumint unsigned AUTO_INCREMENT NOT NULL PRIMARY KEY,
	nombre varchar(60) NOT NULL,
    apellidos varchar(60) NOT NULL,
    email varchar(100) NOT NULL UNIQUE,
	fechaNacimiento DATE NOT NULL,
    tipo char(1) NOT NULL DEFAULT 'u',
    CONSTRAINT CHK_tipo_Usuario CHECK (tipo='a' OR tipo='u')
);

--Tabla Categoria
CREATE TABLE Categoria( 
	idCategoria tinyint unsigned AUTO_INCREMENT NOT NULL PRIMARY KEY,
	nombre varchar(50) NOT NULL,
	descripcion varchar(150) NOT NULL
);

--Tabla Subcategoria
CREATE TABLE Subcategoria(
	idSubcategoria tinyint unsigned AUTO_INCREMENT NOT NULL PRIMARY KEY,
	nombre varchar(50) NOT NULL,
	descripcion varchar(150) NOT NULL,
    idCategoria tinyint unsigned NOT NULL,
    CONSTRAINT FK_idCategoria_Subcategoria FOREIGN KEY (idCategoria) REFERENCES Categoria(idCategoria)
);


--Tabla Evento
CREATE TABLE Evento(
	idEvento mediumint unsigned AUTO_INCREMENT NOT NULL PRIMARY KEY,
	titulo varchar(100) NOT NULL,
    descripcion varchar(255) NOT NULL,
	fechaHora datetime NOT NULL,
    ubicacion varchar(255) NOT NULL,
    idUsuario mediumint unsigned NOT NULL ,
    idSubcategoria tinyint unsigned NOT NULL,
    CONSTRAINT FK_idSubcategoria_Evento FOREIGN KEY (idSubcategoria) REFERENCES Subcategoria(idSubcategoria),
    CONSTRAINT FK_idUsario_Evento FOREIGN KEY (idUsuario) REFERENCES Usuario(idUsuario) 
);

--Tabla Participante
CREATE TABLE Participante(
	idEvento mediumint unsigned NOT NULL,
	idUsuario mediumint unsigned NOT NULL,
    CONSTRAINT FK_idEvento_Participante FOREIGN KEY (idEvento) REFERENCES Evento(idEvento) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT FK_idUsario_Participante FOREIGN KEY (idUsuario) REFERENCES Usuario(idUsuario) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT PK_PARTICIPANTE primary key (idEvento, idUsuario)
=======
--Crear base de datos
DROP DATABASE IF EXISTS BadajozUnida;
CREATE DATABASE IF NOT EXISTS BadajozUnida DEFAULT CHARACTER SET utf8 COLLATE utf8_spanish_ci;
USE BadajozUnida;

--Tabla Usuario
CREATE TABLE Usuario(
	idUsuario mediumint unsigned AUTO_INCREMENT NOT NULL PRIMARY KEY,
	nombre varchar(60) NOT NULL,
    apellidos varchar(60) NOT NULL,
    email varchar(100) NOT NULL UNIQUE,
	fechaNacimiento DATE NOT NULL,
    tipo char(1) NOT NULL DEFAULT 'u',
    CONSTRAINT CHK_tipo_Usuario CHECK (tipo='a' OR tipo='u')
);

--Tabla Categoria
CREATE TABLE Categoria( 
	idCategoria tinyint unsigned AUTO_INCREMENT NOT NULL PRIMARY KEY,
	nombre varchar(50) NOT NULL,
	descripcion varchar(150) NOT NULL
);

--Tabla Subcategoria
CREATE TABLE Subcategoria(
	idSubcategoria tinyint unsigned AUTO_INCREMENT NOT NULL PRIMARY KEY,
	nombre varchar(50) NOT NULL,
	descripcion varchar(150) NOT NULL,
    idCategoria tinyint unsigned NOT NULL,
    CONSTRAINT FK_idCategoria_Subcategoria FOREIGN KEY (idCategoria) REFERENCES Categoria(idCategoria)
);


--Tabla Evento
CREATE TABLE Evento(
	idEvento mediumint unsigned AUTO_INCREMENT NOT NULL PRIMARY KEY,
	titulo varchar(100) NOT NULL,
    descripcion varchar(255) NOT NULL,
	fechaHora datetime NOT NULL,
    ubicacion varchar(255) NOT NULL,
    idUsuario mediumint unsigned NOT NULL ,
    idSubcategoria tinyint unsigned NOT NULL,
    CONSTRAINT FK_idSubcategoria_Evento FOREIGN KEY (idSubcategoria) REFERENCES Subcategoria(idSubcategoria),
    CONSTRAINT FK_idUsario_Evento FOREIGN KEY (idUsuario) REFERENCES Usuario(idUsuario) 
);

--Tabla Participante
CREATE TABLE Participante(
	idEvento mediumint unsigned NOT NULL,
	idUsuario mediumint unsigned NOT NULL,
    CONSTRAINT FK_idUsario_Participante FOREIGN KEY (idUsuario) REFERENCES Usuario(idUsuario) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT FK_idEvento_Participante FOREIGN KEY (idEvento) REFERENCES Evento(idEvento) ON UPDATE CASCADE ON DELETE CASCADE
>>>>>>> fc1e9954e4d0e5bddb31216a2a05372f2b8c54c8
);