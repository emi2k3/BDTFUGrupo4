-- =============================================
-- SISTEMA ELECTORAL URUGUAYO - VERSIÓN SIMPLIFICADA
-- =============================================

-- =============================================
-- 1. DATOS GEOGRÁFICOS
-- =============================================

-- Departamentos principales
INSERT INTO departamentos (nombre) VALUES 
('Montevideo'),
('Canelones'),
('Maldonado'),
('Salto'),
('Paysandú');

-- Localidades principales
INSERT INTO localidades (tipo, nombre) VALUES 
('Ciudad', 'Montevideo'),
('Ciudad', 'Canelones'),
('Ciudad', 'Maldonado'),
('Ciudad', 'Salto'),
('Ciudad', 'Paysandú');

-- Zonas básicas
INSERT INTO zonas (nombre) VALUES 
('Centro'),
('Pocitos'),
('Cordón'),
('Zona Norte'),
('Zona Sur');

-- Direcciones
INSERT INTO direcciones (calle, numero, id_departamento, id_localidad, id_zona) VALUES 
('18 de Julio', 1234, 1, 1, 1),
('Pocitos', 5678, 1, 1, 2),
('Cuareim', 6789, 1, 1, 3),
('Artigas', 123, 2, 2, 4),
('Gorlero', 456, 3, 3, 5),
('Uruguay', 345, 4, 4, 1),
('Zorrilla', 456, 5, 5, 2);

-- =============================================
-- 2. CREDENCIALES Y CIUDADANOS
-- =============================================

-- Credenciales
INSERT INTO credenciales (serie, numero) VALUES 
('AAA', 123456), ('AAB', 234567), ('AAC', 345678), ('AAD', 456789), ('AAE', 567890),
('ABA', 123456), ('ABB', 234567), ('ABC', 345678), ('ABD', 456789), ('ABE', 567890),
('ACA', 123456), ('ACB', 234567), ('ACC', 345678), ('ACD', 456789), ('ACE', 567890);

-- Ciudadanos
INSERT INTO ciudadanos (ci, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, mayor_edad, id_credencial) VALUES 
-- Candidatos principales
(12345678, 'Juan', 'Carlos', 'Pérez', 'García', true, 1),
(23456789, 'María', 'Elena', 'Rodríguez', 'López', true, 2),
(34567890, 'Pedro', 'Luis', 'Martínez', 'Fernández', true, 3),
(45678901, 'Ana', 'Isabel', 'González', 'Díaz', true, 4),
(56789012, 'Carlos', 'Alberto', 'Sánchez', 'Ruiz', true, 5),
(67890123, 'Luis', 'Fernando', 'Torres', 'Méndez', true, 6),
(78901234, 'Carmen', 'Rosa', 'Valdez', 'Castro', true, 7),
(89012345, 'Roberto', 'Andrés', 'Morales', 'Vega', true, 8),
(90123456, 'Patricia', 'Lucía', 'Herrera', 'Ramos', true, 9),
(01234567, 'Miguel', 'Ángel', 'Jiménez', 'Flores', true, 10),
-- Candidatos secundarios
(11234567, 'Laura', 'Beatriz', 'Silva', 'Mendoza', true, 11),
(21234567, 'Diego', 'Martín', 'Suárez', 'Olivera', true, 12),
(31234567, 'Gabriela', 'Inés', 'Vargas', 'Pereira', true, 13),
(41234567, 'Rodrigo', 'Alejandro', 'Cabrera', 'Sosa', true, 14),
(51234567, 'Natalia', 'Sofía', 'Acosta', 'Núñez', true, 15);

-- =============================================
-- 3. PARTIDOS POLÍTICOS
-- =============================================

-- Partidos principales
INSERT INTO partidos_politicos (nombre, sigla, id_presidente, id_vicepresidente, id_direccion) VALUES 
('Partido Nacional', 'PN', 1, 2, 1),
('Partido Colorado', 'PC', 3, 4, 2),
('Frente Amplio', 'FA', 5, 6, 3),
('Cabildo Abierto', 'CA', 7, 8, 4),
('Partido Independiente', 'PI', 9, 10, 5);

-- Candidatos por partido
INSERT INTO candidatos (id_ciudadano, id_partido_politico, organo, orden) VALUES 
-- Partido Nacional
(1, 1, 'Presidente', 1),
(2, 1, 'Vicepresidente', 2),
(11, 1, 'Senador', 3),
(12, 1, 'Diputado', 4),
-- Partido Colorado
(3, 2, 'Presidente', 1),
(4, 2, 'Vicepresidente', 2),
(13, 2, 'Senador', 3),
(14, 2, 'Diputado', 4),
-- Frente Amplio
(5, 3, 'Presidente', 1),
(6, 3, 'Vicepresidente', 2),
(15, 3, 'Senador', 3),
-- Cabildo Abierto
(7, 4, 'Presidente', 1),
(8, 4, 'Vicepresidente', 2),
-- Partido Independiente
(9, 5, 'Presidente', 1),
(10, 5, 'Vicepresidente', 2);

