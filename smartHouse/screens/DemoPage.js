/*This is an example of React Native Get Current Date Time*/
import React, { Component } from 'react';
import { StyleSheet, View, Alert, Text } from 'react-native';
import {MyDate} from '../Plugins/MyDate'
export default class App extends Component {
  constructor(props) {
    super(props);
    a = new MyDate();
    console.log(a.GetTimeStamp())
    this.state = {
      //defauilt value of the date time
      date: a.GetTimeStamp(),
    };
  }
  componentDidMount() {
   
  }
  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontSize: 20,
          }}>
          Current Date Time
        </Text>
        <Text
          style={{
            fontSize: 20,
            marginTop: 16,
          }}>
          {this.state.date}
        </Text>
      </View>
    );
  }
}