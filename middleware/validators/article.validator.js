const {Validator} = require('node-input-validator');

const articleValidator = (req, res, next)=>{

    if(req.file){
        req.body.image = req.file.filename
    }
    const v = new Validator(req.body, {
        name: 'required',
        content: 'required',
        category: 'required',
        image: 'required',
        publishedAt: 'required'

    })

    v.check().then((matched)=>{
        if(!matched){
            req.flash('errorForm', v.errors)
            return res.redirect('/addArticle')
        }
        next();
    })
}

module.exports = articleValidator;