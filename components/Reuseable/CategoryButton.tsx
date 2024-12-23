import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import React, { useRef, useState } from "react";
import { Colors } from "../../constants/Colors";
import destinationCategories from "../../data/categories";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type Props = {
  onCategoryChanged: (category: string) => void;
};

const CategoryButton = ({ onCategoryChanged }: Props) => {
  const scrollRef = useRef<ScrollView>(null);
  const itemRef = useRef<(React.ElementRef<typeof TouchableOpacity> | null)[]>(
    []
  );
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSelectCategory = (index: number) => {
    const selected = itemRef.current[index];
    setActiveIndex(index);

    selected?.measure(x => {
      scrollRef.current?.scrollTo({ x: x, y: 0, animated: true });
    });

    onCategoryChanged(destinationCategories[index].title);
  };

  return (
    <View>
      <Text style={styles.title}>Categories</Text>

      <ScrollView
        ref={scrollRef}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          gap: 20,
          paddingVertical: 10,
          marginBottom: 10,
        }}
      >
        {destinationCategories.map((item, index) => (
          <TouchableOpacity
            key={index}
            ref={el => (itemRef.current[index] = el)}
            onPress={() => handleSelectCategory(index)}
            style={
              activeIndex == index
                ? styles.categoryBtnActive
                : styles.categoryBtn
            }
          >
            <MaterialCommunityIcons
              name={item.iconName as any}
              size={20}
              color={activeIndex == index ? Colors.WHITE : Colors.PRIMARY}
            />
            <Text
              style={
                activeIndex == index
                  ? styles.categoryBtnTxtActive
                  : styles.categoryBtnTxt
              }
            >
              {item.title}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: "700", // Use a string
    color: Colors.PRIMARY,
    marginTop: 20,
    marginBottom: 10,
  },
  categoryBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 16,
    borderRadius: 10,
    shadowColor: "#333333",
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  categoryBtnActive: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    backgroundColor: Colors.PRIMARY,
    paddingHorizontal: 16,
    borderRadius: 10,
    shadowColor: "#333333",
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  categoryBtnTxt: {
    fontSize: 16,
    marginLeft: 5,
  },
  categoryBtnTxtActive: {
    fontSize: 16,
    marginLeft: 5,
    color: Colors.WHITE,
  },
});

export default CategoryButton;
