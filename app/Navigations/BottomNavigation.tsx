import React, { useState, useEffect, useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../Screens/Home/Home';
import BottomTab from '../layout/BottomTab';
import MyCart from '../Screens/MyCart/MyCart';
import Category from '../Screens/Category/Category';
import Profile from '../Screens/profile/Profile';
import Wishlist from '../Screens/Wishlist/Wishlist';
import Dashboard from '../Screens/Home/Dashboard';
import { AuthContext } from '../services/authContext';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BottomTabParamList } from './BottomTabParamList';
import { GetCartData } from '../api/api';

const Tab = createBottomTabNavigator<BottomTabParamList>();

const BottomNavigation = () => {
  const authContext = useContext(AuthContext);
  const userInfo = authContext?.userInfo || null;
  const userRole = userInfo?.role; // Assuming role '0' is for customers and '1' for vendors
  const initialRoute = userRole === '1' ? 'Dashboard' : 'Home'; // Vendor lands on Dashboard, Customer lands on Home

  const [cartCount, setCartCount] = useState(0); // State for cart item count

  // API call to fetch cart count
  const fetchCartCount = async () => {
    try {
        const token = await AsyncStorage.getItem('authToken');
        const userid = await AsyncStorage.getItem('userid');
        const data = { id: userid };
    
        const response = await axios.post(GetCartData(), data, {
          headers: {
            Authorization: `${token}`,
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        });
    
        if (response.data && response.data.status === 1) {
            console.log(response.data.data.length,'checking in bn')
            setCartCount(response.data.data.length); // Fallback to an empty array if no data is returned
        } else {
            setCartCount(0); // Set an empty array if no valid data is returned
        }
    } catch (error) {
      console.error('Error fetching cart count:', error);
    }
  };

  useEffect(() => {
    fetchCartCount(); // Fetch cart count when component mounts
  }, []);

  return (
    <Tab.Navigator
      initialRouteName={initialRoute} // Set initial route dynamically
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props: any) => <BottomTab {...props} cartCount={cartCount} />} // Pass cartCount to BottomTab
    >
      {userRole === '1' ? (
        <Tab.Screen name="Dashboard" component={Dashboard} />
      ) : (
        <Tab.Screen name="Home" component={HomeScreen} />
      )}

      {/* Common screens for both roles */}
      <Tab.Screen name="Wishlist" component={Wishlist} />
      <Tab.Screen name="MyCart" component={MyCart} />
      <Tab.Screen name="Category" component={Category} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default BottomNavigation;
