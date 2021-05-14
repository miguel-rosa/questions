const knex = require("knex");
const path = require("path");

// const environment = process.env.NODE_ENV;

const environment = process.env.NODE_ENV || "development"
console.log('environment', environment)


var config = require('../../knexfile.js')[environment]

module.exports = knex(config)