const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  task: String,
  details: String,
});

module.exports = mongoose.model("taskss", taskSchema);
