import React from 'react';
import { AppLoading,SQLite, Asset, Font, Icon } from 'expo';
import { SmartHouseDB } from '../DataBase/SmartHouseDB';
export class Arduino extends React.Component {
    static myInstance = null;  
    URL 
    constructor(props){
        super(props)
        this.URL=null;
    }

    static getInstance() {
        if (Arduino.myInstance == null) {
            Arduino.myInstance = new Arduino();
        }
        return this.myInstance;
    }


    SetArduioUrl(URL){
        this.URL=URL;
        SmartHouseDB.getInstance().SaveLastArduinoIp(URL)
    }
    GetArduinoUrl(){
        return this.URL;
    }
}