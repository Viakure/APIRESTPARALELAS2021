

const {Pool} = require('pg');

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: '1234',
    database: 'earthquakes',
    port: '5432'
});


const getReportes = async (req,res) => {
    const response = await pool.query('SELECT * FROM earthquakes;');
    res.status(200).json(response.rows);
};

const setReportes = async (req,res) => {
    console.log(req.body);
    res.send('Registro creado con éxito');
}


module.exports = {
    getReportes,
    setReportes
}