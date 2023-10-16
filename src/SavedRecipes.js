import React from 'react';
import './SavedRecipes.css';

function SavedRecipes({ savedRecipes }) {
  return (
    <div className='popup'>
      <h1>Saved Recipes</h1>
      <ul>
        {Object.entries(savedRecipes).map(([user, recipes]) => (
          <div key={user}>
            <h2>User {user}</h2>
            <ul>
              {recipes.map((recipe, index) => (
                <li key={index}>{recipe}</li>
              ))}
            </ul>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default SavedRecipes;
