import React from "react";
import { View, Text, Image } from 'react-native';
import Message from "./Message.js";
import Rabbit from "./Rabbit.js";
import RoomEnvironment from "./RoomEnvironment.js";
import OutdoorEnvironment from "./OutdoorEnvironment.js"
import Light from "./Light.js"
import KnowledgePage from "./KnowledgePage.js"
import RabbitLogo from "./RabbitLogo.js"



const App = () => {

  return (
    
    <View style={{
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20
    }}>
      <View style={{
        width: '100%',
        alignItems: 'center',
        paddingVertical: 20,
        borderBottomWidth: 2,
        borderBottomColor: '#ccc',
        marginBottom: 20
      }}>
        <Text style={{
          fontSize: 40,
          fontWeight: 'bold',
          textAlign: 'center',
          margin: 20
        }}>Lepus Labs: Discovering the Science of Rabbits</Text>
      </View>
      <View style={{flexDirection: 'row'}}>
      {/* <Image source={require('./images/hereToMessage.png')} style={{ width: 240, height: 80, marginLeft: 20 }} /> */}
        <Message />
        <RabbitLogo/>
        <Image source={require('./images/hereIsLight.png')} style={{ width: 240, height: 80, marginLeft: 20 }} />
      </View>
      <KnowledgePage />
    </View>
  );
  
}


export default App;
