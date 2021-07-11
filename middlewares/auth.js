const jwt = require('jwt-simple')
const moment = require('moment')
const funciones = require('../funciones')

function es_valido(req, res, next)
{
    if(!req.headers.authorization)
    {
        return res.status(403).send({ message: 'No tienes autorizacion'});
    }

    const token = req.headers.authorization.split(" ")[1];
    const payload = jwt.decode(token, funciones.token_secreto);
    next()
}

module.exports = es_valido;

