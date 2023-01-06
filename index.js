const express = require("express");
const cors = require("cors");
require("./db/config");
const User = require("./db/User");
const Task = require("./db/Task");

const app = express();

app.use(express.json());
app.use(cors());

app.post("/register", async (req, res) => {
  let user = new User(req.body);
  let result = await user.save();
  result = result.toObject();
  delete result.password;
  res.send(result);
});

app.post("/login", async (req, res) => {
  if (req.body.email && req.body.password) {
    let user = await User.findOne(req.body).select("-password");
    if (user) {
      res.send(user);
    } else {
      res.send({ result: "No User Found" });
    }
  } else {
    res.send({ result: "No User Found" });
  }
});

app.post("/add-task", async (req, res) => {
  let task = new Task(req.body);
  let result = await task.save();
  res.send(result);
});

app.get("/tasks", async (req, res) => {
  const tasks = await Task.find();
  if (tasks.length > 0) {
    res.send(tasks);
  } else {
    res.send({ result: "No task Found" });
  }
});

app.delete("/tasks/:id", async (req, res) => {
  let result = await Task.deleteOne({ _id: req.params.id });
  res.send(result);
});

app.get("/tasks/:id", async (req, res) => {
  let result = await Task.findOne({ _id: req.params.id });
  if (result) {
    res.send(result);
  } else {
    res.send({ result: "No Task Found" });
  }
});

app.put("/tasks/:id", async (req, res) => {
  let result = await Task.updateOne({ _id: req.params.id }, { $set: req.body });
  res.send(result);
});

app.listen(5000);
