import React from "react";

import { ActivityIndicator } from "react-native";
import styled from "styled-components/native";
import { View, StyleSheet } from "react-native";
import { colors } from "../utils/constants";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center"
    }
});
export default function Loading({ color = colors.PRIMARY, size = "large" }) {
    return (
        <View style={styles.container}>
            <ActivityIndicator size={size as any} color={color} />
        </View>
    );
}
