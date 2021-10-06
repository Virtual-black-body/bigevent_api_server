const express = require('express')
const cors = require('cors')
const userRouter = require('./router/user')
const joi = require('joi')
const app = express()
// 解决跨越的中间件
app.use(cors())
// 解析application/x-www-form-urlencoded格式表单数据的中间件
app.use(express.urlencoded( { extended : false } ))
//挂载静态资源
app.use('/uploads', express.static('./uploads'))
// 优化send
app.use((req, res, next) => {
    res.cc = function (err, status = 1){
        res.send({
            status,
            message: err instanceof Error? err.message : err
        })
    }

    next()
})

// 导入配置文件
const config = require('./config')

// 解析 token 的中间件
const expressJWT = require('express-jwt')

// 使用 .unless({ path: [/^\/api\//] }) 指定哪些接口不需要进行 Token 的身份认证
app.use(expressJWT({ secret: config.jwtSecretKey }).unless({ path: [/^\/api\//] }))


// 登陆注册路由
app.use('/api', userRouter)
//用户基本信息路由
const userinfoRouter = require('./router/userinfo')
app.use('/my', userinfoRouter)
//文章类别
const artCateRouter = require('./router/artcate')
app.use('/my/article', artCateRouter)
//文章
const articleRouter = require('./router/article')
app.use('/my/article', articleRouter)



// 错误级别的中间件处理函数
app.use((err,req, res, next) => {
    // 验证失败的错误
    if(err instanceof joi.ValidationError) return res.cc(err)
    // 身份失败的错误   
    if(err.name === 'UnauthorizedError') return res.cc('身份认证失败！')
    res.cc(err)
})

app.listen(3007, function (){
    console.log("api server running at http://127.0.0.1:3007");
})