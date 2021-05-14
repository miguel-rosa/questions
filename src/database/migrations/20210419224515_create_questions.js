
exports.up = async function(knex) {
  return knex.schema.createTable("questions", table => {
    table.increments("id").primary();
    table.integer("user_id").notNullable().references("id").inTable("users");
    table.string("title").notNullable();
    table.string("description").notNullable();
    table.dateTime("date_time");
  })
};

exports.down = async function(knex) {
  return knex.schema.dropTable("questions")
};
