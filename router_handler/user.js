const db = require('../db/index')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../config')

exports.regUser = (req, res) => {
    const userinfo = req.body

    if(!userinfo.username || !userinfo.password) {
        // return res.send({status: 1, message: '用户名或者用户密码不存在！'})
        return res.cc('用户名或者用户密码不存在！')
    }

    const sqlStr = 'select * from ev_users where username=?'

    db.query(sqlStr, [userinfo.username], (err, results) => {
        if(err) {
            // return res.send( {status: 1, message: err.message})
            return res.cc(err)
        }

        if(results.length > 0){
            // return res.send({status: 1, message: '用户名被占用，请更换其他用户名！'})
            return res.cc('用户名被占用，请更换其他用户名！')
        }

         // 对用户的密码,进行 bcrype 加密，返回值是加密之后的密码字符串
        userinfo.password = bcrypt.hashSync(userinfo.password, 10)

        const sql = 'insert into ev_users set ?'

        db.query(sql, {username: userinfo.username, password: userinfo.password}, (err, results) => {
            if(err) {
                // return res.send({status: 1, message: err.message})
                return res.cc(err)
            }

            if(results.affectedRows !== 1) {
                // return res.send({status: 1, message: '注册用户失败，请稍后再试！'})
                return res.cc('注册用户失败，请稍后再试！')
            }

            // res.send({status: 0 , message: '注册用户成功！'})
            res.cc('注册用户成功！', 0)
        })
    })

}

exports.login = (req, res) => {
    // 接收表单数据
    const userinfo = req.body
    // 查询语句
    const sql = "select * from ev_users where username = ?"
    //执行查询语句
    db.query(sql, userinfo.username, (err, results) => {
        if(err){
            return res.cc(err)
        }
        if(results.length !== 1){ 
            console.log(results);
            return res.cc('登录失败！')
        }
        const compareResult = bcrypt.compareSync(userinfo.password, results[0].password)
        if(!compareResult) return res.cc('登录失败！')
        // res.cc('登录成功！', 0)
        const user = { ...results[0], password: '',user_pic: '' }

        const tokenStr = jwt.sign(user, config.jwtSecretKey, {
            expiresIn: '10h'
        })

        res.send({
            status:0,
            message: '登录成功！',
            token: 'Bearer ' + tokenStr,
        })
    })
}