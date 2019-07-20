import React from "react";
import { Actions } from "react-native-router-flux";

import { View, Text } from "react-native";
import { connect } from "react-redux";
import MapView from "react-native-maps";
const Home = (props: any) => {
    return (
        <View>
            <Text>Thel current scene is titled {props.title}</Text>
            <Text onPress={Actions.profile}>This is PageOne!</Text>
            <MapView
                initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421
                }}
            />
        </View>
    );
};
export default connect(({ routes }: any) => ({ routes }))(Home);
