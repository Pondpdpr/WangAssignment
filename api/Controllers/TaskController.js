const Task = require('../Models/Task');

const ctrl = {
    // GET /task/
    getTask: (req, res) => {
        Task.find().sort({"isTaskDone": 1,"taskDeadLine" : 1})
            .then((tasks) => res.send(tasks))
            .catch(() => res.status(404))
    },

    // POST /task/
    postTask: (req, res) => {
        Task.create(req.body)
            .then((tasks) => res.send(tasks))
    },

    // PUT /task/:id
    updateTask: (req, res) => {
        console.log("test", req.body);
        const id = req.params.id;
        Task.findByIdAndUpdate(id, req.body)
            .then((tasks) => res.send(tasks))
    },

    //DELETE /task/:id
    deleteTask: (req, res) => {
        const id = req.params.id;
        Task.findByIdAndDelete(id)
            .then((tasks) => res.send(tasks))
    },
}

module.exports = ctrl;