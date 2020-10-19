import React from 'react';
import {Image, Text, View, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const imageWidth = Dimensions.get('screen').width * 0.25;
const imageHeight = imageWidth * (4 / 3);
const CastImageItem = ({title, imageUrl, onPress, width = imageWidth, height = imageHeight, margin = 4}) => {
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
      margin: margin,
      borderRadius: 10,
    },
    castImage: {
      width: width,
      height: height,
      margin: margin,
      borderRadius: 10,
    },
  });

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

export default CastImageItem;
