import React from 'react';
import { Image,Platform,StatusBar,View,Text } from 'react-native';
import { ExpoConfigView } from '@expo/samples';

export default class SettingsScreen extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      backgroundImg:"https://nvintegration.co.uk/images/uploads/main/lg_3x2/bmJYKoTsKDbT9l2.jpeg",
      profileImg:"http://drforum.gemini.edu/wp-content/uploads/2019/04/me03by_avatar_1556381829.jpg",
    }
  }

  static navigationOptions = {
    header: null,
  };

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return (
      <View>
        <View>
          <Image
            style={{width:"100%", height:150}}
            source={{uri: this.state.backgroundImg}}
          />
          <Image
            style={{width:125,zIndex:2,shadowOffset:{width:10,height:10},shadowColor: 'red',shadowOpacity: 0.5,shadowRadius:30,borderRadius:250,position:"absolute", height:125,left:"50%",marginLeft:-62.5,bottom:-55}}
            source={{uri: this.state.profileImg}}
          />
        </View>
        <View style={{backgroundColor:"#ebebeb"}}>
            <Text>abedelbasset</Text>
            <Text>abedelbasset</Text>
            <Text>abedelbasset</Text>
            <Text>abedelbasset</Text>
        </View>
      </View>
    );
  }
}
