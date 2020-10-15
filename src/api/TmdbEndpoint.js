import api from './tmdb_api';
import {mapMovieToMedia, mapTvShowToMedia} from '../utils/Utils';
import {MediaType} from '../utils/Utils';
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

export const getMediaById = async (type, id) => {
  console.log(`getMediaById: ${type}`);
  switch (type) {
    case MediaType.TV:
      return await getTvById(id);
    case MediaType.MOVIE:
      return await getMovieById(id);
  }
};

export const getMovieById = async (id) =>
  catchAsync(async () => {
    console.log('getMovieById');
    const response = await runGetQuery(`/movie/${id}`);
    console.log(`getMovieById: ${JSON.stringify(response)}`);
    return response.data;
  });

export const getTvById = async (id) =>
  catchAsync(async () => {
    const response = await runGetQuery(`/tv/${id}`);
    // console.log(`getMovieById: ${JSON.stringify(response)}`);
    return response.data;
  });
export const getCast = async (type, id) => {
  switch (type) {
    case MediaType.TV:
      return await getTvCast(id);
    case MediaType.MOVIE:
      return await getMovieCast(id);
  }
};

const getMovieCast = async (id) =>
  catchAsync(async () => {
    const response = await runGetQuery(`/movie/${id}/credits`);
    return response.data.cast.map((c) => {
      return {name: c.name, imageUrl: c.profile_path};
    });
  });

const getTvCast = async (id) =>
  catchAsync(async () => {
    const response = await runGetQuery(`/tv/${id}/credits`);
    return response.data.cast.map((c) => {
      return {name: c.name, imageUrl: c.profile_path};
    });
  });

export const getVideos = async (type, id) => {
  switch (type) {
    case MediaType.TV:
      return await getTvVideos(id);
    case MediaType.MOVIE:
      return await getMovieVideos(id);
  }
};

export const getMovieVideos = async (id) =>
  catchAsync(async () => {
    const response = await runGetQuery(`/movie/${id}/videos`);
    return response.data.results;
  });

export const getTvVideos = async (id) =>
  catchAsync(async () => {
    const response = await runGetQuery(`/tv/${id}/videos`);
    return response.data.results;
  });
