const express = require('express');
const router = express.Router();
const bannerController = require('../controllers/bannerController');

router.post('/banner', bannerController.create);
router.get('/banners', bannerController.getBanners);

module.exports = router;
