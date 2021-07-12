const cheerio = require('cheerio');
const request = require('request-promise');
const express = require('express');

const app = express();

const {Pool} = require('pg');

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: '1234',
    database: 'earthquakes',
    port: '5432'
});

const getReportes = async (req,res) => {
    const response = await pool.query('SELECT * FROM earthquakes ORDER BY fecha_local DESC;');
    //console.log(response.rows);

    res.status(200).json(response.rows);
};

const postReportes = async (req,res) => {
    console.log(req.body);
    res.send('Datos insertados en la base de datos');
}

const postPrueba = async (req,res) => {
    const $ = await request({
        uri: 'http://www.sismologia.cl/links/ultimos_sismos.html',
        transform: body => cheerio.load(body)
    });
    const {id, fecha_local, latitud, longitud, profundidad, magnitud, referencia_geografica} = req.body
    const existencia = await pool.query('select id from earthquakes where id = $1',[id]);
    //console.log('se ejecutó postPrueba');
    if (existencia.rowCount==1)
    {   /*console.log('YA EXISTE ID');*/}
    else{
    try{
        const response = await pool.query('INSERT INTO earthquakes (id, fecha_local, latitud, longitud, profundidad, magnitud, referencia_geografica) VALUES ($1, $2 ,$3 ,$4 ,$5 ,$6 , $7)' , [id, fecha_local,latitud,longitud,profundidad,magnitud,referencia_geografica]);
    
        if(response){
            res.json({
                message: 'Creado con exito'
            })
        }    
    }
    catch(error){
        console.log(error);
        res.json({
            message: error
            })
        }    
    }   
}


module.exports = {
    getReportes,
    postReportes,
    postPrueba
}
