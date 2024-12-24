authToken.js
import AsyncStorage from '@react-native-async-storage/async-storage';

// Kiểm tra token format
const validateToken = (token) => {
  const tokenParts = token.split('.');
  if (tokenParts.length === 3) {
    console.log('Token format is valid');
    return true;
  } else {
    console.log('Invalid token format');
    return false;
  }
};

// Lấy token từ AsyncStorage
export const getToken = async () => {
  const token = await AsyncStorage.getItem('token');
  if (token && validateToken(token)) {
    return token;
  } else {
    console.log('Invalid token or token does not exist');
    return null;
  }
};

// Lưu token vào AsyncStorage
export const saveToken = async (token) => {
  if (validateToken(token)) {
    await AsyncStorage.setItem('token', token);
  } else {
    console.log('Token format is invalid');
  }
};


