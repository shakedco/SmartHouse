import React from 'react';
import {RoomCard} from '../RoomCard/RoomCard' 
import { View,Text ,StyleSheet} from 'react-native';

export class HomeSection extends React.Component {
  render() {
    return (
    <View style={styles.HomeLocation}>
        <View style={styles.Title}>
            <Text style={styles.TitleText}>First Floor</Text>
            <View style={styles.RoomBox}>
                <RoomCard/>
                <RoomCard/>
                
            </View>
        </View>
    </View>
    );
  }
}


const styles = StyleSheet.create({
    HomeLocation:{
        backgroundColor:"#000",
        flexDirection: 'column',
        flex:1,
    },
    Title:{
        width: "100%", padding:5, backgroundColor: '#ebebeb'
    },
    TitleText:{
        color:'gray',
        fontSize:20,
    },
    RoomBox:{
        flexDirection:'row'
    }
})