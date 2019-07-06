import React from 'react';
import { StyleSheet, Image, Text, View,Switch, FlatList ,ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {Timer} from '../../Timer/Timer'
import { MyDate } from '../../../Plugins/MyDate';
import { Arduino } from '../../../arduino/Arduino';
import { SmartHouseDB } from '../../../DataBase/SmartHouseDB';


export class PowerSwitchModes extends React.Component {
    constructor(props){
        super(props)
        this.GetRegisterStatus=this.GetRegisterStatus.bind(this) 
        this.state={
            ModeDetails:this.props.ModeDetails,
            SwitchStatus:false
        }
        this.CheckModeIsActive=this.CheckModeIsActive.bind(this)
    }
    CheckModeIsActive(){
        this.GetRegisterStatus(Arduino.getInstance().GetArduinoUrl()).then((res)=>{
            const arrInput=JSON.parse(this.state.ModeDetails.ArrPin)
            RegArry=res.split(",")
            arrInput.map((inputindx)=>{
                if (RegArry[inputindx]==0){
                    this.setState({SwitchStatus:false})
                    return
                }
                this.setState({SwitchStatus:true})
            })
        })
        
    }
    GetRegisterStatus(arduinoUrl){
        return new Promise((resolve, reject) => {
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
           resolve(responseText)
        })
        .catch((error) => {
            reject(error)
        });
        })
    }
  
    sendAjaxRequest = (ledId,arduinoUrl) =>{
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
            body: JSON.stringify({ledId:ledId,timestamp:DateHandler.GetTimeStamp()}) // <-- Post parameters
        })
        .then((response) => response.text())
        .then((responseText) => {
            const timeDetails =responseText.TimeStamp
            if(responseText.IsClosed==true)
            {
                const arr=timeDetails.splite(":")
                dbHandler=SmartHouseDB.getInstance();
                dbHandler.SaveDeviceLogInfo(this.state.RegisterIndex,timeDetails,arr[1])
            }
        })
        .catch((error) => {
            console.log(error)
        });
    }
    componentDidMount(){
        this.CheckModeIsActive()
    }
    toggleSwitch = value => {
        DevicesArr=JSON.parse(this.state.ModeDetails.ArrPin)
        const urlArduino = Arduino.getInstance().GetArduinoUrl()
        this.GetRegisterStatus(urlArduino).then((RegStatus)=>{
            const RegStatusArr=RegStatus.split(",")
            if(value==true){
                DevicesArr.map((val)=>{
                    if(RegStatusArr[val]==0){
                        this.sendAjaxRequest(val,Arduino.getInstance().GetArduinoUrl())
                    }
                })
            }else{
                DevicesArr.map((val)=>{
                    if(RegStatusArr[val]==1){
                        this.sendAjaxRequest(val,Arduino.getInstance().GetArduinoUrl())
                    }
                })
            }
        }).then(()=>{
            this.setState({
                SwitchStatus:value?true:false
            })
        })
        
        
        
        
      };
    render() {
        
        return (
            <View style={{padding:5,marginTop:5,backgroundColor:"#ebebebeb" , flexDirection: 'row'}}>
                 <View>
                    
                    <Switch 
                        onValueChange={this.toggleSwitch}
                        value={this.state.SwitchStatus}
                    />
                 </View>
            </View>
        )
    }
}