import axios from 'axios';

export const fetchRecipes = (query = '', category = '', dietary = []) => async (dispatch) => {
  try {
    const params = new URLSearchParams({
      q: query || '',
      app_id: 'a5de3521',
      app_key: '28f8a20bd893e2740e68d4bbb349b977',
      from: 0,
      to: 50,
    });

    if (category) params.append('category', category);
    if (dietary.length) params.append('diet', dietary.join(','));

    const response = await axios.get(`https://api.edamam.com/search?${params}`);
    const recipes = response.data.hits.map((hit) => hit.recipe);

    dispatch({ type: 'FETCH_RECIPES_SUCCESS', payload: recipes });
  } catch (error) {
    dispatch({ type: 'FETCH_RECIPES_FAILURE', payload: error.message });
  }
};

export const toggleFavorite = (recipe) => ({
  type: 'TOGGLE_FAVORITE',
  payload: recipe,
});
