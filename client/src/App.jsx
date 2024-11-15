import "./App.css";
import React, { useState, useEffect } from "react";
import Recipe from "./components/Recipe";
import axios from "axios";

import Homepage from "./pages/Homepage";

import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import RecipesPage from "./pages/RecipesPage";
import RecipeDetails from "./pages/RecipeDetails";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import UserProfilePage from "./pages/UserProfilePage";
import YourRecipes from "./pages/YourRecipes";
import YourRecipeDetails from "./pages/YourRecipesDetails";

import IsPrivate from "./components/IsPrivate";
import IsAnon from "./components/IsAnon";
//import Search from "./components/Search";
//import { Carousel } from "react-multi-carousel";
//import "react-multi-carousel/lib/styles.css";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <div className="App relative z-20 pt-20">
        <Navbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        {isSidebarOpen && <Sidebar />}
        <div
          className={`content ${isSidebarOpen ? "shifted" : ""} relative z-10`}
        >
          <div className="appContainer">
            <div className="content">
              <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/recipes" element={<RecipesPage />} />
                <Route path="/recipes/:recipeid" element={<RecipeDetails />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/profile" element={<UserProfilePage />} />
                <Route path="/your-recipes" element={<YourRecipes />} />
                <Route
                  path="/your-recipes/:recipeid"
                  element={<YourRecipeDetails />}
                />
              </Routes>
            </div>

            <Footer />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
