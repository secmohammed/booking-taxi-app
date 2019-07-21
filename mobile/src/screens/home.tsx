import React from "react";
import { Actions } from "react-native-router-flux";
import styled from "styled-components/native";
import { Text } from "react-native";
// prettier-ignore
const View = styled.View`
    flex: 1;
    alignItems: center;
    justifyContent: center;
`
export default (props: any) => {
    return (
        <View>
            <Text>The current scene is titled {props.title}</Text>
            <Text onPress={Actions.profile}>This is PageOne!</Text>
        </View>
    );
};
