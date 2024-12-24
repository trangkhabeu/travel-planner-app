import {
  View,
  Text,
  FlatList,
  ListRenderItem,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import { ListingType } from "@/types/tripListingType";
import { Colors } from "../../constants/Colors";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { Link, router, useRouter } from "expo-router";

type Props = {
  listing: any[];
  category: string;
};

const Listing = ({ listing, category }: Props) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    console.log("Update listing");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 200);
  }, [category]);

  const renderItems: ListRenderItem<ListingType> = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() =>
          router.push({
            pathname: "/discover/[id]",
            params: {
              id: item.tour_id,
              tour_name: item.tour_name,
              description: item.description,
              price: item.price,
              image: item.image,
              location: item.location,
              duration: item.duration,
              average_rating: item.average_rating,
            },
          })
        }
      >
        <View style={styles.item}>
          <Image source={{ uri: item.image }} style={styles.image} />
          <View style={styles.bookmark}>
            <Ionicons name="bookmark-outline" size={20} color={Colors.WHITE} />
          </View>
          <Text style={styles.itemTxt} numberOfLines={1} ellipsizeMode="tail">
            {item.tour_name}
          </Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <FontAwesome5
                name="map-marker-alt"
                size={18}
                style={{ marginRight: 5 }}
                color={Colors.PRIMARY}
              />
              <Text style={[styles.itemLocationTxt]}>{item.location}</Text>
            </View>
            <Text style={styles.itemPriceTxt}>{item.price} VND</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View>
      <FlatList
        data={loading ? [] : listing}
        renderItem={renderItems}
        horizontal
        showsHorizontalScrollIndicator={false}
      ></FlatList>
    </View>
  );
};

export default Listing;

const styles = StyleSheet.create({
  item: {
    backgroundColor: Colors.LIGHT_GRAY,
    padding: 10,
    borderRadius: 10,
    marginRight: 20,
    width: 220,
    // overflow: "hidden",
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 30,
  },
  bookmark: {
    position: "absolute",
    top: 185,
    right: 30,
    backgroundColor: Colors.PRIMARY,
    padding: 10,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: Colors.WHITE,
  },
  itemTxt: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
  },
  itemLocationTxt: {
    fontSize: 12,
  },
  itemPriceTxt: {
    fontSize: 12,
    fontWeight: "600",
    color: Colors.PRIMARY,
  },
});
