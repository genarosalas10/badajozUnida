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