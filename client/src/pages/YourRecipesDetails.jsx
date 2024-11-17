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
  const [notes, setNotes] = useState("");
  const [newIngredient, setNewIngredient] = useState("");
  const [ingredientToEdit, setIngredientToEdit] = useState(null);
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

  const handleSaveNotes = async () => {
    try {
      const response = await axios.patch(
        `http://localhost:5012/your-recipes/${recipeid}`,
        { notes },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      if (response.status === 200) {
        fetchYourRecipeDetails();
        setNotes("");
      }
    } catch (error) {
      console.error("Error saving notes:", error);
      setError("Failed to save notes");
    }
  };

  const handleAddIngredient = async () => {
    if (!newIngredient) return;

    const updatedIngredients = [
      ...yourRecipeFetchDetails.ingredients,
      newIngredient,
    ];

    try {
      const response = await axios.patch(
        `http://localhost:5012/your-recipes/${recipeid}`,
        { ingredients: updatedIngredients },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      if (response.status === 200) {
        fetchYourRecipeDetails();
        setNewIngredient("");
      }
    } catch (error) {
      console.error("Error adding ingredient:", error);
      setError("Failed to add ingredient");
    }
  };

  const handleEditIngredient = async (index) => {
    const updatedIngredients = [...yourRecipeFetchDetails.ingredients];
    updatedIngredients[index] = ingredientToEdit;

    try {
      const response = await axios.patch(
        `http://localhost:5012/your-recipes/${recipeid}`,
        { ingredients: updatedIngredients },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      if (response.status === 200) {
        fetchYourRecipeDetails();
        setIngredientToEdit(null);
      }
    } catch (error) {
      console.error("Error editing ingredient:", error);
      setError("Failed to edit ingredient");
    }
  };

  const handleRemoveIngredient = async (index) => {
    const confirmRemove = window.confirm(
      "Are you sure you want to remove this ingredient?"
    );
    if (confirmRemove) {
      const updatedIngredients = yourRecipeFetchDetails.ingredients.filter(
        (_, i) => i !== index
      );

      try {
        const response = await axios.patch(
          `http://localhost:5012/your-recipes/${recipeid}`,
          { ingredients: updatedIngredients },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );
        if (response.status === 200) {
          fetchYourRecipeDetails();
        }
      } catch (error) {
        console.error("Error removing ingredient:", error);
        setError("Failed to remove ingredient");
      }
    }
  };

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
        <div className="bg-primary">
          <h2>{yourRecipeFetchDetails.title}</h2>
          <img src={yourRecipeFetchDetails.image} />
          <div className="recipeDetailsQuickHits">
            <p>{yourRecipeFetchDetails.dishType}</p>
            <p>{yourRecipeFetchDetails.cuisineType}</p>
            <p>{yourRecipeFetchDetails.servings}</p>
            <p>{yourRecipeFetchDetails.totalTime}</p>
          </div>
          <div className="IngredientsSection">
            <h3>Ingredients</h3>
            <button>Edit Ingredients</button>
            <ul className="ingredientsListContainer">
              {yourRecipeFetchDetails.ingredients.map((ingredient, index) => (
                <li key={index}>
                  {ingredientToEdit === index ? (
                    <input
                      type="text"
                      placeholder="foo"
                      value={ingredientToEdit}
                      onChange={(e) => setIngredientToEdit(e.target.value)}
                    />
                  ) : (
                    <>
                      {ingredient}{" "}
                      <button onClick={() => setIngredientToEdit(index)}>
                        Edit
                      </button>
                      <button onClick={() => handleRemoveIngredient(index)}>
                        Remove
                      </button>
                    </>
                  )}

                  {ingredientToEdit === index && (
                    <button onClick={() => handleEditIngredient(index)}>
                      Save
                    </button>
                  )}
                </li>
              ))}
            </ul>

            <div>
              <input
                type="text"
                id="new-ingredient"
                placeholder="Add extra ingredient..."
                value={newIngredient}
                onChange={(e) => setNewIngredient(e.target.value)}
              />
              <button onClick={handleAddIngredient}>Add</button>
            </div>
          </div>

          <div>
            <h3 className="instructionsHeader">Instructions</h3>
            <div className="yourRecipesInstructions">
              <p>Instructions provided by {yourRecipeFetchDetails.source}</p>
              <p>
                {" "}
                <a
                  href={yourRecipeFetchDetails.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Instructions
                </a>
              </p>
            </div>
          </div>
          <div className="notesSection">
            <h3>Notes or suggestions</h3>
            <ul>
              {yourRecipeFetchDetails.notes.map((note, index) => (
                <li key={index}>{note}</li>
              ))}
            </ul>
            <div>
              <textarea
                id="notes"
                placeholder="Add additional notes here..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows="3"
                cols="70"
              />
            </div>
            <button onClick={handleSaveNotes}>Save</button>
          </div>

          <button className="btn btn-primary" onClick={handleDelete}>
            Remove from Recipe Book
          </button>
          <button
            className="btn btn-neutral"
            onClick={() => {
              navigate(-1);
            }}
          >
            Back
          </button>
        </div>
      ) : (
        <div>
          <h2>Nothing loaded</h2>
          <button className="btn btn-warning">Remove from Recipe Book</button>
        </div>
      )}
    </>
  );
}

export default YourRecipeDetails;
