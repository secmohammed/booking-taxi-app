import { ActionConst } from "react-native-router-flux";

const initialState = {
    scene: {}
};
interface ActionType {
    type: string;
    scene?: string;
}
export default function reducer(state = initialState, action: ActionType) {
    switch (action.type) {
        // focus action is dispatched when a new screen comes into focus
        case ActionConst.FOCUS:
            console.log(action);
            return {
                ...state,
                scene: action.scene
            };

        // ...other actions

        default:
            return state;
    }
}
