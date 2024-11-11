// App.tsx

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignInScreen from './signin';
import SignUpScreen from './signup';
import HomeScreen from './home';
import MenuScreen from './menu';
import ViewItemsScreen from './ViewItemsScreen';
import { RootStackParamList } from './types';  // Import RootStackParamList

const Stack = createStackNavigator<RootStackParamList>();  // Typing the Stack Navigator with RootStackParamList

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignIn">
        <Stack.Screen name="SignIn" component={SignInScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Menu" component={MenuScreen} />
        <Stack.Screen name="ViewItems" component={ViewItemsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}  