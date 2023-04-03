import React from "react";
import { objectTypes } from "../../../core/components/buttonpanel/interface/Ibuttons";


interface IframeworkMobileSettingPanel {
    data: {}
}

export const frameworkMobileSettingPanel: IframeworkMobileSettingPanel = {

    data: {
        "COMPONENTS": [
            {
                "name": "mobileSettingPanelBg",
                "type": "Graphic",
                "shape": "rectangle",
                "visible": true,
                "alpha": 1,
                "group": "Intro",
                "color": "0x000000",
                "x": 0,
                "y": 0,
                "width": 1920,
                "height": 1030,
            },
            {
                "id": "mobileSettingPanelBottomSprite",
                "name": "mobileSettingPanelBottomSprite",
                "type": "Image",
                "image": "landbottom_icon_bar.png",
                "uimode": "mobile",
                "layout": true,
                "anchor": [0.5, 0.5],
                "visible": true,
                "x": 0,
                "y": 0,
                "width": 1920,
                "height": 150,
            },
            {
                "id": "mobileSettingPanelTopSpriteLine",
                "name": "mobileSettingPanelTopSpriteLine",
                "image": "landhorizontal_line.png",
                "type": "Image",
                "uimode": "mobile",
                "layout": true,
                "visible": true,
                "x": 0,
                "y": 0,
                "width": 1920,
                "height": 4,
            },
            {
                "id": "mobileSettingPanelBottomSpriteLineBar1",
                "name": "mobileSettingPanelBottomSpriteLineBar1",
                "image": "landborder_line.png",
                "type": "Image",
                "uimode": "mobile",
                "layout": true,
                "visible": true,
                "x": 0,
                "y": 0,
                "width": 4,
                "height": 130,
            },
            {
                "id": "mobileSettingPanelBottomSpriteLineBar2",
                "name": "mobileSettingPanelBottomSpriteLineBar2",
                "image": "landborder_line.png",
                "type": "Image",
                "uimode": "mobile",
                "layout": true,
                "visible": true,
                "x": 0,
                "y": 0,
                "width": 4,
                "height": 130,
            },
            {
                "id": "mobileSettingPanelBottomSpriteLineBar3",
                "name": "mobileSettingPanelBottomSpriteLineBar3",
                "image": "landborder_line.png",
                "type": "Image",
                "uimode": "mobile",
                "layout": true,
                "visible": true,
                "x": 0,
                "y": 0,
                "width": 4,
                "height": 130,
            },
            {
                "id": "mobileSettingPanelBottomSpriteLineBar4",
                "name": "mobileSettingPanelBottomSpriteLineBar4",
                "image": "landborder_line.png",
                "type": "Image",
                "uimode": "mobile",
                "layout": true,
                "visible": true,
                "x": 0,
                "y": 0,
                "width": 4,
                "height": 130,
            },
            {
                "id": "mobileButtonUi_landscape",
                "name": "mobileButtonUi_landscape",
                "type": "Container",
                "class": "",
                "x": 0,
                "y": 935,
                "visible": true,
                "filterTypes": [],
                child: [
                    {
                        "id": "btn_mobileAutoplayButtonEnable_landscape",
                        "name": "btn_mobileAutoplayButtonEnable_landscape",
                        "type": objectTypes.Sprite,
                        "buttonMode": true,
                        "layout": true,
                        "uimode": "mobile",
                        "interactive": true,
                        "anchor": [0.5, 0.5],
                        "width": 98,
                        "height": 100,
                        "x": 230,
                        "y": 0,
                        "visible": true,
                        "buttonState": {
                            up: 'landautoplay_up.png',
                            out: 'landautoplay_up.png',
                            down: 'landautoplay_up.png',
                            disable: 'landautoplay_up.png',
                            enable: 'landautoplay_up.png',
                            hover: 'landautoplay_up.png'
                        },
                        "hitareaVisible": false,
                        "shapeVisible": false,
                        "shape": {}
                    },
                    {
                        "id": "btn_mobileAutoplayButtonDisable_landscape",
                        "name": "btn_mobileAutoplayButtonDisable_landscape",
                        "type": objectTypes.Sprite,
                        "buttonMode": true,
                        "layout": true,
                        "uimode": "mobile",
                        "interactive": true,
                        "anchor": [0.5, 0.5],
                        "width": 98,
                        "height": 100,
                        "x": 230,
                        "y": 0,
                        "visible": true,
                        "buttonState": {
                            up: 'landautoplay_disable.png',
                            out: 'landautoplay_disable.png',
                            down: 'landautoplay_disable.png',
                            disable: 'landautoplay_disable.png',
                            enable: 'landautoplay_disable.png',
                            hover: 'landautoplay_disable.png'
                        },
                        "hitareaVisible": false,
                        "shapeVisible": false,
                        "shape": {}
                    },
                    {
                        "id": "btn_mobileBetButtonEnable_landscape",
                        "name": "btn_mobileBetButtonEnable_landscape",
                        "type": objectTypes.Sprite,
                        "buttonMode": true,
                        "layout": true,
                        "uimode": "mobile",
                        "interactive": true,
                        "anchor": [0.5, 0.5],
                        "width": 98,
                        "height": 100,
                        "x": 595,
                        "y": 0,
                        "visible": true,
                        "buttonState": {
                            up: 'landcoin_up.png',
                            out: 'landcoin_up.png',
                            down: 'landcoin_up.png',
                            disable: 'landcoin_up.png',
                            enable: 'landcoin_up.png',
                            hover: 'landcoin_up.png'
                        },
                        "hitareaVisible": false,
                        "shapeVisible": false,
                        "shape": {}
                    },
                    {
                        "id": "btn_mobileBetButtonDisable_landscape",
                        "name": "btn_mobileBetButtonDisable_landscape",
                        "type": objectTypes.Sprite,
                        "buttonMode": true,
                        "layout": true,
                        "uimode": "mobile",
                        "interactive": true,
                        "anchor": [0.5, 0.5],
                        "width": 98,
                        "height": 100,
                        "x": 595,
                        "y": 0,
                        "visible": true,
                        "buttonState": {
                            up: 'landcoin_disable.png',
                            out: 'landcoin_disable.png',
                            down: 'landcoin_disable.png',
                            disable: 'landcoin_disable.png',
                            enable: 'landcoin_disable.png',
                            hover: 'landcoin_disable.png'
                        },
                        "hitareaVisible": false,
                        "shapeVisible": false,
                        "shape": {}
                    },
                    {
                        "id": "btn_mobileGameGuideEnable_landscape",
                        "name": "btn_mobileGameGuideEnable_landscape",
                        "type": objectTypes.Sprite,
                        "buttonMode": true,
                        "layout": true,
                        "uimode": "mobile",
                        "interactive": true,
                        "anchor": [0.5, 0.5],
                        "width": 98,
                        "height": 100,
                        "x": 1325,
                        "y": 0,
                        "visible": true,
                        "buttonState": {
                            up: 'landpaytable_up.png',
                            out: 'landpaytable_up.png',
                            down: 'landpaytable_up.png',
                            disable: 'landpaytable_up.png',
                            enable: 'landpaytable_up.png',
                            hover: 'landpaytable_up.png'
                        },
                        "hitareaVisible": false,
                        "shapeVisible": false,
                        "shape": {}
                    },
                    {
                        "id": "btn_mobileGameGuideDisable_landscape",
                        "name": "btn_mobileGameGuideDisable_landscape",
                        "type": objectTypes.Sprite,
                        "buttonMode": true,
                        "layout": true,
                        "uimode": "mobile",
                        "interactive": true,
                        "anchor": [0.5, 0.5],
                        "width": 98,
                        "height": 100,
                        "x": 1325,
                        "y": 0,
                        "visible": true,
                        "buttonState": {
                            up: 'landpaytable_disable.png',
                            out: 'landpaytable_disable.png',
                            down: 'landpaytable_disable.png',
                            disable: 'landpaytable_disable.png',
                            enable: 'landpaytable_disable.png',
                            hover: 'landpaytable_disable.png'
                        },
                        "hitareaVisible": false,
                        "shapeVisible": false,
                        "shape": {}
                    },
                    {
                        "id": "btn_mobilePayTableButtonEnable_landscape",
                        "name": "btn_mobilePayTableButtonEnable_landscape",
                        "type": objectTypes.Sprite,
                        "buttonMode": true,
                        "layout": true,
                        "uimode": "mobile",
                        "interactive": true,
                        "anchor": [0.5, 0.5],
                        "width": 98,
                        "height": 100,
                        "x": 950,
                        "y": 0,
                        "visible": true,
                        "buttonState": {
                            up: 'landinformation_up.png',
                            out: 'landinformation_up.png',
                            down: 'landinformation_up.png',
                            disable: 'landinformation_up.png',
                            enable: 'landinformation_up.png',
                            hover: 'landinformation_up.png'
                        },
                        "hitareaVisible": false,
                        "shapeVisible": false,
                        "shape": {}
                    },
                    {
                        "id": "btn_mobilePayTableButtonDisable_landscape",
                        "name": "btn_mobilePayTableButtonDisable_landscape",
                        "type": objectTypes.Sprite,
                        "buttonMode": true,
                        "layout": true,
                        "uimode": "mobile",
                        "interactive": true,
                        "anchor": [0.5, 0.5],
                        "width": 98,
                        "height": 100,
                        "x": 950,
                        "y": 0,
                        "visible": true,
                        "buttonState": {
                            up: 'landinformation_disable.png',
                            out: 'landinformation_disable.png',
                            down: 'landinformation_disable.png',
                            disable: 'landinformation_disable.png',
                            enable: 'landinformation_disable.png',
                            hover: 'landinformation_disable.png'
                        },
                        "hitareaVisible": false,
                        "shapeVisible": false,
                        "shape": {}
                    },
                    {
                        "id": "mobileCloseButton_landscape",
                        "name": "mobileCloseButton_landscape",
                        "type": objectTypes.Sprite,
                        "buttonMode": true,
                        "layout": true,
                        "uimode": "mobile",
                        "interactive": true,
                        "anchor": [0.5, 0.5],
                        "width": 98,
                        "height": 100,
                        "x": 1690,
                        "y": 0,
                        "visible": true,
                        "buttonState": {
                            up: 'landclose_on.png',
                            out: 'landclose_on.png',
                            down: 'landclose_on.png',
                            disable: 'landclose_on.png',
                            enable: 'landclose_on.png',
                            hover: 'landclose_on.png'
                        },
                        "hitareaVisible": false,
                        "shapeVisible": false,
                        "shape": {}
                    },
                ]
            },

            {
                "id": "mobileButtonUi_portrait",
                "name": "mobileButtonUi_portrait",
                "type": "Container",
                "class": "",
                "x": 0,
                "y": 1850,
                "visible": true,
                "filterTypes": [],
                child: [
                    {
                        "id": "btn_mobileAutoplayButtonEnable_portrait",
                        "name": "btn_mobileAutoplayButtonEnable_portrait",
                        "type": objectTypes.Sprite,
                        "buttonMode": true,
                        "layout": true,
                        "uimode": "mobile",
                        "interactive": true,
                        "anchor": [0.5, 0.5],
                        "width": 98,
                        "height": 100,
                        "x": 85,
                        "y": 0,
                        "visible": true,
                        "buttonState": {
                            up: 'landautoplay_up.png',
                            out: 'landautoplay_up.png',
                            down: 'landautoplay_up.png',
                            disable: 'landautoplay_up.png',
                            enable: 'landautoplay_up.png',
                            hover: 'landautoplay_up.png'
                        },
                        "hitareaVisible": false,
                        "shapeVisible": false,
                        "shape": {}
                    },
                    {
                        "id": "btn_mobileAutoplayButtonDisable_portrait",
                        "name": "btn_mobileAutoplayButtonDisable_portrait",
                        "type": objectTypes.Sprite,
                        "buttonMode": true,
                        "layout": true,
                        "uimode": "mobile",
                        "interactive": true,
                        "anchor": [0.5, 0.5],
                        "width": 98,
                        "height": 100,
                        "x": 85,
                        "y": 0,
                        "visible": true,
                        "buttonState": {
                            up: 'landautoplay_disable.png',
                            out: 'landautoplay_disable.png',
                            down: 'landautoplay_disable.png',
                            disable: 'landautoplay_disable.png',
                            enable: 'landautoplay_disable.png',
                            hover: 'landautoplay_disable.png'
                        },
                        "hitareaVisible": false,
                        "shapeVisible": false,
                        "shape": {}
                    },
                    {
                        "id": "btn_mobileBetButtonEnable_portrait",
                        "name": "btn_mobileBetButtonEnable_portrait",
                        "type": objectTypes.Sprite,
                        "buttonMode": true,
                        "layout": true,
                        "uimode": "mobile",
                        "interactive": true,
                        "anchor": [0.5, 0.5],
                        "width": 98,
                        "height": 100,
                        "x": 310,
                        "y": 0,
                        "visible": true,
                        "buttonState": {
                            up: 'landcoin_up.png',
                            out: 'landcoin_up.png',
                            down: 'landcoin_up.png',
                            disable: 'landcoin_up.png',
                            enable: 'landcoin_up.png',
                            hover: 'landcoin_up.png'
                        },
                        "hitareaVisible": false,
                        "shapeVisible": false,
                        "shape": {}
                    },
                    {
                        "id": "btn_mobileBetButtonDisable_portrait",
                        "name": "btn_mobileBetButtonDisable_portrait",
                        "type": objectTypes.Sprite,
                        "buttonMode": true,
                        "layout": true,
                        "uimode": "mobile",
                        "interactive": true,
                        "anchor": [0.5, 0.5],
                        "width": 98,
                        "height": 100,
                        "x": 310,
                        "y": 0,
                        "visible": true,
                        "buttonState": {
                            up: 'landcoin_disable.png',
                            out: 'landcoin_disable.png',
                            down: 'landcoin_disable.png',
                            disable: 'landcoin_disable.png',
                            enable: 'landcoin_disable.png',
                            hover: 'landcoin_disable.png'
                        },
                        "hitareaVisible": false,
                        "shapeVisible": false,
                        "shape": {}
                    },
                    {
                        "id": "btn_mobileGameGuideEnable_portrait",
                        "name": "btn_mobileGameGuideEnable_portrait",
                        "type": objectTypes.Sprite,
                        "buttonMode": true,
                        "layout": true,
                        "uimode": "mobile",
                        "interactive": true,
                        "anchor": [0.5, 0.5],
                        "width": 98,
                        "height": 100,
                        "x": 760,
                        "y": 0,
                        "visible": true,
                        "buttonState": {
                            up: 'landpaytable_up.png',
                            out: 'landpaytable_up.png',
                            down: 'landpaytable_up.png',
                            disable: 'landpaytable_up.png',
                            enable: 'landpaytable_up.png',
                            hover: 'landpaytable_up.png'
                        },
                        "hitareaVisible": false,
                        "shapeVisible": false,
                        "shape": {}
                    },
                    {
                        "id": "btn_mobileGameGuideDisable_portrait",
                        "name": "btn_mobileGameGuideDisable_portrait",
                        "type": objectTypes.Sprite,
                        "buttonMode": true,
                        "layout": true,
                        "uimode": "mobile",
                        "interactive": true,
                        "anchor": [0.5, 0.5],
                        "width": 98,
                        "height": 100,
                        "x": 760,
                        "y": 0,
                        "visible": true,
                        "buttonState": {
                            up: 'landpaytable_disable.png',
                            out: 'landpaytable_disable.png',
                            down: 'landpaytable_disable.png',
                            disable: 'landpaytable_disable.png',
                            enable: 'landpaytable_disable.png',
                            hover: 'landpaytable_disable.png'
                        },
                        "hitareaVisible": false,
                        "shapeVisible": false,
                        "shape": {}
                    },
                    {
                        "id": "btn_mobilePayTableButtonEnable_portrait",
                        "name": "btn_mobilePayTableButtonEnable_portrait",
                        "type": objectTypes.Sprite,
                        "buttonMode": true,
                        "layout": true,
                        "uimode": "mobile",
                        "interactive": true,
                        "anchor": [0.5, 0.5],
                        "width": 98,
                        "height": 100,
                        "x": 535,
                        "y": 0,
                        "visible": true,
                        "buttonState": {
                            up: 'landinformation_up.png',
                            out: 'landinformation_up.png',
                            down: 'landinformation_up.png',
                            disable: 'landinformation_up.png',
                            enable: 'landinformation_up.png',
                            hover: 'landinformation_up.png'
                        },
                        "hitareaVisible": false,
                        "shapeVisible": false,
                        "shape": {}
                    },
                    {
                        "id": "btn_mobilePayTableButtonDisable_portrait",
                        "name": "btn_mobilePayTableButtonDisable_portrait",
                        "type": objectTypes.Sprite,
                        "buttonMode": true,
                        "layout": true,
                        "uimode": "mobile",
                        "interactive": true,
                        "anchor": [0.5, 0.5],
                        "width": 98,
                        "height": 100,
                        "x": 535,
                        "y": 0,
                        "visible": true,
                        "buttonState": {
                            up: 'landinformation_disable.png',
                            out: 'landinformation_disable.png',
                            down: 'landinformation_disable.png',
                            disable: 'landinformation_disable.png',
                            enable: 'landinformation_disable.png',
                            hover: 'landinformation_disable.png'
                        },
                        "hitareaVisible": false,
                        "shapeVisible": false,
                        "shape": {}
                    },
                    {
                        "id": "mobileCloseButton_portrait",
                        "name": "mobileCloseButton_portrait",
                        "type": objectTypes.Sprite,
                        "buttonMode": true,
                        "layout": true,
                        "uimode": "mobile",
                        "interactive": true,
                        "anchor": [0.5, 0.5],
                        "width": 98,
                        "height": 100,
                        "x": 985,
                        "y": 0,
                        "visible": true,
                        "buttonState": {
                            up: 'landclose_on.png',
                            out: 'landclose_on.png',
                            down: 'landclose_on.png',
                            disable: 'landclose_on.png',
                            enable: 'landclose_on.png',
                            hover: 'landclose_on.png'
                        },
                        "hitareaVisible": false,
                        "shapeVisible": false,
                        "shape": {}
                    },
                ]
            },
            {
                "id": "autoplayHeading_mobile",
                "name": "autoplayHeading_mobile",
                "type": "Text",
                "width": 1000,
                "visible": true,
                "text": "autoplayText_25",
                "scaleToFit": true,
                "anchor": [0.5, 0.5],
                "layout": true,
                "uimode": "mobile",
                "x": 0,
                "y": 0,
                "textStyle": {
                    fontFamily: 'Arial',
                    fontSize: 52,
                    fontWeight: 'bold',
                    fill: '#ffffff',
                },
            },
            {
                "id": "betHeading_mobile",
                "name": "betHeading_mobile",
                "type": "Text",
                "x": 0,
                "y": 0,
                "width": 1000,
                "visible": true,
                "text": "buttonPanelText_1",
                "layout": true,
                "uimode": "mobile",
                "scaleToFit": true,
                "anchor": [0.5, 0.5],
                "textStyle": {
                    fontFamily: 'Arial',
                    fontSize: 52,
                    fontWeight: 'bold',
                    fill: ['#ffffff'],
                },
            },
            {
                "id": "GameGuideHeading_mobile",
                "name": "GameGuideHeading_mobile",
                "type": "Text",
                "x": 0,
                "y": 0,
                "width": 1000,
                "visible": true,
                "text": "GAME RULES",
                "layout": true,
                "uimode": "mobile",
                "scaleToFit": true,
                "anchor": [0.5, 0.5],
                "textStyle": {
                    fontFamily: 'Arial',
                    fontSize: 52,
                    fontWeight: 'bold',
                    fill: '#ffffff',
                },
            },
            {
                "id": "payTableHeading_mobile",
                "name": "payTableHeading_mobile",
                "type": "Text",
                "x": 0,
                "y": 0,
                "visible": true,
                "text": "paytableHeading1",
                "layout": true,
                "uimode": "mobile",
                "width": 810,
                "anchor": [0.5, 0.5],
                "scaleToFit": true,
                "textStyle": {
                    fontFamily: 'Arial',
                    fontSize: 52,
                    fontWeight: 'bold',
                    fill: '#ffffff',
                },
            },
        ]
    }
};

export const MobileSettingPanelConfigurationContext = React.createContext(
    {}
);