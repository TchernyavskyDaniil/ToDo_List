const express = require('express');
const router = express.Router();

const toDoController = require('../../controllers/controller');

router.get('/', toDoController.getTodos);

router.post('/', toDoController.createTodo);

router.put('/', toDoController.updateTodo);

router.delete('/:id', toDoController.removeTodo);

module.exports = router;
