import { combineReducers } from 'redux';
import filmsReducer from './films_reducer';

export default combineReducers({
  films: filmsReducer
});
