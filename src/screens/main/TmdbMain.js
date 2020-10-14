import React, {useEffect, useState} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import GenereListWrapper from '../../components/GenereListWrapper';
import tmdb_api from '../../api/tmdb_api';
import {mapTvShowToMedia, mapMovieToMedia} from '../../utils/Utils';
import {Category, mapCategoryToText} from '../../utils/Utils';
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

  return (
    <ScrollView>
      <View style={styles.view}>
        <GenereListWrapper
          genereTitle={mapCategoryToText(topRated.category)}
          mediaList={topRated.items}
          onPressed={onItemPressed}
          onMorePressed={() => {
            console.log('onMorePressed: Top Rated Movies');
            navigateToMoreScreen(topRated.category);
          }}
        />
        <GenereListWrapper
          genereTitle={mapCategoryToText(mostPopular.category)}
          mediaList={mostPopular.items}
          onPressed={onItemPressed}
          onMorePressed={() => {
            console.log('onMorePressed: Most Popular Movies');
            navigateToMoreScreen(mostPopular.category);
          }}
        />
        <GenereListWrapper
          genereTitle={mapCategoryToText(nowPlaying.category)}
          mediaList={nowPlaying.items}
          onPressed={onItemPressed}
          onMorePressed={() => {
            console.log('onMorePressed: Now Playing Movies');
            navigateToMoreScreen(nowPlaying.category);
          }}
        />
        <GenereListWrapper
          genereTitle={mapCategoryToText(upComing.category)}
          mediaList={upComing.items}
          onPressed={onItemPressed}
          onMorePressed={() => {
            console.log('onMorePressed: Up Coming Movies');
            navigateToMoreScreen(upComing.category);
          }}
        />
        <GenereListWrapper
          genereTitle={mapCategoryToText(popularTv.category)}
          mediaList={popularTv.items}
          onPressed={onItemPressed}
          onMorePressed={() => {
            console.log('onMorePressed: Popular TV');
            navigateToMoreScreen(popularTv.category);
          }}
        />
        <GenereListWrapper
          genereTitle={mapCategoryToText(topRatedTv.category)}
          mediaList={topRatedTv.items}
          onPressed={onItemPressed}
          onMorePressed={() => {
            console.log('onMorePressed: Top Rated TV');
            navigateToMoreScreen(topRatedTv.category);
          }}
        />
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
