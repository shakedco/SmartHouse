import React from 'react';
import { StyleSheet, Image, Text, View, FlatList ,ActivityIndicator } from 'react-native';
import { RoomCard } from '../RoomCard/RoomCard';

export default class FlatListHomeSection extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            dataSource: [],
            isLoading:true,
        }
    }
    renderItem = ({ item }) => {
        return (
            <View style={{width:'100%',flexWrap: 'wrap',justifyContent:'flex-start',flex:1,flexDirection:'column',}}>
                <View style={{backgroundColor:"#0288d1"}}>
                    <Text  style={{fontSize: 20,color:"white",padding:5}}>{item.sectionHomeName}</Text>
                </View>
                <View style={{width:'100%',flexWrap: 'wrap',alignItems: 'flex-start', flex:1,flexDirection:'row'}}>
                    {item.Rooms.map((prop,index)=>{
                        return(
                            <RoomCard navigate={this.props} key={index} data={prop} />
                        )
                    })}
                </View>
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
        
        /*const url = "http://www.json-generator.com/api/json/get/ccLAsEcOSq?indent=1"
        fetch(url)
            .then((Response) => Response.json())
            .then((responseJson) => {
                this.setState({
                    dataSource: responseJson.book_array,
                    isLoading:false
                })
                console.log(responseJson)
            })
            .catch((error) => {
                console.log(error)
            })*/
          
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
                               status:true,
                            },
                            {
                                id:2,
                                DeviceName:"Air Conditioner",
                                status:false,
                            },
                            {
                                id:3,
                                DeviceName:"Tv",
                                status:false,
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
                            status:false,
                        },
                        {
                            id:2,
                            DeviceName:"Radio",
                            status:false,
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
                                status:false,
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
                                status:false,
                            }
                        ]
                    }
                ]
            },{
                sectionHomeName:"קומה שניה",
                NumberOfRooms:3,
                Rooms:[
                    {
                        id:5,
                        RoomName:"חדר שינה להורים",
                        RoomImage:"https://media-cdn.tripadvisor.com/media/photo-s/08/cf/c5/db/ist-room-the-parents.jpg",
                        NumberOfDevices:2,
                        ActiveDevices:1,
                        DisableDevices:1,
                        Buttons:[
                            {
                                id:1,
                                DeviceName:"Room Light",
                                status:false,
                            }
                       ]
                    },
                    {
                        id:6,
                        RoomName:"חדר שינה לבנים",
                        RoomImage:"https://freshome.com/wp-content/uploads/2016/09/kids-rooms-neutral4.png",
                        NumberOfDevices:2,
                        ActiveDevices:1,
                        DisableDevices:1,
                        Buttons:[
                            {
                                id:1,
                                DeviceName:"Room Light",
                                status:false,
                            }
                       ]
                 },
                 {
                     id:7,
                     RoomName:"חדר שינה לבנות",
                     RoomImage:"http://yybo.info/image/female-bedroom-ideas/female-bedroom-idea-88-gorgeous-decoration-image-design-color-toddler.jpg",
                     NumberOfDevices:2,
                     ActiveDevices:1,
                     DisableDevices:1,
                     Buttons:[
                        {
                            id:1,
                            DeviceName:"Room Light",
                            status:false,
                        }
                   ]
                 },
                 {
                     id:8,
                     RoomName:"מקלחת ושירותים",
                     RoomImage:"https://images.victoriaplum.com/pages/3382e425-d885-4103-94ba-2a532e5906c0.jpg?w=292&h=248&fit=crop&auto=format,compress&q=55",
                     NumberOfDevices:2,
                     ActiveDevices:1,
                     DisableDevices:1,
                     Buttons:[
                        {
                            id:1,
                            DeviceName:"Room Light",
                            status:false,
                        }
                   ]
                 }
                ]
             },{
                sectionHomeName:"גינה",
                NumberOfRooms:3,
                Rooms:[
                    {
                        id:9,
                        RoomName:"חצר",
                        RoomImage:"https://www.efratmeiri.co.il/wp-content/uploads/2015/08/AKP_9089_f_web.jpg",
                        NumberOfDevices:2,
                        ActiveDevices:1,
                        DisableDevices:1,
                        Buttons:[
                            {
                                id:1,
                                DeviceName:"Garden Light",
                                status:false,
                            }
                       ]
                    }
                ]
             }]
            this.setState({
                dataSource:data,
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
            <View style={{flex:1 ,alignContent:"center"}}>
                <FlatList
                    style={{flex:1,alignContent:"center"}}
                    data={this.state.dataSource}
                    renderItem={this.renderItem}
                    keyExtractor={(item, index ) => item.sectionHomeName}
                    ItemSeparatorComponent = {this.renderSeparator}
                />
            </View>
        )
    }
}