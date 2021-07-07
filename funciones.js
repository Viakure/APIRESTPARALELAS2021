const request = require('request-promise');


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
export {recall};