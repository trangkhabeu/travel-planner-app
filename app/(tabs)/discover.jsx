import { View, Text, VirtualizedList, SafeAreaView, StyleSheet, ScrollView } from "react-native";
import React, { useState } from "react";
import { Colors } from "../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import CategoryButton from "../../components/Reuseable/CategoryButton";
import Listing from "../../components/Reuseable/Listing";
import GroupListing from "../../components/Reuseable/GroupListing";
import destinations from "../../data/destinations.json";
import groupData from "../../data/group.json";



export default function discover() {

  const [category, setCategory] = useState("All");
  const onCategoryChanged = (category) => {
    console.log("category", category);
    setCategory(category);
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.headingText}>Explore the beautiful world !</Text>
        <View>
          <CategoryButton onCategoryChanged={onCategoryChanged} />

          <Listing listing={destinations} category={category} />

          <GroupListing listing={groupData} />
        </View>
      </ScrollView>
    </SafeAreaView>
  ); a
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  headingText: {
    fontSize: 28,
    fontWeight: '800',
    marginTop: 30,
  }
});
