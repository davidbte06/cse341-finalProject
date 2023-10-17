const express = require('express');
const passport = require('passport');
const router = express.Router();

// Serve static files from the 'public' directory
router.use(express.static('public'));

router.use('/', require('./swagger'));

// Users route
router.use('/users', require('./users'));

// Movies route
router.use('/movies', require('./movies'));

// TV shows route
router.use('/tvshows', require('./tvshows'));

// Reviews route
router.use('/reviews', require('./reviews'));

router.get('/login', passport.authenticate('github'), (req, res) => {});

router.get('/logout', function (req, res, next) {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
});

// router.get('/', (req, res) => { res.send('Welcome'); });

module.exports = router;
