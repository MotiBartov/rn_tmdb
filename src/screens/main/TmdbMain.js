import React, {useEffect, useState} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import GenereListWrapper from '../../components/GenereListWrapper';
import {Category} from '../../model/Category';
import {
  getTopRated,
  getPopularMovie,
  getNowPlayingMovie,
  getUpcomingMovie,
  getPopularTv,
  getTopRatedTv,
} from '../../api/TmdbEndpoint';
const TmdbMain = ({navigation}) => {
  const [topRated, setTopRated] = useState({category: '', items: []});
  const [mostPopular, setMostPopular] = useState({category: '', items: []});
  const [nowPlaying, setNowPlaying] = useState({category: '', items: []});
  const [upComing, setUpComing] = useState({category: '', items: []});
  const [popularTv, setTv] = useState({category: '', items: []});
  const [topRatedTv, setTopRatedTv] = useState({category: '', items: []});

  const fetchMovies = async () => {
    console.log('Fetching movies');
    try {
      const topRatedResponse = await getTopRated();
      setTopRated({
        category: Category.TOP_MOVIE,
        items: topRatedResponse,
      });
      const popularResp = await getPopularMovie();
      setMostPopular({
        category: Category.POPULAR_MOVIE,
        items: popularResp,
      });

      const getNowPlayingReponse = await getNowPlayingMovie();
      setNowPlaying({
        category: Category.PLAYING_MOVIE,
        items: getNowPlayingReponse,
      });
      const getUpComeingResponse = await getUpcomingMovie();
      setUpComing({
        category: Category.UPCOMING_MOVIE,
        items: getUpComeingResponse,
      });

      const popularTvResponse = await getPopularTv();
      setTv({
        category: Category.POPULAR_TV,
        items: popularTvResponse,
      });

      const topRatedTvResponse = await getTopRatedTv();
      setTopRatedTv({
        category: Category.TOP_TV,
        items: topRatedTvResponse,
      });
    } catch (e) {
      console.log(`Something went wrong: ${e}`);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const onItemPressed = (media) => {
    console.log(`onItemPressed: ${JSON.stringify(media)}`);
    navigation.navigate('Details', {media: media});
  };

  const navigateToMoreScreen = (category) => {
    navigation.navigate('More', {category: category});
  };

  const RenderGenreWrappedList = ({genre}) => {
    return genre.items.length > 0 ? (
      <GenereListWrapper
        genre={genre}
        onPressed={onItemPressed}
        onMorePressed={() => navigateToMoreScreen(genre.category)}
      />
    ) : null;
  };

  return (
    <ScrollView>
      <View style={styles.view}>
        <RenderGenreWrappedList genre={topRated} />
        <RenderGenreWrappedList genre={mostPopular} />
        <RenderGenreWrappedList genre={nowPlaying} />
        <RenderGenreWrappedList genre={upComing} />
        <RenderGenreWrappedList genre={popularTv} />
        <RenderGenreWrappedList genre={topRatedTv} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  view: {
    backgroundColor: 'white',
  },
});

export default TmdbMain;
