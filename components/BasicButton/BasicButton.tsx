import React from "react";

import { BasicButtonProps } from "components/BasicButton/BasicButton.interface";
import { ButtonWrapper, ButtonText } from "components/BasicButton/BasicButton.styles";

const BasicButton = ({ text, onPress, warning, important }: BasicButtonProps): JSX.Element => {
  return (
    <ButtonWrapper onPress={onPress} warning={warning} important={important}>
        <ButtonText warning={warning} important={important}>{text}</ButtonText>
    </ButtonWrapper>
  );
};

export default BasicButton;
