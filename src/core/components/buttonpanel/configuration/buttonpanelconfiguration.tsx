import React from "react";
interface IframeworkButtonPanel {
    data: {
        alwaysEnableButtonNameList: any,
        COMPONENTS: any
        COREBUTTONPANEL: any
    }
}

export const frameworkButtonPanel: IframeworkButtonPanel = {
    data: {
        alwaysEnableButtonNameList: [],
        COREBUTTONPANEL: [],
        COMPONENTS: []
    }
};

export const ButtonPanelConfigurationContext = React.createContext(
    {}
);