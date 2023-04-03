export interface IApplicationState {
    updatedSymbolId: number,
    dropduration: number,
    updatedSymbol: any,
    dropSymbol: any,
    randomSymbol: boolean
    animatOnLand: boolean
    animLoop: boolean,
    singleSymbolAnimDelay: number,
    groupSymbolAnimDelay: number,
    symbolAnimGroupWise: boolean
    landPosition: any
    resetAnimConfig: boolean
    startPosition: any
    symnolImage: any,
    symbolUpdate: any
    onComplete: any
    onCompleteScope: any
    animationName: any
    reactCompSymbolTrayList: any
    addSymbolInTray: any
}

const initialState: IApplicationState = {
    updatedSymbolId: -1,
    dropduration: -1,
    updatedSymbol: {},
    resetAnimConfig: false,
    dropSymbol: {},
    landPosition: {},
    startPosition: {},
    animLoop: false,
    singleSymbolAnimDelay: 0,
    groupSymbolAnimDelay: 0,
    symbolAnimGroupWise: false,
    randomSymbol: false,
    animatOnLand: false,
    addSymbolInTray: false,
    animationName: "",
    symnolImage: [],
    symbolUpdate: [],
    reactCompSymbolTrayList: [],
    onComplete: Function,
    onCompleteScope: {},
};

export enum actionTypes {

    SET_SYMBOL_ANIMATION_NAME = '@@symbol/SET_SYMBOL_ANIMATION_NAME',
    SET_UPDATED_SYMBOL = '@@symbol/SET_UPDATED_SYMBOL',
    SET_UPDATED_SYMBOL_CONFIG = '@@symbol/SET_UPDATED_SYMBOL_CONFIG',
    GET_UPDATED_SYMBOL = '@@symbol/GET_UPDATED_SYMBOL',
    RESET_ANIMATION_CONFIG = '@@symbol/RESET_ANIMATION_CONFIG',
    START_DROP_SYMBOL = '@@symbol/START_DROP_SYMBOL',
    SET_REACT_SYMBOL_TRAY = '@@symbol/SET_REACT_SYMBOL_TRAY',
    ADD_SYMBOL_IN_TRAY = '@@symbol/ADD_SYMBOL_IN_TRAY'
}

export function reducer(
    state: IApplicationState = initialState,
    action: any,
): IApplicationState {
    const {
        updatedSymbol,
        updatedSymbolId,
        randomSymbol,
        dropSymbol,
        animationname,
        callback,
        callbackScope,
        reactCompSymbolTrayList,
        animLoop,
        singleSymbolAnimDelay,
        groupSymbolAnimDelay,
        symbolAnimGroupWise
    } = action;
    switch (action.type) {
        case actionTypes.GET_UPDATED_SYMBOL:
            return { ...state };
        case actionTypes.SET_UPDATED_SYMBOL:
            return {
                ...state,
                updatedSymbolId: updatedSymbolId,
                updatedSymbol: updatedSymbol,
                randomSymbol: randomSymbol,
                addSymbolInTray: false
            };
        case actionTypes.SET_UPDATED_SYMBOL_CONFIG:
            return {
                ...state,
                resetAnimConfig: false,
                animLoop: animLoop,
                singleSymbolAnimDelay: singleSymbolAnimDelay,
                groupSymbolAnimDelay: groupSymbolAnimDelay,
                symbolAnimGroupWise: symbolAnimGroupWise,
                animationName: animationname
            };
        case actionTypes.SET_SYMBOL_ANIMATION_NAME:
            return {
                ...state,
                resetAnimConfig: false,
                animationName: animationname,
                onComplete: callback,
                onCompleteScope: callbackScope
            };
        case actionTypes.START_DROP_SYMBOL:
            return {
                ...state, dropSymbol: dropSymbol, updatedSymbolId: updatedSymbolId
            };
        case actionTypes.SET_REACT_SYMBOL_TRAY:
            return {
                ...state, reactCompSymbolTrayList: reactCompSymbolTrayList
            };
        case actionTypes.ADD_SYMBOL_IN_TRAY:
            return {
                ...state, addSymbolInTray: true
            };
        case actionTypes.RESET_ANIMATION_CONFIG:
            return {
                ...state, resetAnimConfig: true
            };
        default:
            return state;
    }
}

export const actions = {
    getUpdatedSymbol: (): any => ({ type: actionTypes.GET_UPDATED_SYMBOL }),
    setUpdatedSymbol: (updatedSymbol: any, updatedSymbolId: number, randomSymbol: boolean): any => ({ type: actionTypes.SET_UPDATED_SYMBOL, updatedSymbol, updatedSymbolId, randomSymbol }),
    setReactSymbolTray: (reactCompSymbolTrayList: any): any => ({ type: actionTypes.SET_REACT_SYMBOL_TRAY, reactCompSymbolTrayList }),
    setDropSymbol: (dropSymbol: any, updatedSymbolId: number): any => ({ type: actionTypes.START_DROP_SYMBOL, dropSymbol, updatedSymbolId }),
    addSymbolInTray: (): any => ({ type: actionTypes.ADD_SYMBOL_IN_TRAY, }),
    resetAnimationConfig: (): any => ({ type: actionTypes.RESET_ANIMATION_CONFIG, }),
    setSymbolAnimationName: (animationSymbol: any, animationname: string = "", callback?: any, callbackScope?: any): any => ({ type: actionTypes.SET_SYMBOL_ANIMATION_NAME, animationname, callback, callbackScope }),
    setChangeAnimationConfig: (animLoop: boolean, singleSymbolAnimDelay: number, groupSymbolAnimDelay: number, symbolAnimGroupWise: boolean, animationname: string): any => ({ type: actionTypes.SET_UPDATED_SYMBOL_CONFIG, animLoop, singleSymbolAnimDelay, groupSymbolAnimDelay, symbolAnimGroupWise, animationname }),
};
