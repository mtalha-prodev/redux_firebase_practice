import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation, StackActions} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

const UserLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // use navigation
  const navigation = useNavigation();
  // login handle
  const handleLogin = async () => {
    try {
      if (email.length > 0 && password.length > 0) {
        const user = await auth().signInWithEmailAndPassword(email, password);
        if (user.user.emailVerified) {
          alert('Varify Email');
          navigation.dispatch(StackActions.replace('Main'));
        } else {
          alert('Please Verify Your Email !');

          await auth().currentUser.sendEmailVerification();

          await auth().signOut();
        }

        // navigation.navigate('Main', {
        //   email: isLogin.user.email,
        //   uid: isLogin.user.uid,
        // });
        setEmail('');
        setPassword('');
        // console.log(isLogin.user.email);
      } else {
        Alert.alert('Alert', 'Please Enter Correct Value !');
      }
    } catch (error) {
      console.log(error);
    }
  };

  // password reset
  const resetPassword = async () => {
    try {
      if (email !== null) {
        const res = await auth().sendPasswordResetEmail(email);

        // console.log(res);
        alert('Reset Password Successfuly !');
      } else {
        alert('Please Enter Your Email !');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={style.container}>
      <Text style={style.text}>Login </Text>
      <TextInput
        style={style.inputText}
        placeholder="Enter email"
        value={email}
        onChangeText={val => setEmail(val)}
      />
      <TextInput
        style={style.inputText}
        placeholder="Enter Password"
        value={password}
        onChangeText={val => setPassword(val)}
      />
      <TouchableOpacity style={style.btn} onPress={() => handleLogin()}>
        <Text style={style.btnText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={style.signup}
        onPress={() => navigation.dispatch(StackActions.replace('Signup'))}>
        <Text style={style.signup}>Create An Account !</Text>
      </TouchableOpacity>
      <TouchableOpacity style={style.signup} onPress={() => resetPassword()}>
        <Text style={style.signup}>Reset Password ?</Text>
      </TouchableOpacity>
    </View>
  );
};

const {width} = Dimensions.get('screen');
const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginVertical: 20,
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputText: {
    width: width - 30,
    paddingHorizontal: 10,
    marginVertical: 10,
    borderWidth: 1,
    fontSize: 20,
  },
  btn: {
    width: width - 30,
    backgroundColor: '#00a1e6',
    padding: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  btnText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
    letterSpacing: 1,
  },
  signup: {
    color: '#073763',
    fontSize: 25,
    marginTop: 15,
    fontWeight: 500,
  },
});

export default UserLogin;
