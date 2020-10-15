import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import {withNavigation} from 'react-navigation';
import {Dimensions} from 'react-native';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import CastImageItem from '../../components/CastImageItem';
import YouTubeVideoItem from '../../components/YouTubeVideoItem';
import {getMediaById, getCast, getVideos} from '../../api/TmdbEndpoint';

const screenWidth = Dimensions.get('screen').width;
const imagesBaseUrl = 'https://image.tmdb.org/t/p/w500';
const castBaseUrl = 'https://image.tmdb.org/t/p/original';

const TmdbDetails = ({navigation}) => {
  const media = navigation.getParam('media');
  const [state, setDetails] = useState(media.item);
  const runAsyncQuery = async (type, id) => {
    try {
      const detailsResponse = await getMediaById(type, id);
      console.log(`runAsyncQuery: ${JSON.stringify(detailsResponse)}`);

      const {runtime, status, production_companies} = detailsResponse;
      const newState = {
        ...state,
        ...{runtime: runtime, status: status, companies: production_companies},
      };

      const cast = await getCast(type, id);
      const videos = await getVideos(type, id);
      setDetails({
        ...state,
        ...newState,
        ...{videos: videos, cast: cast},
      });
    } catch (e) {
      console.log(`Something went wrong: ${e}`);
    }
  };

  useEffect(() => {
    runAsyncQuery(media.item.type, media.item.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(`build: ${JSON.stringify(state)}`);
  return (
    <ScrollView>
      <View>
        <View>
          <Image
            style={styles.image}
            source={{
              uri: `${imagesBaseUrl}${state.backdropImage}`,
            }}
          />
          {state.companies && state.companies.length > 0 ? (
            <Image
              style={styles.flag}
              source={{
                uri: `https://www.countryflags.io/${state.companies[0].origin_country}/shiny/64.png`,
              }}
            />
          ) : null}
        </View>
        <View style={styles.detailsCard}>
          <View style={styles.detailsSection}>
            <Image
              style={styles.detailsImage}
              source={{
                uri: `${imagesBaseUrl}${state.imageUrl}`,
              }}
            />
            <View style={styles.detailsBox}>
              <Text style={styles.detailsText}>
                Release: {state.releaseDate}
              </Text>
              <Text style={styles.detailsText}>Runtime: {state.runtime}</Text>
              <Text style={styles.detailsText}>
                Rating: {state.rating} / 10
              </Text>
              <Text style={styles.detailsText}>Reviews: {state.reviews}</Text>
              <Text style={styles.detailsText}>Status: {state.status}</Text>
            </View>
          </View>
          <View style={styles.overviewBox}>
            <Text style={styles.overviewTitle}>Overview</Text>
            <Text style={styles.overviewText}>{state.description}</Text>
          </View>
        </View>
        {state.cast ? (
          <View style={styles.detailsCard}>
            <Text style={styles.overviewTitle}> Cast</Text>
            <FlatList
              data={state.cast.filter((e) => e.imageUrl !== null)}
              keyExtractor={(e) => e.name}
              horizontal={true}
              renderItem={(c) => {
                return (
                  <CastImageItem
                    imageUrl={`${castBaseUrl}${c.item.imageUrl}`}
                    title={c.item.name}
                    onPress={() => {
                      console.log(`onPress: ${c.item.name}`);
                    }}
                  />
                );
              }}
            />
          </View>
        ) : null}
        {state.videos && state.videos.length > 0 ? (
          <View style={styles.detailsCard}>
            <Text style={styles.overviewTitle}>Trailer</Text>
            <YouTubeVideoItem
              videoKey={state.videos[0].key}
              thumbnail={`${imagesBaseUrl}/${state.backdropImage}`}
              controls={true}
            />
          </View>
        ) : null}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  detailsCard: {
    padding: 8,
    backgroundColor: '#e5e5e5',
    margin: 8,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
  },
  detailsSection: {
    flexDirection: 'row',
  },
  detailsImage: {
    width: screenWidth * 0.33,
    height: screenWidth * 0.33 * (4 / 3),
    borderRadius: 10,
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
    fontWeight: 'bold',
    marginVertical: 2,
  },
  image: {
    width: screenWidth,
    height: screenWidth * (9 / 16),
  },
  overviewBox: {
    marginHorizontal: 8,
    marginVertical: 8,
    fontSize: 16,
    borderTopWidth: 0.5,
    borderTopColor: 'black',
  },
  overviewTitle: {
    marginTop: 4,
    fontSize: 18,
    fontWeight: 'bold',
  },
  overviewText: {
    marginTop: 4,
    fontSize: 16,
  },
  flag: {
    height: 64,
    width: 64,
    position: 'absolute',
    bottom: 0,
    marginLeft: 8,
  },
});

export default withNavigation(TmdbDetails);
