

exports.guard = (req, res, next)=>{
    if(!req.user){
        req.flash('warning', 'sorry tu dois te conecte');
        return res.redirect('/users/login')
    }
    next();
}