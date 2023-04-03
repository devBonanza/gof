import React from "react";
import {Icomponent} from "../interface/Icomponent";

interface IframeworkTransitionLayer {
    data: {
        COMPONENTS: Icomponent[]
    }
}

export const frameworkTransitionLayer: IframeworkTransitionLayer = {
    data: {
        "COMPONENTS": [],
    }

};

export const TransitionLayerConfigurationContext = React.createContext(
    {}
);