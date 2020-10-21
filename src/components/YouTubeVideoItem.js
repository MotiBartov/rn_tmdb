import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Dimensions} from 'react-native';
import YouTube from 'react-native-youtube';
import {youTubeApiKey} from '../config';
const screen = Dimensions.get('screen');

const imageWidth = screen.width * 0.9;
const imageHeight = imageWidth * (9 / 16);

const YouTubeVideoItem = ({videoKey}) => {
  console.log(`YouTubeVideoItem: videoKey: ${videoKey} `);
  return (
    <View style={styles.component}>
      <YouTube videoId={videoKey} apiKey={youTubeApiKey} play={false} style={styles.video} />
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
  video: {
    alignSelf: 'center',
    width: imageWidth,
    height: imageHeight,
  },
});

export default YouTubeVideoItem;
