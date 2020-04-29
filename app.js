var express = require('express');
var path = require('path');
const bodyParser = require('body-parser')
const cors = require('cors')
require ('dotenv').config() 

var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require ('mongoose')

const jsonWT = require("jsonwebtoken")
const privateKey = "admin";

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/UserRouter');
const menuRouter = require("./routes/MenuRouter")
const categoryRouter = require("./routes/CategoryRouter")

var app = express();
// MENJALANKAN DOTENV DI .ENV DENGAN NAMA DB_LOCAL
mongoodConnect = process.env.DB_CONNECTION
mongoose.connect(mongoodConnect, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
app.use(cors())

app.use(logger('dev'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/public', express.static('public'))
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
// MASUKKAN VALIDATE KE MENU COK
app.use('/menu',validateUser, menuRouter);
app.use('/category', categoryRouter);

function validateUser (req,res,next) {
  jsonWT.verify(req.headers['x-access-token'], privateKey, (err,decoded)=>{
    if (err){
      res.json(err)
    } else {
      req.body.userId = decoded.id;
      next()
    }
  })
}

function validatePassword (req,res) {
  if (req.body.password !== req.body.confirmPassword) {
    throw new Error('Confirm Password does not match Password');
  } else {
    req.body.password == req.body.confirmPassword
    next()
  }
}

module.exports = app;
