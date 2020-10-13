import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const screen = Dimensions.get('screen');

const imageWidth = screen.width * 0.5;
const imageHeight = imageWidth * (3 / 4);

const VideoItem = ({site, videoKey, thumbnail}) => {
  console.log(`${thumbnail}`);
  const getImageBasesUrl = () => {
    let url;
    switch (site) {
      case 'YouTube':
        url = `https://img.youtube.com/vi/${videoKey}/0.jpg`;
        break;
    }
    console.log(`getImageBasesUrl: ${url}`);
    return url;
  };

  return (
    <View style={styles.component}>
      <Image
        style={styles.image}
        source={{
          uri: getImageBasesUrl(),
        }}
      />
      <Icon name="play" color="#ffffffde" style={styles.playIcon} />
    </View>
  );
};

const styles = StyleSheet.create({
  component: {
    margin: 4,
    borderRadius: 10,
    direction: 'rtl',
    justifyContent: 'center',
  },
  image: {
    width: imageWidth,
    height: imageHeight,
  },
  playIcon: {
    position: 'absolute',
    alignSelf: 'center',
    fontSize: 30,
  },
});

export default VideoItem;
