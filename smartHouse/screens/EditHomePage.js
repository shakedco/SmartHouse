import React from 'react';
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation'; // Version can be specified in package.json
import { View, Text, StyleSheet, Navigator, Image, Alert, Button, TouchableHighlight, Dimensions, TextInput, FileInput } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import FlatListRoomDevices from '../components/FlatList/FlatListRoomDevices';
import { Ionicons } from '@expo/vector-icons';
import Carousel from 'react-native-snap-carousel';
import ImagePickerPluggin from '../Plugins/ImagePickerPluggin'
import { SmartHouseDB } from '../DataBase/SmartHouseDB'
import { Icon } from 'react-native-elements'
import { Arduino } from '../arduino/Arduino';

export default class EditHomePage extends React.Component {
    constructor(props) {
        super(props)
        this.state = { text: 'Useless Placeholder' };
        this.state.product = {}
        this.DataBaseInstance = SmartHouseDB.getInstance()
        this.componentDidMount = this.componentDidMount.bind(this)
        this._renderItem=this._renderItem.bind(this)
        this.NextToEditeRoomsPage=this.NextToEditeRoomsPage.bind(this)
        console.log(Arduino.getInstance())
    }
    onDoublePress = (sectionId) => {
        const time = new Date().getTime();
        const delta = time - this.lastPress;
        const DOUBLE_PRESS_DELAY = 400;
        if (delta < DOUBLE_PRESS_DELAY) {
            PromiseFuc=this.DataBaseInstance.RemoveSection(sectionId)
            PromiseFuc.then((responseText) => {
                this.UpdateProducts()
            });
            
        }
        this.lastPress = time;
    };
    _renderItem({ item, index }) {
        
        return (    
            <TouchableHighlight  onPress={()=>this.onDoublePress(item.id)}>
                <View style={SectionCard.SectionCardBox}>
                    <Image source={{ uri: item.ImageSrc }} style={{ flex: 1, width: "100%" }} />
                    <Text style={{ color: "#fff", fontSize: 25, textAlign: 'center' }}>{item.SectionsName}</Text>
                </View>
            </TouchableHighlight>
        );
    }
    DeleteSection() {
        this.DataBaseInstance.RemoveSection()
    }
    UpdateProducts() {
        data = this.DataBaseInstance.GetAllHomeSections()
        data.then((responseText) => {
            var response = responseText;
            this.setState({
                product: response["_array"]
            })
        });
    }
    NextToEditeRoomsPage(){
        this.props.navigation.navigate("EditRooms")
    }
    componentDidMount() {
        this.UpdateProducts()
    }
    render() {
        return (
            <View style={{ backgroundColor: "yellow", flex: 1 }}>
                <View>
                    <Text style={EditeHomeStyle.Header}>ברוך הבא ! נא לבנות את הבית שלך (קומות ואזורים) </Text>
                </View>
                <ImagePickerPluggin Handler={this} />
                <View style={{ height: "50%", backgroundColor: "#2196f3" }}>
                    <Carousel
                        ref={(c) => { this._carousel = c; }}
                        data={Object.values(this.state.product)}
                        renderItem={this._renderItem}
                        sliderWidth={(Dimensions.get('window').width) * 1}
                        itemWidth={(Dimensions.get('window').width) * 0.8}
                    />
                </View>
                <TouchableHighlight  style={EditeHomeStyle.NextPage} onPress={this.NextToEditeRoomsPage}>
                <Icon 
                    reverse
                    name='arrow-right'
                    type='font-awesome'
                    color='#FFD700'
                />
                </TouchableHighlight>
            </View>
        )
    }
}

const EditeHomeStyle = StyleSheet.create({
    Header: {
        paddingTop: 10,
        paddingLeft: 5,
        paddingRight: 5,
        paddingBottom: 10,
        color: "white",
        backgroundColor: "#2196f3",
        fontSize: 16,

    },
    NextPage:{
        position:'absolute',
        right:"5%",
        bottom:"5%"
    }
})
const SectionCard = StyleSheet.create({
    SectionCardBox: {
        backgroundColor: "#000",
        width: "100%",
        height: "80%",
        padding: 15,
        marginTop: "10%"
    }
})