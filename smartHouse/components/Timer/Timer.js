import React, { Component } from 'react';
 
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { MyDate } from '../../Plugins/MyDate';
import { SmartHouseDB } from '../../DataBase/SmartHouseDB';
 
export  class Timer extends React.Component {
 
  constructor(props) {
    super(props);
    this.state = {
      timeStamp:this.props.timestamp,
      deviceRegId:this.props.DeviceReg,
      timer: null,
      hours_Counter: '00',
      minutes_Counter: '00',
      seconds_Counter: '00',
      startDisable: false
    }
  }
  componentDidMount(){
    const timeStamp=this.props.timestamp;
    if(timeStamp!=""){
      const HandlerDate=new MyDate
      const currentTimeStamp=HandlerDate.GetTimeStamp();
      timeStamp!=""?timeArr=timeStamp.split(":"):timeArr=""
      currentTimeStamp!=""?CurrentDateArr=currentTimeStamp.split(":"):CurrentDateArr=""
      const TSSeconds=HandlerDate.ConvertTimeToSeconds(timeArr[1]);
      const CurrentSecond=HandlerDate.ConvertTimeToSeconds(CurrentDateArr[1]);
      const DifDays=CurrentDateArr[1]-timeArr[1]
      const Fsecond=CurrentSecond-TSSeconds
      const CTimer=HandlerDate.ConvertSecondToHHMMSS(Fsecond);
      this.setState({
        timer: null,
        minutes_Counter: ''+CTimer.substring(2,4),
        seconds_Counter: ''+CTimer.substring(4,6),
        startDisable: false
      })
      this.onButtonStart();
    }
  }
  
  componentWillUnmount() {
    clearInterval(this.state.timer);
  }

  ToggleTimer=()=>{
    if(this.state.startDisable==false){
        this.onButtonClear()
        this.onButtonStart();
    }else{
        this.onButtonStop()
    }
  }

  onButtonStart = () => {
    let timer = setInterval(() => {
 
      var num = (Number(this.state.seconds_Counter) + 1).toString(),
      count = this.state.minutes_Counter;
      if (Number(this.state.seconds_Counter) == 59) {
        count = (Number(this.state.minutes_Counter) + 1).toString();
        num = '00';
      }
      Hcount = this.state.hours_Counter
      if (Number(this.state.minutes_Counter) == 59) {
        Hcount = (Number(this.state.hours_Counter) + 1).toString();
        MinNum = '00';
      }
 
      this.setState({
        hours_Counter: count.length == 1 ? '0' + Hcount : Hcount,
        minutes_Counter: count.length == 1 ? '0' + count : count,
        seconds_Counter: num.length == 1 ? '0' + num : num
      });
    }, 1000);
    this.setState({ timer });
 
    this.setState({startDisable : true})
  }
 
 
  SaveDeviceLogInfo(){
    const TimeStamp=this.props.timestamp
    const DBHandler=SmartHouseDB.getInstance()
    const HHMMSS=this.state.hours_Counter+':'+this.state.minutes_Counter+':'+this.state.seconds_Counter
    DBHandler.SaveDeviceLogInfo(this.state.deviceRegId,TimeStamp,HHMMSS);
    DBHandler.getDeviceLogInfo().then((resul)=>{
      console.log(resul)
    })
  }
  onButtonStop = () => {
    this.SaveDeviceLogInfo();
    clearInterval(this.state.timer);
    this.setState({startDisable : false})
  }
  onButtonClear = () => {
    this.setState({
      timer: null,
      minutes_Counter: '00',
      seconds_Counter: '00',
      hours_Counter: '00',
    });
  }
  render() {
    
    return (
      <View style={styles.MainContainer}>
        <Text style={styles.counterText}>{this.state.hours_Counter} : {this.state.minutes_Counter} : {this.state.seconds_Counter}</Text>
      </View>
    );
  }
}
 
 
 
const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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