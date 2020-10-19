import {getTopRated} from '../data/Repository';
import createProvider from './createProvider';

const tmdb_reducer = (state, action) => {
  switch (action.type) {
    case 'get_movies':
      return action.payload;
    default:
      return state;
  }
};

const getMovies = (dispatch) => {
  return async () => {
    const response = await getTopRated();
    dispatch({type: 'get_movies', payload: response});
  };
};

export const {Context, Provider} = createProvider(tmdb_reducer, {getMovies}, null);
