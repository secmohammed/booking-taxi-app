import React from "react";
import { Actions, Scene } from "react-native-router-flux";
import HomeScreen from "../screens/home";
import ProfileScreen from "../screens/profile";
import LoginScreen from "../screens/auth/login";
import RegisterScreen from "../screens/auth/register";
export const scenes = Actions.create(
    <Scene key="root">
        <Scene
            key="home"
            component={HomeScreen}
            title="Home screen"
            initial={true}
        />
        <Scene key="authentication" tabs initial hideNavBar>
            <Scene
                key="login"
                component={LoginScreen}
                title="login"
                hideNavBar
            />
            <Scene
                key="register"
                component={RegisterScreen}
                title="register"
                hideNavBar
            />
        </Scene>
        <Scene key="profile" component={ProfileScreen} title="Profile Screen" />
    </Scene>
);
