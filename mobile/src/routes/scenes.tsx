import React from "react";
import { Actions, Scene } from "react-native-router-flux";
import HomeScreen from "../screens/home";
import ProfileScreen from "../screens/profile";

export const scenes = Actions.create(
    <Scene key="root">
        <Scene
            key="home"
            component={HomeScreen}
            title="Home screen"
            initial={true}
        />
        <Scene key="profile" component={ProfileScreen} title="Profile Screen" />
    </Scene>
);
