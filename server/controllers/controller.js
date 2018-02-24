const toDoService = require('../services/service');

_this = this;

exports.getTodos = async function (req, res) {
  const page = req.query.page ? req.query.page : 1;
  const limit = req.query.limit ? req.query.limit : 1;

  let todos;

  try {
    todos = await toDoService.getTodos({}, page, limit);

    return res.status(200).json({status: 200, data: todos, message: 'OK'});
  } catch (error) {
    return res.status(400).json({status: 400, message: error.message});
  }
};

exports.createTodo = async function (req, res) {
  let createdTodo;

  const toDo = {
    title: req.body.title,
    description: req.body.description,
    status: req.body.status
  };

  try {
    createdTodo = await toDoService.createTodo(toDo);

    return res.status(201).json({status: 200, data: createdTodo, message: 'Created TODO - OK'});
  } catch (error) {
    return res.status(400).json({status: 400, message: 'Created TODO - ERROR, BAD REQUEST'})
  }
};

exports.updateTodo = async function (req, res) {
  if (!req.body._id) {
    return res.status(400).json({status: 400, message: 'ID must be update'})
  }

  const id = req.body._id;

  const toDo = {
    id,
    title: req.body.title ? req.body.title : null,
    description: req.body.description ? req.body.description : null,
    status: req.body.status ? req.body.status : null
  };

  let updatedTodo;

  try {
    updatedTodo = await toDoService.updateTodo(toDo);

    return res.status(200).json({status: 200, data: updatedTodo, message: 'Update - OK'});
  } catch (error) {
    return res.status(400).json({status: 400, message: error.message});
  }
};

exports.removeTodo = async function (req, res) {
  const id = req.params.id;

  let deletedTodo;

  try {
    deletedTodo = await toDoService.deleteTodo(id);

    return res.status(204).json({status: 204, data: deletedTodo, message: 'Deleted Todo - OK'});
  } catch (error) {
    return res.status(400).json({status: 400, message: 'Deleted Todo - ERROR 400'})
  }
};
