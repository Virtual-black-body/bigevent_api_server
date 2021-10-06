const joi = require('joi')
//新增文章类别
const name = joi.string().required()
const alias = joi.string().alphanum().required()
//
const id = joi.number().integer().min(1).required()

//新增文章类别
exports.add_cate_schema = {
    body: {
        name,
        alias
    }
}
//删除文章类别
exports.delete_cate_schema = {
    params: {
        id
    }
}
//获取文章分类的数据
exports.get_cate_schema  = {
    params: {
        id
    }
}
//更新
exports.update_cate_schema = {
    body: {
        Id: id,
        name,
        alias
    }
}