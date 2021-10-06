const express = require('express')
const router = express.Router()
const article_handler = require('../router_handler/article')
const multer = require('multer')
const expressJoi = require('@escook/express-joi')
const { article_schema, delete_article_schema, get_article_schema } = require('../schema/article')
//formdata格式的表单数据
const path = require('path')
const upload = multer( {dest: path.join(__dirname, '../uploads')})

router.post('/add',upload.single('cover_img'),expressJoi(article_schema), article_handler.addArticle)
router.get('/list', article_handler.getArticleList)
router.get('/delete/:id',expressJoi(delete_article_schema), article_handler.deleteArticle)
router.get('/:id',expressJoi(get_article_schema), article_handler.getArticle)
router.post('/edit', upload.single('cover_img'),expressJoi(article_schema), article_handler.editArticle)

module.exports = router