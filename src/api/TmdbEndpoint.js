import api from './tmdb_api';
import {mapMovieToMedia, mapTvShowToMedia} from '../utils/Utils';

const catchAsync = async (operation) => {
  try {
    return await operation();
  } catch (e) {
    console.log(`Somthing went wrong: ${JSON.stringify(e)}`);
    return {error: e, message: 'Something went wrong'};
  }
};

const runGetQuery = async (endpoint, props) => {
  return api.get(endpoint, props ? {props: props} : null);
};

const movieMapper = (movie) => mapMovieToMedia(movie);
const tvMapper = (tvShow) => mapTvShowToMedia(tvShow);

export const getTopRated = async () =>
  catchAsync(async () => {
    const response = await runGetQuery('/movie/top_rated');
    return response.data.results.map(movieMapper);
  });

export const getPopularMovie = async () =>
  catchAsync(async () => {
    const response = await runGetQuery('/movie/popular');
    return response.data.results.map(movieMapper);
  });

export const getNowPlayingMovie = async () =>
  catchAsync(async () => {
    const response = await runGetQuery('/movie/now_playing');
    return response.data.results.map(movieMapper);
  });

export const getUpcomingMovie = async () =>
  catchAsync(async () => {
    const response = await runGetQuery('/movie/upcoming');
    return response.data.results.map(movieMapper);
  });

export const getPopularTv = async () =>
  catchAsync(async () => {
    const response = await runGetQuery('/tv/popular');
    return response.data.results.map(tvMapper);
  });

export const getTopRatedTv = async () =>
  catchAsync(async () => {
    const response = await runGetQuery('/tv/top_rated');
    return response.data.results.map(tvMapper);
  });
