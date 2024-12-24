import { View, Text, Image } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Colors } from "../../constants/Colors";
import { CreateTripContext } from "../../context/CreateTripContext";
import { AI_PROMT } from "../../constants/Options";
import { getRecommendations } from "../../configs/NerModel";
import TripCard from "../../components/MyTrips/TripCard";


export default function GenerateTrip() {
  const { tripData, setTripData } = useContext(CreateTripContext);
  const [recommendData, setRecommendData] = useState(null)

  useEffect(() => {
    tripData && GenerateAiTrip();
  }, [tripData]);

  const GenerateAiTrip = async () => {
    try {
      const FINAL_PROMPT = AI_PROMT.replace(
        "{location}",
        tripData?.locationInfo?.name
      )
        .replace("{totalDays}", tripData.totalNoOfDays)
        .replace("{totalNight}", tripData.totalNoOfDays - 1)
        .replace("{traveler}", tripData.traveler?.title)
        .replace("{budget}", tripData.budget.range)
        .replace("{totalDays}", tripData.totalNoOfDays)
        .replace("{totalNight}", tripData.totalNoOfDays - 1);
      console.log("Final prompt", FINAL_PROMPT);

      const result = await getRecommendations(FINAL_PROMPT);
      if (!result) throw new Error("Error get recommendations");

      setRecommendData(result);
      console.log("result", result);
    } catch (error) {
      console.log("Error get recommendations trip", error);
    }
  };

  return (
    <View
      style={{
        padding: 25,
        backgroundColor: Colors.WHITE,
        height: "100%",
      }}
    >
      <Text>
        {recommendData ? (
          <TripCard cardData={recommendData} />
        ) : (
          <Text>No data found</Text>
        )}
      </Text>
      { }
    </View>
  );
}

