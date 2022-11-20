const { EntitySchema } = require("typeorm");

module.exports = {
  Movie: new EntitySchema({
    name: "movie",
    columns: {
      id: {
        primary: true,
        type: "int",
        generated: "increment",
      },
      title: {
        type: String,
        length: 100,
        unique: true,
      },
      description: {
        type: "longtext",
        nullable: false,
      },
      year: {
        type: Number,
        nullable: false,
      },
    },
  }),
};
