const router = require('express').Router();
router.use('/', require('./swagger'));

router.get('/', (req, res) => { res. send('Welcome');});

// PASTE RIGHT HERE YOUR ROUTES

//TV shows route
router.use('/tvshows', require('./tvshows'));

//Reviews route
router.use('/reviews', require('./reviews'));

module.exports = router;