import React from 'react';
import { StyleSheet, Image, Button, Text, View, FlatList, ActivityIndicator } from 'react-native';
import { RoomCard } from '../RoomCard/RoomCard';
import { Ionicons } from '@expo/vector-icons';
import { SmartHouseDB } from '../../DataBase/SmartHouseDB'

export default class FlatListHomeSection extends React.Component {
    constructor(props) {
        super(props)
        this.NavigateToEditHome = this.NavigateToEditHome.bind(this);
        this.state = {
            dataSource: [],
            isLoading: true,
            HomeSections:{}
        }
        this.componentDidMount = this.componentDidMount.bind(this)
        this.DataBaseInstance = SmartHouseDB.getInstance()
        this.abed=this.abed.bind(this)
        this.abed()
        //this.AllHomeSection()
    }
    NavigateToEditHome(){
        this.props.this.navigation.navigate("EditPage")
    }
    abed(){
        HomeSectionsArr={}
        this.DataBaseInstance.abedid().then((result)=>{
            const DataArr=result._array
            for(let row of DataArr){
                SectionId=row.HomeSectionId
                HomeSectionsArr[SectionId]={
                    SectionId:SectionId,
                    SectionHomeName:row.SectionsName,
                    SectionImage:row.imageSrc,
                    Rooms:[]
                }
            }
            for(let row of DataArr){
                HomeSectionsArr[row.HomeSectionId]['Rooms'].push(row)
            }
           this.setState({
                HomeSections:HomeSectionsArr,
                isLoading:false
           }) 
        });

    }
  

    renderItem = ({ item }) => {
        return (
            <View style={{ width: '100%', flexWrap: 'wrap', justifyContent: 'flex-start', flex: 1, flexDirection: 'column', }}>
                <View style={{ backgroundColor: "#0288d1" }}>
                    <Text style={{ fontSize: 20, color: "white", padding: 5 }}>{item.SectionHomeName}</Text>
                </View>
                <View style={{ width: '100%', flexWrap: 'wrap', alignItems: 'flex-start', flex: 1, flexDirection: 'row' }}>
                    {item.Rooms.map((prop, index) => {
                        return (
                            <RoomCard navigate={this.props} key={index} data={prop} />
                        )
                    })}
                </View>
            </View>
        )
    }

    renderSeparator = () => {
        return (
            <View>

            </View>
        )
    }

    componentDidMount() {
    }

    render() {
        return (
            this.state.isLoading
                ?
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color="#330066" animating />
                </View>
                :
                <View style={{ flex: 1, alignContent: "center" }}>
                    <FlatList
                        style={{ flex: 1, alignContent: "center" }}
                        data={Object.values(this.state.HomeSections)}
                        renderItem={this.renderItem}
                        keyExtractor={(item, index) => String(item.SectionId)}
                        ItemSeparatorComponent={this.renderSeparator}
                    />
                    <View style={{ position: 'absolute', top: "90%", left: "70%" }}>
                        <Button
                            onPress={this.NavigateToEditHome}
                            navigate={this.props}
                            icon={{
                                name: "arrow-right",
                                size: 15,
                                color: "white"
                            }}
                            title="Edite Page"
                        />
                    </View>
                </View>
        )
    }
}