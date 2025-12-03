const mongoose = require("mongoose")
const Schema = mongoose.Schema

const articleShema = new Schema({
  title:String,
  price:Number,
  category: String,
})

const Article = mongoose.model("Article", articleShema)
module.exports = Article;