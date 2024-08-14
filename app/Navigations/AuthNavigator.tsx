// // AuthNavigator.tsx
// import React from 'react';
// import { createStackNavigator } from '@react-navigation/stack';
// import SignIn from '../Screens/Auth/SignIn';
// import SignUp from '../Screens/Auth/SignUp';
// import { RootStackParamList } from './RootStackParamList';

// // const AuthStack = createStackNavigator();
// const AuthStack = createStackNavigator<RootStackParamList>();

// const AuthNavigator = () => (
//   <AuthStack.Navigator screenOptions={{ headerShown: false }}>
//     <AuthStack.Screen
//         name="SignIn"
//         component={SignIn} // Ensure SignIn is correctly typed
//       />
//     <AuthStack.Screen name="SignUp" component={SignUp} />
//   </AuthStack.Navigator>
// );

// export default AuthNavigator;
