const { Router } = require('express');
const router = Router();

const { getReportes, postReportes, postPrueba } = require('../controllers/index.controller')

router.get('/grupo-w/earthquakes', getReportes );
router.post('/grupo-w/earthquakes', postReportes );
router.post('/grupo-w/prueba', postPrueba);


module.exports = router;