import React from 'react';
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation'; // Version can be specified in package.json
import { View, Text, StyleSheet, Image,Navigator,Alert, Button, TouchableHighlight, Dimensions, TextInput, FileInput,FlatList} from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import FlatListRoomDevices from '../components/FlatList/FlatListRoomDevices';
import { Ionicons } from '@expo/vector-icons';
import Carousel from 'react-native-snap-carousel';
import { DocumentPicker, ImagePicker, PROVIDER_GOOGLE } from 'expo';
import { SmartHouseDB } from '../DataBase/SmartHouseDB'
import { Icon } from 'react-native-elements'
import cloneDeep from 'lodash/cloneDeep';
import { Switch } from 'react-native-gesture-handler';
import { Arduino } from '../arduino/Arduino';
import { MyDate } from '../Plugins/MyDate';

export default class DeviceDetails extends React.Component {
    constructor(props){
        super(props)
        this.state={
            Devices:[]
        }
        this.GoBack=this.GoBack.bind(this)
        this.componentDidMount=this.componentDidMount.bind(this)
    }   

    renderItem = ({ item }) => {
        dateHandler = new MyDate
        var HHMMSS=dateHandler.ConvertSecondToHHMMSS(item.longTime)
        HHMMSS=HHMMSS.substring(0,2)+":"+HHMMSS.substring(2,4)+":"+HHMMSS.substring(4,6) 
        return(
            <View style={{padding:5,marginTop:5,backgroundColor:"#ebebebeb", flexDirection:'row'}}>
                <Image
                  style={{flex:1,  height: 100}}
                  source={{uri: item.DeviceImage}}
                />
                <View style={{flex:2,alignItems:'flex-end',alignContent:'flex-start'}}>
                    <Text style={{flex:1,textAlign:'right',fontSize:14}}>שם מכשיר : {item.DeviceName}</Text>
                    <Text style={{flex:1,textAlign:'right',fontSize:14}}>שם חדר : {item.RoomName}</Text>
                    <Text style={{flex:1,textAlign:'right',fontSize:14}}>מספר אוגר : {item.RegisterIndex}</Text>
                    <Text style={{flex:1,textAlign:'right',fontSize:14}}>משך זמן : {HHMMSS}</Text>
                </View>
            </View>
        )
    }
    componentDidMount(){
        SmartHouseDB.getInstance().getDeviceLogInfo().then((data)=>{
            this.setState({
                Devices:data._array
            })
        })
    }
    GoBack(){
        this.props.navigation.goBack()
    }
    render(){
        return(
            <View style={{flex:1}}>
                <View style={{flexDirection:'row'}}>
                <TouchableHighlight onPress={this.GoBack}>
                    <Ionicons style={{padding:10,backgroundColor:"#2196f3",color:"#fff"}} name="md-arrow-back" size={30}  />
                </TouchableHighlight>
                <Text style={DeviceDetailsStyle.Header}> דווח על פעולת המכשירים </Text>
                </View>
                <Image style={{flex:1}} source={{uri:'https://ak7.picdn.net/shutterstock/videos/21770437/thumb/7.jpg'}} />
                <View style={{flex:2}}>
                    <FlatList 
                        style={{width:"100%",height:"100%",flex:1}}
                        data={this.state.Devices}
                        renderItem={this.renderItem}
                        keyExtractor={(item, index) => String(item.id)}
                        ItemSeparatorComponent = {this.renderSeparator}
                    />
                </View>
            </View>
        )
    }
}

const DeviceDetailsStyle = StyleSheet.create({
    Header: {
        paddingTop: 15,
        paddingRight: 10,
        paddingLeft: 15,
        paddingBottom: 15,
        color: "white",
        flex:1,
        backgroundColor: "#2196f3",
        fontSize: 14,
    }
})