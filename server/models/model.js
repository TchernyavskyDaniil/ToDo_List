const mongoose = require('mongoose');

/**
 * Упрощаем разбивание страниц
 */
const mongoosePaginate = require('mongoose-paginate');

const toDoSchema = new mongoose.Schema({
    title: String,
    description: String,
    date: Date,
    status: String
});

toDoSchema.plugin(mongoosePaginate);
const toDo = mongoose.model('toDo', toDoSchema);

module.exports = toDo;


