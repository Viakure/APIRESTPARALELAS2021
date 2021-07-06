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
    id SERIAL PRIMARY KEY,
    fecha_local timestamp NOT NULL,
    latitud double precision NOT NULL,
    longitud double precision NOT NULL,
    profundidad integer NOT NULL,
    magnitud double precision NOT NULL,
    referencia_geografica text collate pg_catalog."default" NOT NULL
);

INSERT INTO earthquakes (fecha_local, latitud, longitud, profundidad, magnitud, referencia_geografica) VALUES
    ('2021/07/05 23:48:08',	'-21.741',	'-68.414',	'136',	'3.5',	'60 km al S de Ollagüe'),
    ('2021/07/05 22:00:12',	'-29.064',	'-70.034',	'128',	'3.0',	'56 km al SE de Alto del Carmen');