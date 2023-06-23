import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import UserSingup from '../screens/UserSingup';
import Main from '../screens/Main';
import RealtimeDatabase from '../screens/RealTimeDatabase';
import UserData from '../screens/UserData';
import TodoApp from '../screens/TodoApp';
import UserAuth from '../screens/UserAuth';
import UserLogin from '../screens/UserLogin';
import Splash from '../screens/Splash';
import UploadFile from '../screens/UploadFile';
import Maps from '../screens/Maps';
import RestApi from '../axois/RestApi';
import PostProduct from '../axois/PostProduct';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="AddProducts"
          component={PostProduct}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="RestApi"
          component={RestApi}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{headerShown: false}}
        />
        <Stack.Screen name="Login" component={UserLogin} />
        <Stack.Screen
          name="Signup"
          component={UserSingup}
          options={{headerShown: false}}
        />
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="UploadFile" component={UploadFile} />
        <Stack.Screen
          name="Maps"
          component={Maps}
          options={{headerShown: false}}
        />
        <Stack.Screen name="RealtimeDatabase" component={RealtimeDatabase} />
        <Stack.Screen name="UserData" component={UserData} />
        <Stack.Screen name="TodoApp" component={TodoApp} />
        <Stack.Screen name="UserAuth" component={UserAuth} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
