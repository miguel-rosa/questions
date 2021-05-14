
exports.up = async function(knex) {
  return knex.schema.createTable("answers", table => {
    table.increments("id").primary();
    table.integer("question_id").notNullable().references("id").inTable("questions");
    table.string("description").notNullable();
    table.dateTime("date_time")
  })
};

exports.down = async function(knex) {
  return knex.schema.dropTable("answers")
};
