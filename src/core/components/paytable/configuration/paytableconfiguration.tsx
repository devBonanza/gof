import React from "react";

interface IframeworkPaytable {
    data: {
        "COMPONENTS": any;
    }

}

export const frameworkPaytable: IframeworkPaytable = {
    data: {
        "COMPONENTS": []
    }


};

export const PaytableConfigurationContext = React.createContext(
    {}
);