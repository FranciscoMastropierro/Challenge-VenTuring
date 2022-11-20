const { DataSource } = require('typeorm');
require("dotenv").config();

const myDataSource = new DataSource({
    type: "mariadb",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: "venturing_movies",
    entities: ["src/entitys/Movie.js"],
    logging: true,
    synchronize: true,
})

module.exports = myDataSource;