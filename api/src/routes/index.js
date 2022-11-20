const { Router } = require('express');
const router = Router();
const movies = require('./movies.routes.js')
const movie = require('./movie.routes.js')

router.use('/movies', movies);

router.use('/movie', movie)

module.exports = router;