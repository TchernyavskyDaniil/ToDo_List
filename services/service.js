const toDo = require('../models/model');

_this = this;

exports.getTodos = async function (query, page, limit) {
    // Настройка для mongoose paginate
    const options = {
        page,
        limit
    };

    try {
      const todos = await toDo.paginate(query, options);

      return todos;
    } catch (error) {
        throw new Error('Pagination Todos - ERROR');
    }
};

exports.createTodos = async function (todo) {
  // Создаем новый объект Mongoose
  const newTodo = new toDo({
      title: todo.title,
      description: todo.description,
      date: new Date(),
      status: todo.status
  });

  try {
      const saveTodo = await newTodo.save();

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

  console.log(oldTodo);

  oldTodo.title = todo.title;
  oldTodo.description = todo.description;
  oldTodo.status = todo.status;

  console.log(oldTodo);

  try {
      newTodo = await oldTodo.save();
      return newTodo;
  } catch (error) {
      throw new Error('Saved todo - ERROR');
  }
};

exports.deleteTodo = async function (id) {
  try {
      const deletedTodo = await toDo.remove({_id: id});
      if (deletedTodo.result.n === 0) {
          throw new Error('TODO not deleted');
      }

      return deletedTodo;
  } catch (error) {
      throw new Error('TODO not deleted');
  }
};

