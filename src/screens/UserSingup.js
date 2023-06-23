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
import auth from '@react-native-firebase/auth';
import {useNavigation, StackActions} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

const UserSingup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // use navigation
  const navigation = useNavigation();
  const handleSignup = async () => {
    try {
      if (email.length > 0 && password.length > 0) {
        const res = await auth().createUserWithEmailAndPassword(
          email,
          password,
        );

        // misico4840@breazeim.com

        const userData = {
          email: res.user.email,
          id: res.user.uid,
        };

        await firestore().collection('users').doc(res.user.uid).set(userData);

        // verify email with link to create account
        await auth().currentUser.sendEmailVerification();

        await auth().signOut();

        alert('Please Verify You Email !');

        navigation.dispatch(StackActions.replace('Login'));
        setEmail('');
        setPassword('');
      } else {
        Alert.alert('Alert', 'Please Enter Correct Fields !');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={style.container}>
      <Text style={style.text}>User Signup</Text>
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
      <TouchableOpacity style={style.btn} onPress={() => handleSignup()}>
        <Text style={style.btnText}>Signup</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.dispatch(StackActions.replace('Login'))}>
        <Text style={style.signup}>Already have an Acount !</Text>
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

export default UserSingup;
