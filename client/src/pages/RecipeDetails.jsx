import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

function RecipeFetcher() {
  const { recipeid } = useParams();
  const [recipeFetch, setRecipeFetch] = useState(null);
  const { user } = useContext(AuthContext);
  const userId = user._id;

  const navigate = useNavigate();

  const fetchRecipe = async () => {
    try {
      const response = await axios.post(
        `http://localhost:5012/recipes/${recipeid}`
      );
      setRecipeFetch(response.data.data);
    } catch (error) {
      console.error("Error fetching recipe:", error);
    }
  };

  const addToYourRecipes = async () => {
    console.log("user", user);
    if (!user) {
      console.log("User is not logged in");
      return;
    }

    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post(
        `http://localhost:5012/your-recipes/${recipeid}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Recipe added:", response.data);
      alert("Recipe added to your collection");
    } catch (error) {
      console.error("Error adding recipe:", error);
      alert("Failed to add recipe");
    }
  };

  useEffect(() => {
    fetchRecipe();
  }, [recipeid]);

  return (
    <>
      <div>
        {recipeFetch ? (
          <div>
            <h2>{recipeFetch.title}</h2>
            <img src={recipeFetch.image} alt={recipeFetch.title} />
            <p>Serves: {recipeFetch.servings}</p>
            <p>Course: {recipeFetch.dishType}</p>
            <p>Cuisine: {recipeFetch.cuisineType}</p>
            <p>Time to make: {recipeFetch.totalTime}</p>

            <ul className="ingredientsContainer">
              {recipeFetch.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
            <div className="instructionsSection">
              <p>Instructions provided by {recipeFetch.source}</p>
              <p>
                {" "}
                <a
                  href={recipeFetch.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Instructions
                </a>
              </p>
            </div>
            <button
              className="addToYourRecipesButton"
              onClick={() => {
                addToYourRecipes();
              }}
            >
              Add to Your Recipes
            </button>

            <button
              className="backButton"
              onClick={() => {
                navigate(-1);
              }}
            >
              Back
            </button>
          </div>
        ) : (
          <div>
            <p>Loading recipe...</p>
            <button
              className="backButton"
              onClick={() => {
                navigate(-1);
              }}
            >
              Back
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default RecipeFetcher;
