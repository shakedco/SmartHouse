import React from 'react';
import { StyleSheet, Image, Text, View,Switch, FlatList ,ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {Timer} from '../../Timer/Timer'
import { MyDate } from '../../../Plugins/MyDate';


export class PowerSwitchModes extends React.Component {
    constructor(props){
        super(props)
        
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
            if(responseText=='Connected'){
              this.props.navigation.navigate("EditPage")
            }else{

            }
        })
        .catch((error) => {
            console.log(error)
        });
    }
    componentDidMount(){
        
    }
    toggleSwitch = value => {
        
        //state changes according to switch
        //which will result in re-render the text
      };
    render() {
        return (
            <View style={{padding:5,marginTop:5,backgroundColor:"#ebebebeb" , flexDirection: 'row'}}>
                 <View>
                    
                    <Switch 
                        onValueChange={this.toggleSwitch}
                        value={true}
                    />
                 </View>
            </View>
        )
    }
}