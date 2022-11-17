const { EntitySchema } = require('typeorm');

const Movie = new EntitySchema({
    name: "movie",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: "increment",
        },
        title: {
            type: String,
            length: 30,
        },
        description: {
            type: String,
            length: 100,
            nullable: false,
        },
        year: {
            type: Number,
            nullable: false,
        },
    },
    checks: [
        { expression: `"year" > 1888` },
    ],
    indices: [
        {
            name: "IDX_TEST",
            unique: true,
            columns: ["title"],
        },
    ],
    uniques: [
        {
            name: "UNIQUE_TEST",
            columns: ["title"],
        },
    ],
})

module.exports = Movie;