import {
  getMovieById,
  getMovieCast,
  getMovieVideos,
  getTvById,
  getTvCast,
  getTvVideos,
} from '../../api/TmdbEndpoint';

export const getMovieDetails = async (movieId) => {
  const detailsResponse = await getMovieById(movieId);
  const {runtime, status, production_companies} = detailsResponse.data;

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
    ...{videos: videos, cast: cast},
  };
};

export const getTvDetails = async (tvId) => {
  const detailsResponse = await getTvById(tvId);
  const {runtime, status, production_companies} = detailsResponse.data;

  const castResponse = await getTvCast(tvId);
  const cast = castResponse.data.cast.map((c) => {
    return {name: c.name, imageUrl: c.profile_path};
  });

  const videosResponse = await getTvVideos(tvId);

  const videos = videosResponse.data.results;
  return {
    runtime: runtime,
    status: status,
    companies: production_companies,
    ...{videos: videos, cast: cast},
  };
};
