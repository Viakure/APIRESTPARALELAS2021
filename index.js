const cheerio = require('cheerio');
const request = require('request-promise');
const express = require('express');
const { Pool } = require('pg/lib');
const app = express();
const {webScraping} = require('./funciones');
const { crear_token } = require('./Services/index');
const swagger = require('./swagger.json');
const swaggerUi = require('swagger-ui-express');

async function recall (obj) 
{  
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
            console.log('Error inesperado', error)
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
    console.log('se ejecutó la función init primera vez');
    var func = async function init(){
        let obj = await webScraping();
        recall(obj);
        console.log('se ejecutó la función init 30min');
    };
    setInterval(func,180000);
    //crear_token();
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swagger))
    console.log(swagger);
}

init();
