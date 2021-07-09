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
    res.status(200).json(response.rows);
};

const postReportes = async (req,res) => {
    console.log(req.body);
    res.send('Datos insertados en la base de datos');
    
    /*id = [];
    fecha_local = [];
    latitud = [];
    longitud = [];
    profundidad = [];
    magnitud = [];
    referencia_geografica = [];
    const table = $('tr').each((i, el) => {
        const llenado = $(el).find('td').each((j, la) => {
            if (j == 0){fecha_local.push($(la).text()),id.push($(la).text())}
            if (j == 2){latitud.push($(la).text())}
            if (j == 3){longitud.push($(la).text())}
            if (j == 4){profundidad.push(parseInt($(la).text(),10))}
            if (j == 5){magnitud.push(parseFloat($(la).text()))}
            if (j == 7){referencia_geografica.push($(la).text())} 
        });
    });
    const largo = fecha_local.length;
    for (var i = 0; i < largo; i++){
        //console.log(magnitud[i]);
        const response = await pool.query('INSERT INTO earthquakes (id, fecha_local, latitud, longitud, profundidad, magnitud, referencia_geografica) VALUES ($1, $2 ,$3 ,$4 ,$5 ,$6 , $7)' , [id[i], fecha_local[i],latitud[i],longitud[i],profundidad[i],magnitud[i],referencia_geografica[i]]);
    }*/
}

const postPrueba = async (req,res) => {
    const $ = await request({
        uri: 'http://www.sismologia.cl/links/ultimos_sismos.html',
        transform: body => cheerio.load(body)
    });
    const {id, fecha_local, latitud, longitud, profundidad, magnitud, referencia_geografica} = req.body
    const existencia = await pool.query('select id from earthquakes where id = $1',[id]);
    console.log('se ejecutó postPrueba');
    if (existencia.rowCount==1)
    {   console.log('YA EXISTE ID');}
    else{
    try{
        const response = await pool.query('INSERT INTO earthquakes (id, fecha_local, latitud, longitud, profundidad, magnitud, referencia_geografica) VALUES ($1, $2 ,$3 ,$4 ,$5 ,$6 , $7)' , [id, fecha_local,latitud,longitud,profundidad,magnitud,referencia_geografica]);
    
        if(response){
            res.json({
                message: 'creado con exito'
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
    /* const largo = fecha_local.length;
    for (var i = 0; i < largo; i++){
        console.log(magnitud[i]);
        const response = await pool.query('INSERT INTO earthquakes (id, fecha_local, latitud, longitud, profundidad, magnitud, referencia_geografica) VALUES ($1, $2 ,$3 ,$4 ,$5 ,$6 , $7)' , [fecha_local[i], fecha_local[i],latitud[i],longitud[i],profundidad[i],magnitud[i],referencia_geografica[i]]);
    } */
}


module.exports = {
    getReportes,
    postReportes,
    postPrueba
}
