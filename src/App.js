import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SearchResults from './SearchResults';
import RecipeDetails from './RecipeDetails';
import ProjectDetails from './ProjectDetails';
import recipes from './recipes.json';
import Sidebar from './Sidebar';
import SavedRecipes from './SavedRecipes';


function App({ }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [selectedDietaryRestrictions, setSelectedDietaryRestrictions] = useState([]);
  const [currentScreen, setCurrentScreen] = useState('search');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSavedRecipesPopupOpen, setIsSavedRecipesPopupOpen] = useState(false);
  const [userSavedRecipes, setUserSavedRecipes] = useState([]);

  const [userRecipes, setUserRecipes] = useState({
    user1: [],
    user2: [],
    user3: [],
    user4: [],
  });

  // const handleSaveRecipe = (user, recipeTitle) => {
  //   // Update the saved recipes for the specific user
  //   setUserRecipes((prevUserRecipes) => ({
  //     ...prevUserRecipes,
  //     [user]: [...prevUserRecipes[user], recipeTitle],
  //   }));
  //   setSavedRecipes({
  //     ...savedRecipes,
  //     [user]: [...savedRecipes[user], recipeTitle],
  //   });
  // };
  const [savedRecipes, setSavedRecipes] = useState({});

  const handleSaveRecipe = (user, recipeTitle) => {
    setSavedRecipes((prevSavedRecipes) => {
      const newSavedRecipes = { ...prevSavedRecipes };

      if (!newSavedRecipes[user]) {
        newSavedRecipes[user] = [];
      }

      newSavedRecipes[user].push(recipeTitle);

      return newSavedRecipes;
    });
  };

  const handleUserClick = (user) => {
    const savedRecipesForUser = userRecipes[user] || [];
    setUserSavedRecipes(savedRecipesForUser);
    setIsSavedRecipesPopupOpen(true);
  };



  // Function to reset all selection inputs
  const clearAllSelections = () => {
    setSearchTerm('');
    setSelectedDifficulty('');
    setSelectedDietaryRestrictions([]);
  };

  function toggleSidePanel() {
    setIsMenuOpen(!isMenuOpen);
  }
  const displayUserContent = (user) => {
    handleUserClick(user);
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
        <header className="site-header">
          <h1>Smart Cookbook</h1>
        </header>
        <div className={`side-panel${isMenuOpen ? ' open' : ''}`}>
          {/* Hamburger menu within the side panel */}
          <div className="hamburger-menu" onClick={toggleSidePanel}>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </div>

          {/* Rest of the side panel content */}
          <div className="side-panel-content">
            <Sidebar user="1" onClick={handleUserClick} setCurrentScreen={setCurrentScreen} displayUserContent={displayUserContent} />
            <Sidebar user="2" onClick={handleUserClick} setCurrentScreen={setCurrentScreen} displayUserContent={displayUserContent} />
            <Sidebar user="3" onClick={handleUserClick} setCurrentScreen={setCurrentScreen} displayUserContent={displayUserContent} />
            <Sidebar user="4" onClick={handleUserClick} setCurrentScreen={setCurrentScreen} displayUserContent={displayUserContent} />
          </div>
        </div>
        {isSavedRecipesPopupOpen && (
          <SavedRecipes savedRecipes={userSavedRecipes} />
        )}

        {/* Overlay background (unchanged) */}
        <div className={`overlay${isMenuOpen ? ' open' : ''}`}></div>
        <div className="hamburger-menu" onClick={toggleSidePanel}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>


        <div className="select-container">{
          currentScreen === 'search' && (
            <>
              <div className='select-containers'>
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
              </div>
              <div className="show-recipes">

                <p>Showing {filteredRecipes.length} recipes:</p></div>
            </>

          )}</div>


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
            path="/projectdetails"
            element={<ProjectDetails />} // Define the route for ProjectDetails
          />
          <Route
            path="/recipe/:id"
            element={
              <RecipeDetails
                recipes={recipes}
                onSaveRecipe={handleSaveRecipe} // Pass the onSaveRecipe function
                setCurrentScreen={setCurrentScreen}
              />
            }
          />
          <Route
            path="/"
            element={
              currentScreen === 'search' ? (
                <SearchResults
                  recipes={recipes.filter(filterRecipes)}
                  setCurrentScreen={setCurrentScreen}
                />
              ) : (
                <RecipeDetails
                  recipes={recipes}
                  onSaveRecipe={handleSaveRecipe}
                  setCurrentScreen={setCurrentScreen}
                />
              )
            }
          />
          <Route path="/savedrecipes" element={<SavedRecipes savedRecipes={savedRecipes} />} />


        </Routes>
      </div>
    </Router>
  );
}

export default App;