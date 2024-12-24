import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRouter } from "expo-router";
import { Colors } from "../../../constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import api from '../../../services/api'; // Import api từ folder service

export default function SignUp() {
  const navigation = useNavigation();
  const router = useRouter();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [name, setName] = useState();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const OnCreateAccount = async () => {
    if (!email || !password || !name) {
      ToastAndroid.show('Please enter all details', ToastAndroid.LONG);
      return;
    }

    try {
      const response = await api.post('/app/register', {
        email,
        password,
        name,
      });
      ToastAndroid.show('Account created successfully!', ToastAndroid.LONG);
      console.log('Response:', response.data);
      router.replace('/mytrip');
    } catch (error) {
      console.error('Error:', error.response?.data || error.message);
      ToastAndroid.show('Failed to create account', ToastAndroid.LONG);
    }
  };

  useEffect(() => {
    api.get('/test')
      .then((response) => {
        console.log('API Test Response:', response.data);
      })
      .catch((error) => {
        console.error('API Test Error:', error.response?.data || error.message);
      });
  }, []);

  return (
    <View
      style={{
        padding: 25,
        paddingTop: 40,
        backgroundColor: Colors.WHITE,
        height: "100%",
      }}
    >
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      <Text
        style={{
          fontFamily: "outfit-bold",
          fontSize: 30,
          marginTop: 30,
        }}
      >
        Tạo Tài Khoản Mới
      </Text>

      {/* enter full name */}
      <View style={{ marginTop: 50 }}>
        <Text style={{ fontFamily: "outfit" }}> Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Nhập tên đầy đủ"
          onChangeText={(value) => setName(value)}
        />
      </View>

      {/* email */}
      <View style={{ marginTop: 10 }}>
        <Text style={{ fontFamily: "outfit" }}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Nhập Email"
          onChangeText={(value) => setEmail(value)}
        />
      </View>

      {/* passwords */}
      <View style={{ marginTop: 10 }}>
        <Text style={{ fontFamily: "outfit" }}>Mật khẩu</Text>
        <TextInput
          secureTextEntry={true}
          style={styles.input}
          onChangeText={(value) => setPassword(value)}
          placeholder="Nhập mật khẩu"
        />
      </View>

      {/* create acc button */}
      <TouchableOpacity
        onPress={OnCreateAccount}
        style={{
          padding: 20,
          backgroundColor: Colors.PRIMARY,
          borderRadius: 15,
          marginTop: 50,
        }}
      >
        <Text
          style={{
            color: Colors.WHITE,
            textAlign: "center",
          }}
        >
          Tạo Tài Khoản
        </Text>
      </TouchableOpacity>

      {/* create acc button */}
      <TouchableOpacity
        onPress={() => router.replace("auth/sign-in")}
        style={{
          padding: 20,
          backgroundColor: Colors.WHITE,
          borderRadius: 15,
          marginTop: 20,
          borderWidth: 1,
        }}
      >
        <Text
          style={{
            color: Colors.PRIMARY,
            textAlign: "center",
          }}
        >
          Đăng Nhập
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: Colors.GRAY,
    fontFamily: "outfit",
  },
});
