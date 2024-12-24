import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useNavigation, useRouter } from "expo-router";
import { SelectBudgetOptions } from "../../constants/Options";
import OptionCard from "../../components/CreateTrip/OptionCard";
import { Colors } from "../../constants/Colors";
import { CreateTripContext } from "../../context/CreateTripContext";

export default function SelectBudget() {
  const navigation = useNavigation();
  const [selectedOption, setSelectedOption] = useState();
  const { tripData, setTripData } = useContext(CreateTripContext);
  const router = useRouter();

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: "",
    });
  }, []);

  useEffect(() => {
    console.log("Selected Option:", selectedOption);
    setTripData({
      ...tripData,
      budget: selectedOption ? { title: selectedOption?.title, range: selectedOption?.range } : null,
    });
  }, [selectedOption]);

  const onClickContinue = () => {
    if (!selectedOption) {
      ToastAndroid.show("Chọn ngân sách bạn mong muốn", ToastAndroid.LONG);
      return;
    }
    router.push("/create-trip/review-trip");
  };

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
        Ngân sách
      </Text>
      <View>
        <Text
          style={{
            fontFamily: "outfit-bold",
            fontSize: 20,
          }}
        >
          Chọn thói quen chi tiêu cho chuyến đi của bạn
        </Text>
        <FlatList
          data={SelectBudgetOptions}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={{
                marginVertical: 10,
              }}
              onPress={() => setSelectedOption(item)}
            >
              <OptionCard option={item} selectedOption={selectedOption} />
            </TouchableOpacity>
          )}
        />
      </View>

      <TouchableOpacity
        onPress={() => onClickContinue()}
        style={{
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
          Tiếp tục
        </Text>
      </TouchableOpacity>
    </View>
  );
}

