import React, { Component } from 'react';
 
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
 
export  class Timer extends React.Component {
 
  constructor(props) {
    super(props);
    this.state = {
      timer: null,
      minutes_Counter: '00',
      seconds_Counter: '00',
      startDisable: false
    }
    console.log(this.props)
  }

  componentWillUnmount() {
    clearInterval(this.state.timer);
  }

  ToggleTimer=()=>{
    if(this.state.startDisable==false){
        this.onButtonClear()
        this.onButtonStart();
    }else
        this.onButtonStop()
  }

  onButtonStart = () => {
    let timer = setInterval(() => {
 
      var num = (Number(this.state.seconds_Counter) + 1).toString(),
        count = this.state.minutes_Counter;
 
      if (Number(this.state.seconds_Counter) == 59) {
        count = (Number(this.state.minutes_Counter) + 1).toString();
        num = '00';
      }
 
      this.setState({
        minutes_Counter: count.length == 1 ? '0' + count : count,
        seconds_Counter: num.length == 1 ? '0' + num : num
      });
    }, 1000);
    this.setState({ timer });
 
    this.setState({startDisable : true})
  }
 
 
  onButtonStop = () => {
    clearInterval(this.state.timer);
    this.setState({startDisable : false})
  }
 
 
  onButtonClear = () => {
    this.setState({
      timer: null,
      minutes_Counter: '00',
      seconds_Counter: '00',
    });
  }
 
  render() {
    return (
      <View style={styles.MainContainer}>
        <Text style={styles.counterText}>{this.state.minutes_Counter} : {this.state.seconds_Counter}</Text>
      </View>
    );
  }
}
 
 
 
const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  button: {
    width: '80%',
    paddingTop:8,
    paddingBottom:8,
    borderRadius:7,
    marginTop: 10
  },
  buttonText:{
      color:'#000',
      textAlign:'center',
      fontSize: 9
  },
  counterText:{
    textAlign:"center",
    fontSize: 14,
    color: '#000'
  }
})