import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../Screens/Home/Home';
import BottomTab from '../layout/BottomTab';
import MyCart from '../Screens/MyCart/MyCart';
import Category from '../Screens/Category/Category';
import Profile from '../Screens/profile/Profile';
import { BottomTabParamList } from './BottomTabParamList';
import Wishlist from '../Screens/Wishlist/Wishlist';
import { AuthContext } from '../services/authContext';
import Dashboard from '../Screens/Home/Dashboard';
import { useContext } from 'react';


const Tab = createBottomTabNavigator<BottomTabParamList>();

const BottomNavigation = () => {
    
    const authContext = useContext(AuthContext);
    const userInfo = authContext?.userInfo || null;
    const userRole = userInfo?.role; // Assuming role '0' is for customers and '1' for vendors
    
    const initialRoute = userRole === '1' ? 'Dashboard' : 'Home'; // Vendor lands on Dashboard, Customer lands on Home


    // const theme = useTheme();
    // const { colors } = theme;
 
    return (
        <Tab.Navigator
            initialRouteName={initialRoute}  // Set initial route dynamically
            screenOptions={{
                headerShown: false
            }}
            tabBar={(props: any) => <BottomTab {...props} />}
        >
            {userRole === '1' ? ( // Render Dashboard for vendors
                <Tab.Screen 
                    name="Dashboard" 
                    component={Dashboard} 
                />
            ) : ( // Render Home for customers
                <Tab.Screen 
                    name="Home" 
                    component={HomeScreen} 
                />
            )}
            
            {/* Common screens for both roles */}
            <Tab.Screen 
                name="Wishlist" 
                component={Wishlist} 
            />
            <Tab.Screen 
                name="MyCart" 
                component={MyCart} 
            />
            <Tab.Screen 
                name="Category" 
                component={Category} 
            />
            <Tab.Screen 
                name="Profile" 
                component={Profile} 
            />
        </Tab.Navigator>
    );
};

export default BottomNavigation;