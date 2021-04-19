const knex = require("knex");
const path = require("path");

const connection = {
  client: 'sqlite3',
  connection: {
    filename: path.resolve(__dirname, 'dev.sqlite3'),
  },
  useNullAsDefault: true,
};

module.exports = knex(connection)