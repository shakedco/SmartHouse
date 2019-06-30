import React, { Component } from 'react';
import { AppRegistry,StyleSheet, NetInfo, Alert,Text, View,ActivityIndicator } from 'react-native';
import { Video } from 'expo';
import { Input,Button} from 'react-native-elements';

export default class SearchModelPage extends React.Component  {
  constructor(props){
    super(props)
    this.state={}
    this.state.isConnected=false;
    this.ConnectToArduino=this.ConnectToArduino.bind(this)
    // console.log(NetInfo.getConnectionInfo().then((result)=>{
    //   console.log(result)
    // }))
    // NetworkInfo.getIPAddress(ip => {
    //   console.log(ip);
    // });
  }
  ConnectToArduino(arduinoUrl){
        var url ='http://'+arduinoUrl+"/connect";
        // console.log(url)
        this.setState({
          'isConnected':true
        }) 
        fetch(url, {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/x-www-form-urlencoded', // <-- Specifying the Content-Type
            }),
            body: JSON.stringify({Connect:""}) // <-- Post parameters
        })
        .then((responseText) => {
          
            if(responseText._bodyText=='Connected'){
              this.ArduinoUrl = arduinoUrl
              this.props.navigation.navigate("EditPage")
            }else{
              Alert.alert(
                " יש שגיאה בהתחברות לתשיתש הבית חכם",
                "לבדוק נכונות הכתובת ולנסות שנית ",
                [
                  {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                  }
                ],
                { cancelable: false }
              );
              this.setState({
                'isConnected':false
              }) 
            }
        })
        .catch((error) => {
          Alert.alert(
            " יש שגיאה בהתחברות לתשיתש הבית חכם",
            "לבדוק נכונות הכתובת ולנסות שוב ",
            [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              }
            ],
            { cancelable: false }
          );
          this.setState({
            'isConnected':false
          }) 
        });
  }

  async componentDidMount() {
    // ipAddress = await NetworkInfo.getIPAddress();
    // ipAddress.then(res=>{
    //   console.log(res)
    // })
  }
 
  // componentWillUnmount() {
  //   NetInfo.isConnected.removeEventListener(
  //       'change',
  //       this._handleConnectivityChange
  //   );
  // }

  // _handleConnectivityChange = (isConnected) => {
  //   this.setState({
  //     isConnected,
  //   });
  // };

  render() {
    return (
        <View  style={styles.container}>
          <View style={styles.SearchModel} >
          {
              this.state.isConnected
              ?
              <View style={{flex:1 , justifyContent:'center',alignItems:'center'}}>
                  <ActivityIndicator size="large" color="#330066" animating />
              </View>
              :
              <View>
                <Text style={{padding:10,fontSize:16,fontWeight:'bold'}}> תתחבר לתשתית הבית שלך .</Text>
                <Input
                  style={{alignContent:'center',fontSize:9,color:"#000"}}
                  placeholder='תזין כתובת IP לוח הראדואניו'
                  placeholderTextColor="#ebebeb"
                  
                  leftIcon={{ type: 'font-awesome', name: 'wifi' }}
                  onChangeText={(text) => this.setState({ArduinoUrl:text})}
                  pattern={[
                    '^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$', // min 8 chars
                  ]}
                  onValidation={()=>{console.log("is valied")}}
                />
                <Button
                  title="התחבר"
                  onPress={()=>{this.ConnectToArduino(this.state.ArduinoUrl)}}
                />
              </View>
          }
          </View>
        <Video
	        source={{ uri:'http://cdn-b-east.streamable.com/video/mp4/w3g9w.mp4?token=PsN0mxjcRRt3q5nr_kxE7Q&expires=1561830660'}}
          shouldPlay
          isMuted={true} 
          isLooping={true}
	        resizeMode="cover"
          style={{ width:"100%",top:0,height:"100%" }}
          />
        </View>

    );
  }
}


AppRegistry.registerComponent('NetworkCheck', () => IsConnected);
  

const styles = StyleSheet.create({
  container: {
    paddingTop: 0,
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'center',
    backgroundColor: '#fff',
  },
  SearchModel:{
    position:'absolute',
    zIndex:9,
    width:"80%",
    height:"auto",
    backgroundColor:'#fff',
    opacity:0.7
    
  }
});
