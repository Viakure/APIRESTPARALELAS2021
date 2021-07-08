const cheerio = require('cheerio');
const request = require('request-promise');
const express = require('express');
const { Pool } = require('pg/lib');
const app = express();
const {webScraping} = require('./funciones');

async function recall (obj) 
{   
    // ESTA FUNCION DEBE ITERAR CADA REGISTRO QUE SE ENCUENTRE EN EL PARAMETRO obj
    // EN INIT ---> let obj = await webScraping();
    //         ---> recall(obj) 
    // 
    //
    let options = 
    {
        method: 'POST',
        uri: 'http://localhost:3000/grupo-w/earthquakes',
        body: {
            // DATOS ACA
            // id_registro = obj[0][i]
            // fecha_local = obj[0][i]
            // ....
        },
        json: true,
    };
    request(options)
    .then(function(parsedBody){
        console.log('Registro creado', parsedBody)
    })
    .catch(function(error){
        console.log('eror inesperado UwU', error)
    })
};


//  middlewares
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//  routes
app.use(require('./routes/index'));

app.listen(3000);
console.log('Server on port 3000');


async function init()
{
    let aux = await webScraping();
    console.log(aux[5][14])

    /* setInterval(async() => {
        
    }, 5000) */
}

init();