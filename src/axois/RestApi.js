import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';

const RestApi = () => {
  const [apiData, setApiData] = useState(null);

  useEffect(() => {
    productData();
  }, []);

  const productData = async () => {
    try {
      const data = await axios.get('https://dummyjson.com/products');
      if (data !== null) {
        setApiData(data.data);
      }
      // console.log(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(apiData);

  return (
    <View>
      <FlatList
        data={apiData?.products}
        renderItem={({item}) => {
          // console.log(item);

          return (
            <View style={style.card}>
              <Text style={style.title}>{item.title}</Text>
              <View style={style.cardBody}>
                <Image source={{uri: item.images[0]}} style={style.img} />
                <View style={style.cardDetail}>
                  <View style={style.textView}>
                    <Text style={style.text}>Brand</Text>
                    <Text>{item.brand}</Text>
                  </View>
                  <View style={style.textView}>
                    <Text style={style.text}>category</Text>
                    <Text>{item.category}</Text>
                  </View>
                  <View style={style.textView}>
                    <Text style={style.text}>Price</Text>
                    <Text>${item.price}</Text>
                  </View>
                  <View style={style.textView}>
                    <Text style={style.text}>discount</Text>
                    <Text style={{textTransform: 'capitalize'}}>
                      {item.discountPercentage}%
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          );
        }}
      />

      {/* {apiData?.products?.map(item => {
        console.log(item);
      })} */}
    </View>
  );
};

const {width} = Dimensions.get('screen');
const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    textTransform: 'capitalize',
    color: '#000',
    alignSelf: 'center',
    marginBottom: 10,
  },
  card: {
    alignSelf: 'center',
    width: width - 20,
    backgroundColor: '#fff',
    elevation: 4,
    padding: 10,
    marginVertical: 15,
    borderRadius: 10,
  },
  cardBody: {
    flexDirection: 'row',
    marginTop: 10,
  },
  img: {
    width: 120,
    height: 120,
    marginRight: 10,
    borderRadius: 10,
  },
  cardDetail: {
    // borderWidth: 1,
    width: width - 170,
    justifyContent: 'center',
  },
  textView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // borderWidth: 1,
  },
  text: {
    color: '#000',
    fontWeight: 500,
    fontSize: 16,
    textTransform: 'capitalize',
  },
});

export default RestApi;
