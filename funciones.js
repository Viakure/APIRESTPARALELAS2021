const express = require('express');
const request = require('request-promise');
const cheerio = require('cheerio');

const funciones = express()

async function webScraping(){
    const $ = await request({
        uri: 'http://www.sismologia.cl/links/ultimos_sismos.html',
        transform: body => cheerio.load(body)
    });
    id = [];
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
    console.log('se ejecutó la función webScraping');
    const data = [id,fecha_local, latitud, longitud, profundidad, magnitud, referencia_geografica];
    return data;
}

module.exports ={ 
    webScraping,
    token_secreto: 'mi_token',
    usuario: 'nico',
};