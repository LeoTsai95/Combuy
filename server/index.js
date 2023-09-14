const express = require('express')
const session = require('express-session')
const bodyparse = require('body-parser')
const ejs = require('ejs')
const { login_render, login_api, notlogin_render, notlogin_api } = require('./middlewares/isLogin')
const { UserSetting } = require('./config/user_data')

const app = express()

const setProt = 2407

app.set('view engine', 'ejs')

let ejsOptions = {
  // delimiter: '?', Adding this to tell you do NOT use this like I've seen in other docs, does not work for Express 4
  async: true,
}
// The engine is using a callback method for async rendering
app.engine('ejs', async (path, data, cb) => {
  try {
    let html = await ejs.renderFile(path, data, ejsOptions)
    cb(null, html)
  } catch (e) {
    cb(e, '')
  }
})

app.use(
  session({
    secret: 'combuy',
    resave: true,
    saveUninitialized: true,
    cookie: {
      path: '/',
      httpOnly: true,
      secure: false,
      maxAge: 10 * 60 * 1000,
    },
  })
)

var bp_json = bodyparse.json({ limit: '10mb' })
var bp_uncode = bodyparse.urlencoded({ extended: true, limit: '10mb' })

app.use('/public', express.static(__dirname + '/public'))

app.use(function (req, res, next) {
  const setting = req.session.setting
  if (!setting) {
    let d = new Date()
    isdark = d.getHours() > 6 && d.getHours() < 18
    let setting = new UserSetting(!isdark)
    req.session.setting = setting
  }
  next()
})

const fontPage = require('./routers/fontPage/fontPage.js')
app.use('/fontPage', fontPage)

app.get('/', (req, res) => {
  res.redirect('/fontPage')
  // res.setHeader("Content-type", "text/html;charset=utf-8");
  // res.end("root");
})

const api = require('./routers/api')
app.use('/api', api)

const login = require('./routers/memberPage/login')
app.use('/login', login)

const register = require('./routers/memberPage/register')
app.use('/register', notlogin_render, register)

const member = require('./routers/memberPage/member')
app.use('/member', login_render, member)

const product = require('./routers/productPage/productPage.js')
app.use('/product', product)

const commodity = require('./routers/commodityPage/commodityPage.js')
app.use('/commodity', bp_uncode, commodity)

const shopCart = require('./routers/shopCartPage/shopCartPage.js')
app.use('/shopCart', shopCart)

// app.use(function (req, res) {
// res.end('Error 404 Page Not Found')
// res.redirect("/");
// });

app.listen(setProt, () => {
  console.log(
    `-----------------\nhttp://localhost:${setProt}/  |\nFile:${__filename} |\nTime:${new Date().toLocaleString()} |\n-----------------`
  )
})
