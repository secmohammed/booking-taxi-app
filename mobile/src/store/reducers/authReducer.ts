import {
    SET_LOGGED_IN_USER,
    UNSET_LOGGED_IN_USER,
    AuthenticationState
} from "../actions/types";
const initialState: AuthenticationState = {
    isAuthenticated: null
};

export default function(state = initialState, action): AuthenticationState {
    switch (action.type) {
        case SET_LOGGED_IN_USER:
            return {
                ...state,
                isAuthenticated: true
            };
        case UNSET_LOGGED_IN_USER:
            return {
                ...state,
                isAuthenticated: false
            };
        default:
            return state;
    }
}
