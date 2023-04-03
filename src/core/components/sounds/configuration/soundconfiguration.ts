import React from "react";
import {soundAssetConfig} from "../../../data/sounds";


interface IframeworkSound {
    data: {}
}

export const frameworkSound: IframeworkSound = {
    data: {
        sfx: {},
        bg: {}

    }

};
export const soundConfigurationContext = React.createContext(
    {}
);