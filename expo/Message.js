import { ScrollView, StyleSheet, View } from 'react-native';
import { useEffect, useState } from 'react';

import { Provider as PaperProvider, TextInput } from 'react-native-paper';
import { Button, Card } from 'react-native-paper';

import { StatusBar } from 'expo-status-bar';

import { SafeAreaView } from 'react-native-safe-area-context';

import { initializeApp } from "firebase/app";
import { getAuth, signInWithCustomToken } from "firebase/auth";
import { getDatabase, ref, push, serverTimestamp, query, orderByChild, equalTo, limitToLast } from "firebase/database";
import { getFunctions, httpsCallable } from 'firebase/functions';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useList } from 'react-firebase-hooks/database';

import{firebaseToken, firebaseApp, auth, database, functions} from './FirebaseConfig'


const CardComponent = ({ message, i, iMax }) => (
  <Card style={{
    marginLeft: 10, marginRight: 10, marginTop: i === 0 ? 0 : 10, marginBottom: i === iMax ? 0 : 10
  }}>
    <Card.Title title={message} />
  </Card>
);

const Add = ({ user }) => {

  const [text, setText] = useState("");

  return (
    <View style={{ display: 'flex', flexDirection: 'row' }}>
      <TextInput style={{ margin: 10 }}
        label="Message to muesum friends"
        value={text}
        onChangeText={text => setText(text)}
      ></TextInput>
      <Button style={{ margin: 10, alignSelf: "center" }} icon="send" onPress={() => {
        push(ref(database, "data"), {
          userId: user.uid,
          groupId: 20,
          timestamp: serverTimestamp(),
          type: "str",
          string: text.toString()
          // type: "int",
          // integer: 0
        });
      }}>
        post 
      </Button>
    </View>
  )
}

const Messages = (props) => {
  return (
    <ScrollView style={{ margin: 10 }} contentContainerStyle={{ flexDirection: 'row', alignItems: 'flex-start' }}>
      {props.messages.map((el, i) =>
        <CardComponent key={i} message={el} iMax={props.messages.length} i={i}></CardComponent>
      )}
    </ScrollView>
  )
}


export default function App() {
  const [user, authLoading, authError] = useAuthState(auth);
  const [lightColor, setLightColor] = useState('#fff');

  
  
  

  useEffect(() => {
    (async () => {
      const getToken = httpsCallable(functions, "getToken");
      const token = await getToken({ token: firebaseToken });
      if (token?.data?.result === "ok" && token?.data?.token) {
        signInWithCustomToken(auth, token.data.token);
      } else {
        console.error(token?.data?.reason ?? "unknownError")
      }
    })();

    
  }, []);

  const [snapshots] = useList(user ? query(ref(database, 'data'), orderByChild('groupId'), equalTo(20), limitToLast(3)) : null);
  const [hueSnapshots] = useList(user ? query(ref(database, 'data'), orderByChild('groupId'), equalTo(21), limitToLast(1)) : null);
    const [saturationSnapshots] = useList(user ? query(ref(database, 'data'), orderByChild('groupId'), equalTo(22), limitToLast(1)) : null);
    const [brightnessSnapshots] = useList(user ? query(ref(database, 'data'), orderByChild('groupId'), equalTo(23), limitToLast(1)) : null);

    const hueValue = hueSnapshots ? hueSnapshots.map(el => el.val().integer) : [];
    const saturationValue = saturationSnapshots ? saturationSnapshots.map(el => 
    {
        // console.log(el.val())
        return el.val().integer
    }
    ) : [];
    const brightnessValue = brightnessSnapshots ? brightnessSnapshots.map(el => {
        console.log(el.val().integer)
        return el.val().integer
    }) : [];
    // console.log("hue:" + hueValue)
    // console.log("saturation:" + saturationValue)
    // console.log("brightness:" + brightnessValue)
    // const color = `hsb(${hueValue}, ${saturationValue}, ${brightnessValue})`;
    // console.log("color:" + color)
    
    

  
  return (
    <PaperProvider>
      <SafeAreaView style={styles.container}>
        <Add user={user} style={styles.add} />
        <View style={styles.row}>
          {snapshots ?
            <Messages messages={snapshots.map(el => el.val().string)} />
            : null}
        </View>
        <StatusBar style="auto" />
      </SafeAreaView>
    </PaperProvider>
  );
  

  
  
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 20,
    marginRight: 20,
  },
  add: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 9999,
  },
  row: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginTop: 20,
  },
});