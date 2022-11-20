module.exports = {
  CSVtoJSON: (csv) => {
    const lines = csv.split("\n");

    const result = [];

    lines.map((l) => {
      const obj = {};
      const line = l.split(";");

      obj.title = line[0];
      obj.description = line[1];
      obj.year = line[2];

      result.push(obj);
    });

    const seen = new Set();

    const filteredArr = result.filter((el) => {
      const duplicate = seen.has(el.title);
      seen.add(el.title);
      return !duplicate;
    });

    return filteredArr;
  },
  containsMovie: (movie, moviesInDB) => {
    var i;
    for (i = 0; i < moviesInDB.length; i++) {
      if (moviesInDB[i].title === movie.title) {
        return true;
      }
    }
    return false;
  },
};
