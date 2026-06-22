import { Image, StatusBar, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { RouteProp, useRoute } from '@react-navigation/native';
import { AppRoutesTypes } from '$/routes/public/types';

const ProductDetails = () => {
  const route = useRoute<RouteProp<AppRoutesTypes, 'ProductDetails'>>();
  const API_URL = `https://dummyjson.com/products/${route?.params?.id}`;
  const [productDetails, setProductDetails] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const getProductDetails = async () => {
    const response = await fetch(API_URL);
    const data = await response.json();
    setProductDetails(data);
    setLoading(false);
  };

  useEffect(() => {
    getProductDetails();
  }, []);

  return (
    <View style={styles?.container}>
      <StatusBar barStyle="dark-content" backgroundColor={'#ffffff'} />
      <Image
        source={{
          uri: productDetails?.thumbnail,
        }}
        style={{
          width: '100%',
          height: '40%',
        }}
      />
      <View>
        <Text>{productDetails?.title}</Text>
        <Text>{productDetails?.description}</Text>
        <Text>{productDetails?.price}</Text>
        <Text>{productDetails?.rating}</Text>
        <Text>{productDetails?.stock}</Text>
        <Text>{productDetails?.brand}</Text>
        <Text>{productDetails?.category}</Text>
        <Text>{productDetails?.thumbnail}</Text>
      </View>
    </View>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});
