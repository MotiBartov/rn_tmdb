import api from './tmdb_api';
import {mapMovieToMedia, mapTvShowToMedia} from '../utils/Utils';
import {Category} from '../model/Category';
const movieMapper = (movie) => mapMovieToMedia(movie);
const tvMapper = (tvShow) => mapTvShowToMedia(tvShow);

const catchAsync = async (operation) => {
  try {
    return await operation();
  } catch (e) {
    console.log(`Somthing went wrong: ${JSON.stringify(e)}`);
    return {error: e, message: 'Something went wrong'};
  }
};

const runGetQuery = async (endpoint, p) =>
  api.get(endpoint, p ? {params: p} : null);

export const getTopRated = async (page = 1) =>
  await runGetQuery('/movie/top_rated', {page: page});

export const getPopularMovie = async (page = 1) =>
  await runGetQuery('/movie/popular', {page: page});

export const getNowPlaying = async (page = 1) =>
  await runGetQuery('/movie/now_playing', {page: page});

export const getUpComing = async (page = 1) =>
  await runGetQuery('/movie/upcoming', {page: page});

export const getPopularTv = async (page = 1) =>
  await runGetQuery('/tv/popular', {page: page});

export const getTopRatedTv = async (page = 1) =>
  await runGetQuery('/tv/top_rated', {page: page});

export const getMovieById = async (id) => await runGetQuery(`/movie/${id}`);
export const getMovieCast = async (id) =>
  await runGetQuery(`/movie/${id}/credits`);
export const getMovieVideos = async (id) =>
  await runGetQuery(`/movie/${id}/videos`);

export const getTvById = async (id) => await runGetQuery(`/tv/${id}`);
export const getTvCast = async (id) => await runGetQuery(`/tv/${id}/credits`);
export const getTvVideos = async (id) => await runGetQuery(`/tv/${id}/videos`);

// export const getMediaById = async (type, id) => {
//   console.log(`getMediaById: ${type}`);
//   switch (type) {
//     case MediaType.TV:
//       return await getTvById(id);
//     case MediaType.MOVIE:
//       return await getMovieById(id);
//   }
// };

export const loadMedia = async (category = Category.TOP_TV, page = 1) => {
  switch (category) {
    case Category.TOP_MOVIE:
      return await getTopRated(page);
    case Category.POPULAR_MOVIE:
      return await getPopularMovie(page);
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
