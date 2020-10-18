import {
  getMovieById,
  getMovieCast,
  getMovieVideos,
  getTvById,
  getTvCast,
  getTvVideos,
  getTopRated as loadTopRated,
  getPopularMovie as loadMostPopular,
  getNowPlaying as loadNowPlaying,
  getUpComing as loadUpComing,
  getPopularTv as loadPopularTv,
  getTopRatedTv as loadTopRatedTv,
} from '../../api/TmdbEndpoint';
import {mapMovieToMedia, mapTvShowToMedia} from '../../utils/Utils';
const movieMapper = (movie) => mapMovieToMedia(movie);
const tvMapper = (tvShow) => mapTvShowToMedia(tvShow);

export const getMovieDetails = async (movieId) => {
  const detailsResponse = await getMovieById(movieId);

  const {runtime, status, production_companies, genres} = detailsResponse.data;

  const castResponse = await getMovieCast(movieId);
  const cast = castResponse.data.cast.map((c) => {
    return {name: c.name, imageUrl: c.profile_path};
  });

  const videosResponse = await getMovieVideos(movieId);
  console.log(`videoResponse: ${JSON.stringify(videosResponse)}`);

  const videos = videosResponse.data.results;
  return {
    runtime: runtime,
    status: status,
    companies: production_companies,
    ...{genres: genres, videos: videos, cast: cast},
  };
};

export const getTvDetails = async (tvId) => {
  const detailsResponse = await getTvById(tvId);
  const {number_of_seasons, status, production_companies, genres} = detailsResponse.data;

  const castResponse = await getTvCast(tvId);
  const cast = castResponse.data.cast.map((c) => {
    return {name: c.name, imageUrl: c.profile_path};
  });

  const videosResponse = await getTvVideos(tvId);

  const videos = videosResponse.data.results;
  return {
    seasons: number_of_seasons,
    status: status,
    companies: production_companies,
    ...{genres: genres, videos: videos, cast: cast},
  };
};

export const getTopRated = async (page = 1) => {
  const response = await loadTopRated(page);
  return response.data.results.map(movieMapper);
};
export const getMostPopular = async (page = 1) => {
  const response = await loadMostPopular(page);
  return response.data.results.map(movieMapper);
};

export const getNowPlaying = async (page = 1) => {
  const response = await loadNowPlaying(page);
  return response.data.results.map(movieMapper);
};

export const getUpComing = async (page = 1) => {
  const response = await loadUpComing(page);
  return response.data.results.map(movieMapper);
};

export const getPopularTv = async (page = 1) => {
  const response = await loadPopularTv(page);
  return response.data.results.map(tvMapper);
};

export const getTopRatedTv = async (page = 1) => {
  const response = await loadTopRatedTv(page);
  return response.data.results.map(tvMapper);
};
