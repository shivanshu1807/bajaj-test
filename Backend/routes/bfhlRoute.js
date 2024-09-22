const express = require('express');
const router = express.Router();
const { handlePost, handleGet } = require('../controllers/bfhlController');

// POST method to process data
router.post('/', handlePost);

// GET method to return operation_code
router.get('/', handleGet);

module.exports = router;
