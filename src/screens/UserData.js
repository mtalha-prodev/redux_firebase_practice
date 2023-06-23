import {View, Text, Button} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {useDispatch, useSelector} from 'react-redux';
import {userAction} from '../redux/actions/userAction';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserData = () => {
  const [userDetail, setUserDetail] = useState({});
  // const {user} = useSelector(state => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    getUser();
    getUseLocalStorage();
  }, []);

  const getUser = async () => {
    try {
      const users = await firestore()
        .collection('test')
        .doc('MvgmCuGe5O13UWWGjku4')
        .get();
      dispatch(userAction(users._data));
      await AsyncStorage.setItem('user', JSON.stringify(users._data));
      // console.log(user._data);
    } catch (error) {
      console.log('firebase errors' + error);
    }
  };

  const getUseLocalStorage = async () => {
    try {
      const res = await AsyncStorage.getItem('user');
      const par = JSON.parse(res);
      if (par) {
        setUserDetail(par);
      } else {
        console.log('value not defined');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{flex: 1}}>
      <Text>User Age: {userDetail.age}</Text>
      <Text>User Name: {userDetail.name}</Text>
      <Button title="Click Here" onPress={() => getUser()} />
    </View>
  );
};

export default UserData;
