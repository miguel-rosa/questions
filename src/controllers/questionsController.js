const knex = require("../database/connection");
const jwt = require("jsonwebtoken")
const imageUrl = require("../utils/imageUrl");

module.exports.QuestionsController = class QuestionsController {
  async index(request, response) {

    const {  } = request.body;

    const questions = await knex("questions as q")
      .join("users as u", "u.id", "=", "q.user_id")
      .select(
        "q.id as id",
        "q.title as title",
        "q.description as description",
        "q.date_time as date_time",
        "u.name as name",
        "u.image as image"
      ); 

    const serializedQuestions = questions.map(item => ({
      id: item.id,
      title: item.title,
      description: item.description,
      dateTime: item.date_time,
      author: {
        name: item.name,
        image: imageUrl(item.image)
      }
    }))

    return response.json(serializedQuestions)
  }

  async show(request, response) {
    const {id} = request.params;
    console.log('id', id)

    const answers = await knex("answers as a")
      .join("questions as q", "q.id", "=", "a.question_id")
      .select("*")
      .where("a.question_id", id)


    const question = await knex("questions as q")
    .select(
      "q.id as question_id",
      "q.title as title",
      "q.description as description",
      "q.date_time as date_time",
      "u.name as name",
      "u.image as image",
      "a.description as answers",
      "a.date_time as dt",
      "a.id as answer_id"
      )
    .join("users as u", "u.id", "=", "q.user_id")
    .join("answers as a", "a.question_id", "=", "q.id")
    .where("q.id", id);
    
    if(!question) return response.status(404).send({message:"Nenhum post encontrado"})

    const serializedQuestion = {
      id: question.id,
      title: question.title,
      description: question.description,
      author: {
        name: question.name,
        image: imageUrl(question.image)
      },
      answers: question.answers
    }

    return response.json(
      {
        // answers:answers,
        questions: question
        }
      )
  }

  async search(request, response) {

    const { search } = request.query;

    const questions = await knex("questions as q").where("title", "like", `%${search}%`);

    const serializedQuestions = questions.map(item => ({
      id: item.id,
      title: item.title,
    }))

    return response.json(serializedQuestions)
  }

  async create(request, response) {
    const { title, description } = request.body;
    console.log('title, description', title, description);
    console.log("request", request)

    const token = request.headers.authorization;

    const username = jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if(err) return response.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
      return decoded.username
    });
    
    const {id} = await knex('users').where('username', username).first();

    const dateTime = new Date();

    const question = {
      user_id: id,
      title: title,
      description: description,
      date_time: dateTime
    }
    

    const trx = await knex.transaction();
    const insertedIds = await trx("questions").insert(question);
    const question_id = insertedIds[0];
    await trx.commit();

    return response.status(200).send({message: "Pergunta criada"})
  }
}
