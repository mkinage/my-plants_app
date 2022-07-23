import React from "react";

import { TutorialContainer, Image, ImageWrapper, TutorialText } from "components/PlantsTutorial/PlantsTutorial.styles";

const PlantsTutorial = (): JSX.Element => {
  return (
    <TutorialContainer>
      <TutorialText>Add your first plant here</TutorialText>
      <ImageWrapper>
      <Image source={require("../../assets/arrow.png")} />
      </ImageWrapper>
    </TutorialContainer>
  );
};

export default PlantsTutorial;
