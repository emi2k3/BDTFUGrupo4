CREATE TABLE Ciudadano (
    id_ciudadano SERIAL PRIMARY KEY,
    primer_apellido VARCHAR(50),
    segundo_apellido VARCHAR(50),
    primer_nombre VARCHAR(50), 
    segundo_nombre VARCHAR(50),
    cedula VARCHAR(50) UNIQUE
);

CREATE TABLE Empleado_Publico (
    id_empleado_publico SERIAL PRIMARY KEY,
    organismo VARCHAR(50),
    rol VARCHAR(50), -- Esto lo hacemos con check o con trigger?
    fecha_nacimiento DATE
);

CREATE TABLE Candidato (
    id_candidato SERIAL PRIMARY KEY,
    organo VARCHAR(50),
    orden INTEGER 
);

CREATE TABLE Policia (
    id_policia SERIAL PRIMARY KEY
);

CREATE TABLE Credencial (
    id_credencial SERIAL PRIMARY KEY,
    serie VARCHAR(5),
    numero VARCHAR(5),
    UNIQUE (serie, numero) 
);

CREATE TABLE Partido_Politico (
    id_partido_politico SERIAL PRIMARY KEY
);

CREATE TABLE Voto (
    id_voto SERIAL PRIMARY KEY,
    fecha_hora TIMESTAMP,
    observado BOOLEAN,
    tipo VARCHAR(50) -- Lo mismo que antes, usamos check o trigger
);

CREATE TABLE Constancia_de_Voto (
    id_constancia SERIAL PRIMARY KEY
);

CREATE TABLE Lista (
    id_lista SERIAL PRIMARY KEY
);

CREATE TABLE Papeleta (
    id_papeleta SERIAL PRIMARY KEY
);

CREATE TABLE Eleccion (
    id_eleccion SERIAL PRIMARY KEY,
    fecha DATE,
    tipo VARCHAR(50)
);

CREATE TABLE Circuito (
    id_circuito SERIAL PRIMARY KEY,
    accesible BOOLEAN
);

CREATE TABLE Comisaria (
    id_comisaria SERIAL PRIMARY KEY
);

CREATE TABLE Departamento (
    id_departamento SERIAL PRIMARY KEY
);

CREATE TABLE Localidad (
    id_localidad SERIAL PRIMARY KEY
);

CREATE TABLE Zona (
    id_zona SERIAL PRIMARY KEY
);

CREATE TABLE Mesa (
    id_mesa SERIAL PRIMARY KEY
);

CREATE TABLE Establecimiento (
    id_establecimiento SERIAL PRIMARY KEY,
    nombre VARCHAR(50),
    calle VARCHAR(50),
    num_puerta VARCHAR(50)
);
