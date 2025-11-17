const express = require('express');
const router = express.Router();

const {
  createTask,
  getTask,
  updateTask,
  deleteTask
} = require('../controllers/taskController');

const { protect } = require("../middleware/authmiddleware");
router.route('/')
  .get(protect, getTask)      
  .post(protect, createTask);

router.route('/:id')
  .put(protect, updateTask)      
  .delete(protect, deleteTask);
module.exports = router;