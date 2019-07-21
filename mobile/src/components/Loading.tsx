import React from "react";

import { ActivityIndicator } from "react-native";
import styled from "styled-components/native";
import { colors } from "../utils/constants";
// prettier-ignore
const Root = styled.View`
    flex: 1;
    backgroundColor: #fff;
    alignItems: center;
    justifyContent: center;
`;
export default function Loading({ color = colors.PRIMARY, size = "large" }) {
    return (
        <Root>
            <ActivityIndicator size={size as any} color={color} />
        </Root>
    );
}
