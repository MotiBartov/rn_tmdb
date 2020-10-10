import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import TmdbMain from './src/screens/main/TmdbMain';
import TmdbDetails from './src/screens/details/TmdbDetails';
const navigator = createStackNavigator(
  {
    Home: TmdbMain,
    Details: {
      screen: TmdbDetails,
      navigationOptions: ({navigation}) => ({
        title: `${navigation.state.params.media.item.title}`,
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

export default createAppContainer(navigator);
