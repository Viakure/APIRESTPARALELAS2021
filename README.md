# APIREST Paralelas 2021
_API REST que se encarga de almacenar los datos de la pagina web sismologia.cl y los almacena en una base de datos, para luego enviar esa informaci贸n como JSON._

### Pre-requisitos 馃搵

```
Express JS
PostgreSQL
Insomnia
```

### Instalaci贸n 馃敡

_1. Clonar el repositorio del proyecto_

  _Se puede descargar directamente desde GitHub o clonar el repositorio_

```
git clone https://github.com/Viakure/APIRESTPARALELAS2021.git
```

_2. Instalar postgreSQL y construir la base de datos_

  _En una terminal de Ubuntu, se debe instalar postgreSQL con el siguiente comando_

```
sudo apt install postgresql postgresql-contrib
```
  _Luego de completar la instalaci贸n, se debe iniciar postgres mediante el comando a continuaci贸n_
  
```
sudo -u postgres psql
```
  _Posteriormente, se procede a crear la base de datos, siguiendo los comandos a continuaci贸n (uno por uno separado por guiones --)_
```
CREATE DATABASE EARTHQUAKES;
--
\c earthquakes
--
DROP TABLE IF EXISTS earthquakes CASCADE;
--
CREATE TABLE earthquakes(
    id varchar(255) NOT NULL PRIMARY KEY,
    fecha_local timestamp with time zone NOT NULL,
    latitud double precision NOT NULL,
    longitud double precision NOT NULL,
    profundidad integer NOT NULL,
    magnitud double precision NOT NULL,
    referencia_geografica text collate pg_catalog."default" NOT NULL
);
--
CREATE UNIQUE INDEX ON earthquakes(UPPER(TRIM(both from id)));
--
ALTER USER postgres PASSWORD '1234';
```
_3. Ejecutar el proyecto_

  _Se ejecuta el proyecto situando una terminal en la ruta donde se clon贸 el proyecto. En cuya terminal se debe escribir lo siguiente_

```
node index.js
```
  _A partir de la ejecuci贸n de ese comando, se inicializa el servidor que tiene como ruta, adem谩s, por consola se despliega un token alfanum茅rico, se debe copiar para utilizarlo posteriormente_
```
http://localhost:3000/grupo-w/earthquakes
```
  _En la siguiente ruta se encuentra la documentaci贸n del codigo._
```
http://localhost:3000//api-docs
```
_4. Visualizaci贸n de los datos_
  _Para visualizar los datos, se debe instalar el software Insomnia, mediante el siguiente comando_
```
sudo apt-get install insomnia

insomnia
```
  _Para ejecutar insomnia, simplemente se debe escribir insomnia en una terminal._
  _Posteriormente, en insomnia, seleccionaremos la opci贸n New Request (Ctrl+N), le asignamos un nombre a gusto y damos a Create._
  _Luego, en la barra de direcciones que se ubica en la zona superior del software, escribiremos la ruta http://localhost:3000/grupo-w/earthquakes seleccionando el m茅todo GET._
  _Si presionamos SEND, nos dir谩 que no hemos iniciado sesi贸n. Para ello, ocuparemos el token copiado anteriormente. Nos ubicaremos en la pesta帽a AUTH y clickearemos el icono de despliegue, aqu铆 se debe escoger la opci贸n Bearer Token. Luego en el formulario que dice Token, pegaremos el token antes copiado, y nuevamente presionaremos SEND._
  _Finalmente se nos despliegan los datos de los sismos._

## Construido con 馃洜锔?

* [JavaScript (Node.js/Express.js)] - El lenguaje de programacion usado
* [VisualStudioCode](https://maven.apache.org/) - Editor de texto utilizado
* [PostgreSQL] - Gestor de bases de datos utilizado

## Autores 鉁掞笍

* **Nicolas Ipinza** - [Viakure](https://github.com/Viakure)
* **Ian Poveda** - [IanPD97](https://github.com/IanPD97)
