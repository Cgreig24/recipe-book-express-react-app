import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

function YourRecipeDetails() {
  const { user } = useContext(AuthContext);
  const { recipeid } = useParams();
  const [yourRecipeFetchDetails, setYourRecipeFetchDetails] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchYourRecipeDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5012/your-recipes/${recipeid}`,

        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      setYourRecipeFetchDetails(response.data.data);
    } catch (error) {
      console.error("Error fetching recipe:", error);
      setError("Failed to load your recipes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchYourRecipeDetails();
    } else {
      setError("User not authenticated");
      setLoading(false);
    }
  }, [recipeid, user]);

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:5012/your-recipes/${recipeid}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      if (response.status == 204) {
        console.log("Recipe deleted successfully, navigating back.");
        navigate("/your-recipes");
      } else {
        console.error("Unexpected response from delete request:", response);
        setError("Failed to delete the recipe, try again.");
      }
    } catch (error) {
      console.error("Error deleting recipe:", error);
      setError("Failed to remove recipe from your book");
    }
  };

  return (
    <>
      {yourRecipeFetchDetails ? (
        <div>
          <h2>{yourRecipeFetchDetails.title}</h2>
          <img src={yourRecipeFetchDetails.image} />
          <p>{yourRecipeFetchDetails.dishType}</p>
          <p>{yourRecipeFetchDetails.cuisineType}</p>
          <ul className="ingredientsContainer">
            {yourRecipeFetchDetails.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>

          <button onClick={handleDelete}>Remove from Recipe Book</button>
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
          <h2>Nothing rendered</h2>
          <button>Remove from Recipe Book</button>
        </div>
      )}
    </>
  );
}

export default YourRecipeDetails;
