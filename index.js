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
    console.log('se ejecutó la función recall');
    const largo = obj[0].length;
    for (var i = 0; i<largo; i++)
    {
        let options = 
        {
            method: 'POST',
            uri: 'http://localhost:3000/grupo-w/earthquakes',
            body: 
            {
                // DATOS ACA
                id: obj[0][i],
                fecha_local: obj[1][i],
                latitud: obj[2][i],
                longitud: obj[3][i],
                profundidad: obj[4][i],
                magnitud: obj[5][i],
                referencia_geografica: obj[6][i],
            },
            json: true,
        };
        request(options)
        .then(function(parsedBody)
        {
        console.log('Registro creado', parsedBody)
        })
        .catch(function(error)
        {
            console.log('eror inesperado UwU', error)
        })
    };
}


//  middlewares
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//  routes
app.use(require('./routes/index'));

app.listen(3000);
console.log('Server on port 3000');


async function init()
{
    let obj = await webScraping();
    recall(obj);
    setInterval(async() => {}, 3000);
    console.log('se ejecutó la función init');
}

init();