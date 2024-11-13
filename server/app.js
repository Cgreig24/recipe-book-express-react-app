import dotenv from "dotenv";
dotenv.config();
import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";

import { fileURLToPath } from "url";
import { dirname } from "path";
import axios from "axios";
import mongoose from "mongoose";
import Recipe, { RecipeSchema } from "./models/Recipe.model.js";
import connectDB from "./db.js";
import YourRecipe from "./models/YourRecipe.model.js";
import isAuthenticated from "./middleware/jwt.middleware.js";
import User from "./models/User.model.js";
const app = express();
const PORT = process.env.VITE_PORT;
const apiKey = process.env.VITE_APP_KEY;
const apiBaseURL = process.env.VITE_BASE_URL;
const apiId = process.env.VITE_APP_ID;

connectDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(cors());

// mongoose
//   .connect("mongodb://127.0.0.1:27017/recipe-book-app")
//   .then((x) => console.log(`Connected to Database: "${x.connections[0].name}"`))
//   .catch((err) => console.error("Error connecting to MongoDB", err));

app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get("/");

app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

import authRouter from "./routes/auth.routes.js";
app.use("/auth", authRouter);

import userRouter from "./routes/user.routes.js";

//const userRouter = require("./routes/user.routes");
app.use("/api/user", isAuthenticated, userRouter);

{
  /*
Previous link
    `https://api.edamam.com/search?q=${req.params.query}&app_id=${process.env.VITE_APP_ID}&app_key=${process.env.VITE_APP_KEY}`
*/
}

app.get("/recipes/:query", async (req, res) => {
  const response = await axios.get(
    `https://api.edamam.com/api/recipes/v2?type=public&q=${req.params.query}&app_id=${process.env.VITE_APP_ID}&app_key=${process.env.VITE_APP_KEY}`
  );
  console.log(response.data.hits);
  res.json(response.data.hits);
});

// Fetch data from Edamam API and save it to MongoDB
app.post("/fetch-recipes/:recipeid", async (req, res) => {
  const { recipeid } = req.params;
  const recipeUrl = `https://api.edamam.com/api/recipes/v2/${recipeid}?type=public&app_id=${process.env.VITE_APP_ID}&app_key=${process.env.VITE_APP_KEY}`;

  try {
    const response = await axios.get(recipeUrl);
    console.log(response);
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
app.post("/user/your-recipes/:recipeid", isAuthenticated, async (req, res) => {
  const { userId, recipeid } = req.params;
  console.log("payload::::::", req.payload);
  console.log(recipeid, userId);
  return;
  if (req.payload._id !== userId) {
    return res.status(403).json({ error: "User not authorized" });
  }

  try {
    const recipe = await Recipe.findOne({ recipeId: recipeid });

    if (!recipe) {
      return res.status(400).json({ error: "Recipe not found" });
    }

    const newYourRecipe = await YourRecipe.create({
      ...recipe.toObject(),
      userId: userId,
    });

    await newYourRecipe.save();

    console.log(userId);
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
