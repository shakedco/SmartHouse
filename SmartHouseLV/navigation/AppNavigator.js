import React from 'react';
import { createSwitchNavigator,createStackNavigator ,createAppContainer} from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import RoomPageScreen from '../screens/RoomPageScreen'


const AppNavigator = createStackNavigator({
  Home: {
    screen: MainTabNavigator,
  },
  RoomPage:{
    screen:RoomPageScreen
  }
},{
  initialRouteName: 'Home',
});

export default createAppContainer(AppNavigator);