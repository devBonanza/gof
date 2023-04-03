import React from "react";
import {Icomponent} from "../interface/Icomponent";

interface IframeworkPlayerMessage {
    data: {
        leftContainerInterval: number;
        rightContainerInterval: number;
        COMPONENTS: Icomponent[]
    }

}

export const frameworkPlayerMessage: IframeworkPlayerMessage = {

    data: {
        "leftContainerInterval": 2000,
        "rightContainerInterval": 2000,
        "COMPONENTS": [],
    }

};

export const PlayerMessageConfigurationContext = React.createContext(
    {}
);