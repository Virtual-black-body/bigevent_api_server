const joi = require('joi')

//文章数据验证
const title = joi.string().required()
const cate_id = joi.number().integer().min(1).required()
const content = joi.string().required().allow('')
const state = joi.string().valid('已发布', '草稿').required()
const Id = joi.number().integer().min(1).required()

//删除
const id = joi.number().integer().min(1).required()

exports.article_schema = {
    body: {
        title,
        cate_id,
        content,
        state,
        Id
    }
}

exports.delete_article_schema = {
    params: {
        id
    }
}
//单个文章
exports.get_article_schema = {
    params: {
        id
    }
}
