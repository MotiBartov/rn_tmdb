import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {withNavigation} from 'react-navigation';

const TmdbDetails = ({navigation}) => {
  const media = navigation.getParam('media');
  return (
    <View>
      <Text style={styles.title}>{media.item.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default withNavigation(TmdbDetails);
