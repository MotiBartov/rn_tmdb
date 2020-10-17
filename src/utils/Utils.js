export const MediaType = {
  MOVIE: 'movie',
  TV: 'tv',
};

export const Category = {
  TOP_MOVIE: 'top_rated',
  POPULAR_MOVIE: 'popular',
  PLAYING_MOVIE: 'now_playing',
  UPCOMING_MOVIE: 'upcoming',
  POPULAR_TV: 'popular_tv',
  TOP_TV: 'top_rated_tv',
};

export const mapCategoryToText = (category) => {
  switch (category) {
    case Category.TOP_MOVIE:
      return 'Top Rated';
    case Category.POPULAR_MOVIE:
      return 'Most Popular';
    case Category.PLAYING_MOVIE:
      return 'No Playing';
    case Category.UPCOMING_MOVIE:
      return 'Upcoming Movies';
    case Category.TOP_TV:
      return 'Top Rated Tv';
    case Category.POPULAR_TV:
      return 'Most Popular TV';
    default:
      return '';
  }
};

const createMedia = (
  title,
  imageUrl,
  id,
  description,
  rating,
  reviews,
  type,
  backdropPath,
  release_date,
  original_language,
  videos,
  cast,
  runtime,
) => {
  return {
    title: title,
    imageUrl: imageUrl,
    id: id,
    description: description,
    rating: rating,
    reviews: reviews,
    type: type,
    backdropImage: backdropPath,
    releaseDate: release_date,
    lang: original_language,
    videos,
    cast,
    runtime,
  };
};

export const mapTvShowToMedia = (tvShow) => {
  return createMedia(
    tvShow.name,
    tvShow.poster_path,
    tvShow.id,
    tvShow.overview,
    tvShow.vote_average,
    tvShow.vote_count,
    MediaType.TV,
    tvShow.backdrop_path,
    tvShow.release_date,
    tvShow.original_language,
  );
};

export const mapMovieToMedia = (movie) => {
  //   console.log(`mapMovieToMedia: ${JSON.stringify(movie)}`);
  return createMedia(
    movie.title,
    movie.poster_path,
    movie.id,
    movie.overview,
    movie.vote_average,
    movie.vote_count,
    MediaType.MOVIE,
    movie.backdrop_path,
    movie.release_date,
    movie.original_language,
  );
};
