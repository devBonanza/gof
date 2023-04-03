import React from "react";
import {configGame} from "../../../data/config"


interface IframeworkReels {
    data: {
        "REEL_COLUMN": number,
        "REEL_WIDTH": number,
        "REEL_ROWS": number,
        "REEL_GAP": number,
        "SYMBOL_WIDTH": number,
        "SYMBOL_HEIGHT": number,
        "LANDING_SYMBOL_ID_LIST":any,
        "REEL_BLUR": boolean,
        "SPIN_SPEED": Array<number>,
        "ANTICIPATION_SPIN_SPEED": Array<number>,
        "createPosition": {
            "x": number,
            "y": number
        },
        "endPosition": {
            "x": number,
            "y": number
        },
        "singlePositionDropDuration": number,
        "delayDropDuration": number,
        "staggerColumnDelay": number,
        "staggerDropDelay": number,

        "gridPositionIds": any,
        "gridPositions": any,
        "WOBBLE_HEIGHT": Array<number>,
        "WOBBLE_SPEED": Array<number>,
        "CURRENT_WOBBLE_HEIGHT": Array<number>,
        "WIND_SPEED": Array<number>,
        "WIND_HEIGHT": Array<number>,
        "SYMBOL_NUMBER_OFFSET": Array<number>,
        "REEL_STOP_DIFFERENCE": Array<number>,
        "SPIN_SYMBOL_COUNT": Array<number>,
        "SYMBOL_IN_VIEW_COUNT": Array<number>,
        "SPIN_SYMBOL_LENGTH": Array<number>,
        "TURBO_SPIN_SYMBOL_LENGTH": Array<number>,
        "ANTICIPATION_SYMBOL_LENGTH": Array<number>,
        "FPS": Array<number>,
        "FPS_INTERVAL": Array<number>,
        "FRAME_COUNT": Array<number>,
        "START_TIME": Array<number>,
        "NOW": Array<number>,
        "THEN": Array<number>,
        "Y_OFFSET": Array<number>,
        "TURBO": Array<boolean>,
        "STOP_TICK": Array<boolean>,
        "ELAPSED": Array<number>,
        "STOPABLE": Array<boolean>,
        "SYMBOLS_BETWEEN_STOP": Array<number>,
        "SPINNING": Array<boolean>,
        "ENABLED": Array<boolean>,
        "SYMBOL_HEIGHT_MAPPING_LIST":any,
    }

}

export const frameworkReels: IframeworkReels = {
    data: {
        "REEL_COLUMN": configGame.REEL_COLUMN,
        "REEL_WIDTH": configGame.REEL_WIDTH,
        "REEL_ROWS": configGame.REEL_ROWS,
        "REEL_GAP": configGame.REEL_GAP,
        "SYMBOL_WIDTH": configGame.SYMBOL_WIDTH,
        "SYMBOL_HEIGHT": configGame.SYMBOL_HEIGHT,
        "LANDING_SYMBOL_ID_LIST":[],
        "REEL_BLUR": false,
        "SPIN_SPEED": [1, 2, 3, 4, 5],
        "ANTICIPATION_SPIN_SPEED": [1, 1, 1, 1, 1],
        "staggerDropDelay": 180,
        "staggerColumnDelay": 180,
        "singlePositionDropDuration": 80,
        "delayDropDuration": 2000,
        "createPosition": {
            "x": 64,
            "y": -104
        },
        "endPosition": {
            "x": 64,
            "y": 764
        },
        "gridPositionIds": [4, 3, 2, 1, 0],
        "gridPositions": [
            {
                "x": 64,
                "y": 504
            },
            {
                "x": 64,
                "y": 394
            },
            {
                "x": 64,
                "y": 284
            },
            {
                "x": 64,
                "y": 174
            },
            {
                "x": 64,
                "y": 64
            }
        ],

        "WOBBLE_HEIGHT": [25, 25, 25, 25, 25],
        "WOBBLE_SPEED": [0.08, 0.08, 0.08, 0.08, 0.08],
        "CURRENT_WOBBLE_HEIGHT": [0, 0, 0, 0, 0],
        "WIND_SPEED": [0.05, 0.05, 0.05, 0.05, 0.05],
        "WIND_HEIGHT": [25, 25, 25, 25, 25],
        "SYMBOL_NUMBER_OFFSET": [0, 0, 0, 0, 0],
        "REEL_STOP_DIFFERENCE": [0, 0, 0, 0, 0],
        "SPIN_SYMBOL_COUNT": [0, 0, 0, 0, 0],
        "SYMBOL_IN_VIEW_COUNT": [7, 7, 7, 7, 7],
        "SPIN_SYMBOL_LENGTH": [30, 30, 30, 30, 30],
        "TURBO_SPIN_SYMBOL_LENGTH": [30, 30, 30, 30, 30],
        "ANTICIPATION_SYMBOL_LENGTH": [45, 45, 45, 45, 45],
        "FPS": [30, 30, 30, 30, 30],
        "FPS_INTERVAL": [30, 30, 30, 30, 30],
        "FRAME_COUNT": [30, 30, 30, 30, 30],
        "START_TIME": [30, 30, 30, 30, 30],
        "NOW": [30, 30, 30, 30, 30],
        "THEN": [30, 30, 30, 30, 30],

        "Y_OFFSET": [0, 0, 0, 0, 0],
        "TURBO": [false, false, false, false, false],
        "STOP_TICK": [false, false, false, false, false],
        "ELAPSED": [0, 0, 0, 0, 0],
        "STOPABLE": [false, false, false, false, false],
        "SYMBOLS_BETWEEN_STOP": [12, 12, 12, 12, 12],
        "SPINNING": [false, false, false, false, false],
        "ENABLED": [false, false, false, false, false],
        "SYMBOL_HEIGHT_MAPPING_LIST":[
            {symbolOnReel:2, height: configGame.SYMBOL_HEIGHT},
            {symbolOnReel:3, height: configGame.SYMBOL_HEIGHT},
            {symbolOnReel:4, height: configGame.SYMBOL_HEIGHT},
            {symbolOnReel:5, height: configGame.SYMBOL_HEIGHT},
            {symbolOnReel:6, height: configGame.SYMBOL_HEIGHT},
            {symbolOnReel:7, height: configGame.SYMBOL_HEIGHT },
        ],
    }
};

export const ReelsConfigurationContext = React.createContext(
    {}
);