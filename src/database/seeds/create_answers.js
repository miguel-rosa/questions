
exports.seed = function(knex) {
  return knex('answers').insert([
    {
      question_id: 1,
      description: "Actually you should try to add another framework",
      date_time: 1619473395448
    },
    {
      question_id: 1,
      description: "Use only express, is the better option for your case",
      date_time: 1619473395449
    },
    {
      question_id: 1,
      description: "Change to ASP.net",
      date_time: 1619473395450
    },
  ]);
};
