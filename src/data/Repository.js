import {
  getMovieDetails as loadMovieDetails,
  getTvDetails as loadTvDetails,
} from '../data/datasources/TmdbRemoteDataSource';
import {MediaType} from '../utils/Utils';

const catchAsync = async (operation) => {
  try {
    return await operation();
  } catch (e) {
    return {error: {message: e.message, details: e.details}};
  }
};

export const getMediaDetails = async (type, id) => {
  console.log(`Repository: getMediaDetails: ${type}, ${id}`);
  switch (type) {
    case MediaType.TV:
      return await getTvDetails(id);
    case MediaType.MOVIE:
      return await getMovieDetails(id);
  }
};

const getMovieDetails = async (id) =>
  await catchAsync(() => loadMovieDetails(id));

const getTvDetails = async (id) => await catchAsync(() => loadTvDetails(id));
