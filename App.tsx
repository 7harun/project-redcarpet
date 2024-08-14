// App.tsx
import React from 'react';
import 'react-native-gesture-handler';
import { useFonts } from 'expo-font';
import { useTheme } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import store from './app/redux/store';
import Route from './app/Navigations/Route';
import { AuthProvider } from './app/services/authContext'; // Adjust the import path if needed

export default function App() {
  const theme = useTheme();
  const { colors }: { colors: any } = theme;

  const [loaded] = useFonts({
    JostBold: require('./app/assets/fonts/Jost-Bold.ttf'),
    JostSemiBold: require('./app/assets/fonts/Jost-SemiBold.ttf'),
    JostLight: require('./app/assets/fonts/Jost-Light.ttf'),
    JostMedium: require('./app/assets/fonts/Jost-Medium.ttf'),
    JostRegular: require('./app/assets/fonts/Jost-Regular.ttf'),
    JostExtraLight: require('./app/assets/fonts/Jost-ExtraLight.ttf'),
    MarcellusRegular: require('./app/assets/fonts/Marcellus-Regular.ttf'),
  });

  if (!loaded) {
    return null;
  }
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar style="dark" />
        <Provider store={store}>
          <AuthProvider>
            <Route />
          </AuthProvider>
        </Provider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
