import {useEffect, useState} from 'react';
import {Category} from '../../model/Category';

import {
  getTopRated,
  getMostPopular,
  getNowPlaying,
  getUpComing,
  getPopularTv,
  getTopRatedTv,
} from '../../data/Repository';

export default () => {
  const [topRated, setTopRated] = useState({category: null, items: []});
  const [mostPopular, setMostPopular] = useState({category: '', items: []});
  const [nowPlaying, setNowPlaying] = useState({category: '', items: []});
  const [upComing, setUpComing] = useState({category: '', items: []});
  const [popularTv, setTv] = useState({category: '', items: []});
  const [topRatedTv, setTopRatedTv] = useState({category: '', items: []});
  const [error, setError] = useState(null);

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

    await exectueOperation(() => getTopRated()).then((response) => {
      setTopRated({
        category: Category.TOP_MOVIE,
        items: response,
      });
    });

    console.log('TopRated');
    await exectueOperation(() => getMostPopular()).then((response) => {
      setMostPopular({
        category: Category.POPULAR_MOVIE,
        items: response,
      });
    });

    console.log('Popular');

    await exectueOperation(() => getNowPlaying()).then((response) => {
      setNowPlaying({
        category: Category.PLAYING_MOVIE,
        items: response,
      });
    });
    console.log('NowPlaying');

    await exectueOperation(() => getUpComing()).then((response) => {
      setUpComing({
        category: Category.UPCOMING_MOVIE,
        items: response,
      });
    });
    console.log('UpComing');

    await exectueOperation(() => getPopularTv()).then((response) => {
      setTv({
        category: Category.POPULAR_TV,
        items: response,
      });
    });

    console.log('PopularTv');
    await exectueOperation(() => getTopRatedTv()).then((response) => {
      setTopRatedTv({
        category: Category.TOP_TV,
        items: response,
      });
    });

    console.log('ToפRatedTV');
  };

  useEffect(() => {
    // fetchMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [topRated, mostPopular, nowPlaying, upComing, popularTv, topRatedTv, error];
};
