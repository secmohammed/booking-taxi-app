export const SET_LOGGED_IN_USER = "SET_LOGGED_IN_USER";
export const UNSET_LOGGED_IN_USER = "UNSET_LOGGED_IN_USER";
export interface User {
    username: string;
    email: string;
    avatar: string;
}
export interface AuthenticationState {
    isAuthenticated: boolean | null;
}
export interface SetLoggedInUser {
    type: typeof SET_LOGGED_IN_USER;
    payload: User;
}
