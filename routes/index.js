const { Router } = require('express');
const router = Router();

const { getReportes, setReportes } = require('../controllers/index.controller')

router.get('/grupo-w/earthquakes', getReportes );
router.post('/grupo-w/earthquakes', setReportes );


module.exports = router;