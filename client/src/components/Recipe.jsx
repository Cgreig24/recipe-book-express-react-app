import React from "react";
import "../styles/Recipe.css";

const Recipe = ({ title, image, ingredients }) => {
  return (
    <div className="recipe">
      <h1>{title}</h1>
      <ol>
        {ingredients.map((ingredient) => (
          <li>{ingredient.text}</li>
        ))}
      </ol>
      <img className="recipeImage" src={image} alt="missing" />
    </div>
  );
};

export default Recipe;
