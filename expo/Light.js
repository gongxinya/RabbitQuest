import React from 'react';
import { Text, ScrollView, StyleSheet, View } from 'react-native';
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

import { firebaseToken, firebaseApp, auth, database, functions } from './FirebaseConfig'





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
    
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>The Hue value is: {hueValue}</Text>
            <Text>The Saturation value is: {saturationValue}</Text>
            <Text>The Brightness value is: {brightnessValue}</Text>
        </View>
    );
}
