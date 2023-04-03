import React from "react";
import {configGame} from "../../../data/config"


interface IframeworkReels {
    data: {
        "GRID_COLUMN": number,
        "GRID_WIDTH": number,
        "GRID_ROWS": number,
        "SPIN_TYPE": number,
        "GRID_GAP": number,
        "SYMBOL_WIDTH": number,
        "SYMBOL_HEIGHT": number,
        "staggerDropDelayReelStart": number,
        "createPosition": {
            "x": number,
            "y": number
        },
        "endPosition": {
            "x": number,
            "y": number
        },
        "tiltAngle": number,
        "tiltAngleAfterBlast": number,
        "tiltDuration": number,
        "reversetiltDuration": number,

        "blastDuration": number,
        "delayInSymbolAnimationPlay": number,
        "singlePositionDropDuration": number,
        "singlePositionDropDurationFromTop": number,
        "delayDropDuration": number,
        "dropAfterBlastDuration": number,
        "delayDropDurationAfterBlast": number,
        "staggerColumnDelay": number,
        "staggerDropDelay": number,
        // "gridPositionIds":number,
        "gridPositionIds": any,
        "gridPositions": any,
        //
        //
        // "SPIN_START_BOUNCE_SPEED":Array<number>,
        //
        // "SPIN_START_BOUNCE_TIME":Array<number>,
        // "SPIN_STOP_BOUNCE_SPEED":Array<number>,
        // "SPIN_STOP_BOUNCE_TIME":Array<number>,
        // "SPIN_START_SPEED":Array<number>,
        //
        // "SPIN_STOP_SPEED":Array<number>,
        //
        // "SPIN_ANTICIPATION_INCREMENT_SPEED":Array<number>,
        // "SPIN_ANTICIPATION_INCREMENT_TIME":Array<number>,
        //
        // "SPIN_DURATION":Array<number>,
        // "SPIN_START_DELAY":Array<number>,
        // "SPIN_STOP_DELAY":Array<number>,
        // "SPIN_DIRECTION":Array<number>,//toptobottom,bottomtotop,lefttoright,righttoleft
    }

}

export const frameworkGrids: IframeworkReels = {
    data: {
        "GRID_COLUMN": configGame.REEL_COLUMN,
        "GRID_WIDTH": configGame.REEL_WIDTH,
        "SPIN_TYPE": configGame.SPIN_TYPE,
        "GRID_ROWS": configGame.REEL_ROWS,
        "GRID_GAP": configGame.REEL_GAP,
        "SYMBOL_WIDTH": configGame.SYMBOL_WIDTH,
        "SYMBOL_HEIGHT": configGame.SYMBOL_HEIGHT,
        "staggerDropDelayReelStart": 10,
        "staggerDropDelay": 180,
        "staggerColumnDelay": 180,
        "blastDuration": 80,
        "delayInSymbolAnimationPlay": 1,
        "singlePositionDropDuration": 80,
        "singlePositionDropDurationFromTop": 80,
        "dropAfterBlastDuration": 30,
        "tiltAngle": 0.1,
        "tiltAngleAfterBlast": 0.8,
        "tiltDuration": 80,
        "reversetiltDuration": 50,

        "delayDropDurationAfterBlast": 2000,
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
        ]


    }


};

export const GridsConfigurationContext = React.createContext(
    {}
);