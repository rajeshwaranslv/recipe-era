import { createStore, combineReducers, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk';
import { recipeReducer, favoriteReducer } from '../redux/reducers/recipeReducer';

const rootReducer = combineReducers({
  recipes: recipeReducer,
  favorites: favoriteReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
