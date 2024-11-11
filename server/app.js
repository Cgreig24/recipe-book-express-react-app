import dotenv from "dotenv";
dotenv.config();
//const express = require("express");
import express from "express";
//const morgan = require("morgan");
import morgan from "morgan";
//const cookieParser = require("cookie-parser");
import cookieParser from "cookie-parser";

//const cors = require("cors");
import cors from "cors";

import { fileURLToPath } from "url";
import { dirname } from "path";
import axios from "axios";
import mongoose from "mongoose";
import Recipe, { RecipeSchema } from "./models/Recipe.model.js";
import connectDB from "./db.js";
const app = express();
const PORT = process.env.VITE_PORT;
const apiKey = process.env.VITE_APP_KEY;
const apiBaseURL = process.env.VITE_BASE_URL;
const apiId = process.env.VITE_APP_ID;

connectDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(cors());

mongoose
  .connect("mongodb://127.0.0.1:27017/recipe-book-app")
  .then((x) => console.log(`Connected to Database: "${x.connections[0].name}"`))
  .catch((err) => console.error("Error connecting to MongoDB", err));

app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get("/");

app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

/*
const options = {
  method: "GET",
  url: "https://api.themoviedb.org/3/search/movie",
  params: {
    query: `${searchQuery}`,
    include_adult: "false",
    language: "en-US",
    page: `${currentPage}`,
  },
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${apiKey}`,
  },
};
*/

//${req.params.query}

{
  /* 
app.get("/recipes/:query", async (req, res) => {
  const response = await axios.get(
    `https://api.edamam.com/search?q=${req.params.query}&app_id=${process.env.VITE_APP_ID}&app_key=${process.env.VITE_APP_KEY}`
  );
  console.log(response.data.hits);
  res.json(response.data.hits);
});

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
app.post("/fetch-recipes", async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.edamam.com/api/recipes/v2/3f40351ef85b4323b4c9bf654355cafe?type=public&app_id=${process.env.VITE_APP_ID}&app_key=${process.env.VITE_APP_KEY}`
    );

    const recipeData = response.data.recipe; // Assuming response contains an array of recipes

    if (!recipeData) {
      return res.status(400).json({ error: "No recipe data found" });
    }

    const newRecipe = await Recipe.create({
      title: recipeData.label,
      image: recipeData.image,
      ingredients: recipeData.ingredientLines,
      source: recipeData.source, // Or any other field containing instructions
      url: recipeData.url,
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

const { uri } =
  "http://www.edamam.com/ontologies/edamam.owl#recipe_3f40351ef85b4323b4c9bf654355cafe";

{
  /* 
app.get("/recipes/:uri", async (req, res) => {
  const response = await axios.get(
    `https://api.edamam.com/api/recipes/v2/by-uri?type=public&uri=${uri}&app_id=${process.env.VITE_APP_ID}&app_key=${process.env.VITE_APP_KEY}`
  );
  console.log(response.data);
  res.json(response.data);
});

*/
}

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
