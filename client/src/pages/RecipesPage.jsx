import React, { useState, useEffect } from "react";
import axios from "axios";
import RecipeList from "../components/RecipeList";

function RecipeDeets() {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState([""]);
  const [query, setQuery] = useState("chicken");

  const [recipeFetch, setRecipeFetch] = useState(null);

  const fetchRecipe = async () => {
    try {
      const response = await axios.post("http://localhost:5012/fetch-recipes");
      setRecipeFetch(response.data.data);
    } catch (error) {
      console.error("Error fetching recipe:", error);
    }
  };

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

        <div>
          <button onClick={fetchRecipe}>Fetch Recipe</button>
          {recipeFetch && (
            <div>
              <h2>{recipeFetch.title}</h2>
              <img src={recipeFetch.image} alt={recipeFetch.title} />
              <p>{recipeFetch.ingredients.join(", ")}</p>
              <a
                href={recipeFetch.instructions}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Instructions
              </a>
            </div>
          )}
        </div>

        <RecipeList recipes={recipes} />
      </div>
    </>
  );
}

export default RecipeDeets;
