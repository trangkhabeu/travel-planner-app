import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRouter } from "expo-router";
import { Colors } from "./../../../constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios"

export default function SignIn() {
  const navigation = useNavigation();
  const router = useRouter();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const onSignIn = async () => {
    if (!email || !password) {
      ToastAndroid.show("Vui lòng nhập email và mật khẩu", ToastAndroid.LONG);
      return;
    }

    try {
      const response = await axios.post("http://10.0.2.2:8000/api/app/login", {
        email: email,
        password: password,
      });

      if (response.status === 200) {
        const { access_token } = response.data;

        // Lưu token vào AsyncStorage hoặc SecureStore
        await AsyncStorage.setItem("access_token", access_token);

        ToastAndroid.show("Đăng nhập thành công!", ToastAndroid.SHORT);

        // Chuyển hướng đến trang mytrip
        router.replace("/mytrip");
      } else {
        ToastAndroid.show("Đăng nhập thất bại, vui lòng thử lại!", ToastAndroid.LONG);
      }
    } catch (error) {
      console.error(error);
      ToastAndroid.show("Đăng nhập thất bại: Kiểm tra email hoặc mật khẩu.", ToastAndroid.LONG);
    }
  };

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
        Hãy đăng nhập nào
      </Text>
      <Text
        style={{
          fontFamily: "outfit",
          fontSize: 30,
          color: Colors.GRAY,
          marginTop: 20,
        }}
      >
        Chào mừng trở lại
      </Text>
      <Text
        style={{
          fontFamily: "outfit",
          fontSize: 30,
          color: Colors.GRAY,
          marginTop: 10,
        }}
      >
        Rất vui được gặp lại bạn!
      </Text>

      {/* email */}
      <View style={{ marginTop: 50 }}>
        <Text style={{ fontFamily: "outfit" }}>Email</Text>
        <TextInput
          onChangeText={(value) => setEmail(value)}
          style={styles.input}
          placeholder="Nhập Email"
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

      {/* sign in button */}
      <TouchableOpacity
        onPress={onSignIn}
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
          Đăng Nhập
        </Text>
      </TouchableOpacity>

      {/* create acc button */}
      <TouchableOpacity
        onPress={() => router.replace("auth/sign-up")}
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
          Tạo Tài Khoản Mới
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
