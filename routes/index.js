const { Router } = require('express');
const router = Router();
const auth = require('../Services/index')

const { getReportes, postReportes, postPrueba } = require('../controllers/index.controller')

router.get('/grupo-w/earthquakes'/*,auth.verificar_token*/, getReportes);
router.post('/grupo-w/aaaaa', postReportes );
router.post('/grupo-w/earthquakes', postPrueba);


module.exports = router;