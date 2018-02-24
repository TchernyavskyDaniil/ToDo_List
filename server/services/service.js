const toDo = require('../models/model');

_this = this;

exports.getTodos = async function (query, page, limit) {
  // Настройка для mongoose paginate
  const options = {
    page,
    limit
  };

  let todos;

  try {
    todos = await toDo.paginate(query, options);

    return todos;

  } catch (error) {
    throw new Error('Pagination Todos - ERROR');
  }
};

exports.createTodo = async function (todo) {
  // Создаем новый объект Mongoose
  let newTodo = new toDo({
    title: todo.title,
    description: todo.description,
    date: new Date(),
    status: todo.status
  });

  let saveTodo;

  try {
    saveTodo = await newTodo.save();

    return saveTodo;
  } catch (error) {
    throw new Error('Creating Todo - ERROR');
  }
};

exports.updateTodo = async function (todo) {
  const id = todo.id;
  let oldTodo;
  let newTodo;

  try {
    oldTodo = await toDo.findById(id);
  } catch (error) {
    throw new Error('Finding Todo - ERROR');
  }

  // Если нет старых
  if (!oldTodo) {
    return false;
  }

  oldTodo.title = todo.title;
  oldTodo.description = todo.description;
  oldTodo.status = todo.status;

  try {
    newTodo = await oldTodo.save();
    return newTodo;
  } catch (error) {
    throw new Error('Saved todo - ERROR');
  }
};

exports.deleteTodo = async function (id) {
  let deletedTodo;

  try {
    console.log(toDo.remove({_id: id}));
    deletedTodo = await toDo.remove({_id: id});
    if (deletedTodo.result.n === 0) {
      throw new Error('TODO not deleted');
    }

    return deletedTodo;
  } catch (error) {
    throw new Error('TODO not deleted x2');
  }
};

