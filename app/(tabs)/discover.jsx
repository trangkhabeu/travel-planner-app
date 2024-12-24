import { View, Text, VirtualizedList, SafeAreaView, StyleSheet, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import CategoryButton from "../../components/Reuseable/CategoryButton";
import Listing from "../../components/Reuseable/Listing";
import GroupListing from "../../components/Reuseable/GroupListing";
import destinations from "../../data/destinations.json";
import groupData from "../../data/group.json";
import { loadModel, recommendTours } from "../../configs/AiModal";
import { getSimilarTours } from "../../configs/NerModel";


export default function discover() {

  const [category, setCategory] = useState("All");
  const [similarTours, setSimilarTours] = useState([]);
  const [loading, setLoading] = useState(false);

  const onCategoryChanged = (category) => {
    console.log("category", category);
    setCategory(category);
  }

  useEffect(() => {
    const getPrediction = async () => {
      setLoading(true);
      try {
        const userId = 5;
        const tours = await getSimilarTours(userId);
        setSimilarTours(tours || []);
      } catch (error) {
        console.log("Error get prediction", error);
      } finally {
        setLoading(false);
      }
    };

    getPrediction();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.headingText}>Explore the beautiful world !</Text>
        <View>
          <CategoryButton onCategoryChanged={onCategoryChanged} />

          <Listing listing={similarTours} category={category} />

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
    fontWeight: '800',
    marginTop: 30,
  }
});
