const { Router } = require('express');
const router = Router();

const { getReportes, setReportes } = require('../controllers/index.controller')

router.get('/reportes', getReportes );
router.post('/reportes', setReportes );


module.exports = router;