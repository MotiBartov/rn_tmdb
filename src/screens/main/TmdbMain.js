import React, {useContext, useEffect} from 'react';
import {Context} from './MainReducer';
import {View, StyleSheet, ScrollView} from 'react-native';
import GenereListWrapper from '../../components/GenereListWrapper';
import GenrePosterList from '../../components/GenrePostersList';

const TmdbMain = ({navigation}) => {
  console.log('TmdbMain created');
  const {state, getMovies} = useContext(Context);
  // const {state, getMovies} = useContext(Context);
  // console.log(`TmdbMain: state: ${JSON.stringify(state)}`);
  const onItemPressed = (media) => {
    // console.log(`onItemPressed: ${JSON.stringify(media)}`);
    navigation.navigate('Details', {media: media});
  };

  const navigateToMoreScreen = (category) => {
    navigation.navigate('More', {category: category});
  };

  useEffect(() => {
    console.log('MainScreen useEffect');
    getMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const RenderGenreWrappedList = ({genre}) => {
    return genre && genre.items.length > 0 ? (
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
        <View>
          <GenrePosterList
            genre={state.topRated}
            onPressed={onItemPressed}
            onMorePressed={() => navigateToMoreScreen(state.topRated.category)}
          />
        </View>

        <RenderGenreWrappedList genre={state.mostPopular} />
        <RenderGenreWrappedList genre={state.nowPlaying} />
        <RenderGenreWrappedList genre={state.upComing} />
        <RenderGenreWrappedList genre={state.popularTv} />
        <RenderGenreWrappedList genre={state.topRatedTv} />
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
