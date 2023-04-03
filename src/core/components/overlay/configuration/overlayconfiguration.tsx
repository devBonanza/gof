import React from "react";

interface IframeworkOverlay {
    data: {
        COMPONENTS: any,
    }
}

export const frameworkOverlay: IframeworkOverlay = {
    data: {
        "COMPONENTS": [],
    }
};

export const OverlayConfigurationContext = React.createContext(
    {}
);