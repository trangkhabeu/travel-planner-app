import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { Colors } from "../../constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation, useRouter } from "expo-router";

export default function ReviewBooking() {
  const navigation = useNavigation();
  const router = useRouter();

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: " ",
    });
  });
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
        Review Your Booking
      </Text>
      <View
        style={{
          marginTop: 20,
        }}
      >
        <Text
          style={{
            fontFamily: "outfit-bold",
            fontSize: 20,
          }}
        >
          Before booking your trip, please review your selection{" "}
        </Text>
        {/* Destination in4 */}
        <View
          style={{
            marginTop: 40,
            display: "flex",
            flexDirection: "row",
            gap: 20,
          }}
        >
          <Ionicons name="location-outline" size={34} color="black" />
          <View>
            <Text
              style={{
                fontFamily: "outfit",
                fontSize: 20,
                color: Colors.GRAY,
              }}
            >
              Địa điểm
            </Text>
            <Text
              style={{
                fontFamily: "outfit-medium",
                fontSize: 20,
              }}
            >
              North America, USA
            </Text>
          </View>
        </View>
        {/* Destination in4 */}
        <View
          style={{
            marginTop: 20,
            display: "flex",
            flexDirection: "row",
            gap: 20,
          }}
        >
          <Ionicons name="calendar-outline" size={34} color="black" />
          <View>
            <Text
              style={{
                fontFamily: "outfit",
                fontSize: 20,
                color: Colors.GRAY,
              }}
            >
              Thời gian
            </Text>
            <Text
              style={{
                fontFamily: "outfit-medium",
                fontSize: 20,
              }}
            >
              7 days
            </Text>
          </View>
        </View>

        {/* people in4 */}
        <View
          style={{
            marginTop: 20,
            display: "flex",
            flexDirection: "row",
            gap: 20,
          }}
        >
          <Ionicons name="people-outline" size={34} color="black" />
          <View>
            <Text
              style={{
                fontFamily: "outfit",
                fontSize: 20,
                color: Colors.GRAY,
              }}
            >
              Số người
            </Text>
            <Text
              style={{
                fontFamily: "outfit-medium",
                fontSize: 20,
              }}
            >
              3
            </Text>
          </View>
        </View>

        {/* people in4 */}
        <View
          style={{
            marginTop: 20,
            display: "flex",
            flexDirection: "row",
            gap: 20,
          }}
        >
          <Ionicons name="cash-outline" size={34} color="black" />
          <View>
            <Text
              style={{
                fontFamily: "outfit",
                fontSize: 20,
                color: Colors.GRAY,
              }}
            >
              Ngân sách
            </Text>
            <Text
              style={{
                fontFamily: "outfit-medium",
                fontSize: 20,
              }}
            >
              1500$
            </Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => router.replace("/discover/pay-method")}
          style={{
            marginTop: 60,
            padding: 10,
            backgroundColor: Colors.PRIMARY,
            borderRadius: 15,
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
            Book this trip
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

