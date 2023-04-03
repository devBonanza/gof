import React from "react";
import { configGame } from "../../../data/config";

interface IframeworkReelContainer {
    data: {}
}

export const frameworkLandingSymbol: IframeworkReelContainer = {
    data: {
        "SYMBOL_WIDTH": configGame.SYMBOL_WIDTH,
        "SYMBOL_HEIGHT": configGame.SYMBOL_HEIGHT,
        "SINGLE_SYMBOL_DELAY_IN_ANIM": 1,
        "SYMBOL_ANIMATION_GRP_WISE": false,
        "SYMBOL_ANIMATION_EFFECT": [],

        "symbols": [],

        "symbolsAnimation": [],
    }
};


export const LandingSymbolConfigurationContext = React.createContext(
    {}
);