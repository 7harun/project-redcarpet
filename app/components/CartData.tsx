import React, { useCallback, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { useFocusEffect } from '@react-navigation/native'; // Import the hook
import { IMAGES } from '../constants/Images';

const SCREEN_WIDTH = Dimensions.get('window').width;

type CartDataProps = {
  data: {
    title: string;
    price: string;
    discount: string;
    image: string;
    review: string;
  };
  navigation: any; // You can refine this to the correct navigation type if needed
  theme: any;
  colors: any;
  handleDelete: () => void;
};

const CartData: React.FC<CartDataProps> = ({ data, navigation, colors, theme, handleDelete }) => {
  const swipeableRef = useRef<Swipeable>(null); // Use ref to control the swipeable

  // Close the swipeable row when the tab gains focus
  useFocusEffect(
    useCallback(() => {
      // When the screen is focused, close the swipeable row
      if (swipeableRef.current) {
        swipeableRef.current.close();
      }
    }, [])
  );

  const rightSwipe = (
    progressAnimatedValue: Animated.AnimatedInterpolation<number>,
    dragAnimatedValue: Animated.AnimatedInterpolation<number>
  ) => {
    const scale = dragAnimatedValue.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });

    return (
      <TouchableOpacity
        onPress={() => {
          if (swipeableRef.current) swipeableRef.current.close();
          handleDelete();
        }}
        activeOpacity={0.6}
      >
        <View
          style={[
            styles.deleteBox,
            { backgroundColor: theme.dark ? colors.white : colors.primary },
          ]}
        >
          <Animated.View style={{ transform: [{ scale }] }}>
            <Image
              style={{
                height: 20,
                width: 20,
                resizeMode: 'contain',
                tintColor: theme.dark ? colors.primary : colors.white,
              }}
              source={IMAGES.delete}
            />
          </Animated.View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <Swipeable
      ref={swipeableRef} // Reference for the swipeable row
      friction={2}
      renderRightActions={rightSwipe}
    >
      <View
        style={[
          {
            shadowColor: 'rgba(195, 123, 95, 0.25)',
            shadowOffset: {
              width: 2,
              height: 20,
            },
            shadowOpacity: 0.1,
            shadowRadius: 5,
            backgroundColor: colors.card,
            borderRadius: 20,
            padding: 10,
            marginHorizontal: 15,
            marginBottom: 20,
          },
          Platform.OS === 'ios' && {
            backgroundColor: colors.card,
          },
        ]}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <View>
            <Image
              style={{ height: 100, width: 100, borderRadius: 20, resizeMode: 'contain' }}
              source={data.image ? { uri: data.image } : IMAGES.redcarpet}
            />
          </View>
          <View style={{ flex: 1 }}>
            <TouchableOpacity onPress={() => navigation.navigate('ProductDetails')}>
              <Text style={{ fontSize: 18, color: colors.title }}>{data.title}</Text>
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 5 }}>
              <Text style={{ fontSize: 16, color: colors.title }}>{data.price}</Text>
              <Text
                style={{
                  fontSize: 14,
                  textDecorationLine: 'line-through',
                  textDecorationColor: 'rgba(0, 0, 0, 0.70)',
                  color: theme.dark ? 'rgba(255,255,255,0.7)' : 'rgba(0, 0, 0, 0.70)',
                  marginRight: 5,
                }}
              >
                {data.discount}
              </Text>
              <Image style={{ height: 12, width: 12, resizeMode: 'contain' }} source={IMAGES.star4} />
              <Text
                style={{
                  fontSize: 12,
                  color: theme.dark ? 'rgba(255,255,255,0.5)' : 'rgba(0, 0, 0, 0.50)',
                }}
              >
                {data.review} Review
              </Text>
            </View>
          </View>
        </View>
      </View>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  deleteBox: {
    justifyContent: 'center', // Centers the delete icon vertically
    alignItems: 'center', // Centers the delete icon horizontally
    width: 50, // Fixed width of the delete box
    height: 100, // Height matches the product image's height
    right: 0, // Positioned to the right (this style is applied to the right swipe action)
    borderTopLeftRadius: 20, // Rounded top-left corner to match the card
    borderBottomLeftRadius: 20, // Rounded bottom-left corner to match the card
  },
});


export default CartData;
