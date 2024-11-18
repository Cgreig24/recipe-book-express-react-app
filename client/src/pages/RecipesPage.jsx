import React, { useState, useEffect } from "react";
import axios from "axios";
import RecipeList from "../components/RecipeList";
import { useNavigate } from "react-router-dom";

function RecipeDeets() {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState([""]);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const getRecipes = async () => {
    const response = await axios.get(`http://localhost:5012/recipes/${query}`);
    console.log(response.data);
    setRecipes(response.data);
  };

  useEffect(() => {
    getRecipes();
  }, [query]);

  const getSearch = (e) => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  };

  const handleRecipeClick = (recipe) => {
    const recipeid = recipe.uri.split("#recipe_")[1];
    navigate(`/recipes/${recipeid}`);
  };

  const getDishTypeColor = (dishType) => {
    if (typeof dishType !== "string") return "bg-gray-500"; // Default to gray if dishType is not a string

    const dishTypeLower = dishType.toLowerCase(); // Safe to call after type check
    switch (dishTypeLower) {
      case "main course":
        return "bg-blue-500"; // Blue for main course
      case "condiments and sauces":
        return "bg-yellow-500"; // Yellow for condiments and sauces
      case "soup":
        return "bg-green-500"; // Green for soup
      case "drinks":
        return "bg-teal-500"; // Teal for drinks
      case "desserts":
        return "bg-pink-500"; // Pink for desserts
      case "starter":
        return "bg-orange-500"; // Orange for starters
      case "sandwiches":
        return "bg-red-500"; // Red for sandwiches
      case "alcohol cocktail":
        return "bg-purple-500"; // Purple for alcohol cocktails
      case "biscuits and cookies":
        return "bg-brown-500"; // Brown for biscuits and cookies
      case "preps":
        return "bg-indigo-500"; // Indigo for preps
      case "cereals":
        return "bg-lime-500"; // Lime for cereals
      case "salad":
        return "bg-green-300"; // Light green for salad
      default:
        return "bg-gray-500"; // Default gray color if the dish type isn't recognized
    }
  };

  return (
    <>
      <div>
        <form
          className="flex justify-center items-center space-x-2 mt-8 mb-8"
          onSubmit={getSearch}
        >
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input input-bordered input-primary w-4/5 sm:w-1/3 h-12 text-xl shadow-lg rounded-full"
          />
          <button
            className="btn btn-secondary text-white h-12 px-6 rounded-full"
            type="submit"
          >
            Search
          </button>
        </form>

        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {recipes.map((recipe) => (
            <div
              className="card bg-base-100 w-full shadow-xl"
              key={recipe.recipe.uri}
              onClick={() => handleRecipeClick(recipe.recipe)}
            >
              <h2 className="card-title text-center text-ellipsis overflow-hidden h-16">
                {recipe.recipe.label}
              </h2>
              <figure className="px-10 pt-10">
                <img
                  className="rounded-xl w-full h-48 object-cover"
                  src={recipe.recipe.image}
                  alt={recipe.recipe.label}
                />
              </figure>
              <div className="card-body">
                <p
                  className={`text-center text-transform: capitalize my-2 text-white p-2 rounded-md ${getDishTypeColor(
                    recipe.recipe.dishType
                  )}`}
                >
                  {recipe.recipe.dishType}
                </p>
                <p className="text-center my-2">
                  {recipe.recipe.ingredients.length} Ingredients
                </p>

                <p className="text-center text-transform: capitalize my-2">
                  {recipe.recipe.cuisineType}
                </p>
              </div>
            </div>
          ))}
        </div>
        {/*
        <RecipeList recipes={recipes} />
         */}
      </div>
    </>
  );
}

export default RecipeDeets;
