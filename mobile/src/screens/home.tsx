import React from "react";
import { Actions } from "react-native-router-flux";

import { View, Text } from "react-native";
export default (props: any) => {
    return (
        <View>
            <Text>Thel current scene is titled {props.title}</Text>
            <Text onPress={Actions.profile}>This is PageOne!</Text>
        </View>
    );
};
