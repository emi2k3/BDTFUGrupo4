CREATE TABLE "ciudadanos" (
  "id" serial,
  "ci" int UNIQUE,
  "primer_nombre" varchar(20),
  "segundo_nombre" varchar(20),
  "primer_apellido" varchar(20),
  "segundo_apellido" varchar(20),
  "mayor_edad" boolean,
  "id_credencial" int,
  PRIMARY KEY ("id")
);

CREATE TABLE "credenciales" (
  "id" serial PRIMARY KEY,
  "serie" varchar(3),
  "numero" int,
  UNIQUE ("serie", "numero")
);

CREATE TABLE "lista_credenciales" (
  "id" serial PRIMARY KEY,
  "id_credencial" int,
  "id_circuito" int
);

CREATE TABLE "empleados_publicos" (
  "id" serial PRIMARY KEY,
  "organismo" varchar(50),
  "rol" varchar(50) CHECK ("rol" IN ('presidente', 'secretario', 'vocal')),
  "fecha_nacimiento" date,
  "id_mesa" int,
  "id_ciudadano" int
);

CREATE TABLE "policias" (
  "id" serial PRIMARY KEY,
  "id_ciudadano" int,
  "id_comisaria" int
);

CREATE TABLE "candidatos" (
  "id" serial PRIMARY KEY,
  "id_ciudadano" int,
  "id_partido_politico" int,
  "organo" varchar(50),
  "orden" int
);

CREATE TABLE "votos" (
  "id" serial PRIMARY KEY,
  "estado" varchar(20) CHECK ("estado" IN ('valido', 'anulado', 'en blanco')),
  "observado" boolean,
  "fecha_hora" timestamp,
  "id_circuito" int,
  "id_tipo_anulacion" int
);

CREATE TABLE "tipo_anulacion" (
  "id" serial PRIMARY KEY,
  "nombre" varchar(50),
  "descripcion" text
);

CREATE TABLE "listas" (
  "id" serial PRIMARY KEY,
  "id_eleccion" int,
  "id_partido_politico" int
);

CREATE TABLE "papeletas" (
  "id" serial PRIMARY KEY,
  "valor" varchar(10),
  "color" varchar(20)
);

CREATE TABLE "constancias_voto" (
  "id" serial PRIMARY KEY,
  "fecha_hora" timestamp,
  "voto" boolean,
  "id_ciudadano" int,
  "id_eleccion" int,
  "id_circuito" int
);

CREATE TABLE "elecciones" (
  "id" serial PRIMARY KEY,
  "fecha" date,
  "tipo" varchar(50)
);

CREATE TABLE "voto_lista" (
  "voto_lista_id" serial PRIMARY KEY,
  "voto_id" int,
  "lista_id" int
);

CREATE TABLE "voto_papeleta" (
  "voto_papeleta_id" serial PRIMARY KEY,
  "voto_id" int,
  "papeleta_id" int
);

CREATE TABLE "departamentos" (
  "id" serial PRIMARY KEY,
  "nombre" varchar(100)
);

CREATE TABLE "localidades" (
  "id" serial PRIMARY KEY,
  "tipo" varchar(50),
  "nombre" varchar(50)
);

CREATE TABLE "zonas" (
  "id" serial PRIMARY KEY,
  "nombre" varchar(100)
);

CREATE TABLE "direcciones" (
  "id" serial PRIMARY KEY,
  "calle" varchar(255),
  "numero" int,
  "id_departamento" int,
  "id_localidad" int,
  "id_zona" int
);

CREATE TABLE "comisarias" (
  "id" serial PRIMARY KEY,
  "nombre" varchar(50),
  "id_direccion" int
);

CREATE TABLE "establecimientos" (
  "id" serial PRIMARY KEY,
  "nombre" varchar(100),
  "tipo" varchar(50),
  "id_direccion" int
);

CREATE TABLE "circuitos" (
  "id" serial PRIMARY KEY,
  "accesible" boolean,
  "numero" int,
  "id_establecimiento" int,
  "id_mesa" int
);

CREATE TABLE "mesas" (
  "id" serial PRIMARY KEY,
  "numero_identificacion" varchar(50) UNIQUE,
  "fecha_apertura" timestamp,
  "fecha_cierre" timestamp,
  "abierta" boolean
);

CREATE TABLE "partidos_politicos" (
  "id" serial PRIMARY KEY,
  "nombre" varchar(100),
  "sigla" varchar(10),
  "id_presidente" int,
  "id_vicepresidente" int,
  "id_direccion" int
);

CREATE TABLE "partido_candidato" (
  "partido_id" int,
  "candidato_id" int
);

