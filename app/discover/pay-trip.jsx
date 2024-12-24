import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useContext, useEffect } from "react";
import { Colors } from "../../constants/Colors";
import { useRouter } from "expo-router";
import { replace } from "expo-router/build/global-state/routing";
export default function GenerateTrip() {
  const router = useRouter();
  return (
    <View
      style={{
        padding: 25,
        backgroundColor: Colors.WHITE,
        height: "100%",
      }}
    >
      <Text
        style={{
          fontFamily: "outfit-bold",
          fontSize: 35,
          textAlign: "center",
        }}
      >
        Payment Success
      </Text>

      <Text
        style={{
          fontFamily: "outfit-medium",
          fontSize: 20,
          textAlign: "center",
          marginTop: 40,
        }}
      >
        Hope you have a nice trip!
      </Text>

      <Image
        source={require("./../../assets/images/success.gif")}
        style={{
          width: "100%",
          height: 300,
          objectFit: "contain",
        }}
      />
      <TouchableOpacity
        onPress={() => router.replace("/mytrip")}
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
          Continute
        </Text>
      </TouchableOpacity>
    </View>
  );
}

