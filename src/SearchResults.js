import React from 'react';
import './SearchResults.css';
import { Link } from 'react-router-dom';
import { Grid, Card, CardContent, Typography } from '@mui/material';

function SearchResults({ recipes, setCurrentScreen }) {
  return (
    <div className="gridContainer">
      <Grid container spacing={2}>
        {recipes.map((recipe) => (
          <Grid item key={recipe.id} xs={12} sm={6} md={4}> 
            <Link to={`/recipe/${recipe.id}`} style={{ textDecoration: 'none' }}>
              <Card>
                <CardContent>
                  <div className="recipe-icon">
                    <img src={`${process.env.PUBLIC_URL}/${recipe.image}`} alt={recipe.title} />
                  </div>
                  <Typography variant="h6">{recipe.title}</Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default SearchResults;
