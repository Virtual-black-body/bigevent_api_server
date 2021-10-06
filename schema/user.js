const joi = require('joi')
//登录注册
const username = joi.string().alphanum().min(3).max(10).required()
const password = joi.string().pattern(/^[\S]{6,12}$/).required()
//更新用户信息
const id = joi.number().integer().min(1).required()
const nickname = joi.string().required()
const email = joi.string().email().required()
//更换头像
const avatar = joi.string().dataUri().required()

exports.reg_login_schema = {
    body: {
        username,
        password
    }
}

exports.update_userinfo_schema = {
    body: {
        id,
        nickname,
        email
    }
}
//更新密码
exports.update_password_schema = {
    body: {
        oldPwd: password,
        newPwd: joi.not(joi.ref('oldPwd')).concat(password)
    }
}

exports.update_avatar_schema = {
    body: {
        avatar
    }
}