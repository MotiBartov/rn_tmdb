import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import CastImageItem from './CastImageItem';
import {mapCategoryToText} from '../utils/Utils';
import Carousel from 'react-native-snap-carousel';

const imagesBaseUrl = 'https://image.tmdb.org/t/p/w500';

const CarouselItemWrapper = ({genre, onPressed, onMorePressed}) => {
  //   console.log(`GenereListWrapper: ${JSON.stringify(mediaList)}`);

  let _carousel;
  return (
    <View style={styles.component}>
      <View style={styles.titleRow}>
        <Text style={styles.titleText}>{mapCategoryToText(genre.category)}</Text>
        <TouchableOpacity onPress={onMorePressed}>
          <Text style={styles.titleText}>More</Text>
        </TouchableOpacity>
      </View>
      <View style={{alignSelf: 'auto', flex: 1, justifyContent: 'center'}}>
        <Carousel
          ref={(r) => {
            _carousel = r;
          }}
          data={genre.items}
          keyExtractor={(media) => `${media.id}`}
          horizontal={true}
          sliderWidth={Dimensions.get('screen').width}
          itemWidth={Dimensions.get('screen').width}
          renderItem={(media) => (
            <View style={styles.card}>
              <CastImageItem
                title={media.item.title}
                imageUrl={`${imagesBaseUrl}/${media.item.backdropImage}`}
                width="100%"
                height={200}
                margin={0}
                onPress={() => onPressed(media)}
              />
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  component: {
    marginTop: 8,
  },
  titleRow: {
    fontSize: 18,
    marginVertical: 4,
    marginHorizontal: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  card: {
    marginHorizontal: 16,
    marginVertical: 4,
    flex: 1,
    height: 200,
    backgroundColor: '#e5e5e5',
    borderColor: 'black',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 4,
  },
});

export default CarouselItemWrapper;
