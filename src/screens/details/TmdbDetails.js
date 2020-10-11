import React from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import {withNavigation} from 'react-navigation';
import {Dimensions} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

const screenWidth = Dimensions.get('screen').width;
const imagesBaseUrl = 'https://image.tmdb.org/t/p/w500';

const TmdbDetails = ({navigation}) => {
  const media = navigation.getParam('media');
  console.log(`Loading details for: ${media.item.type}`);
  return (
    <ScrollView>
      <View>
        <Image
          style={styles.image}
          source={{
            uri: `${imagesBaseUrl}${media.item.backdropImage}`,
          }}
        />
        <View style={styles.detailsSection}>
          <Image
            style={styles.detailsImage}
            source={{
              uri: `${imagesBaseUrl}${media.item.imageUrl}`,
            }}
          />
          <View style={styles.detailsBox}>
            <Text style={styles.detailsText}>
              Release: {media.item.releaseDate}
            </Text>
            <Text style={styles.detailsText}>
              Runtime: {media.item.reviews}
            </Text>
            <Text style={styles.detailsText}>
              Rating: {media.item.rating} / 10
            </Text>
            <Text style={styles.detailsText}>
              Reviews: {media.item.reviews}
            </Text>
            <Text style={styles.detailsText}>Status: {media.item.reviews}</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  detailsSection: {
    backgroundColor: '#e5e5e5',
    flexDirection: 'row',
    margin: 8,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
  },
  detailsImage: {
    width: screenWidth * 0.33,
    height: screenWidth * 0.33 * (4 / 3),
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  detailsBox: {
    flexDirection: 'column',
    flex: 2,
    alignSelf: 'center',
    alignContent: 'space-between',
    padding: 16,
    borderTopEndRadius: 10,
    borderBottomEndRadius: 10,
  },
  detailsText: {
    fontSize: 18,
    marginVertical: 4,
  },
  image: {
    width: screenWidth,
    height: screenWidth * (9 / 16),
  },
});

export default withNavigation(TmdbDetails);
