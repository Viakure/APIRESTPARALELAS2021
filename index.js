const cheerio = require('cheerio');
const request = require('request-promise');
const express = require('express');
const { Pool } = require('pg/lib');
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


}

init();