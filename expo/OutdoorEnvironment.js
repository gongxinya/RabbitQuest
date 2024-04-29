import { ScrollView, StyleSheet, View } from 'react-native';
import { useEffect, useState } from 'react';

import { Text, Provider as PaperProvider, TextInput } from 'react-native-paper';
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
    <Card.Title title={"The temperature outside is " + message + "°C"} />
  </Card>
);



const Messages = (props) => {
  return (
    <ScrollView style={{ margin: 10 }}>
      {props.messages.map((el, i) =>
        <CardComponent key={i} message={el} iMax={props.messages.length} i={i}></CardComponent>
      )}
    </ScrollView>
  )
}

export default function App() {

  const [user, authLoading, authError] = useAuthState(auth);

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

  const [temSnapshots] = useList(user ? query(ref(database, 'data'), orderByChild('groupId'), equalTo(1), limitToLast(1)) : null);
  const [humSnapshots] = useList(user ? query(ref(database, 'data'), orderByChild('groupId'), equalTo(11), limitToLast(1)) : null);
  
  const temValue = temSnapshots ? temSnapshots.map(el => {
    // console.log(el.val());
    return el.val().integer;
  }) : [];

  const humValue = humSnapshots ? humSnapshots.map(el => {
    // console.log(el.val());
    return el.val().integer;
  }) : [];

  return (
    <PaperProvider>
      <SafeAreaView style={styles.container}>
      <Text>The indoor Tem value is: </Text>
        {temSnapshots ?
          <Messages messages={temValue}></Messages>
          : null}
          <Text>The indoor Hum value is: </Text>
          {temSnapshots ?
          <Messages messages={humValue}></Messages>
          : null}
        <StatusBar style="auto" />
      </SafeAreaView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
