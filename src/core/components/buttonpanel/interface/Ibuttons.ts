export enum objectTypes {
    Sprite = "Sprite",
    Animation = "Animation"
}

// export interface Ibutton extends Ianimation{
export interface Ibutton {
    "id": string;
    "name"?: string;
    "image"?: string;
    "uimode"?: string;
    "type": objectTypes.Sprite | objectTypes.Animation;
    "interactive"?: boolean;
    "layout"?: boolean;
    "x": number | string;
    "y": number | string;
    "height": number | string;
    "animationSpeed"?: number;
    "width": number | string;
    "text"?: string;
    "anchor"?: Array<number>;
    "visible"?: boolean,
    "playing"?: boolean,
    "loop"?: boolean,

    "animationData"?: {
        "frame-pre-name": string,
        "frame-post-name": string,
        "frame-count": number
    },
    "currentFrames"?: Array<string>,
    "textStyle"?: {
        align?: string;
        breakWords?: boolean;
        dropShadow?: boolean;
        dropShadowAlpha?: number;
        dropShadowAngle?: number;
        dropShadowBlur?: number;
        dropShadowColor?: string | number;
        dropShadowDistance?: number;
        fill?: string | string[] | number | number[] | CanvasGradient | CanvasPattern;
        fillGradientType?: number;
        fillGradientStops?: number[];
        fontFamily?: string | string[];
        fontSize?: number | string;
        fontStyle?: string;
        fontVariant?: string;
        fontWeight?: string;
        leading?: number;
        letterSpacing?: number;
        lineHeight?: number;
        lineJoin?: string;
        miterLimit?: number;
        padding?: number;
        stroke?: string | number;
        strokeThickness?: number;
        trim?: boolean;
        textBaseline?: string;
        whiteSpace?: string;
        wordWrap?: boolean;
        wordWrapWidth?: number;
    },
    "buttonMode": boolean,
    "buttonState"?: {
        up: string
        out: string
        down: string
        disable: string
        enable: string
        hover: string
    },
    "hitareaVisible"?: boolean,
    "shapeVisible"?: boolean,
    "shape"?: PIXI.SHAPES | {},
    "hitarea"?: rectangle | circle
}

interface rectangle {
    "x": number;
    "y": number;
    "w": number;
    "h": number;
    "type": "rectangle"
}

interface circle {
    "x": number;
    "y": number;
    "r": number;
    "type": "circle"
}