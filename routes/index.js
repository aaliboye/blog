var express = require('express');
var router = express.Router();
var Article = require('../models/article.model');
var bodyparser = require('body-parser');

const multerConfig = require('../middleware/multer.config');

var articleCtrl = require('..//controllers/article.controller');
const multer = require('multer');
const articleValidator = require('../middleware/validators/article.validator');


/* GET home page. */
router.get('/', function(req, res, next) {
  Article.find()
  .then((articles)=>{
    req.flash('success', 'test Ok');
    res.render('index', { title: 'Mon Blog' , 'articles': articles});
    //res.status(200).json(articles)
  })
  .catch((err)=>{
    res.status(200).json(err)
  });
  //res.render('index', { title: 'Express' });
});

router.get('/addArticle', articleCtrl.Pageadd);

router.post('/addArticle',  multerConfig, articleValidator ,articleCtrl.addArticle);

router.get('/article/:id', (req,res, next)=>{
   Article.findOne({_id: req.params.id})
   .then((article)=>{
     res.render('single-article', {article: article})
   })
})

router.get('/edit-article/:id', articleCtrl.editArticlePage);

router.post('/edit-article/:id', multerConfig , articleCtrl.editArticle);



module.exports = router;
