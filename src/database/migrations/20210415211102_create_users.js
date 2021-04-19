
exports.up = async function(knex) {
  return knex.schema.createTable('users', table => {
    table.increments('id').primary();
    table.string('username').notNullable();
    table.string('email').notNullable();
    table.string('password').notNullable();
    table.string('name');
    table.string('image');
    table.string('job_description');
  })
};

exports.down = async function(knex) {
  return knex.schema.dropTable('users')
};