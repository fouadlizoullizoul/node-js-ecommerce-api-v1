const express =require('express');
const router = express.Router();
const {getCategories} =require('../services/categoryService');

router.post('/',getCategories)

module.exports = router;