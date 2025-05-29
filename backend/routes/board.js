const express = require('express');
const router = express.Router();
const Board = require('../models/Board');
const Task = require('../models/Task');

router.get('/:boardId', async (req, res) => {
  try {
    const board = await Board.findByPk(req.params.boardId, {
      include: [{ model: Task }],
    });
    if (!board) return res.status(404).json({ error: 'Board not found' });
    res.json({ board, tasks: board.Tasks });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const board = await Board.create(req.body);
    res.status(201).json(board);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/:boardId', async (req, res) => {
  try {
    const board = await Board.findByPk(req.params.boardId);
    if (!board) return res.status(404).json({ error: 'Board not found' });
    await board.update(req.body);
    res.json(board);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/:boardId', async (req, res) => {
  try {
    const board = await Board.findByPk(req.params.boardId);
    if (!board) return res.status(404).json({ error: 'Board not found' });
    await board.destroy();
    res.json({ message: 'Board deleted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;