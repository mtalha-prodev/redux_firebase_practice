import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import database from '@react-native-firebase/database';

const RealtimeDatabase = () => {
  // real time database get value
  const [userData, setUserData] = useState(null);

  const getDatabase = async () => {
    try {
      const data = await database().ref('users/1').once('value');

      console.log(data.val());
      setUserData(data.val());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDatabase();
  }, []);

  return (
    <View>
      <Text>Database:{userData ? userData.name : 'loading...'}</Text>
      <Text>Database:{userData ? userData.age : 'loading...'}</Text>
    </View>
  );
};

export default RealtimeDatabase;
