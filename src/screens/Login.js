import React, { useState } from 'react';
import { View, Text,TextInput,StyleSheet ,TouchableOpacity, Alert} from 'react-native';
import { Colors,FontSizes,Strings } from '../constants/Config';
import apiService from '../utils/ApiService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({navigation}) => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
  
    const handleLogin = async () => {
      if (!userName && !password) {
         Alert.alert('Validation Error', 'Please enter user name and password');
         return;
       } else if (!userName) {
         Alert.alert('Validation Error', 'Please enter user name');
         return;
       } else if (!password) {
         Alert.alert('Validation Error', 'Please enter password');
         return;
       }
      try {
        const response = await apiService('/login', 'POST', { username:userName, password:password },{'Content-Type': 'application/json'},navigation);
        console.log("login response data!!",response)
        const { access_token, refresh_token } = response;
  
        await AsyncStorage.setItem('accessToken', access_token);
        await AsyncStorage.setItem('refreshToken', refresh_token);
  
        navigation.replace('Map');
      } catch (error) {
        console.log('Login error:', error);
        Alert.alert('Login failed', error.message);
      }
    };
  return (
    <View style={styles.containerStyle}>
         <Text style={styles.titleStyle}>{Strings.welcome}</Text>
         <Text style={styles.labelStyle}>{Strings.userNameLabel}</Text>
         <TextInput 
            value={userName} 
            onChangeText={setUserName} 
            placeholder={Strings.userNamePlaceholder} 
            style={styles.inputStyle}
         />
         <Text style={styles.labelStyle}>{Strings.passwordLabel}</Text>
         <TextInput 
            value={password} 
            secureTextEntry 
            onChangeText={setPassword} 
            placeholder={Strings.passwordPlaceholder}
            style={styles.inputStyle}
         />
         <TouchableOpacity style={styles.loginBtnStyle} onPress={handleLogin}>
            <Text style={styles.loginBtnTextStyle}>{Strings.loginButton}</Text>
         </TouchableOpacity>
      </View>
  );
};
const styles = StyleSheet.create({
   containerStyle: {
       flex: 1,
       justifyContent: 'center',
       paddingHorizontal: "5%",
       backgroundColor: Colors.primary,
    },
    titleStyle: {
       fontSize: FontSizes.xLarge,
       fontWeight: 'bold',
       textAlign: 'center',
       marginBottom: "10%",
       color: Colors.white,
    },
    labelStyle: {
       fontSize: FontSizes.small,
       color: Colors.white,
       marginBottom: 5,
    },
    inputStyle: {
       height: 45,
       borderColor: Colors.primary,
       borderWidth: 1,
       borderRadius: 10,
       paddingHorizontal: "5%",
       marginBottom: 10,
       backgroundColor: Colors.white,
       color:Colors.primary,
       fontSize:FontSizes.small
    },
    loginBtnStyle:{
      width:'30%',
     backgroundColor:Colors.white,
     justifyContent:"center",
     alignItems:'center',
     borderRadius:10,
     alignSelf:'flex-end',
     marginVertical:15
    },
    loginBtnTextStyle:{
      color:Colors.primary,
      fontSize:FontSizes.small,
      paddingVertical:"10%"
    }

 });
export default Login;
