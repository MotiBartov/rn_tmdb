const createMedia = (title, imageUrl, id, description, rating, reviews) => {
  return {
    title: title,
    imageUrl: imageUrl,
    id: id,
    description: description,
    rating: rating,
    reviews: reviews,
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
  );
};

export const mapMovieToMedia = (movie) => {
  return createMedia(
    movie.title,
    movie.poster_path,
    movie.id,
    movie.overview,
    movie.vote_average,
    movie.vote_count,
  );
};
