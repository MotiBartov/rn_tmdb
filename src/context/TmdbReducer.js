import {getTopRated, getMostPopular, getNowPlaying, getUpComing, getPopularTv, getTopRatedTv} from '../data/Repository';
import createProvider from './createProvider';
import {Category} from '../utils/Utils';

const tmdb_reducer = (state, action) => {
  console.log(`reducer: action type: ${JSON.stringify(action.type)}`);
  switch (action.type) {
    case 'topRated':
      return {...state, topRated: action.payload};
    case 'mostPopular':
      return {...state, mostPopular: action.payload};
    case 'nowPlaying':
      return {...state, nowPlaying: action.payload};
    case 'upComing':
      return {...state, upComing: action.payload};
    case 'popularTv':
      return {...state, popularTv: action.payload};
    case 'topRatedTv':
      return {...state, topRatedTv: action.payload};
    default:
      return state;
  }
};

const getMovies = (dispatch) => {
  return async () => {
    //console.log('getMovies');
    const topRated = await getTopRated();
    dispatch({
      type: 'topRated',
      payload: {
        category: Category.TOP_MOVIE,
        items: topRated,
      },
    });

    const mostPopular = await getMostPopular();
    dispatch({type: 'mostPopular', payload: {category: Category.POPULAR_MOVIE, items: mostPopular}});

    const nowPlaying = await getNowPlaying();
    dispatch({type: 'nowPlaying', payload: {category: Category.PLAYING_MOVIE, items: nowPlaying}});
    const upComing = await getUpComing();
    dispatch({type: 'upComing', payload: {category: Category.UPCOMING_MOVIE, items: upComing}});
    const popularTv = await getPopularTv();
    dispatch({type: 'popularTv', payload: {category: Category.POPULAR_TV, items: popularTv}});
    const topRatedTv = await getTopRatedTv();
    dispatch({type: 'topRatedTv', payload: {category: Category.TOP_TV, items: topRatedTv}});
  };
};

export const {Context, Provider} = createProvider(tmdb_reducer, {getMovies}, []);
