CREATE DATABASE EARTHQUAKES;

--
--  Tabla para los registros de temblores
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
-- \c earthquakes para conectarse a la base de datos
-- \dt para ver las tablas
-- ALTER USER postgres PASSWORD '1234';
-- Para iniciar postgres: sudo -u postgres psql