import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from 'react-native';
import GenereListWrapper from '../components/GenereListWrapper';
import tmdb_api from '../api/tmdb_api';
import {mapTvShowToMedia, mapMovieToMedia} from '../utils/Utils';
const TmdbMain = () => {
  const [topRated, setTopRated] = useState([]);
  const [mostPopular, setMostPopular] = useState([]);
  const [nowPlaying, setNowPlaying] = useState([]);
  const [upComing, setUpComing] = useState([]);
  const [popularTv, setTv] = useState([]);
  const [topRatedTv, setTopRatedTv] = useState([]);
  const fetchMovies = async () => {
    console.log('Fetching movies');
    try {
      tmdb_api.get('/movie/top_rated').then((resp) => {
        // console.log(`TopRated: ${resp.data}`);
        setTopRated(resp.data.results.map((movie) => mapMovieToMedia(movie)));
      });
      tmdb_api.get('/movie/popular').then((resp) => {
        // console.log(`Popular: ${resp.data}`);
        setMostPopular(
          resp.data.results.map((movie) => mapMovieToMedia(movie)),
        );
      });
      tmdb_api.get('/movie/now_playing').then((resp) => {
        // console.log(`NowPlaying: ${resp.data}`);
        setNowPlaying(resp.data.results.map((movie) => mapMovieToMedia(movie)));
      });
      tmdb_api.get('/movie/upcoming').then((resp) => {
        // console.log(`Upcoming: ${resp.data}`);
        setUpComing(resp.data.results.map((movie) => mapMovieToMedia(movie)));
      });
      tmdb_api.get('/tv/popular').then((resp) => {
        // console.log(`Tv: ${resp.data}`);
        setTv(
          resp.data.results.map((tvShow) => {
            return mapTvShowToMedia(tvShow);
          }),
        );
      });
      tmdb_api.get('/tv/top_rated').then((resp) => {
        console.log(`Tv: ${JSON.stringify(resp.data)}`);
        setTopRatedTv(
          resp.data.results.map((tvShow) => {
            return mapTvShowToMedia(tvShow);
          }),
        );
      });
    } catch (e) {
      console.log(`Something went wrong: ${e}`);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const onItemPressed = (id) => {
    console.log(`onItemPressed: ${id}`);
  };

  return (
    <ScrollView>
      <View style={styles.view}>
        <GenereListWrapper
          genereTitle="Top Rated"
          mediaList={topRated}
          onPressed={onItemPressed}
          onMorePressed={() => {
            console.log('onMorePressed: Top Rated Movies');
          }}
        />
        <GenereListWrapper
          genereTitle="Most Popular"
          mediaList={mostPopular}
          onPressed={onItemPressed}
          onMorePressed={() => {
            console.log('onMorePressed: Most Popular Movies');
          }}
        />
        <GenereListWrapper
          genereTitle="Now Playing"
          mediaList={nowPlaying}
          onPressed={onItemPressed}
          onMorePressed={() => {
            console.log('onMorePressed: Now Playing Movies');
          }}
        />
        <GenereListWrapper
          genereTitle="Up Coming"
          mediaList={upComing}
          onPressed={onItemPressed}
          onMorePressed={() => {
            console.log('onMorePressed: Up Coming Movies');
          }}
        />
        <GenereListWrapper
          genereTitle="Popular TV"
          mediaList={popularTv}
          onPressed={onItemPressed}
          onMorePressed={() => {
            console.log('onMorePressed: Popular TV');
          }}
        />
        <GenereListWrapper
          genereTitle="Top Rated TV"
          mediaList={topRatedTv}
          onPressed={onItemPressed}
          onMorePressed={() => {
            console.log('onMorePressed: Top Rated TV');
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
