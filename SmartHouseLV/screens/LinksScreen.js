import React from 'react';
import { ScrollView, StyleSheet,View,Button,FlatList,Text,Image } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import { PowerSwitch } from '../components/RoomCard/PowerSwitch/PowerSwitch';

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props){
    super(props)
    this.state = {
      dataSource: [],
      isLoading:true,
  }
  }
  //BuildRequestUrl(id){
    
 
  //   var url = 'http://192.168.137.130/body';

  //  fetch(url, {
  //   method: 'POST',
  //   headers: new Headers({
  //              'Content-Type': 'application/x-www-form-urlencoded', // <-- Specifying the Content-Type
  //     }),
  //   body: JSON.stringify({ledId:id}) // <-- Post parameters
  // })
  // .then((response) => response.text())
  // .then((responseText) => {
   
  // })
  // .catch((error) => {
      
  // });
  //}
  renderItem = ({ item }) => {
    console.log(Object(item))
    return (
        <View style={{width:'100%', flex:1,flexDirection:'column-reverse',marginTop:5}}>
          <View style={{padding:5,marginTop:0,backgroundColor:"#ebebebeb" , flexDirection: 'row'}}>
            <View style={{flex:1}}>
              <Image
                  style={{width:"100%", height: 70}}
                  source={{uri: item.image}}
              />
            </View>
            <View style={{flex:2}}>
              <PowerSwitch/>
            </View>
          </View>
          
          {/* <PowerSwitch status={Object(item).status} DeviceName={Object(item).DeviceName} id={Object(item).id}/> */}
        </View>
    )
  }
  renderSeparator = ()=>{
    return (
        <View>

        </View>
    )
}
componentDidMount() {
  var Modes=[{
    id:"1",
    Name:'BirthDay',
    Devices:[1,2,3,9,8],
    image:"https://i.123g.us/c/birth_happybirthday/mtl/birth_happybirthday_mtl_01.jpg"
 },
 {
    id:"2",
    Name:"SwimingTime",
    Devices:[3,5],
    image:"https://i.ytimg.com/vi/ODTUSye3p7o/hqdefault.jpg"
 },
 {
    id:"3",
    Name:"Morning Time",
    Devices:[3,5],
    image:"https://is4-ssl.mzstatic.com/image/thumb/Music19/v4/4b/e9/00/4be900ac-9655-ba06-4f95-b462ba29e889/8033772872782.jpg/268x0w.jpg"
 }
]
this.setState({
  dataSource:Modes,
  isLoading:false
})
}
  onPressLearnMore = (id)=>{
      fetch('http://192.168.137.64')
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson)
      })
      .catch((error) =>{
        console.error(error);
      });
  }
  render() {
    return (
      <View style={styles.container}> 
        <FlatList
          data={this.state.dataSource}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => item.id}
          ItemSeparatorComponent = {this.renderSeparator}
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 0,
    backgroundColor: '#fff',
  },
});
