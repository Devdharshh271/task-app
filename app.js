const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let tasks = [
  { id: 1, title: 'Finish Jenkins setup', done: false },
  { id: 2, title: 'Deploy Node app', done: false }
];

app.get('/', (req, res) => {
  res.send('<h2>Welcome to Simple Task Manager App</h2><p>Use /tasks to see all tasks</p>');
});

app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
