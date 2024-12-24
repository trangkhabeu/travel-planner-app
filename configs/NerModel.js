import axios from "axios";

const baseUrl = "http://10.0.2.2:8000";

export const getRecommendations = async (userInput) => {
  try {
    const response = await axios.post(`${baseUrl}/recommend`, {
      text: userInput,
    });
    console.log("response", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error get recommendations",
      error.message,
      error.response?.data
    );
    return null;
  }
};

export const getSimilarTours = async (userInput) => {
  try {
    const response = await axios.post(`${baseUrl}/similarTours`, {
      user_id: userInput,
    });

    return response.data;
  } catch (error) {
    console.error(
      "Error get similar tours",
      error.message,
      error.response?.data
    );
    return null;
  }
};
