var mongoose = require('mongoose')

var RecipeSchema = new mongoose.Schema({
      name: String,
      category: String,
      imageURL: String,
      description: String,
      ingredients: String,
      method: String,
      notes: String,
  })

  module.exports = mongoose.model('Recipe', RecipeSchema)