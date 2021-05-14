const knex = require("../database/connection");
const jwt = require("jsonwebtoken");
const imageUrl = require("../utils/imageUrl");

module.exports.UsersController = class UsersController {
  async index(request, response) {
    
    const users = await knex("users").select("*");
    
    const serializedUsers = users.map(user => ({
      id: user.id,
      username: user.username,
      email:user.email,
      password:user.password,
      job_description:user.job_description,
      name:user.name,
      image:imageUrl(user.image) 
    }))
    return response.json(serializedUsers);
  }

  async create (request, response) {
    const { email, name, username, password } = request.body;

    const DEFAULT_USER_IMAGE = "default_user_image.png";

    const isUsernameAlreadyInUse = await knex("users").where("username", username).first() || false;
    if(isUsernameAlreadyInUse) return response.status(400).json({message: "Nome de usuário já está em uso"});

    const isEmailAlreadyInUse = await knex("users").where("email", email).first() || false;
    if(isEmailAlreadyInUse) return response.status(400).json({message: "Email já está em uso"});

    const trx = await knex.transaction();

    const user = {email, name, username, password, image:DEFAULT_USER_IMAGE};

    const insertedIds = await trx("users").insert(user);

    const user_id = insertedIds[0];

    await trx.commit();
    return response.status(200).json({message: "Usuário criado"});
  }

  async auth (request, response) {
    const token = request.headers.authorization;

    if(!token) return response.status(401).send({ auth:false, message: "No Token provided"});

    const username = jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if(err) return response.status(500).send({auth:false, message: "Falha para autenticar o token"});
      return decoded.username
    })

    const user = await knex("users").where("username", username).first();

    if(!user) return response.status(401).send({auth:false, message:"Usuário inválido"});

    const serializedUser = {
      id: user.id,
      username: user.username,
      email:user.email,
      password:user.password,
      job_description:user.job_description,
      name:user.name,
      image:imageUrl(user.image) 
    }

    return response.json(serializedUser);

  }
}