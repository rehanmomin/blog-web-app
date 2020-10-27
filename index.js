const express = new require("express")
const edge = new require("edge.js")
const path = new require('path')
const { config, engine } = require('express-edge');
const mongoose = new require('mongoose')
const bodyParser = new require('body-parser')
const Post = new require('./database/models/Post')
const fileUpload = new require('express-fileupload')
const expressSession = new require('express-session')
const connectMongo = new require('connect-mongo')
const connectFlash = new require('connect-flash')

const createPostController = require('./controllers/createPost')
const homePageController = require('./controllers/homePage')
const storePostController = require('./controllers/storePost')
const getPostController = require('./controllers/getPost')
const createUserController = require('./controllers/createUser')
const storeUserController = require('./controllers/storeUser')
const loginController = require('./controllers/login')
const loginUserController = require('./controllers/loginUser')
const logoutController = require('./controllers/logout')

const app = express()

mongoose.connect('mongodb://localhost:27017/node-js-blog', { useNewUrlParser: true, useUnifiedTopology : true } , function (err, db) {
   // console.log(err, db)
} )

app.use(connectFlash())

const mongoStore = connectMongo(expressSession)
app.use(expressSession({
    secret : 'secret',
    store : new mongoStore({
        mongooseConnection : mongoose.connection   //to store the session even after we restart the server
    })
}))



app.use(fileUpload())
app.use(express.static('public'))
app.use(engine);
app.set('views', `${__dirname}/views`);

app.use('*', (req, res, next) => {
    edge.global('auth', req.session.userId)
    next()
})
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : true}))

const storePost = require('./middleware/storePost');
const auth = require('./middleware/auth');
const redirectIfAuthenticated = require('./middleware/redirectIfAuthenticated');

const { MongoStore } = require('connect-mongo');
  
app.use('/posts/store', storePost)

app.get('/', homePageController)

app.get('/auth/register', redirectIfAuthenticated, createUserController)

app.get('/auth/login', redirectIfAuthenticated, loginController)

app.post('/users/login', redirectIfAuthenticated, loginUserController)

app.post('/users/register', redirectIfAuthenticated, storeUserController)

app.get('/post/:id', getPostController)

app.get('/posts/new', auth , createPostController)

app.post('/posts/store', auth, storePostController)

app.get('/auth/logout', auth, logoutController)

app.use((req, res) => res.render('not-found'))

app.listen(3000, () => {
    console.log("Listening on Port 3000")
})