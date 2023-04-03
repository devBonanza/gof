import React from "react";
import {Icomponent} from "../interface/Icomponent";

interface IframeworkFreeGame {
    data: {
        "POS_X": number,
        "POS_Y": number,
        COMPONENTS: Icomponent[]
    }
}

export const frameworkFreeGame: IframeworkFreeGame = {
    data: {
        "POS_X": 0,
        "POS_Y": 0,
        "COMPONENTS": []
    }
};

export const freeGameConfigurationContext = React.createContext(
    {}
);