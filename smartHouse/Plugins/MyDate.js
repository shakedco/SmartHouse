/*This is an example of React Native Get Current Date Time*/
import React, { Component } from 'react';
import { StyleSheet, View, Alert, Text } from 'react-native';
export  class MyDate extends Component {
  constructor(props) {
    super(props);
    this.GetTimeStamp=this.GetTimeStamp.bind(this);
    
  }
  ConvertSecondToHHMMSS(SecondsPrm){
    hours=parseInt(SecondsPrm/3600)
    hours<10?hours=String(0)+String(hours):hours=hours;
    SecondsPrm=SecondsPrm%3600
    minutes=parseInt(SecondsPrm/60)
    minutes<10?minutes=String(0)+String(minutes):minutes=minutes;
    SecondsPrm=SecondsPrm%60
    Seconds=parseInt(SecondsPrm)
    Seconds<10?Seconds=String(0)+String(Seconds):Seconds=Seconds;
    return hours+""+minutes+""+Seconds 
  }
  ConvertTimeToSeconds(HHMMSS){
    /**
     * this function recevice time with format HHMMSS
     * and convert it to secondes 
     */
    if(HHMMSS==undefined)
      return;
    hours=HHMMSS.substring(0, 2)
    hours<10?hours=String(0)+String(hours):hours=hours;
    minutes=HHMMSS.substring(2, 4)
    minutes<10?minutes=String(0)+String(minutes):minutes=minutes;
    seconds=HHMMSS.substring(4, 6)
    seconds<10?seconds=String(0)+String(seconds):seconds=seconds;
    return (hours*3600)+(minutes*60)+parseInt(seconds)

  }
  GetTimeStamp() {
    var that = this;
    var date = new Date().getDate(); //Current Date
    date<10?date=String(0)+String(date):date=date;
    var month = new Date().getMonth() + 1; //Current Month
    month<10?month=String(0)+String(month):month=month;
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    hours<10?hours=String(0)+String(hours):hours=hours;
    var min = new Date().getMinutes(); //Current Minutes
    min<10?min=String(0)+String(min):min=min;
    var sec = new Date().getSeconds(); //Current Seconds
    sec<10?sec=String(0)+String(sec):sec=sec;
    
    return  year + '' + month + '' + date + ':' + hours + '' + min + '' + sec;
  }
  render() {
    return (
      <View></View>
    );
  }
}