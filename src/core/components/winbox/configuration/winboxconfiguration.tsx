import React from "react";
import {configGame} from "../../../data/config"
import {Ianimation} from "../../ui/interface/Ianimation";

interface IframeworkWinbox {
    data: {
        "WINBOX_TYPE": string,
        "CANVAS_WIDTH": number,
        "CANVAS_HEIGHT": number,
        "REEL_CONTAINER_X": number,
        "REEL_CONTAINER_Y": number,
        "SYMBOL_WIDTH": number,
        "SYMBOL_HEIGHT": number,
        "REEL_WIDTH": number,
        "REEL_COLUMN": number,
        "REEL_WIDTH_GAP": number,
        "onWinMask": Array<boolean>,
        "REEL_HEIGHT_GAP": number,
        "LINE_COLOR_LIST": Array<string>,
        "WINBOX_ANIMATION": Array<Ianimation>,
        "LINE_COORDINATES_LIST": Array<Array<number>>
        "REEL_CONTAINER_X_IN_PORTRAIT": number,
        "REEL_CONTAINER_Y_IN_PORTRAIT": number,
        "REEL_CONTAINER_SCALE": number,
        "REEL_CONTAINER_SCALE_IN_PORTRAIT": number,
        "ALPHA_OF_NON_HIGHLIGHTED_SYMBOL": number,
    }


}

export const frameworkWinbox: IframeworkWinbox = {
    data: {
        "WINBOX_TYPE": "CUSTOM",//custom , image , animation
        "CANVAS_WIDTH": configGame.CANVAS_WIDTH,
        "CANVAS_HEIGHT": configGame.CANVAS_HEIGHT,
        "REEL_CONTAINER_X": configGame.REEL_CONTAINER_X,
        "REEL_CONTAINER_Y": configGame.REEL_CONTAINER_Y,
        "SYMBOL_WIDTH": configGame.SYMBOL_WIDTH,
        "SYMBOL_HEIGHT": configGame.SYMBOL_HEIGHT,
        "REEL_WIDTH": configGame.REEL_WIDTH,
        "REEL_COLUMN": configGame.REEL_COLUMN,
        "REEL_WIDTH_GAP": configGame.REEL_GAP,
        "onWinMask": [true, true, true, false, false],
        "REEL_HEIGHT_GAP": 0,
        "LINE_COLOR_LIST": ["#860", "#8c56c2", "#c2c256", "#56c2c2", "#c25656", "#8c8c8c"],
        "REEL_CONTAINER_X_IN_PORTRAIT": configGame.REEL_CONTAINER_X_IN_PORTRAIT,
        "REEL_CONTAINER_Y_IN_PORTRAIT": configGame.REEL_CONTAINER_Y_IN_PORTRAIT,
        "REEL_CONTAINER_SCALE": configGame.REEL_CONTAINER_SCALE,
        "REEL_CONTAINER_SCALE_IN_PORTRAIT": configGame.REEL_CONTAINER_SCALE_IN_PORTRAIT,
        "ALPHA_OF_NON_HIGHLIGHTED_SYMBOL": 0,
        "WINBOX_ANIMATION": [],
        "LINE_COORDINATES_LIST": []

    }

}
export const WinboxConfigurationContext = React.createContext(
    {}
);