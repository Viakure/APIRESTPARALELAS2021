const cheerio = require('cheerio');
const request = require('request-promise');
const express = require('express');
const app = express();


//  middlewares
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//  routes
app.use(require('./routes/index'));

app.listen(3000);
console.log('Server on port 3000');

async function init()
{
    const $ = await request({
        uri: 'http://www.sismologia.cl/links/ultimos_sismos.html',
        transform: body => cheerio.load(body)
    });
    fecha_local = [];
    latitud = [];
    longitud = [];
    profundidad = [];
    magnitud = [];
    referencia_geografica = [];

    const table = $('tr').each((i, el) => {
        const llenado = $(el).find('td').each((j, la) => {
            if (j == 0){fecha_local.push($(la).text())}
            if (j == 1){}  
            if (j == 2){latitud.push($(la).text())}
            if (j == 3){longitud.push($(la).text())}
            if (j == 4){profundidad.push(parseInt($(la).text(),10))}
            if (j == 5){magnitud.push(parseFloat($(la).text()))}
            if (j == 6){}
            if (j == 7){referencia_geografica.push($(la).text())}
        });
    });
    const largo = fecha_local.length;
    for (var i = 0; i < largo; i++){
        console.log(magnitud[i]);
    }
}

init();