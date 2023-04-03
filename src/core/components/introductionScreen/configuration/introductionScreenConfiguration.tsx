import React from "react";

interface IframeworkIntroductionScreen {
    data: {
        "COMPONENTS": any;
    }
}

export const frameworkIntroductionScreen: IframeworkIntroductionScreen = {
    data: {
        "COMPONENTS": []
    }
};

export const IntroductionScreenConfigurationContext = React.createContext(
    {}
);