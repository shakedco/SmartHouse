import React from 'react';
import { TouchableHighlight,StyleSheet, Text, View, TouchableOpacity, Alert,Button ,Image,TextInput} from 'react-native';
import { DocumentPicker, ImagePicker } from 'expo';
import {SmartHouseDB}from'../DataBase/SmartHouseDB'
import { Icon } from 'react-native-elements'
export default class ImagePickerPluggin extends React.Component {
    constructor(props){
        super(props)
        this.AddSection=this.AddSection.bind(this)
        this.state = {
            ImageSelected:false,
            image: "https://hytheferry.co.uk/wp-content/themes/Hytheferry/assets/images/placeholder2.jpg",
            SectionName:"נא לציין פינה"
        };
        this.DataBaseInstance = SmartHouseDB.getInstance()
        // console.log(this.props.Handler.componentDidMount)
        this.AddSection=this.AddSection.bind(this)
    }
    
  _pickDocument = async () => {
	  let result = await DocumentPicker.getDocumentAsync({});
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
        ImageSelected:true 
      });
    }
  };
  AddSection(){
    if (this.state.ImageSelected==false||this.state.SectionName=="נא לציין פינה"){
      Alert.alert(
        "יש חוסר באחד הנתונים שצריך להזין",
        "לבדוק שדות ולנסות שוב",
        [
          {
            text: "אישור",
            style: "cancel"
          }
        ],
        { cancelable: false }
      );
    }else{
        this.DataBaseInstance.AddNewHomeSection(this.state.SectionName,this.state.image)
        this.props.Handler.componentDidMount()
        this.setState ({
          ImageSelected:false,
          image: "https://hytheferry.co.uk/wp-content/themes/Hytheferry/assets/images/placeholder2.jpg",
          SectionName:"נא לציין פינה"
        });
    }
  }
  render() {
         let { image } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.SectionStage}>
            <TouchableHighlight  style={styles.AddButton} onPress={this.AddSection}>
                <Icon 
                    reverse
                    name='ios-add'
                    type='ionicon'
                    color='#45a163'
                />
            </TouchableHighlight>
            <View style={styles.CardSection}>
                <View style={styles.BackGroundBox}></View>
                {image && 
                <Image source={{ uri: image }} style={{flex:1,width:"85%"}} />}
                <Text style={{textAlign:'center', paddingTop:20,paddingBottom:20,fontSize:20,color:"white" }}>{this.state.SectionName}</Text> 
            </View>
        </View>
        <View style={styles.ImageInput}>
            <Button
                style={{flex:1,width:"20%",height:"100%",backgroundColor:"#000"}}
                title="בחר תמונה"
                color="#000"
                onPress={this._pickImage}
            />
            <TextInput  
                style={{flex:1,height: 40,backgroundColor: 'azure',padding:5, textAlign:'center', fontSize: 14}}  
                placeholder="פינה בבית"  
                onChangeText={(SectionName) => this.setState({SectionName})}  
            /> 
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color:"#000",
    justifyContent: 'space-between',
    flexDirection:'column',
    backgroundColor: '#000',
    alignItems: 'center',
    paddingTop:5,
    paddingBottom:5,
    justifyContent: 'center',
  },
  ImageInput:{
      flexDirection:'row',
  },
  SectionStage:{
      color:"#000",
      backgroundColor: '#fff',
      flex:1,
      padding:10,
      width:"100%",
      height:"100%",
      alignItems: 'center',
  },
  CardSection:{
      paddingTop:10,
      width:"80%",
      height:"100%",
      alignItems:'center',
  },
  BackGroundBox:{
      backgroundColor:"#000",
      position:'absolute',
      width:"100%",
      opacity: 0.5,
      height:"100%",
  },
  AddButton:{
      zIndex:9,
      bottom:"5%",
      right:"5%",
      position:'absolute'
  }
});