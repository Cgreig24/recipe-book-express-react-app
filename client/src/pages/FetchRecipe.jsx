import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function RecipeFetcher() {
  const { recipeid } = useParams();
  const [recipeFetch, setRecipeFetch] = useState(null);

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
            <p>{recipeFetch.ingredients.join(", ")}</p>
            <a
              href={recipeFetch.instructions}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Instructions
            </a>
          </div>
        ) : (
          <p>Loading recipe...</p>
        )}
      </div>
    </>
  );
}

export default RecipeFetcher;
