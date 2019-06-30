import React from 'react';
import { StyleSheet, Image, Text, View,Switch, FlatList ,ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {Timer} from '../../Timer/Timer'
import { MyDate } from '../../../Plugins/MyDate';


export class PowerSwitch extends React.Component {
    constructor(props){
        super(props)
        const deviceObject=Object(this.props.DeviceObejct)
        this.GetRegisterStatus=this.GetRegisterStatus.bind(this)
        this.state={
            DeviceName:deviceObject.DeviceName,
            DeviceImage:deviceObject.DeviceImage,
            SwitchStatus:deviceObject.Status,
            RegisterIndex:deviceObject.RegisterIndex,
            RoomId:deviceObject.RoomId,
            TimeStamp:deviceObject.TimeStamp,
            DeviceId:deviceObject.id
        }
    }
  
    GetRegisterStatus(arduinoUrl){
        var url ='http://'+arduinoUrl+"/registerStatus";
        fetch(url, {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/x-www-form-urlencoded', // <-- Specifying the Content-Type
            }),
            // body: JSON.stringify({ledId:this.state.DeviceId}) // <-- Post parameters
        })
        .then((response) => response.text())
        .then((responseText) => {
          //  console.log(responseText)
        })
        .catch((error) => {
            console.log(error)
        });
    }
  
    sendAjaxRequest = arduinoUrl =>{
        /**
         * ajax request to turn on/off devices
         */
        DateHandler=new MyDate()
        var url ='http://'+arduinoUrl+"/body";
        fetch(url, {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/x-www-form-urlencoded', // <-- Specifying the Content-Type
            }),
            body: JSON.stringify({ledId:this.state.RegisterIndex,timestamp:DateHandler.GetTimeStamp()}) // <-- Post parameters
        })
        .then((response) => response.text())
        .then((responseText) => {
            console.log(responseText)
            // if(responseText=='Connected'){
            // //   this.props.navigation.navigate("EditPage")
            // }else{

            // }
        })
        .catch((error) => {
            console.log(error)
        });
    }
    componentDidMount(){
        
    }
    toggleSwitch = value => {
        //onValueChange of the switch this function will be called
        this.refs.child.ToggleTimer();
        this.setState({ SwitchStatus: value });
        this.sendAjaxRequest("192.168.3.120")
        //state changes according to switch
        //which will result in re-render the text
      };
    render() {
        // console.log(this.state.SwitchStatus)
        status = this.state.SwitchStatus==1?true:false
        // console.log(status)
        return (
            <View style={{padding:5,marginTop:5,backgroundColor:"#ebebebeb" , flexDirection: 'row'}}>
                 <View>
                    <Ionicons style={{padding:5}} name="md-bulb" size={30} color={status ? 'green' : 'gray'} />
                 </View>
                 <View style={{flex:1,textAlign:'center',alignContent:'center'}}>
                    <Text style={{textAlign:'center'}}>{this.state.DeviceName}</Text>
                    <Timer DeviceReg={this.state.RegisterIndex} timestamp={this.state.TimeStamp} ref="child"/>
                 </View>
                 <View style={{flex:1,alignContent:'center'}}>
                     <Text style={{flex:1,textAlign:'center'}}>Reg Num {this.state.RegisterIndex}</Text>
                 </View>
                 <View>
                    <Switch 
                        onValueChange={this.toggleSwitch}
                        value={status}
                    />
                 </View>
            </View>
        )
    }
}