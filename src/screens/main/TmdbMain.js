import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import GenereListWrapper from '../../components/GenereListWrapper';
import useLoadMovies from './useLoadMovies';

const TmdbMain = ({navigation}) => {
  // const [topRated, setTopRated] = useState({category: '', items: []});
  // const [mostPopular, setMostPopular] = useState({category: '', items: []});
  // const [nowPlaying, setNowPlaying] = useState({category: '', items: []});
  // const [upComing, setUpComing] = useState({category: '', items: []});
  // const [popularTv, setTv] = useState({category: '', items: []});
  // const [topRatedTv, setTopRatedTv] = useState({category: '', items: []});
  const [
    topRated,
    mostPopular,
    nowPlaying,
    upComing,
    popularTv,
    topRatedTv,
    error,
  ] = useLoadMovies();

  const onItemPressed = (media) => {
    console.log(`onItemPressed: ${JSON.stringify(media)}`);
    navigation.navigate('Details', {media: media});
  };

  const navigateToMoreScreen = (category) => {
    navigation.navigate('More', {category: category});
  };

  const RenderGenreWrappedList = ({genre}) => {
    return genre.items.length > 0 ? (
      <GenereListWrapper
        genre={genre}
        onPressed={onItemPressed}
        onMorePressed={() => navigateToMoreScreen(genre.category)}
      />
    ) : null;
  };

  return (
    <ScrollView>
      <View style={styles.view}>
        <RenderGenreWrappedList genre={topRated} />
        <RenderGenreWrappedList genre={mostPopular} />
        <RenderGenreWrappedList genre={nowPlaying} />
        <RenderGenreWrappedList genre={upComing} />
        <RenderGenreWrappedList genre={popularTv} />
        <RenderGenreWrappedList genre={topRatedTv} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  view: {
    backgroundColor: 'white',
  },
});

export default TmdbMain;
