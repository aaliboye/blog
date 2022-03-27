const mongoose = require('mongoose')
const Category = require('./category.model');

const articleSchema = mongoose.Schema({
    name: {type: String, required: true},
    content: {type: String, required: true},
    category: {type: String, required: true},
    image: String,
    publishedAt: {type: String, required: true}
})

module.exports = mongoose.model('Article', articleSchema)