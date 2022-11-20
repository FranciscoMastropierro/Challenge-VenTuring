const { Router } = require("express");
const router = Router();
const {getMovies, postMovies} = require('../controllers/movies.controllers.js');

router.get('/', getMovies)

router.post('/', postMovies)

module.exports = router;