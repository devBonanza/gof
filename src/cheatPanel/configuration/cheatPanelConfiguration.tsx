import React from "react";
import { objectTypes } from "../../core/components/buttonpanel/interface/Ibuttons";

interface IframeworkCheatPanel {
    data: {}
}

export const frameworkCheatPanel: IframeworkCheatPanel = {
    data: {
        "COMPONENTS": [
            {
                "id": "Button_0",
                "name": "visibleCheatButtons",
                "type": objectTypes.Sprite,
                "interactive": true,
                "x": 90,
                "y": 50,
                "height": 100,
                "width": 200,
                "text": "Cheats",
                "textStyle": {
                    fontFamily: 'Arial',
                    fontSize: 50,
                    fontStyle: 'normal',
                    fontWeight: 'bold',
                    fill: ['#ffffff'],
                },
                "anchor": [0.5, 0.5],
                "visible": true,
                "buttonMode": true,
                "buttonState": {
                    up: 'post_intro_start_up.png',
                    out: 'post_intro_start_up.png',
                    down: 'post_intro_start_down.png',
                    disable: 'post_intro_start_disable.png',
                    enable: 'post_intro_start_up.png',
                    hover: 'post_intro_start_over.png'
                },
                "hitareaVisible": false,
                "shapeVisible": false,
                "shape": {}
            },
            {
                "id": "gameScrollComponent",
                "name": "gameScrollComponent",
                "type": "Container",
                "x": 0,
                "y": 0,
                "visible": false,
                "filterTypes": [],
                child: [

                ]
            },
            {
                "id": "gameGuideContent",
                "name": "gameGuideContent",
                "type": "Container",
                "x": 0,
                "y": -60,
                "visible": true,
                "filterTypes": [],
                child: [

                    {
                        "id": "Button_11",
                        "name": "cheatForBigWin",
                        "type": objectTypes.Sprite,
                        "interactive": true,

                        "x": 90,
                        "y": 100,
                        "height": 100,
                        "width": 200,
                        "text": "Big Win",
                        "textStyle": {
                            fontFamily: 'Arial',
                            fontSize: 80,
                            fontStyle: 'normal',
                            fontWeight: 'bold',
                            fill: ['#ffffff'],
                        },
                        "anchor": [0.5, 0.5],
                        "visible": true,
                        "buttonMode": true,
                        "buttonState": {
                            up: 'post_intro_start_up.png',
                            out: 'post_intro_start_up.png',
                            down: 'post_intro_start_down.png',
                            disable: 'post_intro_start_disable.png',
                            enable: 'post_intro_start_up.png',
                            hover: 'post_intro_start_over.png'
                        },
                        "hitareaVisible": false,
                        "shapeVisible": false,
                        "shape": {}
                    },

                    {
                        "id": "Button_12",
                        "name": "cheatForSuperWin",
                        "type": objectTypes.Sprite,
                        "interactive": true,
                        "x": 90,
                        "y": 220,
                        "height": 100,
                        "width": 200,
                        "text": "Super Win",
                        "textStyle": {
                            fontFamily: 'Arial',
                            fontSize: 80,
                            fontStyle: 'normal',
                            fontWeight: 'bold',
                            fill: ['#ffffff'],
                        },
                        "anchor": [0.5, 0.5],
                        "visible": true,
                        "buttonMode": true,
                        "buttonState": {
                            up: 'post_intro_start_up.png',
                            out: 'post_intro_start_up.png',
                            down: 'post_intro_start_down.png',
                            disable: 'post_intro_start_disable.png',
                            enable: 'post_intro_start_up.png',
                            hover: 'post_intro_start_over.png'
                        },
                        "hitareaVisible": false,
                        "shapeVisible": false,
                        "shape": {}
                    },
                    {
                        "id": "Button_13",
                        "name": "cheatForMegaWin",
                        "type": objectTypes.Sprite,
                        "interactive": true,
                        "x": 90,
                        "y": 330,
                        "height": 100,
                        "width": 200,
                        "text": "Mega Win",
                        "textStyle": {
                            fontFamily: 'Arial',
                            fontSize: 80,
                            fontStyle: 'normal',
                            fontWeight: 'bold',
                            fill: ['#ffffff'],
                        },
                        "anchor": [0.5, 0.5],
                        "visible": true,
                        "buttonMode": true,
                        "buttonState": {
                            up: 'post_intro_start_up.png',
                            out: 'post_intro_start_up.png',
                            down: 'post_intro_start_down.png',
                            disable: 'post_intro_start_disable.png',
                            enable: 'post_intro_start_up.png',
                            hover: 'post_intro_start_over.png'
                        },
                        "hitareaVisible": false,
                        "shapeVisible": false,
                        "shape": {}
                    },
                    {
                        "id": "Button_14",
                        "name": "cheatForLegendaryWin",
                        "type": objectTypes.Sprite,
                        "interactive": true,
                        "x": 90,
                        "y": 440,
                        "height": 100,
                        "width": 200,
                        "text": "Legendary Win",
                        "textStyle": {
                            fontFamily: 'Arial',
                            fontSize: 60,
                            fontStyle: 'normal',
                            fontWeight: 'bold',
                            fill: ['#ffffff'],
                        },
                        "anchor": [0.5, 0.5],
                        "visible": true,
                        "buttonMode": true,
                        "buttonState": {
                            up: 'post_intro_start_up.png',
                            out: 'post_intro_start_up.png',
                            down: 'post_intro_start_down.png',
                            disable: 'post_intro_start_disable.png',
                            enable: 'post_intro_start_up.png',
                            hover: 'post_intro_start_over.png'
                        },
                        "hitareaVisible": false,
                        "shapeVisible": false,
                        "shape": {}
                    },
                    {
                        "id": "Button_15",
                        "name": "cheatForScatterTrigger",
                        "type": objectTypes.Sprite,
                        "interactive": true,

                        "x": 90,
                        "y": 550,
                        "height": 100,
                        "width": 200,
                        "text": "Scatter Trigger",
                        "textStyle": {
                            fontFamily: 'Arial',
                            fontSize: 60,
                            fontStyle: 'normal',
                            fontWeight: 'bold',
                            fill: ['#ffffff'],
                        },
                        "anchor": [0.5, 0.5],
                        "visible": true,
                        "buttonMode": true,
                        "buttonState": {
                            up: 'post_intro_start_up.png',
                            out: 'post_intro_start_up.png',
                            down: 'post_intro_start_down.png',
                            disable: 'post_intro_start_disable.png',
                            enable: 'post_intro_start_up.png',
                            hover: 'post_intro_start_over.png'
                        },
                        "hitareaVisible": false,
                        "shapeVisible": false,
                        "shape": {}
                    },

                    {
                        "id": "Button_16",
                        "name": "cheatForAnticipation",
                        "type": objectTypes.Sprite,
                        "interactive": true,
                        "x": 90,
                        "y": 660,
                        "height": 100,
                        "width": 200,
                        "text": "Anticipation",
                        "textStyle": {
                            fontFamily: 'Arial',
                            fontSize: 60,
                            fontStyle: 'normal',
                            fontWeight: 'bold',
                            fill: ['#ffffff'],
                        },
                        "anchor": [0.5, 0.5],
                        "visible": true,
                        "buttonMode": true,
                        "buttonState": {
                            up: 'post_intro_start_up.png',
                            out: 'post_intro_start_up.png',
                            down: 'post_intro_start_down.png',
                            disable: 'post_intro_start_disable.png',
                            enable: 'post_intro_start_up.png',
                            hover: 'post_intro_start_over.png'
                        },
                        "hitareaVisible": false,
                        "shapeVisible": false,
                        "shape": {}
                    },
                    {
                        "id": "Button_17",
                        "name": "cheatForBigWin&FG",
                        "type": objectTypes.Sprite,
                        "interactive": true,
                        "x": 90,
                        "y": 770,
                        "height": 100,
                        "width": 200,
                        "text": "big win & FreeGame",
                        "textStyle": {
                            fontFamily: 'Arial',
                            fontSize: 40,
                            fontStyle: 'normal',
                            fontWeight: 'bold',
                            fill: ['#ffffff'],
                        },
                        "anchor": [0.5, 0.5],
                        "visible": true,
                        "buttonMode": true,
                        "buttonState": {
                            up: 'post_intro_start_up.png',
                            out: 'post_intro_start_up.png',
                            down: 'post_intro_start_down.png',
                            disable: 'post_intro_start_disable.png',
                            enable: 'post_intro_start_up.png',
                            hover: 'post_intro_start_over.png'
                        },
                        "hitareaVisible": false,
                        "shapeVisible": false,
                        "shape": {}
                    },

                    {
                        "id": "Button_18",
                        "name": "cheatForMultipleCascading",
                        "type": objectTypes.Sprite,
                        "interactive": true,
                        "x": 90,
                        "y": 880,
                        "height": 100,
                        "width": 200,
                        "text": "MultipleCascade",
                        "textStyle": {
                            fontFamily: 'Arial',
                            fontSize: 50,
                            fontStyle: 'normal',
                            fontWeight: 'bold',
                            fill: ['#ffffff'],
                        },
                        "anchor": [0.5, 0.5],
                        "visible": true,
                        "buttonMode": true,
                        "buttonState": {
                            up: 'post_intro_start_up.png',
                            out: 'post_intro_start_up.png',
                            down: 'post_intro_start_down.png',
                            disable: 'post_intro_start_disable.png',
                            enable: 'post_intro_start_up.png',
                            hover: 'post_intro_start_over.png'
                        },
                        "hitareaVisible": false,
                        "shapeVisible": false,
                        "shape": {}
                    },
                    {
                        "id": "cheatForHv1",
                        "name": "cheatForHv1",
                        "type": objectTypes.Sprite,
                        "interactive": true,
                        "group": "Intro",
                        "x": 90,
                        "y": 990,
                        "height": 100,
                        "width": 200,
                        "text": "Symbol 1",
                        "textStyle": {
                            fontFamily: 'Arial',
                            fontSize: 80,
                            fontStyle: 'normal',
                            fontWeight: 'bold',
                            fill: ['#ffffff'],
                        },
                        "anchor": [0.5, 0.5],
                        "visible": true,
                        "buttonMode": true,
                        "buttonState": {
                            up: 'post_intro_start_up.png',
                            out: 'post_intro_start_up.png',
                            down: 'post_intro_start_down.png',
                            disable: 'post_intro_start_disable.png',
                            enable: 'post_intro_start_up.png',
                            hover: 'post_intro_start_over.png'
                        },
                        "hitareaVisible": false,
                        "shapeVisible": false,
                        "shape": {}
                    },

                    {
                        "id": "Button_2",
                        "name": "cheatForHv2",
                        "type": objectTypes.Sprite,
                        "interactive": true,
                        "x": 90,
                        "y": 1100,
                        "height": 100,
                        "width": 200,
                        "text": "Symbol 2",
                        "textStyle": {
                            fontFamily: 'Arial',
                            fontSize: 80,
                            fontStyle: 'normal',
                            fontWeight: 'bold',
                            fill: ['#ffffff'],
                        },
                        "anchor": [0.5, 0.5],
                        "visible": true,
                        "buttonMode": true,
                        "buttonState": {
                            up: 'post_intro_start_up.png',
                            out: 'post_intro_start_up.png',
                            down: 'post_intro_start_down.png',
                            disable: 'post_intro_start_disable.png',
                            enable: 'post_intro_start_up.png',
                            hover: 'post_intro_start_over.png'
                        },
                        "hitareaVisible": false,
                        "shapeVisible": false,
                        "shape": {}
                    },

                    {
                        "id": "Button_3",
                        "name": "cheatForHv3",
                        "type": objectTypes.Sprite,
                        "interactive": true,

                        "x": 90,
                        "y": 1210,
                        "height": 100,
                        "width": 200,
                        "text": "Symbol 3",
                        "textStyle": {
                            fontFamily: 'Arial',
                            fontSize: 80,
                            fontStyle: 'normal',
                            fontWeight: 'bold',
                            fill: ['#ffffff'],
                        },
                        "anchor": [0.5, 0.5],
                        "visible": true,
                        "buttonMode": true,
                        "buttonState": {
                            up: 'post_intro_start_up.png',
                            out: 'post_intro_start_up.png',
                            down: 'post_intro_start_down.png',
                            disable: 'post_intro_start_disable.png',
                            enable: 'post_intro_start_up.png',
                            hover: 'post_intro_start_over.png'
                        },
                        "hitareaVisible": false,
                        "shapeVisible": false,
                        "shape": {}
                    },
                    {
                        "id": "Button_4",
                        "name": "cheatForHv4",
                        "type": objectTypes.Sprite,
                        "interactive": true,
                        "x": 90,
                        "y": 1320,
                        "height": 100,
                        "width": 200,
                        "text": "Symbol 4",
                        "textStyle": {
                            fontFamily: 'Arial',
                            fontSize: 80,
                            fontStyle: 'normal',
                            fontWeight: 'bold',
                            fill: ['#ffffff'],
                        },
                        "anchor": [0.5, 0.5],
                        "visible": true,
                        "buttonMode": true,
                        "buttonState": {
                            up: 'post_intro_start_up.png',
                            out: 'post_intro_start_up.png',
                            down: 'post_intro_start_down.png',
                            disable: 'post_intro_start_disable.png',
                            enable: 'post_intro_start_up.png',
                            hover: 'post_intro_start_over.png'
                        },
                        "hitareaVisible": false,
                        "shapeVisible": false,
                        "shape": {}
                    },

                    {
                        "id": "Button_5",
                        "name": "cheatForLv1",
                        "type": objectTypes.Sprite,
                        "interactive": true,
                        "x": 90,
                        "y": 1430,
                        "height": 100,
                        "width": 200,
                        "text": "Symbol 5",
                        "textStyle": {
                            fontFamily: 'Arial',
                            fontSize: 80,
                            fontStyle: 'normal',
                            fontWeight: 'bold',
                            fill: ['#ffffff'],
                        },
                        "anchor": [0.5, 0.5],
                        "visible": true,
                        "buttonMode": true,
                        "buttonState": {
                            up: 'post_intro_start_up.png',
                            out: 'post_intro_start_up.png',
                            down: 'post_intro_start_down.png',
                            disable: 'post_intro_start_disable.png',
                            enable: 'post_intro_start_up.png',
                            hover: 'post_intro_start_over.png'
                        },
                        "hitareaVisible": false,
                        "shapeVisible": false,
                        "shape": {}
                    },
                    {
                        "id": "Button_6",
                        "name": "cheatForLv2",
                        "type": objectTypes.Sprite,
                        "interactive": true,
                        "x": 90,
                        "y": 1540,
                        "height": 100,
                        "width": 200,
                        "text": "Symbol 6",
                        "textStyle": {
                            fontFamily: 'Arial',
                            fontSize: 80,
                            fontStyle: 'normal',
                            fontWeight: 'bold',
                            fill: ['#ffffff'],
                        },
                        "anchor": [0.5, 0.5],
                        "visible": true,
                        "buttonMode": true,
                        "buttonState": {
                            up: 'post_intro_start_up.png',
                            out: 'post_intro_start_up.png',
                            down: 'post_intro_start_down.png',
                            disable: 'post_intro_start_disable.png',
                            enable: 'post_intro_start_up.png',
                            hover: 'post_intro_start_over.png'
                        },
                        "hitareaVisible": false,
                        "shapeVisible": false,
                        "shape": {}
                    },

                    {
                        "id": "Button_7",
                        "name": "cheatForLv3",
                        "type": objectTypes.Sprite,
                        "interactive": true,
                        "x": 90,
                        "y": 1650,
                        "height": 100,
                        "width": 200,
                        "text": "Symbol 7",
                        "textStyle": {
                            fontFamily: 'Arial',
                            fontSize: 80,
                            fontStyle: 'normal',
                            fontWeight: 'bold',
                            fill: ['#ffffff'],
                        },
                        "anchor": [0.5, 0.5],
                        "visible": true,
                        "buttonMode": true,
                        "buttonState": {
                            up: 'post_intro_start_up.png',
                            out: 'post_intro_start_up.png',
                            down: 'post_intro_start_down.png',
                            disable: 'post_intro_start_disable.png',
                            enable: 'post_intro_start_up.png',
                            hover: 'post_intro_start_over.png'
                        },
                        "hitareaVisible": false,
                        "shapeVisible": false,
                        "shape": {}
                    },
                    {
                        "id": "Button_8",
                        "name": "cheatForLv4",
                        "type": objectTypes.Sprite,
                        "interactive": true,

                        "x": 90,
                        "y": 1760,
                        "height": 100,
                        "width": 200,
                        "text": "Symbol 8",
                        "textStyle": {
                            fontFamily: 'Arial',
                            fontSize: 80,
                            fontStyle: 'normal',
                            fontWeight: 'bold',
                            fill: ['#ffffff'],
                        },
                        "anchor": [0.5, 0.5],
                        "visible": true,
                        "buttonMode": true,
                        "buttonState": {
                            up: 'post_intro_start_up.png',
                            out: 'post_intro_start_up.png',
                            down: 'post_intro_start_down.png',
                            disable: 'post_intro_start_disable.png',
                            enable: 'post_intro_start_up.png',
                            hover: 'post_intro_start_over.png'
                        },
                        "hitareaVisible": false,
                        "shapeVisible": false,
                        "shape": {}
                    },
                    {
                        "id": "Button_9",
                        "name": "cheatForLv5",
                        "type": objectTypes.Sprite,
                        "interactive": true,
                        "x": 90,
                        "y": 1870,
                        "height": 100,
                        "width": 200,
                        "text": "Symbol 9",
                        "textStyle": {
                            fontFamily: 'Arial',
                            fontSize: 80,
                            fontStyle: 'normal',
                            fontWeight: 'bold',
                            fill: ['#ffffff'],
                        },
                        "anchor": [0.5, 0.5],
                        "visible": true,
                        "buttonMode": true,
                        "buttonState": {
                            up: 'post_intro_start_up.png',
                            out: 'post_intro_start_up.png',
                            down: 'post_intro_start_down.png',
                            disable: 'post_intro_start_disable.png',
                            enable: 'post_intro_start_up.png',
                            hover: 'post_intro_start_over.png'
                        },
                        "hitareaVisible": false,
                        "shapeVisible": false,
                        "shape": {}
                    },
                    {
                        "id": "Button_10",
                        "name": "cheatForLv6",
                        "type": objectTypes.Sprite,
                        "interactive": true,
                        "x": 90,
                        "y": 1980,
                        "height": 100,
                        "width": 200,
                        "text": "Symbol 10",
                        "textStyle": {
                            fontFamily: 'Arial',
                            fontSize: 80,
                            fontStyle: 'normal',
                            fontWeight: 'bold',
                            fill: ['#ffffff'],
                        },
                        "anchor": [0.5, 0.5],
                        "visible": true,
                        "buttonMode": true,
                        "buttonState": {
                            up: 'post_intro_start_up.png',
                            out: 'post_intro_start_up.png',
                            down: 'post_intro_start_down.png',
                            disable: 'post_intro_start_disable.png',
                            enable: 'post_intro_start_up.png',
                            hover: 'post_intro_start_over.png'
                        },
                        "hitareaVisible": false,
                        "shapeVisible": false,
                        "shape": {}
                    },
                    {
                        "id": "Button_19",
                        "name": "clearCheat",
                        "type": objectTypes.Sprite,
                        "interactive": true,

                        "x": 90,
                        "y": 2090,
                        "height": 100,
                        "width": 200,
                        "text": "ClearCheat",
                        "textStyle": {
                            fontFamily: 'Arial',
                            fontSize: 70,
                            fontStyle: 'normal',
                            fontWeight: 'bold',
                            fill: ['#ffffff'],
                        },
                        "anchor": [0.5, 0.5],
                        "visible": true,
                        "buttonMode": true,
                        "buttonState": {
                            up: 'post_intro_start_up.png',
                            out: 'post_intro_start_up.png',
                            down: 'post_intro_start_down.png',
                            disable: 'post_intro_start_disable.png',
                            enable: 'post_intro_start_up.png',
                            hover: 'post_intro_start_over.png'
                        },
                        "hitareaVisible": false,
                        "shapeVisible": false,
                        "shape": {}
                    },
                ]
            },
        ],
    }
};
export const cheatPanelConfigurationContext = React.createContext(
    {}
);