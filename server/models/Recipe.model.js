import mongoose from "mongoose";

const RecipeSchema = new mongoose.Schema({
  title: String,
  image: String,
  ingredients: [String],
  source: String,
  url: String,
});

// Named export for RecipeSchema
export { RecipeSchema };

// Default export for Recipe model
const Recipe = mongoose.model("Recipe", RecipeSchema);
export default Recipe;
