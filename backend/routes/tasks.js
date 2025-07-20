const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// GET all tasks
router.get('/', async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

// POST new task
router.post('/', async (req, res) => {
  const task = new Task({
    text: req.body.text
  });
  await task.save();
  res.json(task);
});

// DELETE task
router.delete('/:id', async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: 'Task deleted' });
});

// UPDATE task (mark complete)
router.put('/:id', async (req, res) => {
  const task = await Task.findByIdAndUpdate(
    req.params.id,
    { completed: req.body.completed, text: req.body.text },
    { new: true }
  );
  res.json(task);
});

module.exports = router;