const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  task: String,
  details: String,
  deadline:String
});

module.exports = mongoose.model("taskss", taskSchema);
