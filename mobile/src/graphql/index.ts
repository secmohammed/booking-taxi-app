import ApolloClient from "apollo-client";
import { RetryLink } from "apollo-link-retry";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { AsyncStorage } from "react-native";
import { setContext } from "apollo-link-context";
import config from "react-global-configuration";
import { getMainDefinition } from "apollo-utilities";
require("../config");

const customFetch = (uri: any, options: any) => {
    return fetch(uri, options)
        .then((response: any) => {
            if (response.status >= 400) {
                // or handle 400 errors
                return Promise.reject(response);
            }
            return response;
        })
        .catch(err => console.log(err));
};

const httpLink = createHttpLink({
    uri: config.get("graphql.uri"),
    fetch: customFetch
});

const link = new RetryLink().split(({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === "OperationDefinition" && operation === "subscription";
}, httpLink);
const authLink = setContext(async (_, { headers }) => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
        return {
            headers: {
                ...headers,
                authorization: `Bearer ${token}`
            }
        };
    }
    return {
        headers
    };
});
export const client = new ApolloClient({
    link: authLink.concat(link),
    cache: new InMemoryCache()
});
