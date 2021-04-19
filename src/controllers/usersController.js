const knex = require("../database/connection");

module.exports.UsersController = class UsersController {
  async index(request, response) {
    
    const users = await knex("users").select("*");
    console.log('users', users)
    
    const serializedUsers = users.map(user=> ({
      id: user.id,
      username: user.username,
      email:user.email,
      password:user.password,
      job_description:user.job_description,
      name:user.name,
      image: user.image ? `localhost:3333/uploads/${user.image}` : null
    }))
    console.log('serializedUsers', serializedUsers)
    return response.json(serializedUsers);
  }
}