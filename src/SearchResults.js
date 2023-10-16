import React from 'react';
import './SearchResults.css';
import { Link } from 'react-router-dom';
import { Grid, Card, CardContent, Typography } from '@mui/material';

function SearchResults({ recipes, setCurrentScreen }) {
  return (
    <div className="gridContainer" style={{ height: '100vh', textAlign: 'center'  }}>
      <Grid container spacing={2}>
        {recipes.map((recipe) => (
          <Grid item key={recipe.id} xs='true' sm='true' md='true'> 
            <Link to={`/recipe/${recipe.id}`} style={{ textDecoration: 'none' }}>
              <Card style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}> 
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
