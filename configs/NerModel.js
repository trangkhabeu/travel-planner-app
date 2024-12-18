import axios from "axios";

const baseUrl = "http://192.168.1.152:8000";

export const getRecommendations = async (userInput) => {
    try {
        const response = await axios.post(`${baseUrl}/recommend`, {
            text: userInput
        });
        console.log("response", response);
        return response.data;
    } catch (error) {
        console.error("Error get recommendations", error.message, error.response?.data);
        return null;
    }
};

