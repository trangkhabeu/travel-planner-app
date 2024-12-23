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
    //     if (tripData) {
    //       (async () => {
    //         await GenerateAiTrip();
    //       })
    //       // GenerateAiTrip();
    //     }
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
        .replace("{budget}", tripData.budget)
        .replace("{totalDays}", tripData.totalNoOfDays)
        .replace("{totalNight}", tripData.totalNoOfDays - 1);
      console.log("Final prompt", FINAL_PROMPT);

      const result = await getRecommendations(FINAL_PROMPT);
      if (!result) throw new Error("Error get recommendations");

      setRecommendData(result);
      console.log(result);
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
      {/* <Text
        style={{
          fontFamily: "outfit-bold",
          fontSize: 35,
          textAlign: "center",
        }}
      >
        Please Wait....
      </Text> */}

{/*       <Text */}
{/*         style={{ */}
{/*           fontFamily: "outfit-medium", */}
{/*           fontSize: 20, */}
{/*           textAlign: "center", */}
{/*           marginTop: 40, */}
{/*         }} */}
{/*       > */}
{/*         We are working to generate your trip */}
{/*       </Text> */}
      {/* 
      <Text>
        {recommendData && JSON.stringify(recommendData)}
      </Text> */}

      <TripCard />

      {/* <Image
        source={require("./../../assets/images/load.gif")}
        style={{
          width: "100%",
          height: 300,
          objectFit: "contain",
        }}
      />
      <Text
        style={{
          fontFamily: "outfit",
          color: Colors.GRAY,
          fontSize: 20,
          textAlign: "center",
        }}
      >
        Do not go back
      </Text> */}
    </View>
  );
}

