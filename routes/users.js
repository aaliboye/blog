var express = require('express');
var router = express.Router();
const userCtrl = require('../controllers/user.controller');
const { guard } = require('../middleware/guard');
const sendRestMail = require('../middleware/services/email.service');
const loginValidator = require('../middleware/validators/login.validator');
const userValidator = require('../middleware/validators/user.validator')

/* GET users listing. */
router.get('/login', (req, res, next)=>{
  res.render('login')
});

router.get('/signup', (req, res, next)=>{
  res.render('signup')
});

router.post('/signup', userValidator, userCtrl.signup)

router.post('/login', loginValidator, userCtrl.login)

router.get('/dashboard', guard ,(req, res, next)=>{
  res.render('dashboard')
})

router.get('/forgot-password', (req, res, next)=>{
  res.render('forgot-password')
})

router.post('/forgot-password', userCtrl.resetPassword, sendRestMail)



router.get('/logout', (req, res, next)=>{
  req.logout()
  req.flash('success', 'vous etes deconnecté');
  return res.redirect('/users/login')
})

module.exports = router;
