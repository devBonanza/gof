import React from "react";
import {configGame} from "../../../data/config"
import {Icomponent} from "../../basegame/interface/Icomponent";

interface IframeworkGridContainer {
    data: {
        "GRID_COLUMN": number,
        "GRID_WIDTH": number,
        "GRID_ROWS": number,
        "GRID_GAP": number,
        "SYMBOL_WIDTH": number,
        "SYMBOL_HEIGHT": number,
        "HIDE_MASK": boolean,
        "GRID_CONTAINER_X": number,
        "GRID_CONTAINER_Y": number,
        "child": Array<Icomponent>
    }

}

export const frameworkGridContainer: IframeworkGridContainer = {
    data: {
        "GRID_COLUMN": configGame.REEL_COLUMN,
        "GRID_WIDTH": configGame.REEL_WIDTH,
        "GRID_ROWS": configGame.REEL_ROWS,
        "GRID_GAP": configGame.REEL_GAP,
        "SYMBOL_WIDTH": configGame.SYMBOL_WIDTH,
        "SYMBOL_HEIGHT": configGame.SYMBOL_HEIGHT,
        "HIDE_MASK": false,
        "GRID_CONTAINER_X": configGame.REEL_CONTAINER_X,
        "GRID_CONTAINER_Y": configGame.REEL_CONTAINER_Y,

        child: []
    }

};

export const GridContainerConfigurationContext = React.createContext(
    {}
);