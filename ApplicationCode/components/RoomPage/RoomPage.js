import React,{
    Component,
    StyleSheet,
    Text,
    View
}from 'react-native'

class RoomPage extends React.Component {
    render(){
        return(
            <View styles={styles.container}>
                Hellow World the RoomPage
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{

    }
})
module.exports = RoomPage