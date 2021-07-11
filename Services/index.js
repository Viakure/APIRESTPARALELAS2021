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
    const bearer_header = req.headers['authorization'];
    const bearer = bearer_header.split(" ");
    const bearerToken = bearer[1];
    const token = bearerToken;
    jwt.verify(token, funciones.token_secreto, function (err) {
        try {
            if (err) {
                res.status(401).send({ message: 'No tienes autorizacion' })
            }
            const decodificado = jwt.verify(token, funciones.token_secreto);
            req.user = decodificado.user;
            next();
        } catch(err) {
            console.log('TRYCATCH---------------------------->',err)
        }
    })
}

module.exports = { crear_token, verificar_token };