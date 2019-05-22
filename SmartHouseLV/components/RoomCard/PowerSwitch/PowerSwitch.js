import React from 'react';
import { StyleSheet, Image, Text, View,Switch, FlatList ,ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {Timer} from '../../Timer/Timer'


export class PowerSwitch extends React.Component {
    constructor(props){
        super(props)
        this.state = {switchValue:this.props.status}
        
    }
    sendAjaxRequest = data =>{
        /**
         * ajax request to turn on/off devices
         */
    }
    toggleSwitch = value => {
        //onValueChange of the switch this function will be called
        this.refs.child.ToggleTimer();
        this.setState({ switchValue: value });
        
        //state changes according to switch
        //which will result in re-render the text
      };
    render() {
        DeviceName=this.props.DeviceName
        status = this.props.status
        return (
            <View style={{padding:5,marginTop:5,backgroundColor:"#ebebebeb" , flexDirection: 'row'}}>
                 <View style={{flex:1}}>
                    <Ionicons style={{padding:5}} name="md-bulb" size={30} color={this.state.switchValue ? 'green' : 'gray'} />
                 </View>
                 <View style={{flex:1}}>
                    <Text>{DeviceName}</Text>
                    <Timer ref="child"/>
                 </View>
                 <View style={{flex:1}}>
                    <Switch 
                        onValueChange={this.toggleSwitch}
                        value = {status?true:false}
                        value={this.state.switchValue}
                    />
                 </View>
            </View>
        )
    }
}