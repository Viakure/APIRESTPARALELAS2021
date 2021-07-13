const cheerio = require('cheerio');
const request = require('request-promise');
const express = require('express');

const app = express();

const { Pool } = require('pg');

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: '1234',
    database: 'earthquakes',
    port: '5432'
});

const getReportes = async (req, res) => {
    try {
        const response = await pool.query('SELECT * FROM earthquakes ORDER BY fecha_local DESC;');
        res.status(200).json(response.rows);
    }
    catch (err) {
        var date = new Date()
        date = date.toLocaleString('es-CL')
        res.status(404).json({ message: "Error en el servidor", date: date })
    }
};

const postReportes = async (req, res) => {
    console.log(req.body);
    res.send('Datos insertados en la base de datos');
}

const postPrueba = async (req, res) => {
    const $ = await request({
        uri: 'http://www.sismologia.cl/links/ultimos_sismos.html',
        transform: body => cheerio.load(body)
    });
    const { id, fecha_local, latitud, longitud, profundidad, magnitud, referencia_geografica } = req.body
    const existencia = await pool.query('select id from earthquakes where id = $1', [id]);
    if (existencia.rowCount == 1) { }
    else {
        try {
            const response = await pool.query('INSERT INTO earthquakes (id, fecha_local, latitud, longitud, profundidad, magnitud, referencia_geografica) VALUES ($1, $2 ,$3 ,$4 ,$5 ,$6 , $7)', [id, fecha_local, latitud, longitud, profundidad, magnitud, referencia_geografica]);

            if (response) {
                res.status(200).json({message: 'Creado con exito'})
            }
        }
        catch (error) {
            var date = new Date()
            date = date.toLocaleString('es-CL')
            res.status(404).json({ message: "Error en el servidor", date: date })
        }
    }
}


module.exports = {
    getReportes,
    postReportes,
    postPrueba
}