-- =============================================
-- 4. ELECCIÓN ÚNICA
-- =============================================

-- Elección presidencial
INSERT INTO elecciones (fecha, tipo) VALUES 
('2024-10-27', 'Presidencial');

-- Listas de la elección
INSERT INTO listas (id_eleccion, id_partido_politico) VALUES 
(1, 1), -- PN
(1, 2), -- PC
(1, 3), -- FA
(1, 4), -- CA
(1, 5); -- PI

-- Integrantes de lista
INSERT INTO integrantes_lista (id_lista, id_candidato) VALUES 
(1, 1), (1, 2), -- PN: Presidente y Vice
(2, 3), (2, 4), -- PC: Presidente y Vice
(3, 5), (3, 6), -- FA: Presidente y Vice
(4, 7), (4, 8), -- CA: Presidente y Vice
(5, 9), (5, 10); -- PI: Presidente y Vice

-- =============================================
-- 5. INFRAESTRUCTURA ELECTORAL
-- =============================================

-- Establecimientos
INSERT INTO establecimientos (nombre, tipo, id_direccion) VALUES 
('Escuela 1', 'Educativo', 1),
('Liceo 2', 'Educativo', 4),
('Escuela Maldonado', 'Educativo', 5),
('Escuela Salto', 'Educativo', 6),
('Liceo Paysandú', 'Educativo', 7);

-- Mesas
INSERT INTO mesas (numero_identificacion, fecha_apertura, fecha_cierre, abierta) VALUES 
('MESA001', '2024-10-27 08:00:00', '2024-10-27 19:00:00', false),
('MESA002', '2024-10-27 08:00:00', '2024-10-27 19:00:00', false),
('MESA003', '2024-10-27 08:00:00', '2024-10-27 19:00:00', false),
('MESA004', '2024-10-27 08:00:00', '2024-10-27 19:00:00', false),
('MESA005', '2024-10-27 08:00:00', '2024-10-27 19:00:00', false);

-- Circuitos
INSERT INTO circuitos (accesible, numero, id_establecimiento, id_mesa) VALUES 
(true, 1, 1, 1),   -- Montevideo Centro
(true, 2, 2, 2),   -- Montevideo Pocitos
(true, 3, 3, 3),   -- Maldonado
(true, 4, 4, 4),   -- Salto
(true, 5, 5, 5);   -- Paysandú

-- Lista de credenciales por circuito
INSERT INTO lista_credenciales (id_credencial, id_circuito) VALUES 
(1, 1), (2, 1), (3, 1),
(4, 2), (5, 2), (6, 2),
(7, 3), (8, 3), (9, 3),
(10, 4), (11, 4), (12, 4),
(13, 5), (14, 5), (15, 5);

-- =============================================
-- 6. TIPOS DE ANULACIÓN
-- =============================================

INSERT INTO tipo_anulacion (nombre, descripcion) VALUES 
('Marca múltiple', 'El votante marcó más de una opción'),
('Marca unclear', 'La marca no es clara o está fuera del recuadro'),
('Papeleta dañada', 'La papeleta está rota o manchada');

-- =============================================
-- 7. VOTOS DE LA ELECCIÓN
-- =============================================

-- Votos por circuito
INSERT INTO votos (estado, observado, fecha_hora, id_circuito, id_eleccion, id_tipo_anulacion) VALUES 
-- Montevideo Centro - 20 votos
('valido', false, '2024-10-27 08:30:00', 1, 1, NULL),
('valido', false, '2024-10-27 08:45:00', 1, 1, NULL),
('valido', false, '2024-10-27 09:00:00', 1, 1, NULL),
('valido', false, '2024-10-27 09:15:00', 1, 1, NULL),
('valido', false, '2024-10-27 09:30:00', 1, 1, NULL),
('valido', false, '2024-10-27 09:45:00', 1, 1, NULL),
('valido', false, '2024-10-27 10:00:00', 1, 1, NULL),
('valido', false, '2024-10-27 10:15:00', 1, 1, NULL),
('valido', false, '2024-10-27 10:30:00', 1, 1, NULL),
('valido', false, '2024-10-27 10:45:00', 1, 1, NULL),
('valido', false, '2024-10-27 11:00:00', 1, 1, NULL),
('valido', false, '2024-10-27 11:15:00', 1, 1, NULL),
('valido', false, '2024-10-27 11:30:00', 1, 1, NULL),
('valido', false, '2024-10-27 11:45:00', 1, 1, NULL),
('valido', false, '2024-10-27 12:00:00', 1, 1, NULL),
('valido', true, '2024-10-27 12:15:00', 1, 1, NULL),
('anulado', false, '2024-10-27 12:30:00', 1, 1, 1),
('anulado', false, '2024-10-27 12:45:00', 1, 1, 2),
('en blanco', false, '2024-10-27 13:00:00', 1, 1, NULL),
('en blanco', false, '2024-10-27 13:15:00', 1, 1, NULL),

