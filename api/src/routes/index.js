const { Router } = require('express');
const router = Router();
const movies = require('./movies.routes.js')
const movie = require('./movie.routes.js')

router.use('/api/movies', movies);

router.use('/api/movie', movie)

module.exports = router;