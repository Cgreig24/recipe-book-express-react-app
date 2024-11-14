import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

function YourRecipes() {
  const { user } = useContext(AuthContext);
  const [yourRecipeFetch, setYourRecipeFetch] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  //const { recipeid } = useParams();

  const fetchYourRecipe = async () => {
    try {
      const response = await axios.get(`http://localhost:5012/your-recipes`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      setYourRecipeFetch(response.data.data);
    } catch (error) {
      console.error("Error fetching recipe:", error);
      setError("Failed to load your recipes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchYourRecipe();
    } else {
      setError("User not authenticated");
      setLoading(false);
    }
  }, [user]);

  const handleYourRecipeClick = (recipeid) => {
    // const recipeid = recipe._id;
    navigate(`/your-recipes/${recipeid}`);
  };

  return (
    <>
      {yourRecipeFetch.length > 0 ? (
        <div>
          {yourRecipeFetch.map((recipe) => (
            <div
              key={recipe._id}
              onClick={() => handleYourRecipeClick(recipe._id)}
            >
              <h2>{recipe.title}</h2>
              <img src={recipe.image} />
              <p>{recipe.dishType}</p>
              <p>{recipe.cuisineType}</p>

              <button>Remove from Recipe Book</button>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <h2>Nothing rendered</h2>
          <button>Remove from Recipe Book</button>
        </div>
      )}
    </>
  );
}

export default YourRecipes;
