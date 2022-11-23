const server = require('./src/app.js');
require("dotenv").config();

server.listen(process.env.PORT, async () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
});