import axios from 'axios';

export const fetchRecipes = (query = '', category = '', dietary = []) => async (dispatch) => {
  try {
    if (!query) {
      throw new Error('Search query is required');
    }

    let dietaryParams = dietary.length ? `&diet=${dietary.join(',')}` : ''; // Dietary filtering
    let categoryParams = category ? `&category=${category}` : ''; // Category filtering

    const response = await axios.get(
      `https://api.edamam.com/search?q=${query}&app_id=a5de3521&app_key=28f8a20bd893e2740e68d4bbb349b977&from=0&to=50${dietaryParams}${categoryParams}`
    );
    
    const allRecipes = response.data.hits.map(hit => hit.recipe);
    
    // Filter recipes if dietary/category filters are applied
    const filteredRecipes = allRecipes.filter(recipe => {
      const isVegetarian = dietary.includes('vegetarian') ? recipe.dietLabels.includes('Vegetarian') : true;
      const isVegan = dietary.includes('vegan') ? recipe.dietLabels.includes('Vegan') : true;
      const isCategoryMatch = category ? recipe.category === category : true;
      
      return isVegetarian && isVegan && isCategoryMatch;
    });

    dispatch({ type: 'FETCH_RECIPES_SUCCESS', payload: { filteredRecipes, allRecipes } });
  } catch (error) {
    dispatch({ type: 'FETCH_RECIPES_FAILURE', payload: error.message });
  }
};

export const toggleFavorite = (recipe) => {
  return {
    type: 'TOGGLE_FAVORITE',
    payload: recipe,
  };
};
