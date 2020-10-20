import React from 'react';
import {View, Text, StyleSheet, FlatList, Dimensions} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {mapCategoryToText} from '../utils/Utils';
import CastImageItem from './CastImageItem';
const imagesBaseUrl = 'https://image.tmdb.org/t/p/w500';

const width = Dimensions.get('screen').width * 0.9;

const GenrePosterList = ({genre, onPressed, onMorePressed}) => {
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
        renderItem={(media) => (
          <CastImageItem
            title={media.item.title}
            imageUrl={`${imagesBaseUrl}/${media.item.imageUrl}`}
            onPress={() => onPressed(media)}
            width={width}
            height={width * (9 / 16)}
            margin={14}
          />
        )}
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

export default GenrePosterList;
