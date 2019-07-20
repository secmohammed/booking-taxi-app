import { combineReducers } from "redux";
import authReducer from "./authReducer";
import routeReducer from "./routes";

export default combineReducers({
    auth: authReducer,
    //@ts-ignore
    routes: routeReducer
});
