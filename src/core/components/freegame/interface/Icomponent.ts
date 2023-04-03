export interface Icomponent {
    "id"?: string;
    "name"?: string;
    "image"?: string;
    "type": string;
    "class"?: string;
    "layoutMode"?: string;
    "layout"?: boolean,
    "parentLayer"?: string;
    "height"?: number | string;
    "width"?: number | string;
    "x"?: number | string;
    "y"?: number | string;
    "text"?: string;
    "anchor"?: Array<number>;
    "visible"?: boolean,
    "uimode"?: string;
    "scaleToFit"?: boolean,
    "textStyle"?: any,
    "filterTypes"?: any,
    "child"?: any,
    "scale"?: number,
    "animationSpeed"?: number,
    "playing"?: boolean,
    "loop"?: boolean,
    "currentFrames"?: Array<string>,
    "animationData"?: {
        "frame-pre-name": string,
        "frame-post-name": string,
        "frame-count": number
    },
    "animations"?: {},

}