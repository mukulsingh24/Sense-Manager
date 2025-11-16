const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    lowercase: true,
    required: true,
  },
  user: {
    type: String,
    lowercase: true,
    required: true,
  },
});

module.exports = mongoose.model(Task, TaskSchema);
