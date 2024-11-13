import dotenv from "dotenv";
dotenv.config();
import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import axios from "axios";
import Recipe, { RecipeSchema } from "./models/Recipe.model.js";
import connectDB from "./db.js";
import YourRecipe from "./models/YourRecipe.model.js";
import isAuthenticated from "./middleware/jwt.middleware.js";
import User from "./models/User.model.js";

const app = express();
const PORT = process.env.VITE_PORT;

connectDB();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

import authRouter from "./routes/auth.routes.js";
app.use("/auth", authRouter);

import userRouter from "./routes/user.routes.js";
app.use("/api/user", isAuthenticated, userRouter);

app.get("/recipes/:query", async (req, res) => {
  const response = await axios.get(
    `https://api.edamam.com/api/recipes/v2?type=public&q=${req.params.query}&app_id=${process.env.VITE_APP_ID}&app_key=${process.env.VITE_APP_KEY}`
  );
  // console.log(response.data.hits);
  res.json(response.data.hits);
});

// Fetch data from Edamam API and save it to MongoDB
app.post("/fetch-recipes/:recipeid", async (req, res) => {
  const { recipeid } = req.params;
  const recipeUrl = `https://api.edamam.com/api/recipes/v2/${recipeid}?type=public&app_id=${process.env.VITE_APP_ID}&app_key=${process.env.VITE_APP_KEY}`;

  try {
    const response = await axios.get(recipeUrl);
    // console.log(response);
    const recipeData = response.data; // Assuming response contains an array of recipes

    if (!recipeData) {
      return res.status(400).json({ error: "No recipe data found" });
    }

    const newRecipe = await Recipe.create({
      title: recipeData.recipe.label,
      image: recipeData.recipe.image,
      uri: recipeData.recipe.uri,
      recipeId: recipeData.recipe.uri.split("#recipe_")[1],
      ingredients: recipeData.recipe.ingredientLines,
      source: recipeData.recipe.source, // Or any other field containing instructions
      url: recipeData.recipe.url,
      servings: recipeData.recipe.yield,
      dishType: recipeData.recipe.dishType,
      cuisineType: recipeData.recipe.cuisineType,
      healthLabels: recipeData.recipe.healthLabels,
      apiLink: recipeData._links.self.href,
    });

    res
      .status(200)
      .json({ message: "Recipe saved successfully", data: newRecipe });
  } catch (error) {
    console.error("Error fetching and saving recipe", error);
    res.status(500).json({ error: "Failed to fetch recipes" });
  }
});

{
  /* 
app.get("/recipes/:recipeid", async (req, res) => {
  const response = await axios.get(
    `https://api.edamam.com/api/recipes/v2/${recipeid}?type=public&app_id=${process.env.VITE_APP_ID}&app_key=${process.env.VITE_APP_KEY}`
  );
  console.log(response.data.hits);
  res.json(response.data.hits);
});
*/
}

// Post data from MongoDB collection recipes into MongoDB collection
app.post("/your-recipes/:recipeid", isAuthenticated, async (req, res) => {
  console.log("req.headers.authorization", req.headers.authorization);
  const { recipeid } = req.params;
  console.log("payload::::::", req.payload);
  console.log(recipeid);
  // if (req.payload._id !== userId) {
  //   return res.status(403).json({ error: "User not authorized" });
  // }
  try {
    const recipe = await Recipe.findOne({ recipeId: recipeid });
    if (!recipe) {
      return res.status(400).json({ error: "Recipe not found" });
    }
    const { _id, ...newRecipe } = recipe.toObject();
    const newYourRecipe = await YourRecipe.create({
      ...newRecipe,
      userId: req.payload._id,
    });
    await newYourRecipe.save();
    res
      .status(200)
      .json({ message: "Recipe saved successfully", data: newYourRecipe });
  } catch (error) {
    console.error("Error fetching and saving recipe", error);
    res.status(500).json({ error: "Failed to fetch recipes" });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
