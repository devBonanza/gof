import React from "react";

interface IframeworkKeyboardListener {
    data: {}
}

export const frameworkKeyboardListener: IframeworkKeyboardListener = {
    data: {
        "COMPONENTS": []
    }

};
export const keyboardListenerConfigurationContext = React.createContext(
    {}
);