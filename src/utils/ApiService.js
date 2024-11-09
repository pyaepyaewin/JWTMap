import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../constants/Config';
import { Alert } from 'react-native';

const getAccessToken = async () => {
  try {
    const token = await AsyncStorage.getItem('accessToken');
    console.log("token!!!!!!!!!",token)
    return token;
  } catch (error) {
    console.error('Error fetching access token:', error);
  }
};
const refreshAccessToken = async (navigation) => {
  try {
    const refreshToken = await AsyncStorage.getItem('refreshToken');
   
    const response = await apiService('/refresh', 'POST', refreshToken,null,navigation);

    const { access_token, refresh_token } = response.data;
    console.log("refresh token data",response)
    await AsyncStorage.setItem('accessToken', access_token);
    await AsyncStorage.setItem('refreshToken', refresh_token);

    return access_token;
  } catch (error) {
    console.log('Token refresh failed:', error);
    throw new Error('Session expired. Please log in again.');
  }
};

const apiService = async (endpoint, method = 'GET', data = null, customHeaders = {}, navigation) => {
  let token = await getAccessToken();
  console.log("Access Token:", token);

  const headers = {
    Authorization: token ? `Bearer ${token}` : '',
    ...customHeaders,
  };

  console.log("endpoint", `${API_URL}${endpoint}`);
  console.log("data", data);
  console.log("header", headers);

  try {
    const response = await axios({
      url: `${API_URL}${endpoint}`,
      method,
      headers,
      data,
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) {
        if (endpoint === '/login') {
          throw new Error('Invalid username or password.');
        } else {
          try {
            token = await refreshAccessToken(navigation);
            headers.Authorization = `Bearer ${token}`;
            const retryApiCall = await axios({ url: `${API_URL}${endpoint}`, method, headers:'', data });
            return retryApiCall.data;
          } catch (refreshError) {
            Alert.alert("Session Expired","Your session has expired.Please login again.")
            navigation.navigate("Login")
          }
        }
      }
      else {
        console.error('API call error:', error.response.status, error.response.data);
        throw error; 
      }
    }
    else {
      console.error('Network or other error:', error.message);
      throw error; 
    }
  }
};


export default apiService;
