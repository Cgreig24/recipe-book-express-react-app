import dotenv from "dotenv";
dotenv.config();
//const express = require("express");
import express from "express";
//const morgan = require("morgan");
import morgan from "morgan";
//const cookieParser = require("cookie-parser");
import cookieParser from "cookie-parser";
const PORT = process.env.VITE_PORT;
//const cors = require("cors");
import cors from "cors";
const app = express();
import { fileURLToPath } from "url";
import { dirname } from "path";
import axios from "axios";
import mongoose from "mongoose";
const apiKey = process.env.VITE_APP_KEY;
const apiBaseURL = process.env.VITE_BASE_URL;
const apiId = process.env.VITE_APP_ID;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(cors());

mongoose
  .connect("mongodb://127.0.0.1:27017/cohort-tools-api")
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

app.get("/recipes/:query", async (req, res) => {
  const response = await axios.get(
    `https://api.edamam.com/search?q=${req.params.query}&app_id=${process.env.VITE_APP_ID}&app_key=${process.env.VITE_APP_KEY}`
  );
  console.log(response.data.hits);
  res.json(response.data.hits);
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
