import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import MovieListItem from './MovieListItem';

const GenereListWrapper = ({
  genereTitle,
  mediaList,
  onPressed,
  onMorePressed,
}) => {
  //   console.log(`GenereListWrapper: ${JSON.stringify(mediaList)}`);
  const imagesBaseUrl = 'https://image.tmdb.org/t/p/w500';

  return (
    <View style={styles.component}>
      <View style={styles.titleRow}>
        <Text style={styles.titleText}>{genereTitle}</Text>
        <TouchableOpacity onPress={onMorePressed}>
          <Text style={styles.titleText}>More</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={mediaList}
        keyExtractor={(media) => `${media.id}`}
        horizontal={true}
        renderItem={(media) => (
          <MovieListItem
            title={media.item.title}
            imageUrl={`${imagesBaseUrl}/${media.item.imageUrl}`}
            onPressed={() => onPressed(media.item.id)}
            rating={media.item.rating}
            reviews={media.item.reviews}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  component: {
    marginTop: 8,
  },
  titleRow: {
    fontSize: 18,
    marginHorizontal: 18,
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
