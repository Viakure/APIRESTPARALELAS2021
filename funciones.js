const express = require('express');
const request = require('request-promise');
const cheerio = require('cheerio');

const funciones = express()

function es_bisiesto(year){
	return ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) ? true : false;
}

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
            if (j == 0){
                id.push($(la).text());
                const date = new String ($(la).text());
                const dia = date.charAt(8) + date.charAt(9);
                const hora = date.charAt(11) + date.charAt(12);
                const mes = date.charAt(5) + date.charAt(6);
                const año = date.charAt(0) + date.charAt(1) + date.charAt(2) + date.charAt(3);
                var mes_int = parseInt(mes);
                var dia_int = parseInt(dia);
                var hora_int = parseInt(hora);
                var año_int = parseInt(año);
                hora_int = hora_int-4;
                if (hora_int<0)
                {
                    dia_int--;
                    hora_int = hora_int+24;
                    if (dia_int<1)
                    {
                        mes_int--;
                        if (mes_int == 1 || mes_int == 3 || mes_int == 5 || mes_int == 7 || mes_int == 8 || mes_int == 10 || mes_int == 12)
                        {
                            dia_int = dia_int+31;
                        }
                        if (mes_int == 4 || mes_int == 6 || mes_int == 9 || mes_int == 11 )
                        {
                            dia_int = dia_int+30;
                        }
                        if (mes_int == 2 || es_bisiesto(año_int)== true)
                        {
                            dia_int = dia_int+29;
                        }
                        if (mes_int == 2 || es_bisiesto(año_int)== false)
                        {
                            dia_int = dia_int+28;
                        }
                        if (mes_int<1)
                        {
                            año_int--;
                            mes_int = mes_int + 12;
                        }
                    }
                }
                if (mes_int<10)
                {
                    var mes_new = new String('0' + mes_int.toString());
                }
                if (mes_int>=10)
                {
                    var mes_new = new String(mes_int.toString());
                }
                if (dia_int<10)
                {
                    var dia_new = new String('0' + dia_int.toString());
                }
                if (dia_int>=10)
                {
                    var dia_new = new String(dia_int.toString());
                }
                if (hora_int<10)
                {
                    var hora_new = new String('0' + hora_int.toString());
                }
                if (hora_int>=10)
                {
                    var hora_new = new String(hora_int.toString());
                }
                var date_new = new String(año_int.toString()+'/'+mes_new+'/'+dia_new+' '+hora_new+date.charAt(13)+date.charAt(14)+date.charAt(15)+date.charAt(16)+date.charAt(17)+date.charAt(18));
                fecha_local.push(date_new);
            }
            if (j == 2){latitud.push($(la).text())}
            if (j == 3){longitud.push($(la).text())}
            if (j == 4){profundidad.push(parseInt($(la).text(),10))}
            if (j == 5){magnitud.push(parseFloat($(la).text()))}
            if (j == 7){referencia_geografica.push($(la).text())} 
        });
    });
    request.end;
    console.log('se ejecutó la función webScraping');
    const data = [id,fecha_local, latitud, longitud, profundidad, magnitud, referencia_geografica];
    return data;
}

module.exports ={ 
    webScraping,
    token_secreto: 'rkpT4!H?*eH3nUQwbAbyF4&6q3EzVR',
    usuario: 'usuario',
};