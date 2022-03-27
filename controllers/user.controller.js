const bcrypt = require('bcrypt')
const passport = require('passport')
const User = require('../models/user.model')
var randomToken = require('random-token');
const Reset = require('../models/reset.model');


exports.signup = ((req, res, next)=>{
    /*bcrypt.hash(req.body.password, 10, function(err, hash) {
        // Store hash in your password DB.
        if(err){
            req.flash('err', err.message);
            return res.redirect('/users/signup');
        }
        var user = new User({
            ...req.body,
            password: hash            
        });

        user.save((err, user)=>{
            if(err){
                req.flash('err', err.message);
                return res.redirect('/users/signup');
            }

            req.flash('success', 'utilsateur sauvegardé');
            return res.redirect('/users/login');

        })
        console.log(user);
    });*/

    var newuser = User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        email: req.body.email,

    })

    User.register(newuser, req.body.password, (err, user)=>{
        if(err){
            req.flash('err', err.message);
            return res.redirect('/users/signup')
        }
        console.log(user);
        passport.authenticate('local')(req, res, (err, newuser)=>{
            if(err){
                req.flah('err', err.message);
                return res.redirect('/users/login')
            }
            req.flash('success', 'cool, tu es connecté')
            return res.redirect('/')
        })
        
    })

})

exports.login = ((req, res, next)=>{
    const user = new User({
        username: req.body.username,
        password: req.body.password
    })

    req.login(user, (err)=>{
        if(err){
            req.flash('err', err.message)
            return res.redirect('/users/login');
        }

        passport.authenticate('local', {failureRedirect: '/users/login', failureFlash: 'invalid username or passsword'})(req, res, (err, user)=>{
            if(err){
                req.flah('err', err.message);
                return res.redirect('/users/login')
            }
            req.flash('success', 'cool, tu es connecté')
            return res.redirect('/users/dashboard')
        })

    })

})


exports.resetPassword = (req, res, next)=>{
    User.findOne({username: req.body.username}, (err, user)=>{
        if(err){
            req.flah('err', err.message);
            return res.redirect('/users/forgot-password')
        }
        if(!user){
            req.flah('err', ' User Not found');
            return res.redirect('/users/forgot-password')
        }

        //creation de token

        const token = randomToken(32);

        const reset = new Reset({
            username: req.body.username,
            resetPasswordToken: token,
            resetExpires: Date.now() + 3600000
        })

        reset.save((err, reset)=>{
            if(err){
                req.flah('err', err.message);
                return res.redirect('/users/forgot-password');
            }
            //email de reenitialisation

            req.body.email = user.email
            req.body;message = "click this link to rest your password "+ req.protocol+"://"+req.get('host')+"/users/reset-password" 
            next()
        })

    })
}