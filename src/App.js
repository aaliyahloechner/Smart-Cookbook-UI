import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SearchResults from './SearchResults';
import RecipeDetails from './RecipeDetails';
import ProjectDetails from './ProjectDetails';
import recipes from './recipes.json';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [selectedDietaryRestrictions, setSelectedDietaryRestrictions] = useState([]);
  const [currentScreen, setCurrentScreen] = useState('search'); 

  // Function to reset all selection inputs
  const clearAllSelections = () => {
    setSearchTerm('');
    setSelectedDifficulty('');
    setSelectedDietaryRestrictions([]);
  };

  const filterRecipes = (recipe) => {
    const title = recipe.title.toLowerCase();
    const ingredients = recipe.ingredients.map((ingredient) => ingredient.name.toLowerCase());

    const searchTerms = searchTerm.toLowerCase().split(' ');

    const keywordMatch =
      title.includes(searchTerm) ||
      ingredients.some((ingredient) => ingredient.includes(searchTerm)) ||
      searchTerms.every((term) => title.includes(term) || ingredients.some((ingredient) => ingredient.includes(term)));

    const difficultyMatch =
      selectedDifficulty === 'Any' || recipe.difficulty.toLowerCase() === selectedDifficulty.toLowerCase();

    const restrictionMatch =
      selectedDietaryRestrictions.length === 0 ||
      (selectedDietaryRestrictions.length === 1 && selectedDietaryRestrictions[0] === 'None') ||
      recipe.dietaryRestrictions.some((restriction) => selectedDietaryRestrictions.includes(restriction));


    return keywordMatch && difficultyMatch && restrictionMatch;
  };

  const filteredRecipes = recipes.filter(filterRecipes);

  return (
    <Router>
      <div className="App">
        <header>
          <h1>Smart Cookbook</h1>
          <div className="select-containers">{
             currentScreen === 'search' && (
              <>
                <a
                  href="https://docs.google.com/document/d/1HPRjXsFpWOdFxGxqm2lOKTw25tLWkeu-cj98PaQMnKk/edit?usp=sharing" 
                  target="_blank" // Open in a new tab/window
                  rel="noopener noreferrer" // Recommended for security
                >
                  <button className="top-right-button">Project Details</button>
                </a>
                <input
                  type="text"
                  placeholder="Search keywords or specific recipes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />

                {/* Difficulty selection */}
                <select value={selectedDifficulty} onChange={(e) => setSelectedDifficulty(e.target.value)}>
                  <option value="" disabled>Select Difficulty</option>
                  <option value="Any">Any Difficulty</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="expert">Expert</option>
                </select>

                {/* Dietary restrictions selection */}
                <select
                  value={selectedDietaryRestrictions}
                  onChange={(e) => setSelectedDietaryRestrictions(Array.from(e.target.selectedOptions, (option) => option.value))}
                >
                  <option value="" disabled>Select Dietary Restrictions</option>
                  <option value="None">No Dietary Restrictions</option>
                  <option value="Vegan">Vegan</option>
                  <option value="Vegetarian">Vegetarian</option>
                  <option value="Keto">Keto</option>
                  <option value="Pescetarian">Pescetarian</option>
                  <option value="Anti-Inflammatory">Anti-Inflammatory</option>
                  <option value="Nut-Free">Nut-Free</option>
                  <option value="Dairy-Free">Dairy-Free</option>
                  <option value="Gluten-Free">Gluten-Free</option>
                </select>

                <button onClick={clearAllSelections}>Clear all selections</button>
                <p>Showing {filteredRecipes.length} recipes:</p>

            
          </>
          )}</div>
          
        </header>
        <Routes>
          <Route
            path="/"
            element={
              <SearchResults
                recipes={recipes.filter(filterRecipes)}
                setCurrentScreen={setCurrentScreen}
              />
            }
          />
          <Route
            path="/recipe/:id"
            element={
              <RecipeDetails
                recipes={recipes}
                currentScreen={currentScreen} // Pass the currentScreen state
                setCurrentScreen={setCurrentScreen} // Pass the function to set the current screen
              />
            }
          />
          <Route
            path="/projectdetails"
            element={<ProjectDetails />} // Define the route for ProjectDetails
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;