const {Movie} = require('../entitys/Movie.js')
const dataSource = require('../dbConnection.js');
const  { Equal } = require('typeorm');
const { containsMovie } = require('../utils/helpers.js')

module.exports = { 
    getMovie : async (req, res) => {
        const { id } = req.body;
        try {
          const movie = await dataSource
            .getRepository(Movie)
            .findBy({ id: Equal(id) });
          res.send(movie);
        } catch (error) {
          console.log(error);
        }
    },
    
    addMovie : async (req, res) => {
        const movie = req.body;
        try {
            const moviesInDB = await dataSource
            .getRepository(Movie)
            .find({ select: ['title', 'id'] });  

          const isMovieDB = containsMovie(movie, moviesInDB);
          if(!isMovieDB) {
            const movieCreated = dataSource.getRepository(Movie).create(movie);
            await dataSource
                .getRepository(Movie).save(movieCreated);
            res.send(movieCreated);
          } else {
            res.status(404).send({message: `Ya existe una pelicula con ese titulo: ${movie.title}`});
          }  
          
        } catch (error) {
          console.log(error);
        }
    },

    editMovie : async (req, res) => {
      const movie = req.body;
      try {
        const moviesInDB = await dataSource
        .getRepository(Movie)
        .find({ select: ['title', 'id'] });  

      const isMovieDB = containsMovie(movie, moviesInDB);
      if(!isMovieDB) {
        await dataSource
        .createQueryBuilder()
        .update(Movie)
        .set(movie)
        .where('id = :id', { id: movie.id })
        .execute();
        res.send({ message: 'Movie updated!' });
      } else {
        res.status(404).send({message: `Ya existe una pelicula con ese titulo: ${movie.title}`});
      }  
      
    } catch (error) {
      console.log(error);
    }
    },

    deleteMovie: async (req, res) => {
      const movie = req.body;
      try {
        await dataSource
          .getRepository(Movie)
          .createQueryBuilder()
          .delete()
          .where("id = :id", { id: movie.id })
          .execute();

        res.send({ message: "Movie deleted!" });
      } catch (error) {
        console.log(error);
      }
    }
}