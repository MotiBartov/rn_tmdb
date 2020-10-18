import api from './tmdb_api';

//Operations
const runGetQuery = async (endpoint, p) => api.get(endpoint, p ? {params: p} : null);

//Endpoints
export const getTopRated = async (page = 1) => await runGetQuery('/movie/top_rated', {page: page});
export const getPopularMovie = async (page = 1) => await runGetQuery('/movie/popular', {page: page});
export const getNowPlaying = async (page = 1) => await runGetQuery('/movie/now_playing', {page: page});
export const getUpComing = async (page = 1) => await runGetQuery('/movie/upcoming', {page: page});
export const getPopularTv = async (page = 1) => await runGetQuery('/tv/popular', {page: page});
export const getTopRatedTv = async (page = 1) => await runGetQuery('/tv/top_rated', {page: page});
export const getMovieById = async (id) => await runGetQuery(`/movie/${id}`);
export const getMovieCast = async (id) => await runGetQuery(`/movie/${id}/credits`);
export const getMovieVideos = async (id) => await runGetQuery(`/movie/${id}/videos`);
export const getTvById = async (id) => await runGetQuery(`/tv/${id}`);
export const getTvCast = async (id) => await runGetQuery(`/tv/${id}/credits`);
export const getTvVideos = async (id) => await runGetQuery(`/tv/${id}/videos`);
