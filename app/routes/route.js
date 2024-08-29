const express = require('express');
const router = express.Router();

const controller = require('../controllers/Controller.js');

router.get('/', controller.index.bind(controller));
router.get('/send-massage', controller.send_massage.bind(controller));
router.get('/callback', controller.callback.bind(controller));

module.exports = router;