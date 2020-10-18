import {
  getMovieDetails as loadMovieDetails,
  getTvDetails as loadTvDetails,
  getTopRated as loadTopRated,
  getMostPopular as loadMostPopular,
  getNowPlaying as loadNowPlaying,
  getUpComing as loadUpComing,
  getPopularTv as loadPopularTv,
  getTopRatedTv as loadTopRatedTv,
} from '../data/datasources/TmdbRemoteDataSource';
import {MediaType, Category} from '../utils/Utils';

const catchAsync = async (operation) => {
  try {
    return await operation();
  } catch (e) {
    return {error: {message: e.message, details: e.details}};
  }
};

//Movies and TV
export const getTopRated = async (page = 1) => await catchAsync(() => loadTopRated(page));
export const getMostPopular = async (page = 1) => await catchAsync(() => loadMostPopular(page));
export const getNowPlaying = async (page = 1) => await catchAsync(() => loadNowPlaying(page));
export const getUpComing = async (page = 1) => await catchAsync(() => loadUpComing(page));
export const getPopularTv = async (page = 1) => await catchAsync(() => loadPopularTv(page));
export const getTopRatedTv = async (page = 1) => await catchAsync(() => loadTopRatedTv(page));

//Media Details
export const getMediaDetails = async (type, id) => {
  console.log(`Repository: getMediaDetails: ${type}, ${id}`);
  switch (type) {
    case MediaType.TV:
      return await getTvDetails(id);
    case MediaType.MOVIE:
      return await getMovieDetails(id);
  }
};

const getMovieDetails = async (id) => await catchAsync(() => loadMovieDetails(id));
const getTvDetails = async (id) => await catchAsync(() => loadTvDetails(id));

export const loadMedia = async (category = Category.TOP_TV, page = 1) => {
  switch (category) {
    case Category.TOP_MOVIE:
      return await getTopRated(page);
    case Category.POPULAR_MOVIE:
      return await getMostPopular(page);
    case Category.PLAYING_MOVIE:
      return await getNowPlaying(page);
    case Category.UPCOMING_MOVIE:
      return await getPopularTv(page);
    case Category.TOP_TV:
      return await getTopRatedTv(page);
    case Category.POPULAR_TV:
      return await getPopularTv(page);
  }
};
