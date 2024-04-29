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

// the configuration of firebase, hlep to connect to database
const firebaseConfig = {
    apiKey: "AIzaSyDBjUEw_DQNMQsZJWfTtLL0PQJoH-xF0kk",
    authDomain: "sta-cs5041.firebaseapp.com",
    databaseURL: "https://sta-cs5041-p4.firebaseio.com",
    projectId: "sta-cs5041",
    storageBucket: "sta-cs5041.appspot.com",
    messagingSenderId: "639987847762",
    appId: "1:639987847762:web:c5a35616a1aa1cf243458b"
};

// const firebaseToken = "YOUR TOKEN HERE";
const firebaseToken = "9dc08c76-44bb-4e21-976d-6b52df4df0aa";

// initial the firebase connection
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const database = getDatabase(firebaseApp);
const functions = getFunctions(firebaseApp);

// initial the CardComponent which show the message from Firebase
const CardComponent = ({ message, i, iMax }) => (
    <Card style={{
        marginLeft: 10, marginRight: 10, marginTop: i === 0 ? 0 : 10, marginBottom: i === iMax ? 0 : 10
    }}>
        <Card.Title title={message} subtitle="Card Subtitle" />
    </Card>
);



// main function
export default function App() {
    

    const [user, authLoading, authError] = useAuthState(auth);

    useEffect(() => {
        const greyRef = ref(database, 'data/8');
        const whiteRef = ref(database, 'data/9');
        // Authentication
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

    
      const [snapshots, dbLoading, dbError] = useList(user ? query(ref(database, 'data'), orderByChild('groupId'), equalTo(20), limitToLast(3)) : null);
      const [greySnapshot] = useList(user ? query(ref(database, 'data'), orderByChild('groupId'), equalTo(8), limitToLast(1)) : null);
      const message = snapshots ? snapshots.map(el => el.val().string) : [];
      // setMessage(messageValue)
      const greyValue = greySnapshot ? greySnapshot.map(el => el.val().integer) : [];
      const outputMessage = message[2]
      console.log("message:" + outputMessage)
      console.log("greyValue:" + greyValue)
  
      useEffect(() => {
        const val = greyValue[0];
        console.log("Hook was triggered")
        if (val === 1) {
            console.log("Your rabbit is close to the grey rabbit")
        }
      }, [greySnapshot]);
    
      return (
        <PaperProvider>
            {/* <SafeAreaView style={styles.container}>
                <Add user={user}></Add>
                {snapshots ?
                    <Messages messages={snapshots.map(el => el?.val()?.string ?? '')}></Messages> // check if the message from Firebase is legal
                    : null}
                <StatusBar style="auto" />
            </SafeAreaView> */}
        </PaperProvider>
    );
}


// set the style of the container 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
