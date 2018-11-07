// 引入express框架
const express = require('express')
const router = express.Router()
const controller = require('../controller/user.js')

//导入注册页的模块
router.get('/register', controller.handleRegisterGet)

//导入登录页的模块
router.get('/login', controller.handleLoginGet)

//注册页逻辑
router.post('/register', controller.handleRegisterPost)

//登录页逻辑
router.post('/login', controller.handleLoginPost)

//注销
router.get('/logout',controller.handleLogoutGet)

module.exports = router
