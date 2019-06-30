import React from 'react';
import { StyleSheet, Image, Text, View, FlatList ,ActivityIndicator } from 'react-native';
import { RoomCard } from '../RoomCard/RoomCard';
import { SmartHouseDB } from '../../DataBase/SmartHouseDB'
import  {PowerSwitch}  from '../RoomCard/PowerSwitch/PowerSwitch';
export default class FlatListRoomDevices extends React.Component {
    constructor(props) {
        super(props)
        this.DataBaseInstance = SmartHouseDB.getInstance()
        this.state = {
            RoomId:this.props.RoomId,
            dataSource: [],
            isLoading:true,
        }
    }
    renderItem = ({ item }) => {
        
        return (
            <View style={{width:'100%', flex:1,flexDirection:'column'}}>
              <PowerSwitch  status={Object(item).status} DeviceObejct={item} DeviceName={Object(item).DeviceName} id={Object(item).id}/>
            </View>
        )
    }
    
    renderSeparator = ()=>{
        return (
            <View>

            </View>
        )
    }
    GetTimeStamp(arduinoUrl){
        return new Promise((resolve, reject) => {
        var url ='http://'+arduinoUrl+"/TS";
        fetch(url, {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/x-www-form-urlencoded', // <-- Specifying the Content-Type
            }),
            body: JSON.stringify({Connect:""}) // <-- Post parameters
        })
        .then((response) => response.text())
        .then((responseText) => {
            
            if(responseText!=''){
                TimeStampArr=[]
                RegistorArr=responseText.split(",");
                RegistorArr.map((value,key)=>{
                    TimeStampArr[key]=value    
                })
                resolve(TimeStampArr)
            }
        })
        .catch((error) => {
            reject(error);
        });
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
            body: JSON.stringify({Connect:""}) // <-- Post parameters
        })
        .then((response) => response.text())
        .then((responseText) => {
            
            if(responseText!=''){
                registerStatus=[]
                RegistorArr=responseText.split(",");
                RegistorArr.map((value,key)=>{
                    registerStatus[key]=value    
                })
                resolve(registerStatus)
            }
        })
        .catch((error) => {
            reject(error);
        });
        })
    }
    componentDidMount(){
        RoomId=this.state.RoomId
        this.DataBaseInstance.GetDeviceByRoomId(RoomId).then((result)=>{
          
          return (result._array)
        }).then((DevArr)=>{
            this.GetRegisterStatus('192.168.3.120').then((result)=>{
                this.GetTimeStamp('192.168.3.120').then((stres)=>{
                    DevArr.map((value,key)=>{
                        RegRoom=value.RegisterIndex
                        DevArr[key].Status=result[RegRoom]
                        DevArr[key].TimeStamp=stres[RegRoom]
                    })
                    this.setState({
                        Devices:DevArr,
                        isLoading:false,
                      })  
                })         
            })
        })
        
    }
    render() {
        return (
            this.state.isLoading
            ?
             <View style={{flex:1 , justifyContent:'center',alignItems:'center'}}>
                 <ActivityIndicator size="large" color="#330066" animating />
             </View>
            :
            <View>
                <FlatList
                    data={this.state.Devices}
                    renderItem={this.renderItem}
                    keyExtractor={(item, index) => String(item.id)}
                    ItemSeparatorComponent = {this.renderSeparator}
                />
            </View>
        )
    }
}