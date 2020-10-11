import React, {useEffect, useState} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import GenereListWrapper from '../../components/GenereListWrapper';
import tmdb_api from '../../api/tmdb_api';
import {mapTvShowToMedia, mapMovieToMedia} from '../../utils/Utils';
import {Category, mapCategoryToText} from '../../utils/Utils';
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
      tmdb_api.get('/movie/top_rated').then((resp) => {
        // console.log(`TopRated: ${resp.data}`);
        setTopRated({
          category: Category.TOP_MOVIE,
          items: resp.data.results.map((movie) => mapMovieToMedia(movie)),
        });
      });
      tmdb_api.get('/movie/popular').then((resp) => {
        // console.log(`Popular: ${resp.data}`);
        setMostPopular({
          category: Category.POPULAR_MOVIE,
          items: resp.data.results.map((movie) => mapMovieToMedia(movie)),
        });
      });
      tmdb_api.get('/movie/now_playing').then((resp) => {
        // console.log(`NowPlaying: ${resp.data}`);
        setNowPlaying({
          category: Category.PLAYING_MOVIE,
          items: resp.data.results.map((movie) => mapMovieToMedia(movie)),
        });
      });
      tmdb_api.get('/movie/upcoming').then((resp) => {
        // console.log(`Upcoming: ${resp.data}`);
        setUpComing({
          category: Category.UPCOMING_MOVIE,
          items: resp.data.results.map((movie) => mapMovieToMedia(movie)),
        });
      });
      tmdb_api.get('/tv/popular').then((resp) => {
        // console.log(`Tv: ${resp.data}`);
        setTv({
          category: Category.POPULAR_TV,
          items: resp.data.results.map((tvShow) => mapTvShowToMedia(tvShow)),
        });
      });
      tmdb_api.get('/tv/top_rated').then((resp) => {
        console.log(`Tv: ${JSON.stringify(resp.data)}`);
        setTopRatedTv({
          category: Category.TOP_TV,
          items: resp.data.results.map((tvShow) => mapTvShowToMedia(tvShow)),
        });
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
