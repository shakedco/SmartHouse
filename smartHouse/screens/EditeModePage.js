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

export default class EditeModePage extends React.Component {
    constructor(props){
        super(props)
        this.AddNewHouseMode=this.AddNewHouseMode.bind(this)
        this.state={
            placeholder:"תאור מצב",
            imageChange:false,
            image:"https://hytheferry.co.uk/wp-content/themes/Hytheferry/assets/images/placeholder2.jpg",
            SwitchStatusArr:[],
            HouseModeName:""
        }
    }
    SendModeCommand(arduinoUrl,ModeArr){
        /**
         * ajax request to turn on/off devices
         */
        // DateHandler=new MyDate()
        var url ='http://'+arduinoUrl+"/SetMode";
        fetch(url, {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/x-www-form-urlencoded', // <-- Specifying the Content-Type
            }),
            body: JSON.stringify({
                Arr:ModeArr,
                length:ModeArr.length
            }) // <-- Post parameters
        })
        .then((response) => response.text())
        .then((responseText) => {
            if(responseText=='modeAdded'){
                
            }else{

            }
        })
        .catch((error) => {
            console.log(error)
        });
    }
    componentDidMount() {
        DBInstance = SmartHouseDB.getInstance();
        DBInstance.GetAllDevices().then((data)=>{       
            SwitchArr=[]
            data._array.map((val,key)=>{
                SwitchArr.push({
                    id:val.id,
                    DeviceImage:val.DeviceImage,
                    DeviceName:val.DeviceName,
                    RoomId:val.RoomId,
                    RegisterIndex:val.RegisterIndex,
                    switch:false
                })
            })
            this.setState({
                SwitchStatusArr:SwitchArr,
            })
        })
    }
    toggleSwitch =(val, ind)=> {
        const tempData = cloneDeep(this.state.SwitchStatusArr);
        tempData[ind].switch = val;
        this.setState({ SwitchStatusArr: tempData });
    };
    renderItem = ({ item,index }) => {
        return (
            <View style={{ width: '100%', backgroundColor:"#ebebeb",flexWrap: 'wrap', justifyContent: 'flex-start', flex: 1, flexDirection: 'column', }}>
                <View style={{ width: '100%', flexWrap: 'wrap', alignItems: 'flex-start', flex: 1, flexDirection: 'row' }}>
                    <Image
                        style={{width:150,height:100}}
                        source={{uri: item.DeviceImage}}
                    />
                    <View style={{flex:1,alignItems:'flex-end',alignItems:'flex-end'}}>
                        <Text style={{ fontSize: 14,flex:1,width:"100%", color: "black",textAlign:'right', padding: 5 }}> {item.DeviceName}</Text>
                        <Text style={{ fontSize: 14,flex:1,width:"100%", color: "black",textAlign:'right', padding: 5 }}>מספר אוגר : {item.RegisterIndex}</Text>
                        <Switch 
                            onValueChange={(value)=>this.toggleSwitch(value,index)}
                            value={item.switch}
                        />
                    </View>
                </View>
            </View>
        )
    }
    _pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
        });
        // console.log(result)

        if (!result.cancelled) {
            this.setState({
                 image: result.uri,
                 imageChange:true
            });
        }
    };
    renderSeparator = ()=>{
        return (
            <View style={{marginBottom:5}}>
    
            </View>
        )
    }
    AddNewHouseMode(){  
        const reqArr=[]
        const SqlArr=[]
        this.state.SwitchStatusArr.map((val,key)=>{
            if(val.switch==true){
                SqlArr.push(val.RegisterIndex);
            }
            reqArr.push({
                RegIndx:val.RegisterIndex,
                switch:val.switch
            })
        })
        if(this.state.HouseModeName!="" && this.state.imageChange!=false && SqlArr.length>0){
            DBHandler=SmartHouseDB.getInstance()
            DBHandler.InsertHouseMode(this.state.HouseModeName,this.state.image,JSON.stringify(SqlArr)).then(()=>{
                this.props.navigation.goBack()
            })
            this.SendModeCommand('192.168.3.120',reqArr)
        }else{
            Alert.alert(
                " יש נתונים חסרים",
                "",
                [
                  {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                  }
                ],
                { cancelable: false }
              );
        }

    }
    render(){
        return(
            <View style={{flex:1}}>
                <View>
                    <Text style={EditeModeStyle.Header}>Edit House Modes </Text>
                </View>
                <View style={{flex:1,flexDirection:'column',marginBottom:15,marginTop:15}}>
                        <View style={{flex:5,width:"100%"}}>
                            <Image source={{ uri: this.state.image }} style={{  height: "100%" }} />
                        </View>
                        <View style={{flex:1 ,flexDirection:'row'}}>
                            <Button
                                    title="בחר תמונה"
                                    onPress={this._pickImage}
                            />
                            <TextInput
                                style={{ flex:1,  backgroundColor: 'azure', padding: 2.5, textAlign: 'center', fontSize: 14 }}
                                placeholder={this.state.placeholder}
                                onChangeText={(HouseModeName) => this.setState({ HouseModeName })}
                            />
                        </View>
                </View>
                <FlatList
                    style={{flex:2,alignContent: "center" }}
                    data={Object.values(this.state.SwitchStatusArr)}
                    renderItem={this.renderItem}
                    keyExtractor={(item, index) => String(item.id)}
                    ItemSeparatorComponent={this.renderSeparator}
                />
                 <View style={{ position: 'absolute', top: "80%", right: "75%" }}>
                 <TouchableHighlight onPress={this.AddNewHouseMode}>
                    <Icon
                        reverse
                        name='plus'
                        type='font-awesome'
                        color='#FFD700'
                    />
                </TouchableHighlight>
                        
                </View>
            </View>
        )
    }
}


const EditeModeStyle = StyleSheet.create({
    Header: {
        paddingTop: 10,
        paddingLeft: 5,
        paddingBottom: 10,
        color: "white",
        backgroundColor: "#2196f3",
        fontSize: 20,

    }
})