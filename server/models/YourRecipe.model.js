import mongoose from "mongoose";

const YourRecipeSchema = new mongoose.Schema({
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
  apiLink: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

// Named export for RecipeSchema
export { YourRecipeSchema };

// Default export for Recipe model
const YourRecipe = mongoose.model("YourRecipe", YourRecipeSchema);
export default YourRecipe;
