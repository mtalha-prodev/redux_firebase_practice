import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import {StackActions, useNavigation} from '@react-navigation/native';
import Auth from '@react-native-firebase/auth';

const Splash = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(async () => {
      // user already login rediract in home screen
      const unSubscribe = await Auth().onAuthStateChanged(user => {
        const isUserAuth = user !== null ? 'Main' : 'Login';
        unSubscribe();
        navigation.dispatch(StackActions.replace(isUserAuth));
      });
    }, 3000);
  }, []);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{fontSize: 30}}>Splash</Text>
    </View>
  );
};

export default Splash;
