import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {Dimensions} from 'react-native';

const imagesBaseUrl = 'https://image.tmdb.org/t/p/w500';
const screen = Dimensions.get('screen');
const itemWidth = screen.width / 2 - screen.width * 0.05;
const imageHeight = (itemWidth * 4) / 3;
const MovieListItem = ({media, onPressed, marginHorizontal = 20, marginVertical = 4}) => {
  // console.log(`MovieListItem: ${media.item.imageUrl}`);

  const styles = StyleSheet.create({
    title: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    subTitle: {
      fontSize: 18,
      marginHorizontal: 4,
    },
    info: {
      fontSize: 14,
      marginHorizontal: 4,
      marginBottom: 4,
      color: '#808080',
    },
    card: {
      width: itemWidth,
      backgroundColor: '#e5e5e5',
      borderColor: 'black',
      borderRadius: 10,
      marginVertical: marginVertical,
      marginHorizontal: marginHorizontal,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 4},
      shadowOpacity: 0.5,
      shadowRadius: 2,
      elevation: 4,
    },
    image: {
      width: itemWidth,
      height: imageHeight,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
    },
  });

  return (
    <TouchableOpacity onPress={onPressed}>
      <View style={styles.card}>
        <Image
          style={styles.image}
          source={{
            uri: `${imagesBaseUrl}${media.item.imageUrl}`,
          }}
        />
        <Text numberOfLines={1} style={styles.subTitle}>
          {media.item.title}
        </Text>
        <Text style={styles.info}>
          {media.item.rating} / 10 | Reviews: {media.item.reviews}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default MovieListItem;
