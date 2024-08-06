import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { searchRecipes } from './client';

function SearchResults() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const searchQuery = new URLSearchParams(location.search).get('query');
    if (searchQuery) {
      performSearch(searchQuery);
    } else {
      setLoading(false);
    }
  }, [location]);

  const performSearch = async (query) => {
    setLoading(true);
    setError(null);
    try {
      const results = await searchRecipes(query);
      setRecipes(results);
    } catch (err) {
      setError(err.message || 'An error occurred while searching for recipes');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="container mt-5 pt-5 text-white">Loading...</div>;
  if (error) return <div className="container mt-5 pt-5 text-white">{error}</div>;

  return (
    <div className="bg-black text-white min-vh-100">
      <div className="container pt-5 mt-5">
        <h2 className="mb-4 text-center">Search Results</h2>
        {recipes.length === 0 ? (
          <p className="text-center">No recipes found. Try a different search term.</p>
        ) : (
          <div className="row gy-4">
            {recipes.map((recipe, index) => (
              <div key={index} className="col-md-4">
                <div className="card h-100 bg-dark text-white">
                  <img src={recipe.recipe.image} className="card-img-top" alt={recipe.recipe.label} />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{recipe.recipe.label}</h5>
                    <p className="card-text text-white-50">{recipe.recipe.source}</p>
                    <Link 
                      to={`/recipe/${encodeURIComponent(recipe.recipe.uri)}`} 
                      className="btn btn-outline-light mt-auto"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchResults;