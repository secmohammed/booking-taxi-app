import React from "react";

import { View, Text } from "react-native";
export default (props: any) => {
    return (
        <View>
            <Text>The current scene is titled {props.title}</Text>
        </View>
    );
};
