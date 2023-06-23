import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import database from '@react-native-firebase/database';

const TodoApp = () => {
  const [inputVal, setInputVal] = useState(null);
  const [list, setList] = useState(1);
  const [selectCardIndex, setSelectCardIndex] = useState(null);
  const [isUpdate, setIsUpdate] = useState(false);

  // add or set data in database
  const addUserData = async () => {
    try {
      if (inputVal.length > 0) {
        const index = list.length;
        console.log(index);
        const res = await database().ref(`todo/${index}`).set({
          value: inputVal,
        });
        // console.log(res);
        setInputVal('');
      } else {
        alert('Please Enter a value !');
      }
    } catch (error) {
      console.log(error);
    }
  };

  // get data in database
  const getDatabase = async () => {
    try {
      const data = await database()
        .ref(`todo`)
        .on('value', tempPrev => setList(tempPrev.val()));
      //   console.log(data.val());
    } catch (error) {
      console.log(error);
    }
  };

  // HANDLE UPDATE DATABASE
  const handleUpdate = async () => {
    try {
      if (inputVal.length > 0) {
        setInputVal('');
        setIsUpdate(false);
        await database().ref(`todo/${selectCardIndex}`).update({
          value: inputVal,
        });
      } else {
        alert('Please Enter a value & try again !');
      }
    } catch (error) {
      console.log(error);
    }
  };

  // handle card data UPDATE onpress event
  const handleCardData = (cardIndex, cardItem) => {
    try {
      setIsUpdate(true);
      setSelectCardIndex(cardIndex);
      setInputVal(cardItem);
    } catch (error) {
      console.log(error);
    }
  };

  // handle delete card onLongPress envent

  const handleCardDelete = async (cardIndex, cardItem) => {
    Alert.alert('Aler', 'Are You Sure to Delete !', [
      {
        text: 'Cancel',
      },
      {
        text: 'Yes',
        onPress: async () => {
          try {
            await database().ref(`todo/${cardIndex}`).remove();
            setInputVal('');
            setIsUpdate(false);
          } catch (error) {
            console.log(error);
          }
        },
      },
    ]);
  };

  useEffect(() => {
    getDatabase();
  }, []);

  return (
    <View style={style.container}>
      <TextInput
        style={style.inputText}
        value={inputVal}
        onChangeText={val => setInputVal(val)}
      />
      {!isUpdate ? (
        <TouchableOpacity style={style.btn} onPress={() => addUserData()}>
          <Text style={style.btnText}>ADD</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={style.btn} onPress={() => handleUpdate()}>
          <Text style={style.btnText}>UPDATE</Text>
        </TouchableOpacity>
      )}
      <Text style={style.text}>Todo App</Text>
      <View style={style.cardView}>
        <FlatList
          data={list}
          renderItem={item => {
            // console.log(item);
            if (item.item !== null) {
              return (
                <TouchableOpacity
                  style={style.card}
                  onPress={() => handleCardData(item.index, item.item.value)}
                  onLongPress={() =>
                    handleCardDelete(item.index, item.item.value)
                  }>
                  <Text style={style.cardText}>{item.item.value}</Text>
                </TouchableOpacity>
              );
            }
          }}
        />
      </View>
    </View>
  );
};

const {width} = Dimensions.get('screen');
const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f3f6f4',
  },
  inputText: {
    width: width - 30,
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 20,
    fontSize: 25,
  },
  btn: {
    width: width - 30,
    marginVertical: 10,
    padding: 5,
    backgroundColor: 'lightblue',
    color: 'white',
    alignItems: 'center',
  },
  btnText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
  },
  text: {
    fontSize: 35,
    color: '#000',
  },
  cardView: {
    width: '100%',
  },
  card: {
    backgroundColor: 'white',
    padding: 10,
    marginVertical: 10,
  },
  cardText: {
    fontSize: 30,
    color: '#000',
    textTransform: 'capitalize',
  },
});

export default TodoApp;
