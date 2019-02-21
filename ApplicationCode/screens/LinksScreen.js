import React from 'react';
import { ScrollView, StyleSheet,View,Button } from 'react-native';
import { ExpoLinksView } from '@expo/samples';

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: 'מצבים שמורים',
  };

  BuildRequestUrl(id){
    var data=[{
      sectionHomeName:"קומה ראשונה",
      NumberOfRooms:3,
      Rooms:[
          {
              id:1,
              RoomName:"חידר שינה",
              RoomImage:"https://s-ec.bstatic.com/images/hotel/max1024x768/731/73118462.jpg",
              ActiveDevices:1,
              NumberOfDevices:2,
              DisableDevices:1,
              Buttons:[
                  {
                      id:1,
                      DeviceName:"floorlight Light",
                      status:1,
                   },
                   {
                       id:2,
                       DeviceName:"Air Conditioner",
                       status:0,
                   },
                   {
                       id:3,
                       DeviceName:"Tv",
                       status:0,
                   }
               ],
           },
          {
           id:2,
           RoomName:"לובי",
           RoomImage:"https://olathe.k-state.edu/images/events/lobby-2.jpg",
           NumberOfDevices:2,
           ActiveDevices:1,
           DisableDevices:1,
           Buttons:[
               {
                   id:1,
                   DeviceName:"Room Light",
                   status:1,
               },
               {
                   id:2,
                   DeviceName:"Radio",
                   status:0,
               }
               
          ]
           },
           {
               id:3,
               RoomName:"מטבח",
               RoomImage:"https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/small-kitchen-design-02-1502894654.jpg",
               NumberOfDevices:2,
               ActiveDevices:1,
               DisableDevices:1,
               Buttons:[
                   {
                       id:1,
                       DeviceName:"Room Light",
                       status:1,
                   }
           ]
           },
           {
               id:4,
               RoomName:"מקלחת",
               RoomImage:"https://soak.com/on/demandware.static/-/Library-Sites-soak-content-global/default/dw7fc502c5/images/clp/suites_shower_bath_clp_280917.jpg",
               NumberOfDevices:2,
               ActiveDevices:1,
               DisableDevices:1,
               Buttons:[
                   {
                       id:1,
                       DeviceName:"Room Light",
                       status:1,
                   }
               ]
           }
       ]
   }]
 
    var url = 'http://192.168.137.130/body';

   fetch(url, {
    method: 'POST',
    headers: new Headers({
               'Content-Type': 'application/x-www-form-urlencoded', // <-- Specifying the Content-Type
      }),
    body: JSON.stringify({ledId:id}) // <-- Post parameters
  })
  .then((response) => response.text())
  .then((responseText) => {
   
  })
  .catch((error) => {
      
  });
  }

  onPressLearnMore = (id)=>{
      fetch('http://192.168.137.64')
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson)
      })
      .catch((error) =>{
        console.error(error);
      });
  }
  render() {
    return (
      <View> 
        <Button
          onPress={()=>this.BuildRequestUrl(0)                              }
          title="Led 0"
          color="#841584"
         
        />
        <Button
          onPress={()=>this.BuildRequestUrl(1)}
          title="Led 1"
          color="#841584"
         
        />
        <Button
          onPress={()=>this.BuildRequestUrl(2)}
          title="Led 2"
          color="#841584"
         
        />
        <Button
          onPress={()=>this.BuildRequestUrl(3)}
          title="Led 3"
          color="#841584"
         
        />
        <Button
          onPress={()=>this.BuildRequestUrl(4)}
          title="Led 4"
          color="#841584"
         
        />
        <Button
          onPress={()=>this.BuildRequestUrl(5)}
          title="Led 5"
          color="#841584"
         
        />
        <Button
          onPress={()=>this.BuildRequestUrl(6)}
          title="Led 6"
          color="#841584"
         
        />
        <Button
          onPress={()=>this.BuildRequestUrl(7)}
          title="Led 7"
          color="#841584"
         
        />
        <Button
          onPress={()=>this.BuildRequestUrl(8)}
          title="Led 8"
          color="#841584"
         
        />
        <Button
          onPress={()=>this.BuildRequestUrl(9)}
          title="Led 9"
          color="#841584"
         
        />
        <Button
          onPress={()=>this.BuildRequestUrl(10)}
          title="Led 10"
          color="#841584"
         
        />
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
