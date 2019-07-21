import React from "react";
import { Provider, connect } from "react-redux";
import { colors } from "./src/utils/constants";

import { store, persistor } from "./src/store/index";
import { PersistGate } from "redux-persist/integration/react";
import Loading from "./src/components/Loading";
import { Router } from "react-native-router-flux";
import { scenes } from "./src/routes/scenes";
const RouterWithRedux = connect()(Router);
import { ThemeProvider } from "styled-components";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { ApolloProvider } from "react-apollo";
import { client } from "./src/graphql";

export default function App() {
    return (
        <Provider store={store}>
            <ApolloProvider client={client}>
                <PersistGate loading={<Loading />} persistor={persistor}>
                    <ActionSheetProvider>
                        <ThemeProvider theme={colors}>
                            <RouterWithRedux scenes={scenes}></RouterWithRedux>
                        </ThemeProvider>
                    </ActionSheetProvider>
                </PersistGate>
            </ApolloProvider>
        </Provider>
    );
}
