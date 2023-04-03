export interface IApplicationState {
    stopTick: boolean;
    startTick: boolean;
    fpsInterval: number;
    tweening: any;
    now: any;
    delta: number;
}

const initialState: IApplicationState = {
    stopTick: false,
    startTick: false,
    fpsInterval: 30,
    tweening: [],
    delta: 0,
    now: 0
};

export enum actionTypes {
    STOP_TICK = '@@ticker/STOP_TICK',
    START_TICK = '@@ticker/START_TICK',
    FPS_INTERVAL = '@@ticker/FPS_INTERVAL',
    TWEENING = '@@ticker/TWEENING',
    DELTA = '@@ticker/DELTA',
    NOW = '@@ticker/NOW',

}

export function reducer(
    state: IApplicationState = initialState,
    action: any,
): IApplicationState {
    const {stopTick, fpsInterval, startTick, tweening, delta, now} = action;
    switch (action.type) {
        case actionTypes.STOP_TICK:
            return {
                ...state, stopTick: stopTick,
            };
        case actionTypes.START_TICK:
            return {
                ...state, startTick: startTick,
            };
        case actionTypes.FPS_INTERVAL:
            return {
                ...state, fpsInterval: fpsInterval,
            };
        case actionTypes.TWEENING:
            return {
                ...state, tweening: tweening,
            };
        case actionTypes.DELTA:
            return {
                ...state, delta: delta,
            };
        case actionTypes.NOW:
            return {
                ...state, now: now,
            };
        default:
            return state;
    }
}

export const actions = {
    tickStop: (stopTick: boolean): any => ({type: actionTypes.STOP_TICK, stopTick}),
    tickStart: (startTick: boolean): any => ({type: actionTypes.START_TICK, startTick}),
    setFpsInterval: (fpsInterval: number): any => ({type: actionTypes.FPS_INTERVAL, fpsInterval}),
    setTweening: (tweening: any): any => ({type: actionTypes.TWEENING, tweening}),
    setDelta: (delta: any): any => ({type: actionTypes.DELTA, delta}),
    setNow: (now: any): any => ({type: actionTypes.NOW, now}),
};



