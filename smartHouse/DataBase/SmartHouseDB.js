import React from 'react';
import { AppLoading,SQLite, Asset, Font, Icon } from 'expo';
export class SmartHouseDB extends React.Component {
  static myInstance = null;  
  constructor(props){
        super(props)
        this.myInstance = SQLite.openDatabase('abed.db');
        this.createTable();
        // this.DisplayTables()
        // this.AddNewHomeSection("קומה ראשונה")
        // this.componentDidMount()
        //this.DisplayTableColumn('HomeSections')
        // console.log(this.myInstance)
        // console.log(this.GetAllRooms())
      }
      
      
    static getInstance() {
      if (SmartHouseDB.myInstance == null) {
        SmartHouseDB.myInstance = new SmartHouseDB();
      }
      return this.myInstance;
    }
   
    createTable(){
      //-------------------------------------------------------------
      //  * This function create the tables if not declared 
      //  * This must work in the first run of the application 
      // -------------------------------------------------------------
            this.myInstance.transaction(tx => {tx.executeSql('create table if not exists Arduino (id integer primary key not null, ArduinoIp text);')})
            this.myInstance.transaction(tx => {tx.executeSql('create table if not exists LogInfo (id integer primary key not null , RegisterIndex int , TimeStamp text , HHMMSS text,SecondsNum int);')})
            this.myInstance.transaction(tx => {tx.executeSql('create table if not exists HomeSections (id integer primary key not null, SectionsName text,ImageSrc text);')})
            this.myInstance.transaction(tx => {tx.executeSql('create table if not exists Modes (id integer primary key not null, ModeName text,ImageSrc text,ArrPin text);')})
            this.myInstance.transaction(tx => {tx.executeSql('create table if not exists Room (RoomId integer primary key not null, HomeSectionId int, name text,imageSrc text);')})
            this.myInstance.transaction(tx => {tx.executeSql('create table if not exists Devices (id integer primary key not null, RoomId int, DeviceName text,DeviceImage text,RegisterIndex integer);')})
            this.myInstance.transaction(tx => {tx.executeSql('create table if not exists Profile (id integer primary key not null, name int, member text);')})
    }
    RemoveSection(sectionId){
      const query = "DELETE FROM HomeSections WHERE id="+sectionId;
      return new Promise((resolve, reject) => this.myInstance.transaction((tx) => {
          tx.executeSql(query, [], (tx, results) => {
              this.totalItems = (results.rows);
              resolve(this.totalItems);
          }, function (tx, error) {
              reject(error);
          });
      }))
    }
    DisplayTableColumn(tablename){
      tableSqlStr=""
      this.myInstance.transaction(tx => {
        tx.executeSql("SELECT sql FROM sqlite_master WHERE  tbl_name=?;", [tablename], (_, { rows })=>{
            
          }
        );
        
      });
    }
    DeleteTables(){
      this.myInstance.transaction(tx => {
        this.myInstance.transaction(tx => {tx.executeSql("DROP TABLE HomeSections;")})
        this.myInstance.transaction(tx => {tx.executeSql("DROP TABLE Devices;")})
        this.myInstance.transaction(tx => {tx.executeSql("DROP TABLE Profile;")})
        this.myInstance.transaction(tx => {tx.executeSql("DROP TABLE items;")})
        this.myInstance.transaction(tx => {tx.executeSql("DROP TABLE LogInfo;")})
        this.myInstance.transaction(tx => {tx.executeSql("DROP TABLE Arduino;")})
        this.myInstance.transaction(tx => {tx.executeSql("DROP TABLE Modes;")})
      });
    }

