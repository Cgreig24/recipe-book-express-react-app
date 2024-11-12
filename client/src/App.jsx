import "./App.css";
import React, { useState, useEffect } from "react";
import Recipe from "./components/Recipe";
import axios from "axios";

import Homepage from "./pages/Homepage";

import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import RecipesPage from "./pages/RecipesPage";
import FetchRecipe from "./pages/FetchRecipe";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

import IsPrivate from "./components/IsPrivate";
import IsAnon from "./components/IsAnon";
//import Search from "./components/Search";
//import { Carousel } from "react-multi-carousel";
//import "react-multi-carousel/lib/styles.css";

function App() {
  return (
    <>
      <Navbar />
      <div className="appContainer">
        <div className="content">
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/recipes" element={<RecipesPage />} />
            <Route path="/fetch-recipes/:recipeid" element={<FetchRecipe />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
