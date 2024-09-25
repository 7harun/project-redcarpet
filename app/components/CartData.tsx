import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

// Define the types of the props that the component accepts
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

const CartData: React.FC<CartDataProps> = ({ data, navigation, theme, colors, handleDelete }) => {
  return (
    <View style={{ padding: 10, backgroundColor: colors.background }}>
      <Image source={{ uri: data.image }} style={{ height: 100, width: 100 }} />
      <Text style={{ color: colors.text }}>{data.title}</Text>
      <Text style={{ color: colors.text }}>Price: {data.price}</Text>
      <Text style={{ color: colors.text }}>Discount: {data.discount}</Text>
      <Text style={{ color: colors.text }}>Review: {data.review}</Text>

      {/* Add a delete button */}
      <TouchableOpacity onPress={handleDelete}>
        <Text style={{ color: 'red' }}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CartData;
