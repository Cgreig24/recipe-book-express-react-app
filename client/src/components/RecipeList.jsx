import React from "react";
import Recipe from "./Recipe";

function RecipeList({ recipes }) {
  return (
    <div className="recipes">
      {recipes.map((recipe, index) => (
        <Recipe
          key={index}
          title={recipe.recipe.label}
          image={recipe.recipe.image}
          ingredients={recipe.recipe.ingredients}
          course={recipe.recipe.dishType}
          link={recipe._links.self.href}
          serves={recipe.recipe.yield}
        />
      ))}
    </div>
  );
}

export default RecipeList;