CREATE TABLE "integrantes_lista" (
  "id" serial PRIMARY KEY,
  "id_lista" int,
  "id_candidato" int
);



ALTER TABLE "empleados_publicos" ADD FOREIGN KEY ("id_ciudadano") REFERENCES "ciudadanos" ("id");

ALTER TABLE "policias" ADD FOREIGN KEY ("id_ciudadano") REFERENCES "ciudadanos" ("id");

ALTER TABLE "candidatos" ADD FOREIGN KEY ("id_ciudadano") REFERENCES "ciudadanos" ("id");

ALTER TABLE "ciudadanos" ADD FOREIGN KEY ("id_credencial") REFERENCES "credenciales" ("id");

ALTER TABLE "empleados_publicos" ADD FOREIGN KEY ("id_mesa") REFERENCES "mesas" ("id");

ALTER TABLE "votos" ADD FOREIGN KEY ("id_tipo_anulacion") REFERENCES "tipo_anulacion" ("id");

ALTER TABLE "votos" ADD FOREIGN KEY ("id_circuito") REFERENCES "circuitos" ("id");

ALTER TABLE "constancias_voto" ADD FOREIGN KEY ("id_ciudadano") REFERENCES "ciudadanos" ("id");

ALTER TABLE "voto_lista" ADD FOREIGN KEY ("voto_id") REFERENCES "votos" ("id");

ALTER TABLE "voto_lista" ADD FOREIGN KEY ("lista_id") REFERENCES "listas" ("id");

ALTER TABLE "voto_papeleta" ADD FOREIGN KEY ("voto_id") REFERENCES "votos" ("id");

ALTER TABLE "voto_papeleta" ADD FOREIGN KEY ("papeleta_id") REFERENCES "papeletas" ("id");

ALTER TABLE "listas" ADD FOREIGN KEY ("id_eleccion") REFERENCES "elecciones" ("id");

ALTER TABLE "listas" ADD FOREIGN KEY ("id_partido_politico") REFERENCES "partidos_politicos" ("id");

ALTER TABLE "partido_candidato" ADD FOREIGN KEY ("partido_id") REFERENCES "partidos_politicos" ("id");

ALTER TABLE "partido_candidato" ADD FOREIGN KEY ("candidato_id") REFERENCES "candidatos" ("id");

ALTER TABLE "policias" ADD FOREIGN KEY ("id_comisaria") REFERENCES "comisarias" ("id");

ALTER TABLE "establecimientos" ADD FOREIGN KEY ("id_direccion") REFERENCES "direcciones" ("id");

ALTER TABLE "circuitos" ADD FOREIGN KEY ("id_establecimiento") REFERENCES "establecimientos" ("id");

ALTER TABLE "direcciones" ADD FOREIGN KEY ("id_departamento") REFERENCES "departamentos" ("id");

ALTER TABLE "direcciones" ADD FOREIGN KEY ("id_localidad") REFERENCES "localidades" ("id");

ALTER TABLE "direcciones" ADD FOREIGN KEY ("id_zona") REFERENCES "zonas" ("id");

ALTER TABLE "candidatos" ADD FOREIGN KEY ("id_partido_politico") REFERENCES "partidos_politicos" ("id");

ALTER TABLE "comisarias" ADD FOREIGN KEY ("id_direccion") REFERENCES "direcciones" ("id");

ALTER TABLE "lista_credenciales" ADD FOREIGN KEY ("id_circuito") REFERENCES "circuitos" ("id");

ALTER TABLE "lista_credenciales" ADD FOREIGN KEY ("id_credencial") REFERENCES "credenciales" ("id");

ALTER TABLE "circuitos" ADD FOREIGN KEY ("id_mesa") REFERENCES "mesas" ("id");

ALTER TABLE "constancias_voto" ADD FOREIGN KEY ("id_eleccion") REFERENCES "elecciones" ("id");

ALTER TABLE "constancias_voto" ADD FOREIGN KEY ("id_circuito") REFERENCES "circuitos" ("id");

ALTER TABLE "integrantes_lista" ADD FOREIGN KEY ("id_candidato") REFERENCES "candidatos" ("id");

ALTER TABLE "integrantes_lista" ADD FOREIGN KEY ("id_lista") REFERENCES "listas" ("id");

ALTER TABLE "partidos_politicos" ADD FOREIGN KEY ("id_presidente") REFERENCES "ciudadanos" ("id");

ALTER TABLE "partidos_politicos" ADD FOREIGN KEY ("id_vicepresidente") REFERENCES "ciudadanos" ("id");

ALTER TABLE "partidos_politicos" ADD FOREIGN KEY ("id_direccion") REFERENCES "direcciones" ("id");
