import React, { Component } from "react";
import styled from "styled-components/native";
import Touchable from "@appandflow/touchable";
import { Platform, Keyboard } from "react-native";

import { colors } from "../../utils/constants";
import REGISTER_MUTATION from "../../graphql/user/mutations/register";
import { graphql } from "react-apollo";

//prettier-ignore
const Root = styled(Touchable).attrs({
    feedback: "none"
})`
    flex: 1;
    position: relative;
    justifyContent: center;
    alignItems: center;
`;

//prettier-ignore
const Wrapper = styled.View`
    alignSelf: stretch;
    alignItems: center;
    justifyContent: center;
    flex: 1;
`;

//prettier-ignore
const ButtonConfirm = styled(Touchable).attrs({
    feedback: "opacity"
})`
    position: absolute;
    bottom: 15%;
    width: 70%;
    height: 50;
    backgroundColor: ${props => props.theme.PRIMARY};
    borderRadius: 10;
    justifyContent: center;
    alignItems: center;
    shadowColor: #000;
    shadowOpacity: 0.2;
    shadowRadius: 5;
    shadowOffset: 0px 2px;
    elevation: 2;
`;

//prettier-ignore
const ButtonConfirmText = styled.Text`
    color: ${colors.WHITE};
    fontWeight: 600;
`;

//prettier-ignore
const InputWrapper = styled.View`
    height: 50;
    width: 70%;
    borderBottomWidth: 2;
    marginVertical: 5;
    justifyContent: flex-end;
    borderBottomColor: ${colors.LIGHT_GRAY};
`;
const Input = styled.TextInput.attrs({
    placeholderTextColor: colors.LIGHT_GRAY,
    selectionColor: Platform.OS === "ios" ? colors.WHITE : undefined,
    autoCorrect: false
})`
    height: 30;
`;

class RegisterForm extends Component {
    constructor(props: any) {
        super(props);
        this.state = {
            email: "",
            password: "",
            loading: false
        };
    }
    _onChangeText = (text: string, type: string) =>
        this.setState({
            [type]: text
        });

    _onOutsidePress = () => Keyboard.dismiss();
    _onPressSignin = async () => {
        this.setState({
            loading: true
        });
        const repsonse = await this.props.mutate({
            variables: this.state
        });
        console.log(response);
    };
    render() {
        return (
            <Root>
                <Wrapper>
                    <InputWrapper>
                        <Input
                            onChangeText={text =>
                                this._onChangeText(text, "email")
                            }
                            placeholder="Email"
                            autoCapitalize="none"
                            keyboardType="email-address"
                        />
                    </InputWrapper>
                    <InputWrapper>
                        <Input
                            placeholder="Password"
                            secureTextEntry
                            onChangeText={text =>
                                this._onChangeText(text, "password")
                            }
                        />
                    </InputWrapper>
                    <ButtonConfirm onPress={this._onPressSignin}>
                        <ButtonConfirmText>Register</ButtonConfirmText>
                    </ButtonConfirm>
                </Wrapper>
            </Root>
        );
    }
}
export default graphql(REGISTER_MUTATION)(RegisterForm);
