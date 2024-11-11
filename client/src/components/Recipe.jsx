import React, { useState, useEffect } from "react";
import "../styles/Recipe.css";
import { Link } from "react-router-dom";
import axios from "axios";

const Recipe = ({ title, image, ingredients, link, course, serves, uri }) => {
  const [isClicked, setIsClicked] = useState(false);
  const [isFetched, setIsFetched] = useState(false);
  const [recipeDeets, setRecipeDeets] = useState({});

  useEffect(() => {
    if (isClicked) {
      const fetch = axios.get(link);
      setRecipeDeets(fetch);
    }
    if (recipeDeets !== undefined) {
      setIsFetched(true);
    }
  }, []);
  return (
    <>
      {/* 
      {!isFetched ? (

*/}
      <article className="recipe">
        <h1>{title}</h1>
        <p>Number of Ingredients: {ingredients.length}</p>
        <p>{course}</p>
        <p>Serves: {serves}</p>
        <ol>
          {ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient.text}</li>
          ))}
        </ol>
        <img className="recipeImage" src={image} alt="missing" />
      </article>

      {/* 
      ) : (
        <article className="recipe">
          <h1>{recipeDeets.recipe.label}</h1>
          <p>Number of Ingredients: {ingredients.length}</p>
          <p>{course}</p>
          <p>{recipeDeets.recipe.source}</p>
          <p>Serves: {serves}</p>
          <ol>
            {ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient.text}</li>
            ))}
          </ol>
          <img className="recipeImage" src={image} alt="missing" />
        </article>
      )
         }
        */}
    </>
  );
};

export default Recipe;
