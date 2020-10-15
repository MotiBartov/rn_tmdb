import api from './tmdb_api';
import {mapMovieToMedia, mapTvShowToMedia} from '../utils/Utils';
import {Category} from '../model/Category';
import {MediaType} from '../model/MediaType';
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

const runGetQuery = async (endpoint, p) => {
  return api.get(endpoint, p ? {params: p} : null);
};

export const getTopRated = async (page = 1) =>
  catchAsync(async () => {
    console.log(`getTopRated: ${page}`);
    const response = await runGetQuery('/movie/top_rated', {page: page});
    return response.data.results.map(movieMapper);
  });

export const getPopularMovie = async (page = 1) =>
  catchAsync(async () => {
    const response = await runGetQuery('/movie/popular', {page: page});
    return response.data.results.map(movieMapper);
  });

export const getNowPlayingMovie = async (page = 1) =>
  catchAsync(async () => {
    const response = await runGetQuery('/movie/now_playing', {page: page});
    return response.data.results.map(movieMapper);
  });

export const getUpcomingMovie = async (page = 1) =>
  catchAsync(async () => {
    const response = await runGetQuery('/movie/upcoming', {page: page});
    return response.data.results.map(movieMapper);
  });

export const getPopularTv = async (page = 1) =>
  catchAsync(async () => {
    const response = await runGetQuery('/tv/popular', {page: page});
    return response.data.results.map(tvMapper);
  });

export const getTopRatedTv = async (page = 1) =>
  catchAsync(async () => {
    const response = await runGetQuery('/tv/top_rated', {page: page});
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

export const loadMedia = async (category = Category.TOP_TV, page = 1) => {
  switch (category) {
    case Category.TOP_MOVIE:
      return await getTopRated(page);
    case Category.POPULAR_MOVIE:
      return await getPopularMovie(page);
    case Category.PLAYING_MOVIE:
      return await getNowPlayingMovie(page);
    case Category.UPCOMING_MOVIE:
      return await getUpcomingMovie(page);
    case Category.TOP_TV:
      return await getTopRatedTv(page);
    case Category.POPULAR_TV:
      return await getPopularTv(page);
  }
};
