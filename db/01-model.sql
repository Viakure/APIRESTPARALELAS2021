CREATE DATABASE EARTHQUAKES;

--
--  Tabla para las credenciales
--
DROP TABLE IF EXISTS credentials CASCADE;
CREATE TABLE credentials(
    pk bigserial NOT NULL,
    token varchar(255) NOT NULL,
    app varchar(255) NOT NULL,
    password varchar(255) NOT NULL,
    active boolean DEFAULT '0',
    UNIQUE (token),
    PRIMARY KEY (pk)
);
CREATE UNIQUE INDEX ON credentials(UPPER(TRIM(both from app)));


--
--  Tabla para los registros de terremotos
--
DROP TABLE IF EXISTS earthquakes CASCADE;
CREATE TABLE earthquakes(
    id varchar(255) NOT NULL PRIMARY KEY,
    fecha_local timestamp with time zone NOT NULL,
    latitud double precision NOT NULL,
    longitud double precision NOT NULL,
    profundidad integer NOT NULL,
    magnitud double precision NOT NULL,
    referencia_geografica text collate pg_catalog."default" NOT NULL
);
CREATE UNIQUE INDEX ON earthquakes(UPPER(TRIM(both from id)));

--
-- Comando para insertar datos de prueba
--

-- \dt para ver las tablas
-- ALTER USER postgres PASSWORD '1234';