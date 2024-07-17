const express = require('express');
const { handleChat, saveScore } = require('../controllers/chatcontroller');

const router = express.Router();

const routes = (db) => {
  router.post('/chat', handleChat);
  router.post('/scores', (req, res) => saveScore(req, res, db));
  return router;
};

module.exports = routes;
