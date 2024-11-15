import React, { useState, useEffect } from "react";
import axios from "axios";
import RecipeList from "../components/RecipeList";
import { useNavigate } from "react-router-dom";

function RecipeDeets() {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState([""]);
  const [query, setQuery] = useState("chicken");
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

  return (
    <>
      <div>
        <form onSubmit={getSearch} className="searchForm">
          <input
            className="searchBar"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="searchButton" type="submit">
            Search
          </button>
        </form>

        <div>
          {recipes.map((recipe) => (
            <div
              key={recipe.recipe.uri}
              onClick={() => handleRecipeClick(recipe.recipe)}
            >
              <h2>{recipe.recipe.label}</h2>
              <img src={recipe.recipe.image} alt={recipe.recipe.label} />
              <p>Number of Ingredients: {recipe.recipe.ingredients.length}</p>
              <p>{recipe.recipe.dishType}</p>
              <p>Serves: {recipe.recipe.yield}</p>
            </div>
          ))}
        </div>

        <RecipeList recipes={recipes} />
      </div>
    </>
  );
}

export default RecipeDeets;
