const initialState = {
  recipes: [], // Store filtered recipes
  allRecipes: [], // Store all available recipes
  loading: false,
  error: null,
};

export const recipeReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_RECIPES_REQUEST':
      return {
        ...state,
        loading: true,
      };
    case 'FETCH_RECIPES_SUCCESS':
      return {
        ...state,
        recipes: action.payload.filteredRecipes, // Store filtered recipes
        allRecipes: action.payload.allRecipes,   // Store all recipes
        loading: false,
      };
    case 'FETCH_RECIPES_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

const favoriteState = [];

export const favoriteReducer = (state = favoriteState, action) => {
  switch (action.type) {
    case 'TOGGLE_FAVORITE':
      const recipeExists = state.some((fav) => fav.label === action.payload.label);
      if (recipeExists) {
        return state.filter((fav) => fav.label !== action.payload.label);
      } else {
        return [...state, action.payload];
      }
    default:
      return state;
  }
};
