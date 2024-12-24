import api from './api';
import { saveToken, getToken } from './authToken';

const onSignIn = async () => {
  if (!email || !password) {
    ToastAndroid.show("Please enter email & password", ToastAndroid.LONG);
    return;
  }

  try {
    const response = await api.post('/app/login', { email, password });
    console.log('Response from API:', response);
    const token = response.data.token;  // Lấy token từ phản hồi API
    console.log('Token:', token);

    if (token) {
      await saveToken(token);  // Lưu token vào AsyncStorage
      router.replace("/mytrip");
    } else {
      ToastAndroid.show("Token không hợp lệ", ToastAndroid.LONG);
    }
  } catch (error) {
    console.error('Error logging in:', error);
    ToastAndroid.show("Đăng nhập thất bại", ToastAndroid.LONG);
  }
};
