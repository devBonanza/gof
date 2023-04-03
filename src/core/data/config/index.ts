export enum configGame {
    "CANVAS_WIDTH" = 1280,
    "CANVAS_HEIGHT" = 720,
    "SPIN_TYPE" = 1,//"REEL","GRID"
    "SYMBOL_COUNT_MAX" = 5,//"REEL","GRID"
    "REEL_ROWS" = 3,
    "REEL_HEIGHT" = 500,
    "REEL_COLUMN" = 3,
    "REEL_CONTAINER_X" = 100,
    "REEL_CONTAINER_Y" = 150,
    "REEL_CONTAINER_X_IN_PORTRAIT" = 300,
    "REEL_CONTAINER_Y_IN_PORTRAIT" = 200,
    "REEL_CONTAINER_SCALE" = 1,
    "REEL_CONTAINER_SCALE_IN_PORTRAIT" = 0.5,
    "REEL_WIDTH" = 240,
    "REEL_GAP" = 10,
    "SYMBOL_WIDTH" = 240,
    "SYMBOL_HEIGHT" = 140,
    "DISPLAY_ALL_WIN_DURATION" = 1000,
    "TOGGLE_WIN_DURATION" = 1000,
    "TOGGLE_WIN_DURATION_IDLE" = 500,
    "AUTOPLAY_UI_IN_CANVAS" = 1,
    "MENU_UI_IN_CANVAS" = 1,
    "SHOW_GROUP_WIN_SYMBOL_DELAY" = 0,
    "LANDING_ANIM_HIDE_DURATION" = 1,
    "REEL_POST_STOP_FEATURE_TIMER"=1,


}

export const constant = {
    configGame: {
        "landscapeCanvasWidth": 1280,
        "landscapeCanvasHeight": 720,
        "portraitCanvasWidth": 720,
        "portraitCanvasHeight": 1280,
        "canvasWidth": 1280,
        "canvasHeight": 720,
        "fillWindow": false,
        "fullscreen": false,
        "fullscreenMode": "FULLSCREEN_MODE_AUTO_PREFER_HEIGHT",
        "centered": true,
        // "fullscreenMode": "FULLSCREEN_MODE_AUTO_PREFER_HEIGHT",
    }
}

export const server = {
    configGame: {
        "endpoint": "http://localhost/",//"REEL","GRID"
        "port": 3030,//"REEL","GRID"
        "method": "get",//"get","post"
        "postfixpath": "/init",//"get","post"
        "postfixpathToSend": "/init",//"get","post"
        "accountId": "/init",//"get","post"
    }
}