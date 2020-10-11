import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import TmdbMain from './src/screens/main/TmdbMain';
import TmdbDetails from './src/screens/details/TmdbDetails';
import TmdbMore from './src/screens/more/TmdbMore';
import {mapCategoryToText} from './src/utils/Utils';
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

export default createAppContainer(navigator);
