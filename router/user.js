// 引入express框架
const express = require('express')
const router = express.Router()
const mysql = require('mysql')
const moment = require('moment')

const conn = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'mcblog'
})

//导入注册页的模块
router.get('/register', (req, res) => {
    res.render('./user/register.ejs', {})
})

//导入登录页的模块
router.get('/login', (req, res) => {
    res.render('./user/login.ejs', {})
})

//注册页逻辑
router.post('/register', (req, res) => {
    const user = req.body
    // console.log(user)
    //判断输入内容是否为空
    if(user.username.trim().length === 0 || user.password.trim().length === 0 || user.nickname.trim().length === 0) return res.status(400).send({status: 400, msg: '请填写完成的表单信息'})

    //查找是否有相同项
    const querySql = 'select count(*) as count from users where username = ?'
    conn.query(querySql,user.username, (err, result) => {
        //result是一个数组  数组中有一个对象 对象中有一个属性叫 count [{count : 0}]
        // console.log(result)
        if(err) return res.status(500).send({status: 500, msg:"用户名查询失败,请重试!"})
        if(result[0].count != 0) return status(402).send({status: 402, msg: "用户名已存在,请重试!"})

        //给用户添加创建时间的属性
        user.ctime = moment().format('YYYY-MM-DD HH:mm:ss')

        //用户名不存在需要执行添加用户的sql语句
        const addSql = 'insert into users set ?'
        conn.query(addSql, user, (err, result) => {
            console.log(result.affectedRows)
            if(err || result.affectedRows != 1) return res.status(500).send({status: 500, msg: "用户添加失败,请重试!"})
            res.send({status: 200, msg: "恭喜您,用户注册成功!"})
        })
    })
})

//登录页逻辑
router.post('/login', (req, res) => {
    //获取客户端提交过来的表单数据
    const user = req.body
    //执行sql语句 查询用户是否存在,密码是否正确
    const querySql = 'select * from users where username = ? and password = ?'
    conn.query(querySql, [user.username, user.password], (err, result) => {
        if(err) return res.status(500).send({status: 500, msg: "登录失败,请重试!"})
        if(result.length === 0) return res.status(400).send({status: 400, msg: "用户名或密码错误,请重新输入!"})
        res.send({status: 200, msg: '恭喜您,登录成功!'})
    })

})

module.exports = router
