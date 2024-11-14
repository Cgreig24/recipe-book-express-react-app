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
  }, [recipeid]);

  const handleDelete = () => {
    axios
      .delete(`http://localhost:5012/your-recipes/${recipeid}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      })
      .then(() => navigate(-1))
      .catch((error) => {
        console.error("Error deleting recipe:", error);
        setError("Failed to remove recipe from your book");
      });
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
