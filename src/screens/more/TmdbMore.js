import React, {useState, useEffect} from 'react';
import {View, FlatList, Dimensions} from 'react-native';
import {withNavigation} from 'react-navigation';
import {loadMedia} from '../../api/TmdbEndpoint';
import MovieListItem from '../../components/MovieListItem';

const TmdbMore = ({navigation}) => {
  const itemsPerRow = 2;
  const category = navigation.getParam('category');
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
    console.log(`loadMore: page: ${p}`);
    const response = await loadMedia(category, p);
    setLoading(false);
    setItems([...items, ...response]);
  };

  useEffect(() => {
    loadMore(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const navigateToDetailsScreen = (media) => {
    navigation.navigate('Details', {media: media});
  };
  //   console.log(`items: ${JSON.stringify(items)}`);

  const onListReachedEnd = () => {
    if (!loading) {
      loadNextPage();
    }
  };
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
        onEndReachedThreshold={0.01}
        onEndReached={onListReachedEnd}
      />
    </View>
  );
};

export default withNavigation(TmdbMore);
