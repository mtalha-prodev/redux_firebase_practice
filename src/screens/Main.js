import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  StyleSheet,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Counting from './Counting';
import {useRoute, useNavigation, StackActions} from '@react-navigation/native';

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
// push massage
import messaging from '@react-native-firebase/messaging';

const Main = () => {
  const [password, setPassword] = useState(null);

  // const route = useRoute();
  // const {email, uid} = route.params;
  const {email, uid} = auth().currentUser;

  //
  const navigation = useNavigation();

  const getUserData = async () => {
    try {
      const user = await firestore().collection('users').doc(uid).get();
      console.log(user._data);
    } catch (error) {
      console.log(error);
    }
  };

  const logoutUser = async () => {
    try {
      await auth().signOut();
      navigation.dispatch(StackActions.replace('Login'));
    } catch (error) {
      console.log(error);
    }
  };
  const addUserPass = async () => {
    try {
      await firestore().collection('users').doc(uid).update({
        password: password,
      });
      Alert.alert('add firebase data');
    } catch (error) {
      console.log(error);
    }
  };

  // push notification message
  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    // console.log('Authorization status:', authStatus);
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      const fcmToken = await messaging().getToken();
      console.log(fcmToken);
    } else {
      console.log('Not Authorization status:', authStatus);
    }
  };

  useEffect(() => {
    // getUserData();
    requestUserPermission();
  }, []);

  // maps screen
  const handleMaps = () => {
    navigation.navigate('Maps');
    console.log('map open');
  };

  return (
    <View style={style.mainContainer}>
      <Text style={style.mainText}>Main Screen</Text>
      <Text style={{fontSize: 22}}>email: {email}</Text>
      <Text style={{fontSize: 20}}>uid: {uid}</Text>
      <TouchableOpacity style={style.logout} onPress={() => logoutUser()}>
        <Text style={style.btnText}>Logout</Text>
      </TouchableOpacity>
      {/* set password firestore */}
      <TextInput
        style={style.inputText}
        secureTextEntry={true}
        onChangeText={val => setPassword(val)}
      />
      <TouchableOpacity style={style.pass} onPress={() => addUserPass()}>
        <Text style={style.btnText}>Password</Text>
      </TouchableOpacity>
      {/* upload profile */}
      <TouchableOpacity
        style={style.profile}
        onPress={() => navigation.navigate('UploadFile')}>
        <Text style={style.btnText}>Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity style={style.maps} onPress={() => handleMaps()}>
        <Text style={style.btnText}>Open Map</Text>
      </TouchableOpacity>

      {/* <Counting /> */}
    </View>
  );
};

const style = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#34495E',
  },
  mainText: {
    fontSize: 40,
    marginVertical: 20,
    color: 'red',
  },
  logout: {
    backgroundColor: 'red',
    marginTop: 15,
    padding: 5,
    width: '90%',
    alignItems: 'center',
  },
  inputText: {
    width: '90%',
    paddingHorizontal: 15,
    fontSize: 22,
    borderWidth: 1,
    marginTop: 20,
  },
  pass: {
    backgroundColor: 'lightblue',
    marginTop: 15,
    padding: 5,
    width: '90%',
    alignItems: 'center',
  },
  profile: {
    backgroundColor: 'green',
    marginTop: 15,
    padding: 5,
    width: '90%',
    alignItems: 'center',
  },
  btnText: {
    fontSize: 23,
    color: 'white',
    fontWeight: 500,
  },
  maps: {
    backgroundColor: '#EB984E',
    marginTop: 15,
    padding: 5,
    width: '90%',
    alignItems: 'center',
  },
});

export default Main;
