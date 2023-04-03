import { frameworkBanner } from "../../../core/components/banner/configuration/bannerconfiguration";
import { introAssetConfig } from "../../../data/intro";
import { objectTypes } from "../../../core/components/buttonpanel/interface/Ibuttons";


frameworkBanner.data = {
    "BANNER_CONTAINER_X": 0,
    "BANNER_CONTAINER_Y": 0,
    "COMPONENTS": [
        {
            "id": "gofBannerOutro",
            "name": "gofBannerContainerOutro",
            "type": "Container",
            "class": "",
            "x": 0,
            "y": 0,
            "filterTypes": [],
            "group": "Outro",
            "visible": false,
            "parentLayer": "baseLayer",
            child: [
                {
                    "id": "gofBannerComponentOutro",
                    "name": "GofBanner",
                    "type": "Tag",
                    "class": "",
                    "group": "Outro",
                    "filterTypes": [],
                    child: [
                    ]
                }
            ]

        },
        {
            "id": "gofBannerIntro",
            "name": "gofBannerContainerIntro",
            "type": "Container",
            "class": "",
            "x": 0,
            "y": 0,
            "filterTypes": [],
            "group": "Intro",
            "parentLayer": "baseLayer",
            child: [


                {
                    "id": "gofBannerComponentIntro",
                    "name": "GofBanner",
                    "type": "Tag",
                    "class": "",
                    "group": "Intro",
                    "filterTypes": [],
                    child: [
                        {
                            "name": "introGraphic",
                            "type": "Graphic",
                            "shape": "rectangle",
                            "visible": true,
                            "alpha": 0.94,
                            "group": "Intro",
                            "color": "0x000000",
                            "x": 0,
                            "y": 0,
                            "width": 1920,
                            "height": 1080,
                        },
                       
                        {
                            "name": "mountainImage_desktop",
                            "image": "mountainImage",
                            "type": "Image",
                            "class": "",
                            "layout": false,
                            "uimode": "desktop",
                            "visible": true,
                            "interactive": false,
                            "buttonMode": false,
                            "group": "Intro",
                            "anchor": [0.5, 0.5],
                            "width": 1920,
                            "height": 1080,
                            "x": 990,
                            "y": 500,
                        },
                        {
                            "name": "mountainImage_mobile",
                            "image": "mountainImage",
                            "type": "Image",
                            "class": "",
                            "layout": true,
                            "uimode": "mobile",
                            "visible": true,
                            "interactive": false,
                            "buttonMode": false,
                            "group": "Intro",
                            "anchor": [0.5, 0.5],
                            "width": 1920,
                            "height": 1080,
                            "x": 990,
                            "y": 500,
                        },
                       
                        {
                            "name": "introBg_desktop",
                            "image": "introBG",
                            "type": "Image",
                            "class": "",
                            "layout": false,
                            "uimode": "desktop",
                            "visible": true,
                            "interactive": false,
                            "buttonMode": false,
                            "group": "Intro",
                            "width": 779,
                            "anchor": [0.5, 0.5],
                            "height": 530,
                            "x": 975,
                            "y": 450,
                        },

                        {
                            "name": "introBg_mobile",
                            "image": "introBG",
                            "type": "Image",
                            "class": "",
                            "layout": true,
                            "uimode": "mobile",
                            "visible": true,
                            "interactive": false,
                            "buttonMode": false,
                            "group": "Intro",
                            "width": 779,
                            "anchor": [0.5, 0.5],
                            "height": 530,
                            "x": 950,
                            "y": 450,
                        },

                        {
                            "id": "Button_1_desktop",
                            "name": "btn_introBanner_desktop",
                            "type": objectTypes.Sprite,
                            "interactive": true,
                            "layout": false,
                            "uimode": "desktop",
                            "group": "Intro",
                            "x": 965,
                            "y": 825,
                            "height": 194,
                            "width": 495,
                            "text": "start_btn",
                            "textStyle": {
                                fontFamily: 'Arial',
                                fontSize: 80,
                                fontStyle: 'normal',
                                fontWeight: 'bold',
                                fill: ['#ffffff'],
                                dropShadow: true,
                                dropShadowColor: '#000000',
                                dropShadowBlur: 2,
                                dropShadowAngle: Math.PI / 2,
                                dropShadowDistance: 10,
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
                            "id": "btn_introBanner_mobile",
                            "name": "btn_introBanner_mobile",
                            "type": objectTypes.Sprite,
                            "interactive": true,
                            "layout": true,
                            "uimode": "mobile",
                            "group": "Intro",
                            "x": 940,
                            "y": 825,
                            "height": 194,
                            "width": 495,
                            "text": "start_btn",
                            "textStyle": {
                                fontFamily: 'Arial',
                                fontSize: 80,
                                fontStyle: 'normal',
                                fontWeight: 'bold',
                                fill: ['#ffffff'],
                                dropShadow: true,
                                dropShadowColor: '#000000',
                                dropShadowBlur: 2,
                                dropShadowAngle: Math.PI / 2,
                                dropShadowDistance: 10,
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

                            "id": "text_IntroScreenFG_desktop",
                            "name": "text_IntroScreenFG_desktop",
                            "type": "Text",
                            "x": 973,
                            "y": 318,
                            "height": 100,
                            "width": 500,
                            "layout": false,
                            "uimode": "desktop",
                            "class": "",
                            "visible": true,
                            "group": "Intro",
                            "text": "introtext_4",
                            "scaleToFit": true,
                            "anchor": [0.5, 0.5],
                            "textStyle": {
                                fontFamily: 'Arial',
                                fontSize: 150,
                                fontStyle: 'normal',
                                fontWeight: 'bold',
                                fill: ['#ffffff'],
                                dropShadow: true,
                                dropShadowColor: '#000000',
                                dropShadowBlur: 2,
                                dropShadowAngle: Math.PI / 2,
                                dropShadowDistance: 10,
                            }
                        },
                        {
                            "id": "text_IntroScreenFG_mobile",
                            "name": "text_IntroScreenFG_mobile",
                            "type": "Text",
                            "x": 948,
                            "y": 318,
                            "height": 100,
                            "width": 500,
                            "layout": true,
                            "uimode": "mobile",
                            "class": "",
                            "visible": true,
                            "group": "Intro",
                            "text": "introtext_4",
                            "scaleToFit": true,
                            "anchor": [0.5, 0.5],
                            "textStyle": {
                                fontFamily: 'Arial',
                                fontSize: 150,
                                fontStyle: 'normal',
                                fontWeight: 'bold',
                                fill: ['#ffffff'],
                                dropShadow: true,
                                dropShadowColor: '#000000',
                                dropShadowBlur: 2,
                                dropShadowAngle: Math.PI / 2,
                                dropShadowDistance: 10,
                            }
                        },

                        {
                            "id": "text_freeSpinAward_desktop",
                            "name": "text_freeSpinAward_desktop",
                            "type": "Text",
                            "x": 973,
                            "y": 426,
                            "height": 100,
                            "width": 440,
                            "layout": false,
                            "uimode": "desktop",
                            "class": "",
                            "visible": true,
                            "group": "Intro",
                            "text": "freeSpinAward",
                            "scaleToFit": true,
                            "anchor": [0.5, 0.5],
                            "textStyle": {
                                fontFamily: 'Arial',
                                fontSize: 32,
                                fontStyle: 'normal',
                                fontWeight: 'bold',
                                fill: ['#ffde00'],
                            }
                        },
                        {
                            "id": "text_freeSpinAward_mobile",
                            "name": "text_freeSpinAward_mobile",
                            "type": "Text",
                            "x": 948,
                            "y": 426,
                            "height": 100,
                            "width": 440,
                            "class": "",
                            "layout": true,
                            "uimode": "mobile",
                            "visible": true,
                            "group": "Intro",
                            "text": "freeSpinAward",
                            "scaleToFit": true,
                            "anchor": [0.5, 0.5],
                            "textStyle": {
                                fontFamily: 'Arial',
                                fontSize: 32,
                                fontStyle: 'normal',
                                fontWeight: 'bold',
                                fill: ['#ffde00'],
                            }
                        },

                        {

                            "id": "text_2_Intro_desktop",
                            "name": "text_2_Intro_desktop",
                            "type": "Text",
                            "x": 972,
                            "y": 664,
                            "height": 100,
                            "width": 600,
                            "layout": false,
                            "uimode": "desktop",
                            "class": "",
                            "visible": true,
                            "group": "Intro",
                            "text": "introtext_2",
                            "scaleToFit": true,
                            "anchor": [0.5, 0.5],
                            "textStyle": {
                                fontFamily: 'Arial',
                                fontSize: 22,
                                fontStyle: 'normal',
                                fontWeight: 'bold',
                                align: 'center',
                                fill: ['#ffffff'],
                                dropShadow: true,
                                dropShadowColor: '#000000',
                                dropShadowBlur: 2,
                                dropShadowAngle: Math.PI / 2,
                                dropShadowDistance: 2,
                                wordWrap: true,
                                wordWrapWidth: 600,
                            }
                        },
                        {
                            "id": "text_2_intro_mobile",
                            "name": "text_2_intro_mobile",
                            "type": "Text",
                            "x": 958,
                            "y": 660,
                            "height": 100,
                            "width": 600,
                            "class": "",
                            "layout": true,
                            "uimode": "mobile",
                            "visible": true,
                            "group": "Intro",
                            "text": "introtext_2",
                            "scaleToFit": true,
                            "anchor": [0.5, 0.5],
                            "textStyle": {
                                fontFamily: 'Arial',
                                fontSize: 20,
                                fontStyle: 'normal',
                                fontWeight: 'bold',
                                align: 'center',
                                fill: ['#ffffff'],
                                dropShadow: true,
                                dropShadowColor: '#000000',
                                dropShadowBlur: 2,
                                dropShadowAngle: Math.PI / 2,
                                dropShadowDistance: 2,
                                wordWrap: true,
                                wordWrapWidth: 600,
                            }
                        },

                        {
                            "id": "text_3_intro_desktop",
                            "name": "text_3_intro_desktop",
                            "type": "Text",
                            "x": 1158,
                            "y": 536,
                            "height": 100,
                            "width": 400,
                            "class": "",
                            "layout": false,
                            "uimode": "desktop",
                            "visible": true,
                            "group": "Intro",
                            "text": "introtext_3",
                            "scaleToFit": true,
                            "anchor": [0.5, 0.5],
                            "textStyle": {
                                fontFamily: 'Arial',
                                fontSize: 24,
                                fontStyle: 'normal',
                                fontWeight: 'bold',
                                align: 'center',
                                fill: ['#ffffff'],
                                dropShadow: true,
                                dropShadowColor: '#000000',
                                dropShadowBlur: 2,
                                dropShadowAngle: Math.PI / 2,
                                dropShadowDistance: 2,
                                wordWrap: true,
                                wordWrapWidth: 400,
                            }
                        },
                        {

                            "id": "text_3_intro_mobile",
                            "name": "text_3_intro_mobile",
                            "type": "Text",
                            "x": 1133,
                            "y": 536,
                            "height": 100,
                            "width": 390,
                            "class": "",
                            "layout": true,
                            "uimode": "mobile",
                            "visible": true,
                            "group": "Intro",
                            "text": "introtext_3",
                            "scaleToFit": true,
                            "anchor": [0.5, 0.5],
                            "textStyle": {
                                fontFamily: 'Arial',
                                fontSize: 24,
                                fontStyle: 'normal',
                                fontWeight: 'bold',
                                align: 'center',
                                fill: ['#ffffff'],
                                dropShadow: true,
                                dropShadowColor: '#000000',
                                dropShadowBlur: 2,
                                dropShadowAngle: Math.PI / 2,
                                dropShadowDistance: 2,
                                wordWrap: true,
                                wordWrapWidth: 410,
                            }
                        },
                        {
                            "name": "blastAnim_desktop",
                            "type": "Animation",
                            "width": 480,
                            "height": 270,
                            "layout": false,
                            "uimode": "desktop",
                            "image": "blastAnim1",
                            "animationSpeed": 0.2,
                            "group": "Intro",
                            "playing": false,
                            "loop": false,
                            "visible": false,
                            "anchor": [0.5, 0.5],
                            "x": 895,
                            "y": 558,
                            "animations": {
                                "anim": ["blastAnim1"],
                            },
                        },
                        {
                            "name": "blastAnim_mobile",
                            "type": "Animation",
                            "width": 480,
                            "height": 270,
                            "layout": true,
                            "uimode": "mobile",
                            "image": "blastAnim1",
                            "animationSpeed": 0.2,
                            "group": "Intro",
                            "playing": false,
                            "loop": false,
                            "visible": false,
                            "anchor": [0.5, 0.5],
                            "x": 895,
                            "y": 558,
                            "animations": {
                                "anim": ["blastAnim1"],
                            },
                        },
                    ]
                }
            ]

        },
    ]
};