import React from "react";
import {configGame} from "../../../../data/config"
import {Ianimation} from "../../ui/interface/Ianimation";

interface IframeworkPayline {
    data: {

        "PAYLINE_TYPE": string,//custom , image , animation
        "NO_OF_LINE": number,
        "WIN_PRESENTATION_PHASE": Array<string>,
        "DISPLAY_ALL_WIN_DURATION": number,
        "TOGGLE_WIN_DURATION": number,
        "TOGGLE_WIN_DURATION_IDLE": number,
        "CANVAS_WIDTH": number,
        "CANVAS_HEIGHT": number,
        "REEL_CONTAINER_X": number,
        "REEL_CONTAINER_Y": number,
        "REEL_CONTAINER_X_IN_PORTRAIT": number,
        "REEL_CONTAINER_Y_IN_PORTRAIT": number,
        "SYMBOL_WIDTH": number,
        "SYMBOL_HEIGHT": number,
        "REEL_WIDTH": number,
        "REEL_COLUMN": number,
        "REEL_WIDTH_GAP": number,
        "onWinMask": Array<boolean>,
        "lineMaskType": string,
        "REEL_HEIGHT_GAP": number,
        "LINE_COLOR_LIST": Array<string>,
        "PAYLINE_ANIMATION": Array<Ianimation>,
        "LINE_COORDINATES_LIST": Array<Array<number>>,
        "REEL_CONTAINER_SCALE": number,
        "REEL_CONTAINER_SCALE_IN_PORTRAIT": number,
        "WIN_SYMBOL_IN_LINE_LIST": Array<Array<number>>,
        "REEL_POST_STOP_FEATURE_TIMER": number,
    }

}

export const frameworkPayline: IframeworkPayline = {
    data: {
        "PAYLINE_TYPE": "BLANK",//custom , image , animation
        "NO_OF_LINE": 5,
        "WIN_PRESENTATION_PHASE": ["allLine", "singleLine", "idleLine"],
        "DISPLAY_ALL_WIN_DURATION": configGame.DISPLAY_ALL_WIN_DURATION,
        "TOGGLE_WIN_DURATION": configGame.TOGGLE_WIN_DURATION,
        "TOGGLE_WIN_DURATION_IDLE": configGame.TOGGLE_WIN_DURATION_IDLE,
        "CANVAS_WIDTH": configGame.CANVAS_WIDTH,
        "CANVAS_HEIGHT": configGame.CANVAS_HEIGHT,
        "REEL_CONTAINER_X": configGame.REEL_CONTAINER_X,
        "REEL_CONTAINER_Y": configGame.REEL_CONTAINER_Y,
        "REEL_CONTAINER_X_IN_PORTRAIT": configGame.REEL_CONTAINER_X_IN_PORTRAIT,
        "REEL_CONTAINER_Y_IN_PORTRAIT": configGame.REEL_CONTAINER_Y_IN_PORTRAIT,
        "REEL_CONTAINER_SCALE": configGame.REEL_CONTAINER_SCALE,
        "REEL_CONTAINER_SCALE_IN_PORTRAIT": configGame.REEL_CONTAINER_SCALE_IN_PORTRAIT,
        "SYMBOL_WIDTH": configGame.SYMBOL_WIDTH,
        "SYMBOL_HEIGHT": configGame.SYMBOL_HEIGHT,
        "REEL_WIDTH": configGame.REEL_WIDTH,
        "REEL_COLUMN": configGame.REEL_COLUMN,
        "REEL_WIDTH_GAP": configGame.REEL_GAP,
        "onWinMask": [false, false, false, false, false],
        "lineMaskType": "symbolBox",
        "REEL_HEIGHT_GAP": 0,
        "LINE_COLOR_LIST": ["#860", "#8c56c2", "#c2c256", "#56c2c2", "#c25656", "#8c8c8c"],
        "PAYLINE_ANIMATION": [],
        "LINE_COORDINATES_LIST": [],
        "WIN_SYMBOL_IN_LINE_LIST": [],
        "REEL_POST_STOP_FEATURE_TIMER": configGame.REEL_POST_STOP_FEATURE_TIMER,

    }


}
export const PaylineConfigurationContext = React.createContext(
    {}
);