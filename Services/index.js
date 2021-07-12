const jwt = require('jsonwebtoken')
const moment = require('moment')
const funciones = require('../funciones')

async function crear_token(req, res, next) {
    let username = 'nico';
    const token = jwt.sign({ user: username }, funciones.token_secreto);
    const decodificado = jwt.verify(token, funciones.token_secreto);
    console.log(token);

}

function verificar_token(req, res, next) {
    try {
        const bearer_header = req.headers['authorization'];
        if (typeof bearer_header != 'undefined') {
            const bearer = bearer_header.split(" ");
            const bearerToken = bearer[1];
            const token = bearerToken;
            jwt.verify(token, funciones.token_secreto, function (err) {

                if (err) {
                    var date = new Date()
                    date = date.toLocaleString('es-CL')
                    res.status(401).json({ message: 'No tienes autorizacion para acceder a la informacion', date: date})
                }
                else{
                const decodificado = jwt.verify(token, funciones.token_secreto);
                req.user = decodificado.user;
                next();
                }
            })
        }
        else {
            var date = new Date()
            date = date.toLocaleString('es-CL')
            res.status(403).json({ message: "No ha iniciado sesion", date: date})
        }
    }
    catch(err){
        var date = new Date()
        date = date.toLocaleString('es-CL')
        res.status(500).json({ message: "Ha ocurrido un error inesperado", date: date})
    }

}

module.exports = { crear_token, verificar_token };