-- Montevideo Pocitos - 18 votos
('valido', false, '2024-10-27 08:30:00', 2, 1, NULL),
('valido', false, '2024-10-27 08:50:00', 2, 1, NULL),
('valido', false, '2024-10-27 09:10:00', 2, 1, NULL),
('valido', false, '2024-10-27 09:30:00', 2, 1, NULL),
('valido', false, '2024-10-27 09:50:00', 2, 1, NULL),
('valido', false, '2024-10-27 10:10:00', 2, 1, NULL),
('valido', false, '2024-10-27 10:30:00', 2, 1, NULL),
('valido', false, '2024-10-27 10:50:00', 2, 1, NULL),
('valido', false, '2024-10-27 11:10:00', 2, 1, NULL),
('valido', false, '2024-10-27 11:30:00', 2, 1, NULL),
('valido', false, '2024-10-27 11:50:00', 2, 1, NULL),
('valido', false, '2024-10-27 12:10:00', 2, 1, NULL),
('valido', false, '2024-10-27 12:30:00', 2, 1, NULL),
('valido', false, '2024-10-27 12:50:00', 2, 1, NULL),
('anulado', false, '2024-10-27 13:10:00', 2, 1, 1),
('anulado', true, '2024-10-27 13:30:00', 2, 1, 3),
('en blanco', false, '2024-10-27 13:50:00', 2, 1, NULL),
('en blanco', false, '2024-10-27 14:10:00', 2, 1, NULL),

-- Maldonado - 15 votos
('valido', false, '2024-10-27 08:40:00', 3, 1, NULL),
('valido', false, '2024-10-27 09:00:00', 3, 1, NULL),
('valido', false, '2024-10-27 09:20:00', 3, 1, NULL),
('valido', false, '2024-10-27 09:40:00', 3, 1, NULL),
('valido', false, '2024-10-27 10:00:00', 3, 1, NULL),
('valido', false, '2024-10-27 10:20:00', 3, 1, NULL),
('valido', false, '2024-10-27 10:40:00', 3, 1, NULL),
('valido', false, '2024-10-27 11:00:00', 3, 1, NULL),
('valido', false, '2024-10-27 11:20:00', 3, 1, NULL),
('valido', false, '2024-10-27 11:40:00', 3, 1, NULL),
('valido', false, '2024-10-27 12:00:00', 3, 1, NULL),
('valido', true, '2024-10-27 12:20:00', 3, 1, NULL),
('anulado', false, '2024-10-27 12:40:00', 3, 1, 2),
('en blanco', false, '2024-10-27 13:00:00', 3, 1, NULL),
('en blanco', false, '2024-10-27 13:20:00', 3, 1, NULL),

-- Salto - 12 votos
('valido', false, '2024-10-27 08:30:00', 4, 1, NULL),
('valido', false, '2024-10-27 09:00:00', 4, 1, NULL),
('valido', false, '2024-10-27 09:30:00', 4, 1, NULL),
('valido', false, '2024-10-27 10:00:00', 4, 1, NULL),
('valido', false, '2024-10-27 10:30:00', 4, 1, NULL),
('valido', false, '2024-10-27 11:00:00', 4, 1, NULL),
('valido', false, '2024-10-27 11:30:00', 4, 1, NULL),
('valido', false, '2024-10-27 12:00:00', 4, 1, NULL),
('valido', false, '2024-10-27 12:30:00', 4, 1, NULL),
('anulado', false, '2024-10-27 13:00:00', 4, 1, 1),
('en blanco', false, '2024-10-27 13:30:00', 4, 1, NULL),
('en blanco', false, '2024-10-27 14:00:00', 4, 1, NULL),

