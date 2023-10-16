import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './RecipeDetails.css';

function RecipeDetails({ recipes, setCurrentScreen, onSaveRecipe, currentUser }) {
    const { id } = useParams();
    const recipe = recipes.find((recipe) => recipe.id === id);
    const [servings, setServings] = useState(recipe.servings);
    const navigate = useNavigate();
    setCurrentScreen('recipeDetails');
    const [ingredientAmounts, setIngredientAmounts] = useState(recipe.ingredients);



    const handleServingsChange = (event) => {
        const newServings = parseInt(event.target.value, 10);
        const adjustmentFactor = newServings / recipe.servings;

        setServings(newServings);

        // Adjust the ingredient amounts based on the user's input
        const adjustedIngredients = recipe.ingredients.map((ingredient) => ({
            name: ingredient.name,
            amount: (adjustmentFactor * parseFloat(ingredient.amount)).toFixed(1),
            unit: ingredient.unit,
        }));

        setIngredientAmounts(adjustedIngredients);
    };

    const handleSaveRecipe = () => {
        console.log("Save Recipe button clicked");
        const user = prompt('Enter the user number (1, 2, 3, or 4) to save the recipe:');
        if (user) {
            console.log(`Saving recipe "${recipe.title}" for user ${user}`);
            onSaveRecipe(user, recipe.title);
        }
    };
    

    const handleBackToSearch = () => {
        setCurrentScreen('search'); // Set the currentScreen back to 'search'
        navigate('/');
    };

    return (
        <div><button className="back-to-search-button" onClick={handleBackToSearch}>Back to Search</button>
            <button className='save-recipe' onClick={handleSaveRecipe}>Save Recipe</button>

            <div className="recipe-details-container">

                <div className="recipe-details-content">
                    <div className="recipe-details-left">
                        <h2>{recipe.title}</h2>

                        <p>Servings: <input type="number" value={servings} onChange={handleServingsChange} /></p>

                        <h3>Ingredients:</h3>
                        <ul>
                            {ingredientAmounts.map((ingredient, index) => (
                                <li key={index}>
                                    {ingredient.name}: {ingredient.amount} {ingredient.unit}
                                </li>
                            ))}
                        </ul>


                        <h3>Instructions:</h3>
                        <ul>
                            {recipe.instructions.map((instruction, index) => (
                                <li key={index}>
                                    {instruction}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="recipe-image-right">
                        <img src={`${process.env.PUBLIC_URL}/${recipe.image}`} alt={recipe.title} />
                    </div>
                </div>
            </div>
        </div>

    );
}

export default RecipeDetails;
