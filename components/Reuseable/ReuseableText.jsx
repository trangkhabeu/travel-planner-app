import React from "react";
import { View } from "react-native-web";

const ReuseableText = ({ text, family, size, color }) => {
    return (
        <Text style={styles.textStyle()}>{text}</Text>
    )
};

export default ReuseableText;

const styles = StyleSheet.create({
    textStyle: (family, size, color) => ({
        fontFamily: family,
        fontSize: size,
        color: color
    })
})