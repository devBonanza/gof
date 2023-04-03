import React from "react";
import {Icomponent} from "../../commongame/interface/Icomponent";


interface IframeworkAutoplay {
    data: {
        "AUTOPLAY_CONTAINER_X": any,
        "AUTOPLAY_CONTAINER_Y": any,
        COMPONENTS: Icomponent[]
    }


}

export const frameworkAutoplay: IframeworkAutoplay = {
    data: {
        "AUTOPLAY_CONTAINER_X": 380,
        "AUTOPLAY_CONTAINER_Y": 50,
        "COMPONENTS": [
           
        ],
    }


};

export const AutoplayConfigurationContext = React.createContext(
    {}
);





