import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function RecipeFetcher() {
  const { recipeid } = useParams();
  const [recipeFetch, setRecipeFetch] = useState(null);

  const navigate = useNavigate();

  const fetchRecipe = async () => {
    try {
      const response = await axios.post(
        `http://localhost:5012/fetch-recipes/${recipeid}`
      );
      setRecipeFetch(response.data.data);
    } catch (error) {
      console.error("Error fetching recipe:", error);
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
