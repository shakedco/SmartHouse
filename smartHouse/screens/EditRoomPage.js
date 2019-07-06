import React from 'react';
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation'; // Version can be specified in package.json
import { View, Text, StyleSheet, Navigator, Image, Alert, Button, TouchableHighlight, Dimensions, TextInput, FileInput, FlatList } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import FlatListRoomDevices from '../components/FlatList/FlatListRoomDevices';
import { Ionicons } from '@expo/vector-icons';
import { DocumentPicker, ImagePicker, PROVIDER_GOOGLE } from 'expo';
import Carousel from 'react-native-snap-carousel';
import ImagePickerPluggin from '../Plugins/ImagePickerPluggin'
import { SmartHouseDB } from '../DataBase/SmartHouseDB'
import { Icon } from 'react-native-elements'
import RNPickerSelect from 'react-native-picker-select';
import { Arduino } from '../arduino/Arduino';


export default class EditRoomPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = { text: 'Useless Placeholder' };
        this.state = {
            image: "https://hytheferry.co.uk/wp-content/themes/Hytheferry/assets/images/placeholder2.jpg",
            DeviceName: "שם חדר",
            placeholder: "תאר מכשיר",
            DeviceList: []
        };
        this.state.Rooms = {}
        this.DataBaseInstance = SmartHouseDB.getInstance()
        this.componentDidMount = this.componentDidMount.bind(this)
        this.AddDevice = this.AddDevice.bind(this)
        this._renderItem = this._renderItem.bind(this);
        this.SelectElement = this.SelectElement.bind(this)
        this.RemoveDevice=this.RemoveDevice.bind(this)
        this.GetAvailableRegister=this.GetAvailableRegister.bind(this);
        this.BackToEditeRoomsPage=this.BackToEditeRoomsPage.bind(this)
        this.NextToHomePage=this.NextToHomePage.bind(this)
        /**
         * Select Picker 
         */
        this.inputRefs = {};
        this.state.Register=[]
        
        

    }
    GetAvailableRegister(arduinoUrl){
        return new Promise((resolve, reject) =>{
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
                ProccessArr=[]
                RegistorArr=responseText.split(",");
                RegistorArr.map((value,key)=>{
                    ProccessArr.push({
                        "label":"Register "+parseInt(key),
                        "value":key
                    })
                })
                resolve(ProccessArr)
            }
        })
        .catch((error) => {
            reject(error)
        });
    })
  }
    SelectElement(RoomId) {
        this.setState({ RoomId: RoomId })
        this.ShowRoomDevices(RoomId)
    }
    _renderItem({ item, index }) {
        return (
            <TouchableHighlight key={item.RoomId} onPress={() => this.SelectElement(item.RoomId)}>
                <View style={RoomCard.SectionCardBox}>
                    <Image source={{ uri: item.imageSrc }} style={{ flex: 1, width: "100%" }} />
                    <Text style={{ color: "#000", fontSize: 25, textAlign: 'center' }}>{item.name}</Text>
                </View>
            </TouchableHighlight>
        );
    }
    RemoveDevice(deviceId,RoomId){
        this.DataBaseInstance.RemoveDeviceById(deviceId)
        this.ShowRoomDevices(RoomId)
        this.componentDidMount()
    }
    AddDevice() {
        if (this.state.image == null || this.state.RoomId == null || this.state.DeviceName == null) {
            Alert.alert('There is a lake rquired informations');
            return
        }
        this.DataBaseInstance.AddDeviceToRoom(this.state.RoomId, this.state.DeviceName, this.state.image,this.state.RegisterIndex)
        this.ShowRoomDevices(this.state.RoomId)
        this.componentDidMount()
        // this.props.Handler.componentDidMount()
    }
    DeviceListRenderItem = ({ item, key }) => {
        return (
            <View style={RoomList.Item}>
                <Image 
                    style={{ width:70, height: "100%" }}
                    source={{ uri: item.DeviceImage }} 
                />
                <Text style={{flex:1,padding:5}}>{item.DeviceName}</Text>
                <TouchableHighlight  onPress={()=>{this.RemoveDevice(item.id,item.RoomId)}}>
                    <Icon
                        reverse
                        size={14}
                        name='trash'
                        type='font-awesome'
                        color='#F00'
                    />
                </TouchableHighlight>
                <TouchableHighlight  onPress={()=>{console.log("add device")}}>
                    <Icon
                        reverse
                        size={14}
                        name='lightbulb-o'
                        type='font-awesome'
                        color='#45a163'
                    />
                </TouchableHighlight>
            </View>
        )
    }
    NextToHomePage(){
        this.props.navigation.navigate("Home")
    }
    BackToEditeRoomsPage(){
        this.props.navigation.navigate("EditRooms")
    }
   
    componentDidMount() {
        DevicesArr=this.DataBaseInstance.GetAllBussyDevice();
        DevicesArr.then((BussyDevices)=>{
            BussyDevicesArr=[]
            BussyDevices._array.map((value,key)=>{
                BussyDevicesArr.push(value.RegisterIndex);
            })
            const url =  Arduino.getInstance().GetArduinoUrl()
            RegisterArr=this.GetAvailableRegister(url);
            RegisterArr.then((result)=>{
                resArr=[]
                result.map((Dev,key)=>{
                    if(!BussyDevicesArr.includes((Dev.value))){
                        resArr.push(Dev) 
                    }
                })
                this.setState({Register:resArr})
            })
        })
        
        data = this.DataBaseInstance.GetAllHomeRooms()
        data.then((responseText) => {
            var response = responseText;
            this.setState({
                Rooms: response["_array"]
            })
        });
    }
    ShowRoomDevices(RoomId) {
        data = this.DataBaseInstance.GetDevicesByRoomId(RoomId)
        data.then((responseText) => {
            var response = responseText;
            this.setState({
                DeviceList: response["_array"]
            })
        });
    }
    _pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [3, 4],
        });
        // console.log(result)

        if (!result.cancelled) {
            this.setState({ image: result.uri });
        }
    };
    render() {
        return (
            <View style={{ flex: 1 }}>
                <View>
                    <Text style={EditeRoomStyle.Header}>נא לחלק את הקומות לחדרים ו אזורים</Text>
                </View>
                <View style={EditeRoomStyle.SectionsBox} >
                    <Carousel
                        // onScrollEndDrag={(c)=>{}}
                        ref={(c) => { this._carousel = c }}
                        data={Object.values(this.state.Rooms)}
                        renderItem={this._renderItem}
                        sliderWidth={(Dimensions.get('window').width) * 1}
                        itemWidth={(Dimensions.get('window').width) * 0.8}
                    />
                </View>
                <View style={EditeRoomStyle.InputBox}>
                    <View style={EditeRoomStyle.InputField}>
                        <Image source={{ uri: this.state.image }} style={{ flex: 1, height: "100%" }} />
                    </View>
                    <View style={EditeRoomStyle.InputFieldText}>
                        <View style={{flexDirection:'row'}}>
                        <TextInput
                                style={{ flex:1,  backgroundColor: 'azure', padding: 5, textAlign: 'center', fontSize: 14 }}
                                placeholder={this.state.placeholder}
                                onChangeText={(DeviceName) => this.setState({ DeviceName })}
                            />
                        <RNPickerSelect
                            placeholder={{
                                label: 'Select Register',
                                value: null,
                            }}
                            items={this.state.Register}
                            onValueChange={(value) => {
                                this.setState({
                                    RegisterIndex: value,
                                });
                            }}
                            onUpArrow={() => {
                                this.inputRefs.name.focus();
                            }}
                            onDownArrow={() => {
                                this.inputRefs.picker2.togglePicker();
                            }}
                            style={pickerSelectStyles}
                            value={this.state.RegisterIndex}
                            ref={(el) => {
                                this.inputRefs.picker = el;
                            }}
                        />
                        </View>
                        <View style={EditeRoomStyle.container}>
                            <View style={EditeRoomStyle.buttonContainer}>
                                <Button
                                    title="בחר תמונה"
                                    onPress={this._pickImage}
                                />
                            </View>
                            <View style={EditeRoomStyle.buttonContainer}>
                                <Button
                                    title="הוספת מכשיר"
                                    onPress={this.AddDevice}
                                />
                            </View>
                        </View>
                    </View>
                    
                </View>
                <View style={EditeRoomStyle.RoomsContainer}>
                    <FlatList
                        style={RoomList.FlatList}
                        data={this.state.DeviceList}
                        renderItem={this.DeviceListRenderItem}
                        keyExtractor={(item, index) => String(item.id)}
                        ItemSeparatorComponent={this.renderSeparator}
                    />
                </View>
                {/* <ImagePickerPluggin Handler={this} />
                <View style={{ height: "50%", backgroundColor: "#2196f3" }}>
                    <Carousel
                        ref={(c) => { this._carousel = c; }}
                        data={Object.values(this.state.product)}
                        renderItem={this._renderItem}
                        sliderWidth={(Dimensions.get('window').width) * 1}
                        itemWidth={(Dimensions.get('window').width) * 0.8}
                    />
                </View> */}
                <TouchableHighlight style={EditeRoomStyle.NextPage} onPress={this.NextToHomePage}>
                    <Icon
                        reverse
                        name='check'
                        type='font-awesome'
                        color='#3CB371'
                    />
                </TouchableHighlight>
                <TouchableHighlight style={EditeRoomStyle.PreviousPage} onPress={this.BackToEditeRoomsPage}>
                    <Icon
                        reverse
                        name='arrow-left'
                        type='font-awesome'
                        color='#A52A2A'
                    />
                </TouchableHighlight>
            </View>
        )
    }
}


