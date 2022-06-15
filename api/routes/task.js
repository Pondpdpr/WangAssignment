const express = require('express');
const router = express.Router();
const ctrl = require('../Controllers/TaskController');

router.route('/')
    .get(ctrl.getTask)
    .post(ctrl.postTask);

router.route('/:id')
    .put(ctrl.updateTask)
    .delete(ctrl.deleteTask);

module.exports = router;