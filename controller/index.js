const conn = require('../db/db.js')
module.exports = {
    handleIndexGet(req, res) {
        // 如果登录成功了  req.session 中就会有user属性
        // 默认情况下 session 的过期时间就是关闭浏览器时
        // console.log(req.session)
        const querySql = `select a.id, a.title, a.ctime, u.nickname from articles as a
        left join users as u
        on a.authorid = u.id`
        conn.query(querySql, (err, result) => {
            //判断是否出错,如果出错了 result是undefined 所以就直接赋值为空数组避免模板引擎出错
            if (!result) result = [] //如果result查询到结果了  就不会进入if 不会覆盖结果

            res.render('./index.ejs', {
                user: req.session.user,
                isLogin: req.session.isLogin,
                articles: result
            })
        })
    }
}
