import { SET_LOGGED_IN_USER, UNSET_LOGGED_IN_USER } from "./types";
import { AsyncStorage } from "react-native";
interface Login {
    token: string;
}
export const logout = () => async (dispatch: any) => {
    await AsyncStorage.removeItem("token");
    dispatch({
        type: UNSET_LOGGED_IN_USER
    });
};
export const login = (payload: Login) => async (dispatch: any) => {
    await AsyncStorage.setItem("token", payload.token);
    dispatch({
        type: SET_LOGGED_IN_USER
    });
};
