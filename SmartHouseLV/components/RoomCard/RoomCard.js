import React from 'react';
import { View,Text ,StyleSheet ,Navigator, Image,Alert , Button,TouchableHighlight} from 'react-native';
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation'; // Version can be specified in package.json
import { Ionicons } from '@expo/vector-icons';

export class RoomCard extends React.Component {
    constructor(props){
        super(props)
        this.onButtonPress = this.onButtonPress.bind(this);
       
    }
    onButtonPress(data){
        this.props.navigate.this.navigation.navigate('RoomPage',this.props.data)
    }
    onPress=(txt)=>{
        Alert.alert('You tapped the button!')
    }
    _onPressButton(data) {
        Alert.alert('You tapped the button!')
    }
    NumOfActiveDevices=(room)=>{
        const res=room.Buttons.filter(device=>device.status==1)
        return res.length
    }
    NumOfDevices=(room)=>{
        return room.Buttons.length
    }

    render() {
        var data = this.props.data
        var NumOfDevicesInRoom = this.NumOfDevices(data);
        var NumOfActiveDevices = this.NumOfActiveDevices(data)

        var numOfDisableDevices = NumOfDevicesInRoom-NumOfActiveDevices  
        return (
            <View  style={styles.RoomCard}>
                <TouchableHighlight onPress={() => this.onButtonPress(data)} underlayColor="white">
                    <View>
                        <Text style={styles.RoomName} >{data.RoomName}</Text>
                        <Image
                            style={{width:"100%", height: 150}}
                            source={{uri: data.RoomImage}}
                        />
                        <View style={styles.RoomDetails}>
                            <View style={styles.DeviceNum}>
                                <Text style={{textAlign:"center",direction:'rtl',color:"white"}}>{NumOfDevicesInRoom} התקנים</Text>
                            </View>
                            <View style={styles.deviceStatus}>
                                <View style={{flex:1 ,flexDirection:'row',alignItems:'flex-start',justifyContent:"flex-start" }}>
                                    <Text style={{width:"70%",color:"white",}}>{NumOfActiveDevices} פעיל</Text>
                                    <Ionicons style={{padding:5}} name="md-checkmark-circle" size={13} color="green" />
                                </View>
                                <View style={{flex:1 ,flexDirection:'row',justifyContent:"flex-start"}}>
                                    <Text style={{width:"70%",color:"white",}}>{numOfDisableDevices} כבוי</Text>
                                    <Ionicons style={{padding:5}} name="md-checkmark-circle" size={13} color="red" />
                                </View>
                            </View>
                        </View>
                    </View>
                </TouchableHighlight> 
            </View>
        )}
}

const styles = StyleSheet.create({
    RoomCard:{
        margin:1,
        width:"49%",
        alignItems:"center"
    },
    RoomName:{
        padding:5,
        fontSize: 13,
        fontWeight: 'bold',
        backgroundColor:"#004a68",
        color:"white"
    },
    RoomDetails:{
        flexDirection: 'row',
        height:50,
        backgroundColor:"#004a68"
    },
    DeviceNum:{
        padding:5,
        width:"50%"
        
    },
    deviceStatus:{
        padding:5,
        width:"50%"
    }
})