    DisplayTables(){
      this.myInstance.transaction(tx => {
        tx.executeSql("SELECT name FROM sqlite_master;", [], (_, { rows }) =>
          console.log(JSON.stringify(rows))
        );
      });
    }
    GetDevicesByRoomId(RoomId){
      const  query = "SELECT * FROM Devices WHERE Devices.RoomId="+RoomId;
      return new Promise((resolve, reject) => this.myInstance.transaction((tx) => {
          tx.executeSql(query, [], (tx, results) => {
              this.totalItems = (results.rows);
              resolve(this.totalItems);
          }, function (tx, error) {
              reject(error);
          });
      }))
    }
    GetAllBussyDevice(){
      const  query = "SELECT RegisterIndex FROM Devices";
      return new Promise((resolve, reject) => this.myInstance.transaction((tx) => {
          tx.executeSql(query, [], (tx, results) => {
              this.totalItems = (results.rows);
              resolve(this.totalItems);
          }, function (tx, error) {
              reject(error);
          });
      }))
    }
    GetAllDevices(){
      const query = "SELECT * FROM Devices";
      return new Promise((resolve, reject) => this.myInstance.transaction((tx) => {
          tx.executeSql(query, [], (tx, results) => {
              this.totalItems = (results.rows);
              resolve(this.totalItems);
          }, function (tx, error) {
              reject(error);
          });
      }))
    }
    AddDeviceToRoom(RoomId,DeviceName,DeviceImage,RegisterIndex){
      this.myInstance.transaction(tx => { 
          tx.executeSql('insert into Devices(RoomId,DeviceName,DeviceImage,RegisterIndex)values(?,?,?,?)', [RoomId,DeviceName,DeviceImage,RegisterIndex]);
        },
        null,
      );
    }
    RemoveRoomById(RoomId){
      const query = "DELETE FROM Room WHERE RoomId="+RoomId;
      return new Promise((resolve, reject) => this.myInstance.transaction((tx) => {
          tx.executeSql(query, [], (tx, results) => {
              this.totalItems = (results.rows);
              resolve(this.totalItems);
          }, function (tx, error) {
              reject(error);
          });
      }))
    }
    RemoveDeviceByRoomId(RoomId){
      const query = "DELETE FROM Devices WHERE RoomId="+RoomId;
      return new Promise((resolve, reject) => this.myInstance.transaction((tx) => {
          tx.executeSql(query, [], (tx, results) => {
              this.totalItems = (results.rows);
              resolve(this.totalItems);
          }, function (tx, error) {
              reject(error);
          });
      }))
    }
    RemoveDeviceById(DeviceId){
      const query = "DELETE FROM Devices WHERE id="+DeviceId;
      return new Promise((resolve, reject) => this.myInstance.transaction((tx) => {
          tx.executeSql(query, [], (tx, results) => {
              this.totalItems = (results.rows);
              resolve(this.totalItems);
          }, function (tx, error) {
              reject(error);
          });
      }))
    }
    GetAllHomeRooms(){
      const  query = "SELECT * FROM Room";
      return new Promise((resolve, reject) => this.myInstance.transaction((tx) => {
          tx.executeSql(query, [], (tx, results) => {
              this.totalItems = (results.rows);
              resolve(this.totalItems);
          }, function (tx, error) {
              reject(error);
          });
      }))
    }
    
    GetAllHomeSections(){
      const query = "SELECT * FROM HomeSections";
      return new Promise((resolve, reject) => this.myInstance.transaction((tx) => {
          tx.executeSql(query, [], (tx, results) => {
              this.totalItems = (results.rows);
              resolve(this.totalItems);
          }, function (tx, error) {
              reject(error);
          });
      }))
    }
    GetAllRooms(){
      const RoomQuery = "SELECT * FROM Room";
      return new Promise((resolve, reject) => this.myInstance.transaction((tx) => {
          tx.executeSql(RoomQuery, [], (tx, results) => {
              this.totalItems = (results.rows);
              //console.log(this.totalItems)
              resolve(this.totalItems);
          }, function (tx, error) {
              reject(error);
          });
      }))
    }
    AddNewHomeSection(sectionName,imagePath){
        this.myInstance.transaction(tx => { 
          tx.executeSql('insert into  HomeSections(SectionsName,ImageSrc)values(?,?)', [sectionName,imagePath]);
        },
        null,
      );
    }
    AddRoomToSection(sectionId,RoomName,RoomImage){
      this.myInstance.transaction(tx => { 
        tx.executeSql('insert into Room(HomeSectionId,name,imageSrc)values(?,?,?)',[sectionId,RoomName,RoomImage]);
      },
      null,
      );
    }
    DeleteRoomById(RoomId){
      const query = "DELETE FROM Room WHERE Room.RoomId="+RoomId;
      return new Promise((resolve, reject) => this.myInstance.transaction((tx) => {
          tx.executeSql(query, [], (tx, results) => {
              this.totalItems = (results.rows);
              resolve(this.totalItems);
          }, function (tx, error) {
              reject(error);
          });
      }))
    }
    GetRoomsBySectionId(SectionID){
      const RoomsQuery = "SELECT * FROM Room WHERE HomeSectionId="+SectionID;
      return new Promise((resolve, reject) => this.myInstance.transaction((tx) => {
          tx.executeSql(RoomsQuery, [], (tx, results) => {
              const totalItems = (results.rows);
              resolve(totalItems);
          }, function (tx, error) {
              reject(error);
          });
      }))
    }
    getProfileHeightStandardfromDB() {
      return this.myInstance.transaction(
          tx => {
              tx.executeSql('SELECT * FROM Room', [], (_, {
                  rows
              }) => {
                  profileheight = parseFloat(rows._array);
                  const profileobject = {
                      profileheight
                  };
                  return profileobject;
              });
          },
          null
      );
  }


