import React from 'react';
import {View, FlatList} from 'react-native';
import {withNavigation} from 'react-navigation';
import MovieListItem from '../../components/MovieListItem';
import useLoadMore from './useLoadMore';

const TmdbMore = ({navigation}) => {
  const itemsPerRow = 2;
  const category = navigation.getParam('category');
  const [items, loadNextPage, loading] = useLoadMore(category);

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
