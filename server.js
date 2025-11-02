const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

let tasks = [{ id: 1, title: "Sample task", done: false }];

app.get('/api/tasks', (req, res) => res.json(tasks));
app.post('/api/tasks', (req, res) => {
  const task = { id: Date.now(), title: req.body.title, done: false };
  tasks.push(task);
  res.status(201).json(task);
});

app.listen(3000, () => console.log("Server running on port 3000"));
