import { frameworkIntroductionScreen } from "../../../core/components/introductionScreen/configuration/introductionScreenConfiguration"
import { objectTypes } from "../../../core/components/buttonpanel/interface/Ibuttons";


frameworkIntroductionScreen.data = {
    "COMPONENTS": [

        {
            "id": "IntroductionInCanvas",
            "name": "IntroductionInCanvas",
            "type": "Tag",
            "class": "",
            "filterTypes": [],
            child: [
                {
                    "name": "backgroundImageOfIntroductionPage",
                    "image": "backgroundImageOfIntro",
                    "type": "Image",
                    "class": "",
                    "visible": true,
                    "width": 1920,
                    "height": 1080,
                    "x": 0,
                    "y": 0,
                },
                {
                    "name": "backgroundImageOfIntroductionPage_portrait",
                    "image": "backgroundImgOfIntroPortrait",
                    "type": "Image",
                    "class": "",
                    "layout": true,
                    "uimode": "mobile",
                    "visible": true,
                    "width": 1080,
                    "height": 1920,
                    "x": 0,
                    "y": 0,
                },
                {
                    "name": "GraphicAfterIntro",
                    "type": "Graphic",
                    "shape": "rectangle",
                    "visible": true,
                    "alpha": 1,
                    "color": "0x000000",
                    "x": 0,
                    "y": 0,
                    "width": 1920,
                    "height": 1080,

                },
                {
                    "id": "assetsContainerOfIntroWithoutBg",
                    "name": "assetsContainerOfIntroWithoutBg",
                    "type": "Container",
                    "class": "",
                    "x": 0,
                    "y": 0,
                    "filterTypes": [],
                    "parentLayer": "baseLayer",
                    child: [
                        {
                            "name": "imageOfFire",
                            "image": "fireImageOfIntro",
                            "type": "Image",
                            "class": "",
                            "visible": true,
                            "width": 1920,
                            "height": 1080,
                            "x": 7,
                            "y": -11,
                        },
                        {
                            "name": "image_game_logo",
                            "image": "postIntroImageOfIntro",
                            "type": "Image",
                            "class": "",
                            "visible": true,
                            "width": 1488,
                            "height": 902,
                            "x": 221,
                            "y": 8,
                        },

                        {
                            "id": "text_3",
                            "name": "Text_Limitless",
                            "type": "Text",
                            "x": 440,
                            "y": 340,
                            "visible": true,
                            "text": "introductionText_2",
                            "anchor": [0.5, 0.5],
                            "width": 380,
                            "scaleToFit": true,
                            "textStyle": {
                                fontFamily: 'Arial',
                                fontSize: 46,
                                fontWeight: 'bold',
                                fill: ['#cbac4f'],
                                stroke: '#000000',
                                strokeThickness: 3,
                                wordWrap: true,
                                wordWrapWidth: 300,
                                align: 'center',
                                lineHeight: 28,

                            },
                            "parentLayer": "specialAnimationLayer",
                        },
                        {
                            "id": "text_4",
                            "name": "Text_WinMultiplier",
                            "type": "Text",
                            "x": 440,
                            "y": 770,
                            "visible": true,
                            "text": "introductionText_3",
                            "width": 370,
                            "scaleToFit": true,
                            "anchor": [0.5, 0.5],
                            "textStyle": {
                                fontFamily: 'Arial',
                                fontSize: 27,
                                fontWeight: 'bold',
                                align: 'center',
                                fill: ['#fe9b00'],
                                stroke: '#322323',
                                strokeThickness: 3,
                                wordWrap: true,
                                wordWrapWidth: 370,
                            },
                            "parentLayer": "specialAnimationLayer",
                        },

                        {
                            "id": "text_6",
                            "name": "Text_EveryWin",
                            "type": "Text",
                            "x": 1490,
                            "y": 340,
                            "visible": true,
                            "scaleToFit": true,
                            "text": "introductionText_5",
                            "anchor": [0.5, 0.5],
                            "width": 370,
                            "textStyle": {
                                fontFamily: 'Arial',
                                fontSize: 46,
                                fontWeight: 'bold',
                                align: 'center',
                                fill: ['#cbac4f'],
                                stroke: '#000000',
                                strokeThickness: 3,
                                wordWrap: true,
                                wordWrapWidth: 370,
                            },
                            "parentLayer": "specialAnimationLayer",
                        },
                        {
                            "id": "text_7",
                            "name": "Text_WinMultiplier",
                            "type": "Text",
                            "x": 1490,
                            "y": 770,
                            "visible": true,
                            "scaleToFit": true,
                            "text": "introductionText_6",
                            "anchor": [0.5, 0.5],
                            "width": 370,
                            "textStyle": {
                                fontFamily: 'Arial',
                                fontSize: 27,
                                fontWeight: 'bold',
                                align: 'center',
                                fill: ['#fe9b00'],
                                stroke: '#322323',
                                strokeThickness: 3,
                                wordWrap: true,
                                wordWrapWidth: 370,
                            },
                            "parentLayer": "specialAnimationLayer",
                        },
                        {
                            "id": "text_8",
                            "name": "Text_WinMultiplier",
                            "type": "Text",
                            "x": 964,
                            "y": 852,
                            "visible": true,
                            "scaleToFit": true,
                            "text": "introductionText_7",
                            "anchor": [0.5, 0.5],
                            "width": 800,
                            "height": 290,
                            "textStyle": {
                                fontFamily: 'Arial',
                                fontSize: 31,
                                fontWeight: 'bold',
                                fill: ['#ffb201'],
                                align: 'center',
                                stroke: '#000000',
                                strokeThickness: 1,
                                lineHeight: 60,
                            },
                            "parentLayer": "specialAnimationLayer",
                        },
                    ]
                },

                {
                    "id": "Button_1_desktop",
                    "name": "postIntro_continueButton_desktop",
                    "image": "continueButtonOfIntro",
                    "type": objectTypes.Sprite,
                    "interactive": true,
                    "layout": false,
                    "uimode": "desktop",
                    "x": 715,
                    "y": 915,
                    "height": 109,
                    "width": 499,
                    "text": "",
                    "visible": true,
                    "buttonMode": true,
                    "buttonState": {
                        up: 'continue_up.png',
                        out: 'continue_up.png',
                        down: 'continue_down.png',
                        disable: 'continue_disable.png',
                        enable: 'continue_up.png',
                        hover: 'continue_over.png'
                    },
                    "hitareaVisible": false,
                    "shapeVisible": false,
                    "shape": {}
                },
                {
                    "id": "Button_1_mobile",
                    "name": "postIntro_continueButton_mobile",
                    "image": "continueButtonOfIntro",
                    "type": objectTypes.Sprite,
                    "interactive": false,
                    "layout": true,
                    "uimode": "mobile",
                    "x": 715,
                    "y": 915,
                    "height": 109,
                    "width": 499,
                    "text": "",
                    "visible": true,
                    "buttonMode": true,
                    "buttonState": {
                        up: 'continue_up.png',
                        out: 'continue_up.png',
                        down: 'continue_down.png',
                        disable: 'continue_disable.png',
                        enable: 'continue_up.png',
                        hover: 'continue_over.png'
                    },
                    "hitareaVisible": false,
                    "shapeVisible": false,
                    "shape": {}
                },

                {
                    "id": "text_1_desktop",
                    "name": "Text_Continue_desktop",
                    "type": "Text",
                    "x": 963,
                    "y": 970,
                    "layout": false,
                    "uimode": "desktop",
                    "visible": true,
                    "text": "continueIntroText",
                    "anchor": [0.5, 0.5],
                    "width": 280,
                    "scaleToFit": true,
                    "textStyle": {
                        fontFamily: 'Arial',
                        fontSize: 60,
                        fill: ['#ffffff'],
                    },
                    "parentLayer": "specialAnimationLayer",
                },
                {
                    "id": "text_1_mobile",
                    "name": "Text_Continue_mobile",
                    "type": "Text",
                    "x": 963,
                    "y": 970,
                    "layout": true,
                    "uimode": "mobile",
                    "visible": true,
                    "text": "continueIntroText",
                    "anchor": [0.5, 0.5],
                    "width": 280,
                    "scaleToFit": true,
                    "textStyle": {
                        fontFamily: 'Arial',
                        fontSize: 60,
                        fill: ['#ffffff'],
                    },
                    "parentLayer": "specialAnimationLayer",
                },
            ]
        },
        {
            "id": "RealityCheck",
            "name": "RealityCheck",
            "type": "Tag",
            "class": "",
            "filterTypes": [],
            child: []
        },
    ]
}