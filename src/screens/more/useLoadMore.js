import {useEffect, useState} from 'react';
import {Category} from '../../model/Category';
import {mapMovieToMedia, mapTvShowToMedia} from '../../utils/Utils';
import {
  getTopRated,
  getPopularMovie,
  getNowPlayingMovie,
  getUpcomingMovie,
  getTopRatedTv,
  getPopularTv,
} from '../../api/TmdbEndpoint';

const loadMedia = async (category = Category.TOP_TV, page = 1) => {
  switch (category) {
    case Category.TOP_MOVIE:
      const resp = await getTopRated(page);
      return resp.results.map(mapMovieToMedia);
    case Category.POPULAR_MOVIE:
      const popularResponse = await getPopularMovie(page);
      return await popularResponse.results.map(mapMovieToMedia);
    case Category.PLAYING_MOVIE:
      const nowPlayingResponse = await await getNowPlayingMovie(page);
      return await nowPlayingResponse.results.map(mapMovieToMedia);
    case Category.UPCOMING_MOVIE:
      const upcomingResp = await getUpcomingMovie(page);
      return upcomingResp.results.map(mapMovieToMedia);
    case Category.TOP_TV:
      const topTvResponse = await getTopRatedTv(page);
      return topTvResponse.results.map(mapTvShowToMedia);
    case Category.POPULAR_TV:
      const popularTvResponse = await getPopularTv(page);
      return popularTvResponse.results.map(mapTvShowToMedia);
  }
};
export default (category) => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const loadNextPage = async () => {
    console.log('loadMoreData: ');
    await loadMore(page + 1);
    setPage(page + 1);
  };

  const loadMore = async (p) => {
    setLoading(true);
    console.log(`loadMore: page: ${p}, category: ${category}`);
    const response = await loadMedia(category, p);
    setLoading(false);
    setItems([...items, ...response]);
  };

  useEffect(() => {
    loadMore(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [items, loadNextPage, loading];
};
