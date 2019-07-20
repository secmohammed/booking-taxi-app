import React from "react";

import { View, Text } from "react-native";
import { connect } from "react-redux";
const Home = (props: any) => {
    return (
        <View>
            <Text>The current scene is titled {props.title}</Text>
        </View>
    );
};
export default connect(({ routes }: any) => ({ routes }))(Home);
