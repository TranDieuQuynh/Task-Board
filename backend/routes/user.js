const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../models/User');
const Board = require('../models/Board');
const Task = require('../models/Task');

router.post('/signup', async (req, res) => {
  try {
    const { email, password, username } = req.body;

    // Kiểm tra dữ liệu đầu vào
    if (!email || !password || !username) {
      return res.status(400).json({ error: 'Email, password, and username are required' });
    }

    // Kiểm tra định dạng email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashedPassword, username });

    const board = await Board.create({ name: 'My Task Board', UserId: user.id });

    await Task.bulkCreate([
      { name: 'Task in Progress', status: 'In Progress', BoardId: board.id, icon: '🚀' },
      { name: 'Task Completed', status: 'Completed', BoardId: board.id, icon: '✅' },
      { name: "Task Won't Do", status: "Won't do", BoardId: board.id, icon: '❌' },
    ]);

    res.status(201).json({ user, boardId: board.id });
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      const field = error.errors[0].path; // 'email' hoặc 'username'
      return res.status(400).json({ error: `${field} already exists` });
    }
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({ error: error.errors[0].message });
    }
    res.status(400).json({ error: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

    const board = await Board.findOne({ where: { UserId: user.id } });
    res.json({ user, boardId: board.id });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/:userId/boards', async (req, res) => {
  try {
    const boards = await Board.findAll({
      where: { UserId: req.params.userId },
      order: [['createdAt', 'DESC']]
    });
    res.json({ boards });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;