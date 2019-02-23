import axios from 'axios';

// types
export const FETCH_FILMS = 'FETCH_FILMS';
export const REMOVE_FILM = 'REMOVE_FILM';
export const EDIT_FILM = 'EDIT_FILM';
export const ADD_FILM = 'ADD_FILM';

export const fetchFilms = () => {
  const API_KEY = 'b5677617';
  const filmTitle = 'baby';

  return async dispatch => {
    const response = (await axios.get(`http://www.omdbapi.com/?s=${filmTitle}&apikey=${API_KEY}`))
      .data.Search;
    const promisesArray = response.map(film =>
      axios.get(`http://www.omdbapi.com/?t=${film.Title}&apikey=${API_KEY}`)
    );
    const values = (await Promise.all(promisesArray)).map(value => value.data);
    dispatch({
      type: FETCH_FILMS,
      payload: values
    });
  };
};

export const removeFilm = imdbID => {
  return {
    type: REMOVE_FILM,
    payload: imdbID
  };
};

export const editFilm = film => {
  return {
    type: EDIT_FILM,
    payload: film
  };
};

export const addFilm = filmValues => {
  return {
    type: ADD_FILM,
    payload: filmValues
  };
};
