import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import BottomNavigation from './BottomNavigation';
import { SafeAreaView } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Sidebar from '../layout/Sidebar';
import SignIn from '../Screens/Auth/SignIn';
import SignUp from '../Screens/Auth/SignUp';


const Drawer = createDrawerNavigator();
const DrawerNavigation = () => {

    const { colors }: {colors : any} = useTheme();

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.card }}>
            <Drawer.Navigator
                initialRouteName='BottomNavigation'
                screenOptions={{
                    headerShown: false,
                }}
                drawerContent={(props) => {
                    return <Sidebar navigation={props.navigation} />
                }}
            >
                   <Drawer.Screen name="SignIn" component={SignIn} />
                   <Drawer.Screen name="SignUp" component={SignUp} />
                <Drawer.Screen name='BottomNavigation' component={BottomNavigation} />
            </Drawer.Navigator>
        </SafeAreaView>
    );
};


export default DrawerNavigation;