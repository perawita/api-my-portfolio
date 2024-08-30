const express = require('express');
const router = express.Router();

const controller = require('../controllers/Controller.js');
const asset_controller = require('../controllers/AssetController');

router.get('/', controller.index.bind(controller));
router.get('/send-massage', controller.send_massage.bind(controller));
router.get('/callback', controller.callback.bind(controller));

router.get('/asset/project/thumbnail/:thumbnailID', asset_controller.getImages.bind(asset_controller));

module.exports = router;