  GetLastIp(){
    const RoomQuery = "SELECT * FROM Arduino ORDER BY id DESC;";
    return new Promise((resolve, reject) => this.myInstance.transaction((tx) => {
      tx.executeSql(RoomQuery, [], (tx, results) => {
          this.totalItems = (results.rows);
          resolve(this.totalItems._array);
      }, function (tx, error) {
          reject(error);
      });
  }))
  }
  SaveLastArduinoIp(ArduinoIp){
    this.myInstance.transaction(tx => { 
      tx.executeSql('insert into Arduino(ArduinoIp)values(?)',[ArduinoIp]);
    },
    null,
    );
  }

  GetDeviceByRoomId(RoomId){
    const RoomQuery = "SELECT * FROM Devices WHERE Devices.RoomId="+RoomId+" ORDER BY RegisterIndex ASC";
    return new Promise((resolve, reject) => this.myInstance.transaction((tx) => {
        tx.executeSql(RoomQuery, [], (tx, results) => {
            this.totalItems = (results.rows);
            resolve(this.totalItems);
        }, function (tx, error) {
            reject(error);
        });
    }))
  }
  
  SaveDeviceLogInfo(deviceRegId,timeStamp,HHMMSS,SecondsNum){
    this.myInstance.transaction(tx => { 
      tx.executeSql('insert into LogInfo(RegisterIndex,TimeStamp,HHMMSS,SecondsNum)values(?,?,?,?)',[deviceRegId,timeStamp,HHMMSS,SecondsNum]);
    },
    null,
    );
  };
  abedid(){
    const RoomQuery = "SELECT * FROM HomeSections ,Room WHERE Room.HomeSectionId=HomeSections.id";
    return new Promise((resolve, reject) => this.myInstance.transaction((tx) => {
        tx.executeSql(RoomQuery, [], (tx, results) => {
            this.totalItems = (results.rows);
            resolve(this.totalItems);
        }, function (tx, error) {
            reject(error);
        });
    }))
  }
  getDeviceLogInfo(){
    const RoomQuery = "SELECT Devices.id, DeviceName,Room.name as RoomName,Devices.RegisterIndex ,DeviceImage,SUM(SecondsNum) as longTime FROM Devices,Room, LogInfo where Room.RoomId=Devices.RoomId and Devices.RegisterIndex=LogInfo.RegisterIndex GROUP BY Devices.id ;";
    return new Promise((resolve, reject) => this.myInstance.transaction((tx) => {
        tx.executeSql(RoomQuery, [], (tx, results) => {
            this.totalItems = (results.rows);
            resolve(this.totalItems);
        }, function (tx, error) {
            reject(error);
        });
    }))
  }
  InsertHouseMode(ModeName,ImageSrc,ArrPin){
    const Modesq = "insert into Modes(ModeName,ImageSrc,ArrPin)values(?,?,?)";
    return new Promise((resolve, reject) => this.myInstance.transaction((tx) => {
        tx.executeSql(Modesq, [ModeName,ImageSrc,ArrPin], (tx, results) => {
            this.totalItems = (results.rows);
            resolve(this.totalItems);
        }, function (tx, error) {
            reject(error);
        });
    }))
    
  };
  DeleteNode(ModeId){
    const query = "DELETE FROM Modes WHERE id="+ModeId;
    return new Promise((resolve, reject) => this.myInstance.transaction((tx) => {
        tx.executeSql(query, [], (tx, results) => {
            this.totalItems = (results.rows);
            resolve(this.totalItems);
        }, function (tx, error) {
            reject(error);
        });
    }))
  }
  GetAllModes(){
    const RoomQuery = "SELECT * FROM Modes;";
    return new Promise((resolve, reject) => this.myInstance.transaction((tx) => {
        tx.executeSql(RoomQuery, [], (tx, results) => {
            this.totalItems = (results.rows);
            resolve(this.totalItems);
        }, function (tx, error) {
            reject(error);
        });
    }))
  }

}