import React from "react";
interface IframeworkPaytableCore {
    data: {
        "COMPONENTS": any;
    }
}

export const frameworkPaytableCore: IframeworkPaytableCore = {
    data: {
        "COMPONENTS": []
    }
};

export const PaytableConfigurationContext = React.createContext(
    {}
);