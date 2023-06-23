import {View, Text, Touchable, TouchableOpacity} from 'react-native';
import React from 'react';
import axios from 'axios';

const PostProduct = () => {
  const data = {
    id: 1,
    title: 'iPhone 14',
    description: 'An apple mobile which is nothing like apple',
    price: 1549,
    discountPercentage: 10.0,
    rating: 2.69,
    stock: 1000,
    brand: 'Gallexy',
    category: 'Android Phone',
    thumbnail: 'https://i.dummyjson.com/data/products/1/thumbnail.jpg',
    images: [
      'https://i.dummyjson.com/data/products/1/1.jpg',
      'https://i.dummyjson.com/data/products/1/2.jpg',
      'https://i.dummyjson.com/data/products/1/3.jpg',
      'https://i.dummyjson.com/data/products/1/4.jpg',
      'https://i.dummyjson.com/data/products/1/thumbnail.jpg',
    ],
  };

  const addProduct = async () => {
    try {
      const resp = await axios.post(
        'https://dummyjson.com/products/add',
        data,
        {
          headers: {'Content-Type': 'application/json'},
        },
      );
      console.log(resp.data);
    } catch (error) {
      console.log(error);
    }
  };
  const updateProduct = async () => {
    try {
      const resp = await axios.patch('https://dummyjson.com/products/1', data, {
        headers: {'Content-Type': 'application/json'},
      });
      console.log(resp.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <TouchableOpacity
        style={{
          backgroundColor: 'lightblue',
          padding: 10,
          alignItems: 'center',
        }}
        onPress={() => addProduct()}>
        <Text>Add Product</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          backgroundColor: 'lightblue',
          padding: 10,
          alignItems: 'center',
          marginVertical: 10,
        }}
        onPress={() => updateProduct()}>
        <Text>Update Product</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PostProduct;
