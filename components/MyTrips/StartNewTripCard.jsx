import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors } from "../../constants/Colors";
import { useRouter } from "expo-router";
export default function StartNewTripCard() {
  const router = useRouter();

  return (
    <View
      style={{
        padding: 20,
        marginTop: 50,
        display: "flex",
        alignItems: "center",
        gap: 20,
      }}
    >
      <Ionicons name="location-sharp" size={30} color="black" />
      <Text
        style={{
          fontSize: 25,
          fontFamily: "outfit-medium",
          textAlign: "center",
        }}
      >
        Chưa có chuyến đi nào được lên kế hoạch
      </Text>
      <Text
        style={{
          fontSize: 20,
          fontFamily: "outfit",
          textAlign: "center",
          color: Colors.GRAY,
          gap: 25,
        }}
      >
        Có vẻ như đã đến lúc lên kế hoạch cho một trải nghiệm du lịch mới! Bắt
        đầu bên dưới
      </Text>

      <TouchableOpacity
        onPress={() => router.push("/create-trip/search-place")}
        style={{
          padding: 10,
          backgroundColor: Colors.PRIMARY,
          borderRadius: 15,
          paddingHorizontal: 30,
        }}
      >
        <Text
          style={{
            color: Colors.WHITE,
            fontFamily: "outfit-medium",
            fontSize: 17,
          }}
        >
          Bắt đầu một chuyến đi mới
        </Text>
      </TouchableOpacity>
    </View>
  );
}

