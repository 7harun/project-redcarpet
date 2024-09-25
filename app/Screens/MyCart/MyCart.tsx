import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, Platform, ActivityIndicator } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { COLORS, FONTS } from '../../constants/theme';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import Button from '../../components/Button/Button';
import Header from '../../layout/Header';
import CartData from '../../components/CartData';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../Navigations/RootStackParamList';
import { Feather } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GetCartData } from '../../api/api'; // Make sure this is the correct import for your API function

type ShoppingScreenProps = StackScreenProps<RootStackParamList, 'MyCart'>;

const Shopping = ({ navigation }: ShoppingScreenProps) => {
  const theme = useTheme();
  const { colors }: { colors: any } = theme;

  const [cart, setCart] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch cart data from the API
  const fetchCartData = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      const userid = await AsyncStorage.getItem('userid');

      const data = {
        id: userid,
      };

      const response = await axios.post(GetCartData(), data, {
        headers: {
          Authorization: `${token}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });

      if (response.data.status === 1) {
        setCart(response.data.data);
      } else {
        setCart([]); // Set an empty array if no data is returned
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false); // Ensure loading is set to false after the fetch completes
    }
  };

  // Use useEffect to call the API when the component mounts
  useEffect(() => {
    fetchCartData();
  }, []);

  // Handle cart item removal
  const removeItemFromCart = (id: any) => {
    setCart(cart.filter((item) => item.id !== id)); // Simply filter out the removed item from the state
  };

  return (
    <SafeAreaView style={{ backgroundColor: colors.background, flex: 1 }}>
      <Header title={'My Cart'} rightIcon2={'search'} leftIcon={'back'} />

      <GestureHandlerRootView style={{ flex: 1 }}>
        {loading ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color={COLORS.primary} />
          </View>
        ) : cart.length > 0 ? (
          <ScrollView contentContainerStyle={{ paddingBottom: 150 }} showsVerticalScrollIndicator={false}>
            <View style={{ paddingTop: 20, paddingBottom: 5 }}>
              {cart.map((data: any, index: any) => (
                <View key={index}>
                  <CartData
                    data={{
                      title: data.name_of_firm,
                      price: data.discount_price,
                      discount: data.order_price,
                      image: data.media[0].file_path, // Use the first image from the media array
                      review: '(2k Review)', // Placeholder review
                    }}
                    navigation={navigation}
                    theme={theme}
                    colors={colors}
                    handleDelete={() => removeItemFromCart(data.id)}
                  />
                </View>
              ))}
            </View>
          </ScrollView>
        ) : (
          <View style={[GlobalStyleSheet.container, { padding: 0, position: 'absolute', left: 0, right: 0, bottom: 0, top: 20 }]}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <View style={{ height: 60, width: 60, borderRadius: 60, alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.primaryLight, marginBottom: 20 }}>
                <Feather color={COLORS.primary} size={24} name="shopping-cart" />
              </View>
              <Text style={{ ...FONTS.h5, color: colors.title, marginBottom: 8 }}>Your shopping-cart is Empty!</Text>
              <Text style={{ ...FONTS.fontSm, color: colors.text, textAlign: 'center', paddingHorizontal: 40 }}>
                Add Events to your favourites and shop now.
              </Text>
            </View>
          </View>
        )}
      </GestureHandlerRootView>

      {cart.length > 0 && (
        <View
          style={[
            {
              shadowColor: 'rgba(195, 123, 95, 0.25)',
              shadowOffset: {
                width: 2,
                height: -20,
              },
              shadowOpacity: 0.1,
              shadowRadius: 5,
              left: 0,
              bottom: 0,
              right: 0,
            },
            Platform.OS === 'ios' && {
              backgroundColor: colors.card,
            },
          ]}
        >
          <View style={{ height: 200, width: '100%', backgroundColor: colors.card, flex: 1, paddingHorizontal: 15, position: 'absolute', bottom: 0, paddingTop: 10, borderTopLeftRadius: 25, borderTopRightRadius: 25 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <Text style={{ ...FONTS.fontRegular, fontSize: 18, color: colors.title }}>Subtotal</Text>
              <Text style={{ ...FONTS.fontBold, fontSize: 18, color: colors.title }}>8000</Text>
            </View>
            <View style={[GlobalStyleSheet.container, { paddingHorizontal: 10, marginTop: 10, paddingTop: 0 }]}>
              <Button
                title={`Proceed to Buy (${cart.length} items)`}
                btnRounded
                color={COLORS.primary}
                onPress={() => navigation.navigate('Checkout')}
              />
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Shopping;
