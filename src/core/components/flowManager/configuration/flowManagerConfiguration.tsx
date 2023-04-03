import React from "react";

interface IframeworkFlowManager {
    data: {
        COMPONENTS: any
    }
}

export const frameworkFlowManager: IframeworkFlowManager = {
    data: {
        "COMPONENTS": [],
    }

};

export const FlowManagerConfigurationContext = React.createContext(
    {}
);