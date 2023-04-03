import React from "react";
import {Icomponent} from "../interface/Icomponent";

interface IframeworkBaseGame {
    data: {
        COMPONENTS: Icomponent[]
    }
}

export const frameworkCommonGame: IframeworkBaseGame = {
    data: {
        "COMPONENTS": [],
    }
};

export const CommonGameConfigurationContext = React.createContext(
    {}
);