const flash = require('flash');
var Article = require('../models/article.model');
var Category = require('../models/category.model')
const fs = require('fs')

exports.Pageadd = ( (req, res, next)=>{
    Category.find()
    .then((categories)=>{
        res.render('ajout-article', {categories: categories});
    })
    .catch(()=>{
        res.redirect('/');
    })
    

});

exports.addArticle = ( (req, res, next)=>{
    var article = new Article(
        {
            ...req.body,
            image: `${req.protocol}://${req.get('host')}/images/articles/${req.file.filename}`,
            publishedAt: Date.now() 
        });

        console.log(article);

        article.save((err, article)=>{
            if(err){
                req.flash('err', err.message)
                return res.redirect('/addArticle')
            }
                req.flash( 'success', 'reussi')
                return res.redirect('/addArticle')
        });

        /*.then(()=> {
            console.log('article suvegardé');
            res.render('ajout-article', {success: 'reussi'});
        })
        .catch(()=>{
            res.render('ajout-article', {err: 'erreur'});
        })*/

});

exports.editArticlePage = (req, res, next)=>{
    Article.findOne({_id: req.params.id}, (err, article)=>{
        if(err){
            req.flash('err', err.message);
            return res.redirect('/');
        }
        Category.find((err, categories)=>{
            if(err){
                req.flash('err', err.message);
                return res.redirect('/')
            }
            return res.render('edit-article', {categories: categories, article: article})
        })
    })
}

exports.editArticle = (req, res, next)=>{
    Article.findOne({_id: req.params.id}, (err, article)=>{
        if(err){
            req.flash('err', err.message);
            return res.redirect('/edit-article'+req.params.id);
        }

        if(req.file){
            const filename = article.image.split('/articles/')[1];
            fs.unlink(`public/aimages:articles/${filename}`, ()=>{
                console.log('image deleted: '+filename);
            })
        }

        article.name = req.body.name ? req.body.name : article.name;
        article.category = req.body.category ? req.body.category : article.category;
        article.content = req.body.content ? req.body.content : article.content;
        article.image = req.file ? `${req.protocol}://${req.get('host')}/images/articles/${req.file.filename}` : article.image;

        article.save((err, article)=>{
            if(err){
                req.flash('err', err.message);
                return res.redirect('/edit-article/'+req.params.id)
            }
            req.flash('success', 'article bien modifié');
            return res.redirect('/edit-article/'+req.params.id);
        })
    })
}