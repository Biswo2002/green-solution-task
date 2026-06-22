import {
  ActivityIndicator,
  FlatList,
  Image,
  RefreshControl,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { use, useEffect, useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { getHeight, getMargin, getWidth } from '$/components/helper';
import { ZORRRO_FONTS } from '$/styles';
import HOSTS from '$/api/hosts';
import { useNavigation } from '@react-navigation/native';
import { PublicNavigationProps } from '$/routes/public/types';

const ProductListening = () => {
  const API_URL = HOSTS?.MAIN;
  const { navigate } = useNavigation<PublicNavigationProps>();
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // api call for get all data
  const getProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_URL);
      const date = await response.json();
      setProducts(date?.products);
      setAllProducts(date?.products);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // api call for get all data
  useEffect(() => {
    getProducts();
  }, []);

  // refresh

  const onRefresh = () => {
    setRefreshing(true);
    getProducts();
  };
  // search Product
  const searchProduct = (text: string) => {
    setSearchQuery(text);
    if (!text?.trim()) {
      setProducts(allProducts);
      return;
    } else {
      const filteredProducts = allProducts?.filter((item: any) =>
        item?.title?.toLowerCase()?.includes(text?.toLowerCase()),
      );
      setProducts(filteredProducts);
    }
  };

  interface Product {
    thumbnail: string | undefined;
    id: string;
    title: string;
    description: string;
    price: number;
    image: string;
  }
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#6B63FF" />
      </View>
    );
  }
  const renderData = ({ item }: { item: Product }) => {
    return (
      <TouchableOpacity
        style={{
          width: '50%',
          padding: getMargin(10),
        }}
        activeOpacity={0.8}
        onPress={() => navigate('ProductDetails', { id: item?.id })}
      >
        <View
          style={{
            backgroundColor: '#ffffff',
            borderRadius: 10,
            marginTop: getMargin(20),
            padding: getMargin(10),
            elevation: 10,
          }}
        >
          <Image
            source={{
              uri: item?.thumbnail,
            }}
            // source={{ uri: item?.image }}
            style={{
              width: 140,
              height: 120,
              alignSelf: 'center',
              borderRadius: 10,
              marginBottom: getMargin(10),
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Text
              style={{
                fontSize: 12,
                fontFamily: ZORRRO_FONTS?.[600]?.normal,
                color: '#000000',
                // textAlign: 'center',
                width: '80%',
              }}
            >
              {item?.title}
            </Text>
            <Image
              source={{
                uri: 'https://www.pngkey.com/png/detail/273-2739689_right-grey-arrow-icon-png-png-images-next.png',
              }}
              style={{ width: 20, height: 20 }}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles?.container}>
      <LinearGradient
        colors={['#f0fdf4', '#bae6fd', '#ffffff']}
        style={styles?.linearGradient}
      >
        <StatusBar barStyle="dark-content" backgroundColor={'#ffffff'} />
        {/* Header */}
        <View
          style={{
            marginTop: getMargin(10),
            marginHorizontal: getMargin(20),
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontFamily: ZORRRO_FONTS?.[700]?.normal,
              color: '#000000',
            }}
          >
            Product Listening
          </Text>
          {/* Search Bar  */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              borderWidth: 1,
              borderColor: '#f0f9ff',
              borderRadius: 10,
              marginTop: getMargin(20),
              backgroundColor: '#ffffff',
              paddingHorizontal: getMargin(16),
              justifyContent: 'space-between',
              width: '100%',
              overflow: 'hidden',
              height: getHeight(40),
              elevation: 10,
            }}
          >
            <TextInput
              placeholder="Search for a product"
              value={searchQuery}
              onChangeText={searchProduct}
              style={{
                width: '95%',
                overflow: 'hidden',
              }}
            />

            <View
              style={{
                width: getWidth(20),
                height: getHeight(20),
                borderRadius: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Image
                source={{
                  uri: 'https://cdn-icons-png.flaticon.com/512/54/54481.png',
                }}
                style={{ width: 20, height: 20 }}
              />
            </View>
          </View>

          {/* Product List */}
          {loading ? (
            <ActivityIndicator size="large" color="#6B63FF" />
          ) : (
            <FlatList
              data={products}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                paddingBottom: getMargin(80),
              }}
              numColumns={2}
              columnWrapperStyle={{
                justifyContent: 'space-between',
              }}
              ListEmptyComponent={
                loading ? (
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        fontFamily: ZORRRO_FONTS?.[600]?.normal,
                        color: '#000000',
                      }}
                    >
                      We are loading your products...
                    </Text>
                  </View>
                ) : (
                  () => (
                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 16,
                          fontFamily: ZORRRO_FONTS?.[600]?.normal,
                          color: '#000000',
                        }}
                      >
                        No products found
                      </Text>
                    </View>
                  )
                )
              }
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              renderItem={renderData}
              keyExtractor={(_, index) => index.toString()}
            />
          )}
        </View>
      </LinearGradient>
    </View>
  );
};

export default ProductListening;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  linearGradient: {
    flex: 1,
  },
});
