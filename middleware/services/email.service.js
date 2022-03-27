const nodemailer = require('nodemailer')


const sendRestMail = (req,res,next)=>{

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth:{
            user: 'aalijr97@gmail.com',
            pass: 'ibnalioune'
        }
    })

    var message = "<br>Message: "+req.body.message;

    var mailOptions = {
        from: 'aalijr97@gmail.com',
        to: req.body.email,
        subject: 'reset your password',
        html: message
    }

    transporter.sendMail(mailOptions, (err, infos)=>{
        if(err){
            req.flash('err', err.message);
            return res.redirect('/users/forgot-password');
        }
        else{
            console.log(info);
            req.flash('success', 'mail send to '+ req.body.email+' verifie ton mail')

            return res.redirect('/users/forgot-password')
        }
    })

}


module.exports = sendRestMail;
