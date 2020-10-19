import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import TmdbMain from './src/screens/main/TmdbMain';
import TmdbDetails from './src/screens/details/TmdbDetails';
import TmdbMore from './src/screens/more/TmdbMore';
import {mapCategoryToText} from './src/utils/Utils';
import {Provider} from './src/screens/main/MainReducer';
const navigator = createStackNavigator(
  {
    Home: TmdbMain,
    Details: {
      screen: TmdbDetails,
      navigationOptions: ({navigation}) => ({
        title: `${navigation.state.params.media.item.title}`,
      }),
    },
    More: {
      screen: TmdbMore,
      navigationOptions: ({navigation}) => ({
        title: `${mapCategoryToText(navigation.state.params.category)}`,
      }),
    },
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      title: 'Movies',
    },
  },
);

const App = createAppContainer(navigator);
export default () => {
  return <Provider children={<App />} />;
};
