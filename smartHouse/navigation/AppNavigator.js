import React from 'react';
import { createSwitchNavigator,createStackNavigator ,createAppContainer} from 'react-navigation';

import MainTabNavigator from './MainTabNavigator'
import RoomPageScreen from '../screens/RoomPageScreen'
import EditHomePage from '../screens/EditHomePage'
import EditRoomsPage from '../screens/EditRoomsPage'
import EditRoomPage from '../screens/EditRoomPage'
import SearchModelPage from '../screens/SearchModelPage'
import DemoPage from '../screens/DemoPage'
import EditeModePage from '../screens/EditeModePage'
const AppNavigator = createStackNavigator({
  Home: {
    screen: MainTabNavigator,
  },
  RoomPage:{
    screen:RoomPageScreen
  },  
  EditPage:{
    screen:EditHomePage
  },
  EditRooms:{
    screen:EditRoomsPage
  },
  EditRoom:{
    screen:EditRoomPage
  },
  SearchModel:{
    screen:SearchModelPage
  },
  DemoPage:{
    screen:DemoPage
  },
  EditeModePage:{
    screen:EditeModePage
  }
},{
  initialRouteName: 'EditPage',
});

export default createAppContainer(AppNavigator);