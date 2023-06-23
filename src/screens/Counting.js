import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  decrement,
  increment,
  changeValAction,
} from '../redux/actions/countAction';

const Counting = () => {
  const data = useSelector(state => state.counter);
  const {count, changeVal} = data;
  const dispatch = useDispatch();
  console.log(changeVal);

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text style={{fontSize: 30}}>{count}</Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          width: 250,
          marginVertical: 20,
        }}>
        <TouchableOpacity
          onPress={() => dispatch(decrement())}
          style={{backgroundColor: 'gray', width: 60, alignItems: 'center'}}>
          <Text style={{color: 'red', fontSize: 40}}>-</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => dispatch(increment())}
          style={{backgroundColor: 'gray', width: 60, alignItems: 'center'}}>
          <Text style={{color: 'red', fontSize: 40}}>+</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        style={{width: 350, borderWidth: 1, fontSize: 20}}
        value={changeVal}
        onChangeText={val => dispatch(changeValAction(val))}
      />
    </View>
  );
};

export default Counting;
