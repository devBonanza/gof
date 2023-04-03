import React from "react";
import {configGame} from "../../../data/config"
import {Icomponent} from "../../basegame/interface/Icomponent";

interface IframeworkReelGridContainer {
    data: {
        "REEL_COLUMN": number,
        "REEL_WIDTH": number,
        "REEL_HEIGHT": number,
        "REEL_ROWS": number,
        "REEL_GAP": number,
        "SYMBOL_WIDTH": number,
        "SYMBOL_HEIGHT": number,
        "REEL_CONTAINER_X": number,
        "REEL_CONTAINER_Y": number,
        "child": Array<Icomponent>,
        "IS_STICKY_WILD_PRESENT": boolean,

    }

}

export const frameworkReelGridContainer: IframeworkReelGridContainer = {
    data: {
        "REEL_COLUMN": configGame.REEL_COLUMN,
        "REEL_WIDTH": configGame.REEL_WIDTH,
        "REEL_ROWS": configGame.REEL_ROWS,
        "REEL_GAP": configGame.REEL_GAP,
        "SYMBOL_WIDTH": configGame.SYMBOL_WIDTH,
        "SYMBOL_HEIGHT": configGame.SYMBOL_HEIGHT,
        "REEL_CONTAINER_X": configGame.REEL_CONTAINER_X,
        "REEL_CONTAINER_Y": configGame.REEL_CONTAINER_Y,
        "REEL_HEIGHT": configGame.REEL_HEIGHT,
        "IS_STICKY_WILD_PRESENT": false,

        child: []
    }

};

export const ReelGridContainerConfigurationContext = React.createContext(
    {}
);