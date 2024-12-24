import { View, Text, TouchableOpacity, ToastAndroid } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRouter } from "expo-router";
import { Colors } from "../../constants/Colors";
import { FontAwesome, Entypo, AntDesign } from "@expo/vector-icons";

export default function PayMethod() {
  const navigation = useNavigation();
  const [selectedOption, setSelectedOption] = useState();
  const router = useRouter();

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: "",
    });
  }, []);

  const onClickContinue = () => {
    if (!selectedOption) {
      ToastAndroid.show(
        "Select your payment method you want",
        ToastAndroid.LONG
      );
      return;
    }
    router.push("/discover/pay-trip");
  };

  return (
    <View
      style={{
        padding: 25,
        paddingTop: 75,
        backgroundColor: Colors.WHITE,
        height: "100%",
      }}
    >
      <Text
        style={{
          fontFamily: "outfit-bold",
          fontSize: 35,
          marginTop: 20,
        }}
      >
        Payment Method
      </Text>
      <View>
        <Text
          style={{
            fontFamily: "outfit-bold",
            fontSize: 20,
          }}
        >
          Select your pay method
        </Text>
        <TouchableOpacity onPress={() => setSelectedOption("paypal")}>
          <View
            style={{
              padding: 25,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              backgroundColor: Colors.LIGHT_GRAY,
              borderRadius: 15,
              marginVertical: 10,
              borderWidth: 2,
              borderColor:
                selectedOption === "paypal"
                  ? Colors.PRIMARY
                  : Colors.LIGHT_GRAY,
            }}
          >
            <View>
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: "outfit-bold",
                }}
              >
                Paypal
              </Text>
            </View>
            <Text
              style={{
                fontSize: 35,
                marginLeft: 5,
              }}
            >
              <Entypo name="paypal" size={24} color="black" />
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={() => onClickContinue()}
        style={{
          padding: 10,
          backgroundColor: Colors.PRIMARY,
          borderRadius: 15,
          marginVertical: 10,
        }}
      >
        <Text
          style={{
            textAlign: "center",
            color: Colors.WHITE,
            fontFamily: "outfit-medium",
            fontSize: 20,
          }}
        >
          Tiếp tục
        </Text>
      </TouchableOpacity>
    </View>
  );
}

