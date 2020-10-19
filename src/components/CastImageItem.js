import React from 'react';
import {Image, Text, View, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const screenWidth = Dimensions.get('screen').width;
const CastImageItem = ({title, imageUrl, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.view}>
        <Image
          style={styles.castImage}
          source={{
            uri: imageUrl,
          }}
        />
        <LinearGradient
          colors={['transparent', '#000000ff']}
          start={{x: 0.5, y: 0}}
          end={{x: 0.5, y: 1}}
          locations={[0.75, 1.0]}
          style={styles.linearGradient}>
          <Text style={styles.itemTitle}>{title}</Text>
        </LinearGradient>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  view: {
    flexDirection: 'column',
    alignContent: 'stretch',
    alignItems: 'stretch',
  },
  itemTitle: {
    fontWeight: 'bold',
    margin: 8,
    color: 'white',
  },
  linearGradient: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 1,
    bottom: 1,
    justifyContent: 'flex-end',
    margin: 2,
    borderRadius: 10,
  },
  castImage: {
    width: screenWidth * 0.25,
    height: (screenWidth * 0.25 * 4) / 3,
    margin: 4,
    borderRadius: 10,
  },
});

export default CastImageItem;