-- Paysandú - 10 votos
('valido', false, '2024-10-27 08:30:00', 5, 1, NULL),
('valido', false, '2024-10-27 09:00:00', 5, 1, NULL),
('valido', false, '2024-10-27 09:30:00', 5, 1, NULL),
('valido', false, '2024-10-27 10:00:00', 5, 1, NULL),
('valido', false, '2024-10-27 10:30:00', 5, 1, NULL),
('valido', false, '2024-10-27 11:00:00', 5, 1, NULL),
('valido', false, '2024-10-27 11:30:00', 5, 1, NULL),
('anulado', false, '2024-10-27 12:00:00', 5, 1, 1),
('en blanco', false, '2024-10-27 12:30:00', 5, 1, NULL),
('en blanco', false, '2024-10-27 13:00:00', 5, 1, NULL);

-- =============================================
-- 8. CONSTANCIAS DE VOTO
-- =============================================

-- Constancias de voto (depende de ciudadanos, elecciones y circuitos)
INSERT INTO constancias_voto (fecha_hora, voto, id_ciudadano, id_eleccion, id_circuito) VALUES 
-- Constancias para la elección presidencial (ID 1)
-- Montevideo Centro - Circuito 1 (ciudadanos 1, 2, 3)
('2024-10-27 08:30:00', true, 1, 1, 1),
('2024-10-27 08:45:00', true, 2, 1, 1),
('2024-10-27 09:00:00', true, 3, 1, 1),

-- Montevideo Pocitos - Circuito 2 (ciudadanos 4, 5, 6)
('2024-10-27 08:30:00', true, 4, 1, 2),
('2024-10-27 08:50:00', true, 5, 1, 2),
('2024-10-27 09:10:00', true, 6, 1, 2),

-- Maldonado - Circuito 3 (ciudadanos 7, 8, 9)
('2024-10-27 08:40:00', true, 7, 1, 3),
('2024-10-27 09:00:00', true, 8, 1, 3),
('2024-10-27 09:20:00', true, 9, 1, 3),

-- Salto - Circuito 4 (ciudadanos 10, 11, 12)
('2024-10-27 08:30:00', true, 10, 1, 4),
('2024-10-27 09:00:00', true, 11, 1, 4),
('2024-10-27 09:30:00', true, 12, 1, 4),

-- Paysandú - Circuito 5 (ciudadanos 13, 14, 15)
('2024-10-27 08:30:00', true, 13, 1, 5),
('2024-10-27 09:00:00', true, 14, 1, 5),
('2024-10-27 09:30:00', true, 15, 1, 5);


INSERT INTO voto_lista (voto_id, lista_id) VALUES 
-- Partido Nacional (8 votos)
(1, 1), (2, 1), (3, 1), (4, 1), (5, 1), (6, 1), (7, 1), (8, 1),
-- Partido Colorado (4 votos)
(9, 2), (10, 2), (11, 2), (12, 2),
-- Frente Amplio (2 votos)
(13, 3), (14, 3),
-- Cabildo Abierto (1 voto)
(15, 4),
-- Voto observado (ID 16) - Partido Independiente
(16, 5),

-- Montevideo Pocitos (circuito 2) - 18 votos  
-- Votos válidos (IDs 21-34): 6 FA, 4 PN, 3 PC, 1 PI
-- Frente Amplio (6 votos)
(21, 3), (22, 3), (23, 3), (24, 3), (25, 3), (26, 3),
-- Partido Nacional (4 votos)
(27, 1), (28, 1), (29, 1), (30, 1),
-- Partido Colorado (3 votos)
(31, 2), (32, 2), (33, 2),
-- Partido Independiente (1 voto)
(34, 5),

-- Maldonado (circuito 3) - 15 votos
-- Votos válidos (IDs 39-49): 5 PN, 3 FA, 2 PC, 1 CA
-- Partido Nacional (5 votos)
(39, 1), (40, 1), (41, 1), (42, 1), (43, 1),
-- Frente Amplio (3 votos)
(44, 3), (45, 3), (46, 3),
-- Partido Colorado (2 votos)
(47, 2), (48, 2),
-- Cabildo Abierto (1 voto)
(49, 4),
-- Voto observado (ID 50)
(50, 1),

-- Salto (circuito 4) - 12 votos
-- Votos válidos (IDs 54-62): 4 PN, 3 FA, 2 PC
-- Partido Nacional (4 votos)
(54, 1), (55, 1), (56, 1), (57, 1),
-- Frente Amplio (3 votos)
(58, 3), (59, 3), (60, 3),
-- Partido Colorado (2 votos)
(61, 2), (62, 2),

-- Paysandú (circuito 5) - 10 votos
-- Votos válidos (IDs 66-72): 3 PN, 2 FA, 2 PC
-- Partido Nacional (3 votos)
(66, 1), (67, 1), (68, 1),
-- Frente Amplio (2 votos)
(69, 3), (70, 3),
-- Partido Colorado (2 votos)
(71, 2), (72, 2);