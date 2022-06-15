var mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    taskName: String,
    taskDeadLine: Date,
    taskDes: String,
    isTaskDone: Boolean
})
const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;