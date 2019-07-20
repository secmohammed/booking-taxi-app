import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers/index";
import { persistStore, persistReducer, Persistor } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { Store, Reducer } from "redux";
const persistConfig = {
    key: "root",
    storage
};

const persistedReducer: Reducer = persistReducer(persistConfig, rootReducer);
const initialState = {};
const middlewares = [thunk];
export const store: Store = createStore(
    persistedReducer,
    initialState,
    applyMiddleware(...middlewares)
);

export const persistor: Persistor = persistStore(store);
