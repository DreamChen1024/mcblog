const express = require('express')
const app = express()

//设置默认的模板引擎
app.set('view engine', 'ejs')
//模板的根目录, 将来渲染页面时都相对此路径
app.set('views', './views')

//托管静态资源
app.use('/node_modules',express.static('./node_modules'))

//导入首页的模块
app.get('/', (req, res) => {
    res.render('./index.ejs', {})
})

//导入注册页的模块
app.get('/register', (req, res) => {
    res.render('./user/register.ejs', {})
})

//导入登录页的模块
app.get('/login', (req, res) => {
    res.render('./user/login.ejs', {})
})


app.listen(80, () => {
    console.log('server running at http://127.0.0.1')
})