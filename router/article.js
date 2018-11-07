const express = require('express')
const controller = require('../controller/article.js')
const router = express.Router()

router.get('/articles/add', controller.handleArticleAddGet);
router.post('/articles/add', controller.handleArticleAddPost)
router.get('/articles/info/:id', controller.handleArticleInfoGet);

module.exports = router