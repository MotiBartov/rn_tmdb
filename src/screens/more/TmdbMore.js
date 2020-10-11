import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {withNavigation} from 'react-navigation';
import tmdb_api from '../../api/tmdb_api';
import {Category, mapMovieToMedia, mapTvShowToMedia} from '../../utils/Utils';
import MovieListItem from '../../components/MovieListItem';
const TmdbMore = ({navigation}) => {
  const itemsPerRow = 2;
  const category = navigation.getParam('category');
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const runAsyncQuery = async (endpoint, p, mapper) => {
    console.log(
      `runAsyncQuery: ${endpoint},  page: ${p}, category: ${category}`,
    );
    try {
      tmdb_api.get(endpoint, {params: {page: p}}).then((response) => {
        const mapped = response.data.results.map((item) => {
          return mapper(item);
        });
        setItems([...items, ...mapped]);
        setPage(p);
      });
    } catch (e) {
      console.log(`Something went wrong: ${e}`);
    }
  };

  const loadMoreData = () => {
    console.log('loadMoreData: ');
    loadMedias(page + 1);
  };
  const loadMedias = async (p) => {
    let endpoint = '/movie/top_rated';
    let mapper = mapMovieToMedia;
    switch (category) {
      case Category.TOP_MOVIE:
        endpoint = '/movie/top_rated';
        break;
      case Category.POPULAR_MOVIE:
        endpoint = '/movie/popular';
        break;
      case Category.PLAYING_MOVIE:
        endpoint = '/movie/now_playing';
        break;
      case Category.UPCOMING_MOVIE:
        endpoint = '/movie/upcoming';
        break;
      case Category.TOP_TV:
        endpoint = '/tv/top_rated';
        mapper = mapTvShowToMedia;
        break;
      case Category.POPULAR_TV:
        endpoint = '/tv/popular';
        mapper = mapTvShowToMedia;
        break;
    }

    runAsyncQuery(endpoint, p, mapper);
  };

  useEffect(() => {
    loadMedias(page);
  }, []);

  const navigateToDetailsScreen = (media) => {
    navigation.navigate('Details', {media: media});
  };
  //   console.log(`items: ${JSON.stringify(items)}`);

  return (
    <View>
      <FlatList
        data={items}
        keyExtractor={(item) => `${item.id}`}
        numColumns={itemsPerRow}
        renderItem={(item) =>
          MovieListItem({
            media: item,
            onPressed: () => navigateToDetailsScreen(item),
          })
        }
        onEndReachedThreshold={0}
        onEndReached={loadMoreData}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
  },
});

export default withNavigation(TmdbMore);
