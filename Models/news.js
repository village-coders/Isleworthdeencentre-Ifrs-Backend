const mongoose = require('mongoose')
const newsSchema = new mongoose.Schema({
    title:{type: String, required: true},
    date:{type: Date, required: true},
    mainImage:{type: String, required: true},
    excerpt:{type: String, required: true},
    content: {type: String, },
    category: {type: String},
    featured: {type: String},
    image1:{type: String, },
    image2:{type: String, },
    image3:{type: String, },
}, {timestamps: true})

const newsModel = mongoose.model('news', newsSchema);
module.exports = newsModel