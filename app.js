var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var session = require('express-session')

var flash = require('connect-flash')

const passport = require('passport');

var bodyParser = require('body-parser')

var Article = require('./models/article.model');

var Category = require('./models/category.model')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const User = require('./models/user.model')


var app = express();


app.use(bodyParser.urlencoded({extended: false}));

app.use(bodyParser.json());

app.use(session({
  secret: 'hfqjl567576djhfj',
  resave: false,
  saveUninitialized: false
}))
// init flash
app.use(flash());

//initialise passport

app.use(passport.initialize());
app.use(passport.session());

// passport local mongoose
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
  if(req.user){
    res.locals.currentUser = req.user;
  }
  res.locals.success=  req.flash('success');
  res.locals.warning=  req.flash('warning');
  res.locals.err = req.flash('err');
  res.locals.errorForm = req.flash('errorForm');
  next();
})

const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost:27017/blog').then(()=>{
  console.log('connexion DB reussi');
})
.catch(()=>{
  console.log('connexion DB echoué');
})


/*for(var i=0; i<10; i++){
  var cat = new Category(
    {

      title: 'categorie'+i,
      description: 'category'+1
    }
  );

  cat.save()
  .then(()=>{
    console.log('sauvegarde reussi');
  })
}*/



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
