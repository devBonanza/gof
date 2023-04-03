import React from "react";

interface IframeworkDesktopSettingPanel {
    data: {}
}

export const frameworkDesktopSettingPanel: IframeworkDesktopSettingPanel = {
    data: {
        "COMPONENTS": []
    }
};

export const DesktopSettingPanelConfigurationContext = React.createContext(
    {}
);