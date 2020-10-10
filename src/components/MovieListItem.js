import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';

const MovieListItem = ({title, imageUrl, rating, reviews, onPressed}) => {
  console.log(`MovieListItem: ${title}, ${imageUrl}, ${rating}`);
  return (
    <TouchableOpacity onPress={onPressed}>
      <View style={styles.card}>
        <Image
          style={styles.image}
          source={{
            uri: imageUrl,
          }}
        />
        <Text numberOfLines={1} style={styles.subTitle}>
          {title}
        </Text>
        <Text style={styles.info}>
          {rating} / 10 | Reviews: {reviews}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

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
    width: 200,
    backgroundColor: '#e5e5e5',
    borderColor: 'black',
    borderRadius: 10,
    marginVertical: 4,
    marginLeft: 15,
  },
  image: {
    width: 200,
    height: 250,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
});

export default MovieListItem;
