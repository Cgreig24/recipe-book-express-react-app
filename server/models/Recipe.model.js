import mongoose from "mongoose";

const RecipeSchema = new mongoose.Schema({
  title: String,
  image: String,
  uri: String,
  recipeId: String,
  ingredients: [String],
  servings: String,
  source: String,
  url: String,
  dishType: [String],
  cuisineType: [String],
  healthLabels: [String],
  totalTime: String,
  apiLink: String,
});

// Named export for RecipeSchema
export { RecipeSchema };

// Default export for Recipe model
const Recipe = mongoose.model("Recipe", RecipeSchema);
export default Recipe;
