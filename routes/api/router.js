const express = require('express');
const router = express.Router();

const toDoController = require('../../controllers/controller');

router.get('/', toDoController.getTodos);

router.post('/', toDoController.createTodos);

router.put('/', toDoController.updateTodo);

router.delete('/', toDoController.removeTodo);

module.exports = router;
