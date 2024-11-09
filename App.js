import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useState,useEffect } from 'react';
import Login from './src/screens/Login';  
import Map from './src/screens/Map';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  useEffect(() => {
    checkLoginStatus();
  }, []);
  const checkLoginStatus = async () => {
    try {
      const token = await AsyncStorage.getItem('accessToken');
      if (token) {
        console.log("It is existing user.")
        setIsLoggedIn(true);  
      } else {
        console.log("It is new user.")
        setIsLoggedIn(false); 
      }
    } catch (error) {
      console.log('Error checking login status:', error);
      setIsLoggedIn(false); 
    }
  };
  if (isLoggedIn === null) {
    return null; 
  }
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName={isLoggedIn ? "Map" : "Login"}>
        <Stack.Screen name="Login" component={Login} options={{headerShown:false}}/>
        <Stack.Screen name="Map" component={Map} options={{headerShown:false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}


