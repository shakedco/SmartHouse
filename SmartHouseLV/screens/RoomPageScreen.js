import React from 'react';
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation'; // Version can be specified in package.json
import { View,Text ,StyleSheet ,Navigator, Image,Alert , Button,TouchableHighlight } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import FlatListRoomDevices from '../components/FlatList/FlatListRoomDevices';
import { Ionicons } from '@expo/vector-icons';

export default class RoomPageScreen extends React.Component {
    constructor(props){
        super(props)
      
    }
    render() {
        const { params } = this.props.navigation.state;
        NumberOfDevices =  params ? params.NumberOfDevices : null; 
        DisableDevices =  params ? params.DisableDevices : null; 
        ActiveDevices =  params ? params.ActiveDevices : null; 
        RoomImage = params ? params.RoomImage : null; 
        devise = params ? params.Buttons : null;
        return (
        <View  style={{flexDirection:"column"}}>
          <View style={{flexDirection:"column"}}>
            <Button
          title="Go to HomeScreen"
          onPress={() => {
             
            this.props.navigation.dispatch(StackActions.reset({
              index: 0,
              actions: [
                NavigationActions.navigate({ routeName: 'Home' })
              ],
            }))
          }}
        />
        </View>
        <View style={{flexDirection:"column"}}>
        <Image
              style={{width:"100%", height: 250}}
              source={{uri: RoomImage}}
        />
        </View>
          <View style={{flexDirection:"row",backgroundColor:"#004a68"}}>
            <View style={{flex:1}}>
                <Text style={{width:"100%",color:"white",flexDirection:'column' }}>
                  {NumberOfDevices} פעיל
                  </Text>
                <Text style={{width:"100%",color:"white",flexDirection:'column'}}>{DisableDevices} כבוי</Text>
            </View>
            <View style={{flex:1}}>
                <Text style={{width:"100%",color:"white",flexDirection:'column'}}>{DisableDevices} מכשירים</Text>
            </View>
          </View>
        
          <FlatListRoomDevices Data={params}/>
        </View>
        );
      }
}