const uploadMovies = require("../middleware/uploadMovies.js");
const fs = require("fs");
const { CSVtoJSON, containsMovie } = require("../utils/helpers.js");
const { Movie } = require("../entitys/Movie.js");
const dataSource = require("../dbConnection.js");
const { ILike } = require("typeorm");

module.exports = {
  getMovies: async (req, res) => {
    const { title } = req.query;

    if (!title) {
      try {
        const moviesInDB = await dataSource.getRepository(Movie).find();
        res.send(moviesInDB);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const movieInDB = await dataSource
          .getRepository(Movie)
          .findBy({ title: ILike(`%${title}%`) });
        res.send(movieInDB);
      } catch (error) {
        console.log(error);
      }
    }
  },

  postMovies: async (req, res) => {
    try {
      await uploadMovies(req, res);
      if (req.file == undefined) {
        return res.status(400).send({ message: "Upload a file please!" });
      }

      const data = fs.readFileSync(req.file.path, "utf8");
      const jsonData = CSVtoJSON(data);

      const moviesInDB = await dataSource
        .getRepository(Movie)
        .find({ select: ["title"] });

      jsonData.forEach(async (e) => {
        const isMovieDB = containsMovie(e, moviesInDB);

        if (!isMovieDB) {
          try {
            const movieToLoad = dataSource.getRepository(Movie).create(e);
            await dataSource.getRepository(Movie).save(movieToLoad);
          } catch (error) {
            console.log("Error saving movie :", error);
          }
        }
      });

      res.status(200).send({
        message:
          "The following file was uploaded successfully: " +
          req.file?.originalname,
      });
    } catch (err) {
      res.status(500).send({
        message: `Unable to upload the file: ${req.file?.originalname}. ${err}`,
      });
    }
  },
};
