import React from 'react';
import { Image,Platform,StatusBar,View,Text } from 'react-native';
import { ExpoConfigView } from '@expo/samples';
import { Button } from 'react-native-elements';

export default class SettingsScreen extends React.Component {
  constructor(props){
    super(props)
    this.GoToDevicesDetails=this.GoToDevicesDetails.bind(this)
    this.state = {
      backgroundImg:"https://nvintegration.co.uk/images/uploads/main/lg_3x2/bmJYKoTsKDbT9l2.jpeg",
      profileImg:"http://drforum.gemini.edu/wp-content/uploads/2019/04/me03by_avatar_1556381829.jpg",
    }
  }

  static navigationOptions = {
    header: null,
  };
  GoToDevicesDetails(){
    this.props.navigation.navigate("DeviceDetails")
  }
  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return (
      <View>
        <View style={{flexDirection:'row'}}>
          <Image
            style={{width:"100%", height:150}}
            source={{uri: this.state.backgroundImg}}
          />
          <Image
            style={{width:125,zIndex:2,shadowOffset:{width:10,height:10},shadowColor: 'red',shadowOpacity: 0.5,shadowRadius:30,borderRadius:250,position:"absolute", height:125,left:"50%",marginLeft:-62.5,bottom:-30}}
            source={{uri: this.state.profileImg}}
          />
        </View>
        <View style={{backgroundColor:"#d8d8d8",height:"100%",width:"100%",marginTop:40}}>
            <View style={{flexDirection:'row',marginBottom:10,backgroundColor:"#ebebeb" ,padding:25}}>
              <Button
                title="צפיה"
                onPress={this.GoToDevicesDetails}
              />
              <Text style={{flex:1,textAlignVertical:'center',fontWeight:'bold' ,fontSize:16,color:"black",paddingRight:15,textAlign:'right'}} >דו"ח פעילות המכשירים</Text>
            </View>
            <View style={{flexDirection:'row',marginBottom:10,backgroundColor:"#ebebeb" ,padding:25}}>
              <Button
                title="צפיה"
                onPress={this.GoToDevicesDetails}
              />
              <Text style={{flex:1,textAlignVertical:'center',fontWeight:'bold' ,fontSize:16,color:"black",paddingRight:15,textAlign:'right'}} >פרטי פרופיל</Text>
            </View>
        </View>
      </View>
    );
  }
}
