import { View, Text } from "react-native";
import React from "react";
import MenuList from "../../components/Profile/MenuList";
import ProfileInfor from "../../components/Profile/ProfileInfor";
import { Colors } from "../../constants/Colors";
import TopBooking from "../../components/Profile/TopBooking";
import TopTrip from "../../components/Profile/TopTrip";
import TopInfo from "../../components/Profile/TopInfo";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const Tab = createMaterialTopTabNavigator();
export default function Profile() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.WHITE,
      }}
    >
      {/*  */}
      <ProfileInfor />

      <Tab.Navigator>
        <Tab.Screen name="Booked" component={TopBooking} />
        <Tab.Screen name="Trips" component={TopTrip} />
        {/* <Tab.Screen name="Information" component={TopInfo} /> */}
      </Tab.Navigator>
    </View>
  );
}
