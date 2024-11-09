import { Platform } from "react-native";

// export const API_URL="http://localhost:8080"
export const API_URL = Platform.OS === 'android' ? 'http://10.0.2.2:8080' : 'http://localhost:8080';

export const GOOGLE_MAP_API_KEY="AIzaSyA96LWVndNZMxLLoysSoYtgSpDSCp9SJ8E"


export const Colors = {
    primary: '#007AFF',
    secondary: '#4CAF50',
    white:"#FFFFFF",
    button: '#4285F4',
  };
  
  export const FontSizes = {
    xsmall: 12,
    small:14,
    medium: 16,
    large: 20,
    xLarge:24
  };
  
  export const Strings = {
    welcome: 'Welcome',
    userNameLabel: 'User Name',
    passwordLabel: 'Password',
    userNamePlaceholder:'Enter user name',
    passwordPlaceholder:"Enter password",
    loginButton:"Login"
  };