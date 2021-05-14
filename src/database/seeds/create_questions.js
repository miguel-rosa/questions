
exports.seed = function(knex) {
  return knex("questions").insert([
    {
      user_id: 1,
      title: "How to create a API with node, using express and knex",
      description: "I'am trying to create a node JS REST API using express and knex, how can I start?",
      date_time: 1619473395444
    },
    {
      user_id: 2,
      title: "When use express",
      description: "When shoud I use express at a node project?",
      date_time: 1619473395446
    }
  ])
};
