import React, { useState, useEffect } from "react";
import Recipe from "../components/Recipe";
import axios from "axios";

function Homepage() {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState([""]);
  const [query, setQuery] = useState("chicken");

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
        <div className="recipes">
          {recipes.map((recipe) => (
            <Recipe
              key={recipe.recipe.label}
              title={recipe.recipe.label}
              image={recipe.recipe.image}
              ingredients={recipe.recipe.ingredients}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default Homepage;
