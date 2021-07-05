const cheerio = require('cheerio');
const request = require('request-promise');

async function init()
{
    const $ = await request({
        uri: 'http://www.sismologia.cl/links/ultimos_sismos.html',
        transform: body => cheerio.load(body)
    });
    fecha_local = [];
    fecha_UTC = [];
    latitud = [];
    longitud = [];
    profundidad = [];
    magnitud = [];
    agencia = [];
    referencia_geografica = [];

    const table = $('tr').each((i, el) => {
        const llenado = $(el).find('td').each((j, la) => {
            if (j == 0){fecha_local.push($(la).text())}
            if (j == 1){fecha_UTC.push($(la).text())}
            if (j == 2){latitud.push($(la).text())}
            if (j == 3){longitud.push($(la).text())}
            if (j == 4){profundidad.push($(la).text())}
            if (j == 5){magnitud.push($(la).text())}
            if (j == 6){agencia.push($(la).text())}
            if (j == 7){referencia_geografica.push($(la).text())}
        });
    });
    const largo = fecha_local.length;
    for (var i = 0; i < largo; i++){
        console.log(agencia[i]);
    }
}

init();