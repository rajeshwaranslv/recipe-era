const initialState = {
  recipes: [],
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
        recipes: action.payload,
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
      const recipeExists = state.some((fav) => fav.uri === action.payload.uri);
      return recipeExists
        ? state.filter((fav) => fav.uri !== action.payload.uri)
        : [...state, action.payload];
    default:
      return state;
  }
};
