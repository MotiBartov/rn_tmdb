import {useEffect, useState} from 'react';
import {Category} from '../../model/Category';
import {
  getTopRated,
  getPopularMovie,
  getNowPlayingMovie,
  getUpcomingMovie,
  getPopularTv,
  getTopRatedTv,
} from '../../api/TmdbEndpoint';
import {mapMovieToMedia, mapTvShowToMedia} from '../../utils/Utils';

export default () => {
  const [topRated, setTopRated] = useState({category: null, items: []});
  const [mostPopular, setMostPopular] = useState({category: '', items: []});
  const [nowPlaying, setNowPlaying] = useState({category: '', items: []});
  const [upComing, setUpComing] = useState({category: '', items: []});
  const [popularTv, setTv] = useState({category: '', items: []});
  const [topRatedTv, setTopRatedTv] = useState({category: '', items: []});
  const [error, setError] = useState(null);

  const movieMapper = (movie) => mapMovieToMedia(movie);
  const tvMapper = (tvShow) => mapTvShowToMedia(tvShow);
  const exectueOperation = async (operation) => {
    const response = await operation();
    if (response.error) {
      setError({error: response.error});
    } else {
      return response;
    }
  };

  const fetchMovies = async () => {
    console.log('Fetching movies');

    await exectueOperation(() => getTopRated()).then((topRatedResponse) => {
      setTopRated({
        category: Category.TOP_MOVIE,
        items: topRatedResponse.results.map(movieMapper),
      });
    });

    console.log('TopRated');
    await exectueOperation(() => getPopularMovie()).then((popularResp) => {
      setMostPopular({
        category: Category.POPULAR_MOVIE,
        items: popularResp.results.map(movieMapper),
      });
    });

    console.log('Popular');

    await exectueOperation(() => getNowPlayingMovie()).then(
      (getNowPlayingReponse) => {
        setNowPlaying({
          category: Category.PLAYING_MOVIE,
          items: getNowPlayingReponse.results.map(movieMapper),
        });
      },
    );
    console.log('NowPlaying');

    await exectueOperation(() => getUpcomingMovie()).then(
      (getUpComeingResponse) => {
        setUpComing({
          category: Category.UPCOMING_MOVIE,
          items: getUpComeingResponse.results.map(movieMapper),
        });
      },
    );
    console.log('UpComing');

    await exectueOperation(() => getPopularTv()).then((popularTvResponse) => {
      setTv({
        category: Category.POPULAR_TV,
        items: popularTvResponse.results.map(tvMapper),
      });
    });

    console.log('PopularTv');
    await exectueOperation(() => getTopRatedTv()).then((topRatedTvResponse) => {
      setTopRatedTv({
        category: Category.TOP_TV,
        items: topRatedTvResponse.results.map(tvMapper),
      });
    });

    console.log('ToRatedTV');
  };

  useEffect(() => {
    fetchMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [
    topRated,
    mostPopular,
    nowPlaying,
    upComing,
    popularTv,
    topRatedTv,
    error,
  ];
};
