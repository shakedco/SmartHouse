import React from 'react';
import { ScrollView, StyleSheet,View,Button,FlatList,Text,Image } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import { PowerSwitchModes } from '../components/RoomCard/PowerSwitch/PowerSwitchModes';
import { SmartHouseDB } from '../DataBase/SmartHouseDB';

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
    this.NavigateToEditePage=this.NavigateToEditePage.bind(this)
    this.DeleteMode=this.DeleteMode.bind(this)
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
  DeleteMode(data,id){
    DBHandler=SmartHouseDB.getInstance();
    DBHandler.DeleteNode(id).then((data)=>{
      this.componentDidMount()
    })
  }
  renderItem = ({ item }) => {
    return (
        <View style={{width:'100%', flex:1,flexDirection:'column-reverse',marginTop:5}}>
          <View style={{padding:5,marginTop:0,backgroundColor:"#ebebebeb" , flexDirection: 'row'}}>
            <View style={{flex:1}}>
              <Image
                  style={{flex:2, width:"100%", height: 100}}
                  source={{uri: item.ImageSrc}}
              />
            </View>
            <View style={{flex:2,flexDirection:'column'}}>  
                <Text style={{flex:1}}>{item.ModeName}</Text>       
                <View style={{}}>
                  <Button
                    title="הסרה"
                    onPress={data=>this.DeleteMode(data,item.id)}
                  />
                  <PowerSwitchModes style={{flex:1}}/>
                </View>
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
  const DBHandler=SmartHouseDB.getInstance()
  DBHandler.GetAllModes().then((data)=>{
    this.setState({
      dataSource:data._array,
      isLoading:false
    })
  })
}
  onPressLearnMore = (id)=>{
      fetch('http://192.168.3.120')
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson)
      })
      .catch((error) =>{
        console.error(error);
      });
  }
  NavigateToEditePage(){
    this.props.navigation.navigate("EditeModePage")
  }
  render() {
    return (
      <View>
        <View style={{ position: 'absolute', top: "90%",zIndex:9, left: "70%" }}>
              <Button
                  onPress={this.NavigateToEditePage}
                  navigate={this.props}
                  icon={{
                      name: "arrow-right",
                      size: 15,
                      color: "white"
                  }}
                  title="Edite Page"
              />
        </View>
        <View style={styles.container}> 
          <FlatList
            data={this.state.dataSource}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => String(item.id)}
            ItemSeparatorComponent = {this.renderSeparator}
            />
        </View>
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
