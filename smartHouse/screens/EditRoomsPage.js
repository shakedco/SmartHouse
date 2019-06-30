import React from 'react';
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation'; // Version can be specified in package.json
import { View, Text, StyleSheet, Navigator, Image, Alert, Button, TouchableHighlight, Dimensions, TextInput, FileInput, FlatList } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import FlatListRoomDevices from '../components/FlatList/FlatListRoomDevices';
import { Ionicons } from '@expo/vector-icons';
import { DocumentPicker, ImagePicker } from 'expo';
import Carousel from 'react-native-snap-carousel';
import ImagePickerPluggin from '../Plugins/ImagePickerPluggin'
import { SmartHouseDB } from '../DataBase/SmartHouseDB'
import { Icon } from 'react-native-elements'

export default class EditRoomsPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = { text: 'Useless Placeholder' };
        this.state = {
            ImageSelected:false,
            image: "https://hytheferry.co.uk/wp-content/themes/Hytheferry/assets/images/placeholder2.jpg",
            RoomName: "שם חדר",
            placeholder: "תאר את החדר",
            RoomsList: []
        };
        this.state.Rooms = {}
        this.DataBaseInstance = SmartHouseDB.getInstance()
        this.componentDidMount = this.componentDidMount.bind(this)
        this.AddRoom = this.AddRoom.bind(this)
        this._renderItem = this._renderItem.bind(this);
        this.SelectElement = this.SelectElement.bind(this)
        this.RemoveRoom=this.RemoveRoom.bind(this)
        this.NextToEditeRoomPage=this.NextToEditeRoomPage.bind(this)
        this.BackToEditSectionPage=this.BackToEditSectionPage.bind(this)
    }
    SelectElement(sectionId) {
        this.setState({ SectionID: sectionId })
        this.ShowSectionRooms(sectionId)
    }
    _renderItem({ item, index }) {
        return (
            <TouchableHighlight key={item.key} onPress={() => this.SelectElement(item.id)}>
                <View style={RoomCard.SectionCardBox}>
                    <Image source={{ uri: item.ImageSrc }} style={{ flex: 1, width: "100%" }} />
                    <Text style={{ color: "#000", fontSize: 25, textAlign: 'center' }}>{item.SectionsName}</Text>
                </View>
            </TouchableHighlight>
        );
    }
    RemoveRoom(RoomId,SectionID){
        this.DataBaseInstance.RemoveRoomById(RoomId).then(()=>{
            this.DataBaseInstance.RemoveDeviceByRoomId(RoomId)
        })
        this.ShowSectionRooms(this.state.SectionID)
    }
    AddRoom() {
        if (this.state.ImageSelected==false || this.state.SectionID == null || this.state.RoomName == null) {
            Alert.alert('יש שדות חוב חסרים');
            return
        }
        this.DataBaseInstance.AddRoomToSection(this.state.SectionID, this.state.RoomName, this.state.image)
        this.ShowSectionRooms(this.state.SectionID)
    }
    RoomListRenderItem = ({ item, key }) => {
        return (
            <View style={RoomList.Item}>
                <Image 
                    style={{ width:70, height: "100%" }}
                    source={{ uri: item.imageSrc }} 
                />
                <Text style={{flex:1,padding:5}}>{item.name}</Text>
                <TouchableHighlight  onPress={()=>{this.RemoveRoom(item.RoomId)}}>
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
    BackToEditSectionPage(){
        this.props.navigation.navigate("EditPage")
    }
    NextToEditeRoomPage(){
        this.props.navigation.navigate("EditRoom")
    }
    componentDidMount() {
        data = this.DataBaseInstance.GetAllHomeSections()
        data.then((responseText) => {
            var response = responseText;
            this.setState({
                Rooms: response["_array"]
            })
        });
    }
    ShowSectionRooms(SectionId) {
        data = this.DataBaseInstance.GetRoomsBySectionId(SectionId)
        data.then((responseText) => {
            var response = responseText;
            this.setState({
                RoomsList: response["_array"]
            })
        });
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
                ImageSelected:true, 
            });
        }
    };
    render() {
        return (
            <View style={{ flex: 1 }}>
                <View>
                    <Text style={EditeRoomStyle.Header}>נא לחלק את הקומות לחדרים ואזורים</Text>
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
                        <TextInput
                            style={{ flex: 1, height: 40, backgroundColor: 'azure', padding: 5, textAlign: 'center', fontSize: 14 }}
                            placeholder={this.state.placeholder}
                            onChangeText={(RoomName) => this.setState({ RoomName })}
                        />
                        <View style={EditeRoomStyle.container}>
                            <View style={EditeRoomStyle.buttonContainer}>
                                <Button
                                    title="בחר תמונה"
                                    onPress={this._pickImage}
                                />
                            </View>
                            <View style={EditeRoomStyle.buttonContainer}>
                                <Button
                                    title="הוספת חדר"
                                    onPress={this.AddRoom}
                                />
                            </View>
                        </View>
                    </View>
                </View>
                <View style={EditeRoomStyle.RoomsContainer}>
                    <FlatList
                        style={RoomList.FlatList}
                        data={this.state.RoomsList}
                        renderItem={this.RoomListRenderItem}
                        keyExtractor={(item, index) => String(item.RoomId)}
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
                <TouchableHighlight style={EditeRoomStyle.NextPage} onPress={this.NextToEditeRoomPage}>
                    <Icon
                        reverse
                        name='arrow-right'
                        type='font-awesome'
                        color='#FFD700'
                    />
                </TouchableHighlight>
                <TouchableHighlight style={EditeRoomStyle.PreviousPage} onPress={this.BackToEditSectionPage}>
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