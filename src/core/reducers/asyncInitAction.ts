export interface IApplicationState {
    isInitResponseReceived: boolean,
    startRendering: boolean,
    result: object,
    error: object,
    balanceResult: object,
    isBalanceResponseReceived: boolean,
    gameBroken: boolean,
    loadingPercent: number,

}

const initialState: IApplicationState = {

    isInitResponseReceived: false,
    isBalanceResponseReceived: false,
    startRendering: false,
    gameBroken: false,
    result: {},
    balanceResult: {},
    loadingPercent: 0,
    error: {}

};

export enum actionTypes {
    GET_APPLICATION_INIT_RESPONSE = '@@application/GET_APPLICATION_INIT_RESPONSE',
    GET_APPLICATION_INIT_SUCCESS = '@@application/GET_APPLICATION_INIT_SUCCESS',
    SET_APPLICATION_INIT_BALANCE_SUCCESS = '@@application/SET_APPLICATION_INIT_BALANCE_SUCCESS',
    GET_APPLICATION_INIT_BALANCE_RESPONSE = '@@application/GET_APPLICATION_INIT_BALANCE_RESPONSE',
    GET_APPLICATION_INIT_FAILURE = '@@application/GET_APPLICATION_INIT_FAILURE',
    GET_APPLICATION_START_RENDERING = '@@application/GET_APPLICATION_START_RENDERING',
    SET_APPLICATION_BROKEN = '@@application/SET_APPLICATION_BROKEN',
    SET_LOADING_PERCENT = '@@application/SET_LOADING_PERCENT',
}

export function reducer(
    state: IApplicationState = initialState,
    action: any,
): IApplicationState {
    const { result, balanceResult, bet, error, startRendering,gameBroken ,loadingPercent} = action;


    switch (action.type) {
        case actionTypes.GET_APPLICATION_INIT_FAILURE:
            return { ...state, error, isInitResponseReceived: false };
        case actionTypes.GET_APPLICATION_INIT_SUCCESS:
            return { ...state, result, isInitResponseReceived: true };
        case actionTypes.SET_APPLICATION_INIT_BALANCE_SUCCESS:
            return { ...state, balanceResult:balanceResult, isBalanceResponseReceived: true };
        case actionTypes.GET_APPLICATION_START_RENDERING:
            return { ...state, result, startRendering: startRendering };
        case actionTypes.SET_APPLICATION_BROKEN:
            return { ...state, result, gameBroken: gameBroken };
        case actionTypes.SET_LOADING_PERCENT:
            return { ...state, result, loadingPercent: loadingPercent };
        default:
            return state;
    }
}

export const actions = {
    getApplicationInitResponse: (): any => ({ type: actionTypes.GET_APPLICATION_INIT_RESPONSE }),
    setApplicationInitBalanceResponse: (balanceResult:any): any => ({ type: actionTypes.SET_APPLICATION_INIT_BALANCE_SUCCESS ,balanceResult}),
    renderingStart: (startRendering: boolean): any => ({ type: actionTypes.GET_APPLICATION_START_RENDERING, startRendering }),
    setApplicationBroken: (gameBroken: boolean): any => ({ type: actionTypes.SET_APPLICATION_BROKEN, gameBroken }),
    setLoadingPercent: (loadingPercent: number): any => ({ type: actionTypes.SET_LOADING_PERCENT, loadingPercent }),

};