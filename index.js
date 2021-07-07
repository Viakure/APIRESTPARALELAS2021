const cheerio = require('cheerio');
const request = require('request-promise');
const express = require('express');
const { Pool } = require('pg/lib');
const app = express();
//import {recall} from "./funciones";

async function recall () 
{
    let options = 
    {
        method: 'POST',
        uri: 'http://localhost:3000/grupo-w/earthquakes',
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


function init()
{
    setInterval(async() => {
        recall();
    }, 3000)
}

init();