import { SET_LOGGED_IN_USER, UNSET_LOGGED_IN_USER } from "./types";
import { AsyncStorage } from "react-native";
export const logout = () => async dispatch => {
    await AsyncStorage.removeItem("token");
    dispatch({
        type: UNSET_LOGGED_IN_USER
    });
};
export const login = payload => async dispatch => {
    await AsyncStorage.setItem("token", payload.token);
    dispatch({
        type: SET_LOGGED_IN_USER
    });
};
