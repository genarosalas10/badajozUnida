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
    password varchar(255) NOT NULL,
	fechaNacimiento DATE NOT NULL,
    tipo char(1) NOT NULL DEFAULT 'u',
    CONSTRAINT CHK_tipo_Usuario CHECK (tipo='a' OR tipo='u')
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8
COLLATE=utf8_spanish_ci;

--Tabla Categoria
CREATE TABLE Categoria(
	idCategoria tinyint unsigned AUTO_INCREMENT NOT NULL PRIMARY KEY,
	nombre varchar(50) NOT NULL UNIQUE,
	descripcion varchar(150) NOT NULL
);

--Tabla Subcategoria
CREATE TABLE Subcategoria(
	idSubcategoria tinyint unsigned AUTO_INCREMENT NOT NULL PRIMARY KEY,
	nombre varchar(50) NOT NULL UNIQUE,
	descripcion varchar(150) NOT NULL,
    idCategoria tinyint unsigned NOT NULL,
    CONSTRAINT FK_idCategoria_Subcategoria FOREIGN KEY (idCategoria) REFERENCES Categoria(idCategoria) ON UPDATE CASCADE ON DELETE CASCADE
);

--Tabla Ubiciacion
CREATE TABLE Ubicacion(
  idUbicacion tinyint unsigned AUTO_INCREMENT NOT NULL PRIMARY KEY,
  nombre varchar(100) NOT NULL UNIQUE,
  direccion varchar(200) NOT NULL
);

--Tabla Evento
CREATE TABLE Evento(
	idEvento mediumint unsigned AUTO_INCREMENT NOT NULL PRIMARY KEY,
	titulo varchar(100) NOT NULL,
	imagen varchar(200) NOT NULL,
  descripcion varchar(200) NOT NULL,
	fechaHora datetime NOT NULL,
  idUbicacion tinyint unsigned NOT NULL,
  idUsuario mediumint unsigned NOT NULL ,
  idSubcategoria tinyint unsigned NOT NULL,
  CONSTRAINT FK_idSubcategoria_Evento FOREIGN KEY (idSubcategoria) REFERENCES Subcategoria(idSubcategoria),
  CONSTRAINT FK_idUsario_Evento FOREIGN KEY (idUsuario) REFERENCES Usuario(idUsuario),
  CONSTRAINT FK_idLocaliza_Evento FOREIGN KEY (idUbicacion) REFERENCES Ubicacion(idUbicacion)

);
--Tabla Participante
CREATE TABLE Participante(
	idEvento mediumint unsigned NOT NULL,
	idUsuario mediumint unsigned NOT NULL,
    CONSTRAINT FK_idEvento_Participante FOREIGN KEY (idEvento) REFERENCES Evento(idEvento) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT FK_idUsario_Participante FOREIGN KEY (idUsuario) REFERENCES Usuario(idUsuario) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT PK_PARTICIPANTE primary key (idEvento, idUsuario)
);
