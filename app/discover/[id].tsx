import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Text,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { ListingType } from "@/types/tripListingType";
import destinations from "../../data/destinations.json";
import {
  Feather,
  FontAwesome,
  FontAwesome5,
  Ionicons,
} from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import Animated, {
  interpolate,
  SlideInDown,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from "react-native-reanimated";
import { transform } from "@babel/core";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width } = Dimensions.get("window");
const IMG_HEIGHT = 300;

export default function ListingDetail() {
  const {
    id,
    tour_name,
    description,
    price,
    image,
    location,
    duration,
    average_rating,
  } = useLocalSearchParams();
  // const listing: ListingType = (destinations as ListingType[]).find(
  //   item => item.id === id
  // );

  const router = useRouter();

  const [bookmark, setBookmark] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!isLoading) {
      renderBookmark(id);
    }
  }, [isLoading]);

  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);
  const imageAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-IMG_HEIGHT, 0, IMG_HEIGHT],
            [-IMG_HEIGHT / 2, 0, IMG_HEIGHT * 0.75]
          ),
        },
        {
          scale: interpolate(
            scrollOffset.value,
            [-IMG_HEIGHT, 0, IMG_HEIGHT],
            [2, 1, 1]
          ),
        },
      ],
    };
  });

  const saveBookmark = async (itemId: string) => {
    setBookmark(true);
    await AsyncStorage.getItem("bookmark").then(token => {
      const res = JSON.parse(token);
      if (res !== null) {
        let data = res.find((val: string) => val === itemId);
        if (data == null) {
          res.push(itemId);
          AsyncStorage.setItem("bookmark", JSON.stringify(res));
          alert("Saved!");
        }
      } else {
        let bookmark = [];
        bookmark.push(itemId);
        AsyncStorage.setItem("bookmark", JSON.stringify(bookmark));
        alert("Saved!");
      }
    });
  };

  const removeBookmark = async (itemId: string) => {
    setBookmark(false);
    const bookmark = await AsyncStorage.getItem("bookmark").then(token => {
      const res = JSON.parse(token);
      return res.filter((id: string) => id !== itemId);
    });
    await AsyncStorage.setItem("bookmark", JSON.stringify(bookmark));
    alert("Unsaved!");
  };

  const renderBookmark = async (itemId: string) => {
    await AsyncStorage.getItem("bookmark").then(token => {
      const res = JSON.parse(token);
      if (res != null) {
        let data = res.find((val: string) => val === itemId);
        data == null ? setBookmark(false) : setBookmark(true);
      }
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.WHITE }}>
      <Animated.ScrollView
        ref={scrollRef}
        contentContainerStyle={{ paddingBottom: 200 }}
      >
        <View>
          <Animated.Image
            source={{ uri: image }}
            style={[styles.image, imageAnimatedStyle]}
          />
          {/* Custom Back Button */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Feather name="arrow-left" size={24} color="black" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => (bookmark ? removeBookmark(id) : saveBookmark(id))}
            style={styles.headerRightButton}
          >
            <Ionicons
              name={bookmark ? "bookmark" : "bookmark-outline"}
              size={20}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.contentWrapper}>
          <Text style={styles.listingName}>{tour_name}</Text>
          <View style={styles.listLocationWrapper}>
            <FontAwesome5
              name="map-marker-alt"
              size={18}
              style={{
                borderWidth: 1,
                borderColor: Colors.WHITE,
              }}
            />
            <Text style={styles.listLocationTxt}>{location}</Text>
          </View>
          <View style={styles.highlightWrapper}>
            <View style={{ flexDirection: "row" }}>
              <View style={styles.highlightIcon}>
                <Ionicons name="time" size={18} color={Colors.PRIMARY} />
              </View>
              <View>
                <Text style={styles.highlightTxt}>Duration</Text>
                <Text style={styles.highlightTxtVal}>{duration}</Text>
              </View>
            </View>

            <View style={{ flexDirection: "row" }}>
              <View style={styles.highlightIcon}>
                <Ionicons name="star" size={18} color={Colors.PRIMARY} />
              </View>
              <View>
                <Text style={styles.highlightTxt}>Rating</Text>
                <Text style={styles.highlightTxtVal}>{average_rating}</Text>
              </View>
            </View>
          </View>
          <Text style={styles.listingDetails}>{description}</Text>
        </View>
      </Animated.ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity
          onPress={() => router.replace("/discover/review-booking")}
          style={[styles.footerBtn, styles.footBookBtn]}
        >
          <Text style={styles.footerBtnTxt}>Book Now</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}} style={styles.footerBtn}>
          <Text style={styles.footerBtnTxt}>{price}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    top: 0,
    left: 0,
    width: width,
    height: IMG_HEIGHT + 50,
  },
  backButton: {
    position: "absolute",
    top: 30,
    left: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
  },
  headerRightButton: {
    position: "absolute",
    top: 30,
    right: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
  },
  contentWrapper: {
    padding: 20,
    backgroundColor: Colors.WHITE,
  },
  listingName: {
    fontSize: 24,
    fontWeight: "600",
    color: Colors.PRIMARY,
    letterSpacing: 0.5,
  },
  listLocationWrapper: {
    flexDirection: "row",
    marginTop: 5,
    marginBottom: 10,
    alignItems: "center",
  },
  listLocationTxt: {
    fontSize: 14,
    marginLeft: 5,
    color: Colors.PRIMARY,
  },
  highlightWrapper: {
    flexDirection: "row",
    marginVertical: 20,
    justifyContent: "flex-start",
    gap: 35,
  },
  highlightIcon: {
    backgroundColor: "rgb(227, 226, 226)",
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 8,
    marginRight: 10,
    alignItems: "center",
  },
  highlightTxt: {
    fontSize: 12,
    color: "#999",
  },
  highlightTxtVal: {
    fontSize: 14,
  },
  listingDetails: {
    fontSize: 16,
    color: Colors.PRIMARY,
    lineHeight: 25,
    letterSpacing: 0.5,
  },
  footer: {
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    padding: 20,
    paddingBottom: 30,
    width: width,
  },
  footerBtn: {
    flex: 1,
    backgroundColor: Colors.PRIMARY,
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  footBookBtn: {
    flex: 2,
    marginRight: 20,
  },
  footerBtnTxt: {
    color: Colors.WHITE,
    fontSize: 16,
    fontWeight: "600",
    textTransform: "uppercase",
  },
});