const EditeRoomStyle = StyleSheet.create({
    RoomsContainer: {
        flex: 3
    },
    InputBox: {
        paddingTop:10,
        paddingBottom:10,
        flexDirection: "row",
        height: 100
    },
    SectionsBox: {
        flex: 2,
        backgroundColor:'#F0FFFF'
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContainer: {
        flex: 1,
    },
    InputFieldTextButtons: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    InputFieldText: {
        flex: 3
    },
    InputField: {
        flex: 1
    },
    Header: {
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        color: "white",
        backgroundColor: "#2196f3",
        fontSize: 16,

    },
    NextPage: {
        position: 'absolute',
        right: "5%",
        bottom: "5%"
    },
    PreviousPage: {
        position: 'absolute',
        left: "5%",
        bottom: "5%"
    }
})
const RoomCard = StyleSheet.create({
    SectionCardBox: {
        width: "100%",
        height: "100%",
        padding: 15,
        backgroundColor:"#ebebebeb"
        
        // marginTop: "0%"
    }
})
const RoomList = StyleSheet.create({
    FlatList:{
        backgroundColor:"gray"
    },
    Item: {
        paddingTop:5,
        paddingBottom:5,
        marginTop:5,
        backgroundColor:"white",
        flexDirection: 'row'
    }
})
const pickerSelectStyles = StyleSheet.create({
    inputAndroid: {
        width:100,
        height:30,
    },
});