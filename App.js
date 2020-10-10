import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import TmdbMain from './src/screens/TmdbMain';

const navigator = createStackNavigator(
  {
    Home: TmdbMain,
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      title: 'Movies',
    },
  },
);

export default createAppContainer(navigator);
