const { Router } = require('express');
const router = Router();

const { getReportes, postReportes } = require('../controllers/index.controller')

router.get('/grupo-w/earthquakes', getReportes );
router.post('/grupo-w/earthquakes', postReportes );


module.exports = router;