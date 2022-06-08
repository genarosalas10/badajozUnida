INSERT INTO Categoria (nombre, descripcion)
VALUES ('deporte', 'acividades deportivas'),
('gastronomicos', 'relacionados con la gastronomia'),
('desarrollo web', 'relacionados con el desarrollo web')
;

INSERT INTO Subcategoria (nombre, descripcion, idCategoria)
VALUES ('fútbol', 'partido de fútbol',1),
('baloncesto', 'partido de fútbol',1),
('tenis', 'partido de tenis',1),
('comidas caseras', 'realizar comidas caseras',2),
('comidas francesas', 'realizar comidas típicas de Francia',2),
('front', 'curso basico de la parte front',3),
('back', 'curso basico de la parte back',3)
;

-- Isa1234)
-- Juan1234)
INSERT INTO Usuario (nombre, apellidos, email, password, fechaNacimiento,tipo)
VALUES ('Isabel', 'Pérez','isa@gmail.com','d40c12d6df191a844185e1336569806f','1987-01-01', 'a'),
 ('Juan', 'Pérez','juan@gmail.com','c3edace111ea076f93ee278cf30f006c','1987-01-01', 'u');


INSERT INTO Ubicacion (nombre, direccion)
VALUES ('la granadilla', 'calle Augusto Vázquez'),
('la granja del cruce', 'Corte de Pelea');


INSERT INTO Evento (titulo, imagen, descripcion, fechaHora, idUbicacion,idUsuario, idSubcategoria)
VALUES ('Graduacion', 'asqwertyifgshdfghghj','Graduacion de 2daw','2022-06-22 20:00','1', '1','1'),
       ('Graduacion', 'asqwertyifgshdfghghj','Graduacion de 2daw','2022-06-22 20:00','2', '1','2');

INSERT INTO Participante (idUsuario, idEvento)
VALUES ('1', '1'),
       ('1', '2');
