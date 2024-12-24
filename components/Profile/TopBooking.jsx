import {
  View,
  Text,
  VirtualizedList,
  SafeAreaView,
  StyleSheet,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import GroupListing from "./GroupList-c";
import groupData from "../../data/group.json";

export default function TopBooking() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <GroupListing listing={groupData} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  headingText: {
    fontSize: 28,
    fontWeight: "800",
    marginTop: 30,
  },
});

