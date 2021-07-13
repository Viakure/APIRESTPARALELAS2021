# APIREST Paralelas 2021
_API REST que se encarga de almacenar los datos de la pagina web sismologia.cl y los almacena en una base de datos, para luego enviar esa información como JSON._

### Pre-requisitos 📋

```
PostgreSQL
Insomnia
```

### Instalación 🔧

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
  _Luego de completar la instalación, se debe iniciar postgres mediante el comando a continuación_
  
```
sudo -u postgres psql
```
  _Posteriormente, se procede a crear la base de datos, siguiendo los comandos a continuación (uno por uno separado por guiones --)_
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

  _Se ejecuta el proyecto situando una terminal en la ruta donde se clonó el proyecto. En cuya terminal se debe escribir lo siguiente_

```
node index.js
```
  _A partir de la ejecución de ese comando, se inicializa el servidor que tiene como ruta, además, por consola se despliega un token alfanumérico, se debe copiar para utilizarlo posteriormente_
```
http://localhost:3000/grupo-w/earthquakes
```
_4. Visualización de los datos_
  _Para visualizar los datos, se debe instalar el software Insomnia, mediante el siguiente comando_
```
sudo apt-get install insomnia

insomnia
```
  _Para ejecutar insomnia, simplemente se debe escribir insomnia en una terminal_
  _Posteriormente, en insomnia, seleccionaremos la opción New Request (Ctrl+N), le asignamos un nombre a gusto y damos a Create._
  _Luego, en la barra de direcciones que se ubica en la zona superior del software, escribiremos la ruta http://localhost:3000/grupo-w/earthquakes seleccionando el método GET_
  _Si presionamos SEND, nos dirá que no hemos iniciado sesión. Para ello, ocuparemos el token copiado anteriormente. Nos ubicaremos en la pestaña AUTH y clickearemos el icono de despliegue, aquí se debe escoger la opción Bearer Token. Luego en el formulario que dice Token, pegaremos el token antes copiado, y nuevamente presionaremos SEND._
  _Finalmente se nos despliegan los datos de los sismos_

## Construido con 🛠️

* [JavaScript (Node.js/Express.js)] - El lenguaje de programacion usado
* [VisualStudioCode](https://maven.apache.org/) - Editor de texto utilizado
* [PostgreSQL] - Gestor de bases de datos utilizado

## Autores ✒️

* **Nicolas Ipinza** - [Viakure](https://github.com/Viakure)
* **Ian Poveda** - [IanPD97](https://github.com/IanPD97)
