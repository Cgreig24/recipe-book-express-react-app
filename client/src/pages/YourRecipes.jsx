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
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {yourRecipeFetch.map((recipe) => (
            <div className="card bg-base-100 w-full shadow-xl">
              <div
                className="prose"
                key={recipe._id}
                onClick={() => handleYourRecipeClick(recipe._id)}
              >
                <h2 className="card-title text-primary text-transform: capitalize text-center text-ellipsis overflow-hidden h-16">
                  {recipe.title}
                </h2>
                <figure className="px-4 pt-1">
                  <img
                    className="rounded-xl w-full h-48 object-cover"
                    src={recipe.image}
                  />
                </figure>
                <div>
                  <p
                    className={`text-center text-transform: capitalize my-2 text-secondary p-2 rounded-md`}
                  >
                    {recipe.dishType}
                  </p>
                  <p className="text-transform: capitalize text-center my-2">
                    {recipe.cuisineType}
                  </p>
                </div>
                <button className="btn justify-center my-2">
                  Remove from Recipe Book
                </button>
              </div>
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
