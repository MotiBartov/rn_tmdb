import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import MovieListItem from './MovieListItem';
import {mapCategoryToText} from '../utils/Utils';
const GenereListWrapper = ({genre, onPressed, onMorePressed}) => {
  //   console.log(`GenereListWrapper: ${JSON.stringify(mediaList)}`);

  return (
    <View style={styles.component}>
      <View style={styles.titleRow}>
        <Text style={styles.titleText}>{mapCategoryToText(genre.category)}</Text>
        <TouchableOpacity onPress={onMorePressed}>
          <Text style={styles.titleText}>More</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={genre.items}
        keyExtractor={(media) => `${media.id}`}
        horizontal={true}
        renderItem={(media) => <MovieListItem marginHorizontal={8} media={media} onPressed={() => onPressed(media)} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  component: {
    marginTop: 8,
    marginHorizontal: 8,
  },
  titleRow: {
    fontSize: 18,
    marginVertical: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default GenereListWrapper;
