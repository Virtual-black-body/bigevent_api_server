const db = require('../db/index')

exports.addArticle = (req, res) => {
    if(!req.file || req.file.fieldname !== 'cover_img') return res.cc('文章封面是必选参数！')

    const path = require('path')

    const articleInfo = {
        ...req.body,
        cover_img: path.join('/uploads', req.file.filename),
        pub_date: new Date(),
        author_id: req.user.id
    }
    const sql = "insert into ev_articles set ?"

    db.query(sql, articleInfo, (err, results) => {
        if(err) return res.cc(err)

        if(results.affectedRows !==1 ) return res.cc('发布文章失败！')

        res.cc('发布文章成功！', 0)
    })
}

exports.getArticleList = (req, res) => {
    const sql = 'select * from ev_articles where is_delete = 0'

    db.query(sql, (err, results) => {
        if(err) return res.cc(err)

        if(results.length < 1 ) return res.cc('获取文章列表失败！')

        res.send(
            {
                status: 0,
                message: '获取文章列表成功！',
                data: results
            }
        )
    })
}

exports.deleteArticle = (req, res) => {
    const sql = 'update ev_articles set is_delete = 1 where Id = ?'

    db.query(sql, req.params.id, (err, results) => {
        if(err) return res.cc(err)

        if(results.affectedRows !== 1) return res.cc('删除文章失败！')

        res.cc('删除文章成功！', 0)
    })
}

exports.getArticle = (req, res) => {
    const sql = 'select * from ev_articles where id = ?'

    db.query(sql, req.params.id, (err, results) => {
        if(err) return res.cc(err)

        if(results.length !== 1) return res.cc('获取文章详情失败！')

        res.send(
            {
                status: 0,
                message: '获取文章详情成功！',
                data: results[0]
            }
        )
    })
}

exports.editArticle = (req, res) => {
    if(!req.file || req.file.fieldname !== 'cover_img') return res.cc('文章封面是必选参数！')

    const path = require('path')

    const articleInfo = {
        ...req.body,
        cover_img: path.join('/uploads', req.file.filename),
    }
    const sql = "update ev_articles set ? where Id = ?"
    db.query(sql, [articleInfo, req.body.Id], (err, results) => {
        if(err) return res.cc(err)

        if(results.affectedRows !==1 ) return res.cc('更新文章失败！')

        res.cc('更新文章成功！', 0)
    })
}