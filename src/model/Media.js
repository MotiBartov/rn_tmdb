export const createMedia = (
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
