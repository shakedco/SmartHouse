import React from 'react';
import { StyleSheet, Image, Text, View, FlatList ,ActivityIndicator } from 'react-native';
import { RoomCard } from '../RoomCard/RoomCard';
import  {PowerSwitch}  from '../RoomCard/PowerSwitch/PowerSwitch';
export default class FlatListRoomDevices extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            dataSource: [],
            isLoading:true,
        }
    }
    renderItem = ({ item }) => {
        console.log(Object(item))
        return (
            <View style={{width:'100%', flex:1,flexDirection:'column'}}>
              <PowerSwitch status={Object(item).status} DeviceName={Object(item).DeviceName} id={Object(item).id}/>
            </View>
        )
    }
    
    renderSeparator = ()=>{
        return (
            <View>

            </View>
        )
    }

    componentDidMount() {
        this.setState({
            dataSource:this.props.Data.Buttons,
            isLoading:false
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
                    data={this.state.dataSource}
                    renderItem={this.renderItem}
                    keyExtractor={(item, index) => Object(item).DeviceName}
                    ItemSeparatorComponent = {this.renderSeparator}
                />
            </View>
        )
    }
}