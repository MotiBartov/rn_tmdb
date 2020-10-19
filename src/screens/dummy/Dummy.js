import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

const Dummy = () => {
  console.log('Dummy');
  return (
    <View style={styles}>
      <Text>Hello</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Dummy;
