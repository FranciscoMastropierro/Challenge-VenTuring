const { DataSource } = require('typeorm');

const myDataSource = new DataSource({
    type: "mariadb",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "1267772",
    database: "venturing_movies",
    entities: ["src/entitys/Movie.js"],
    logging: true,
    synchronize: true,
})

module.exports = myDataSource;