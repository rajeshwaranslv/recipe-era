export const addFavorite = (recipe) => ({
    type: 'ADD_FAVORITE',
    payload: recipe,
  });
  
  export const removeFavorite = (recipeId) => ({
    type: 'REMOVE_FAVORITE',
    payload: recipeId,
  });
  