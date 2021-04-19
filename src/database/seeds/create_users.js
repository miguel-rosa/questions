
exports.seed = function(knex) {
  return knex('users').insert([
    {
      username: 'miguelrosa',
      email: 'miguelrosa@gmail.com',
      password: '43243243',
      name: 'Miguel Rosa',
      image: 'profile-picture.jpg',
      job_description: 'Front-end developer'
    }
  ]);
};
