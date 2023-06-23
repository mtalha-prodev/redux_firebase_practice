import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import DocumentPicker from 'react-native-document-picker';
//
import storage from '@react-native-firebase/storage';

const UploadFile = () => {
  const [imageUri, setImageUri] = useState(null);

  const handleSelectImage = async () => {
    try {
      const selectImage = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.images],
        copyTo: 'cachesDirectory',
      });
      setImageUri(selectImage);
      //   console.log(selectImage);
    } catch (error) {
      console.log(error);
    }
  };
  // upload image in firebase storage
  const handleUploadImage = async () => {
    try {
      const res = await storage()
        .ref(`/profile/${imageUri.name}`)
        .putFile(imageUri.fileCopyUri);
      //   console.log(res);
      Alert.alert('Alert', 'Upload Profile Pic Successfuly!');
    } catch (error) {
      console.log(error);
    }
  };
  //   console.log(imageUri);

  return (
    <View style={style.container}>
      {imageUri ? (
        <Image
          source={{uri: imageUri.uri}}
          style={{width: 200, height: 200, marginTop: 30}}
        />
      ) : null}

      <View style={style.cardBox}>
        <TouchableOpacity
          style={style.fileBtn}
          onPress={() => handleSelectImage()}>
          <Text style={style.fileText}>Select Image</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={style.fileBtn}
          onPress={() => handleUploadImage()}>
          <Text style={style.fileText}>Upload</Text>
        </TouchableOpacity>
        <TouchableOpacity style={style.delBtn}>
          <Text style={style.fileText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
  },
  cardBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  fileBtn: {
    // width: '40%',
    paddingHorizontal: 30,
    paddingVertical: 8,
    backgroundColor: 'blue',
    alignItems: 'center',
    borderRadius: 20,
  },
  delBtn: {
    // width: '40%',
    paddingHorizontal: 30,
    paddingVertical: 8,
    backgroundColor: 'red',
    alignItems: 'center',
    borderRadius: 20,
  },
  fileText: {
    fontSize: 22,
    color: 'white',
    fontWeight: 500,
  },
});

export default UploadFile;
