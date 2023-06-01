const express = require('express');
const router = express.Router({ mergeParams: true });
const {
  getChat,
  createChat,
  updateChat,
  deleteChat,
} = require('../controllers/chat');
const {validateToken} = require("../controllers/auth");

router.use(validateToken);

router.get('/:chatId', getChat);

router.post('/', createChat);

router.put('/:chatId', updateChat);

router.delete('/:chatId', deleteChat);

module.exports = router;
