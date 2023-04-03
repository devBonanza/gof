export interface IApplicationState {
    overlaysymbolId: number
    overlaysymbolData: any
    createoverlaysymbolData: boolean
    clearoverlaysymbolData: boolean
}

const initialState: IApplicationState = {
    overlaysymbolData: [],
    overlaysymbolId: -1,
    createoverlaysymbolData: false,
    clearoverlaysymbolData: false,

};

export enum actionTypes {
    RESET_REEL_STATE = '@@reels/RESET_REEL_STATE',
    START_SPIN = '@@reels/START_SPIN',
    SET_ALL_SPIN_COMPLETE = '@@reels/SET_ALL_SPIN_COMPLETE',
    SET_OVERLAY_SYMBOL_LIST = '@@overlay/SET_OVERLAY_SYMBOL_LIST',
    SET_OVERLAY_SYMBOL_ID = '@@overlay/SET_OVERLAY_SYMBOL_ID',
    CREATE_OVERLAY_SYMBOL = '@@overlay/CREATE_OVERLAY_SYMBOL',
    CLEAR_OVERLAY_SYMBOL = '@@overlay/CLEAR_OVERLAY_SYMBOL',

}

export function reducer(
    state: IApplicationState = initialState,
    action: any,
): IApplicationState {
    const {
        overlaysymbolList,
        overlaysymbolId,
        createoverlaysymbolData,

    } = action;
    switch (action.type) {
        case actionTypes.CREATE_OVERLAY_SYMBOL:
            return {
                ...state, createoverlaysymbolData: createoverlaysymbolData
            };
        case actionTypes.CLEAR_OVERLAY_SYMBOL:
            return {
                ...state, clearoverlaysymbolData: true
            };
        case actionTypes.SET_OVERLAY_SYMBOL_ID:
            return {
                ...state, overlaysymbolId: overlaysymbolId
            };
        case actionTypes.SET_OVERLAY_SYMBOL_LIST:
            return {
                ...state, overlaysymbolData: overlaysymbolList
            };
        case actionTypes.START_SPIN:
            return {
                ...state,
                createoverlaysymbolData: false,
            }
        case actionTypes.SET_ALL_SPIN_COMPLETE:
            return {
                ...state,
                clearoverlaysymbolData: false,
                createoverlaysymbolData: true,

            }
        case actionTypes.RESET_REEL_STATE:
            return {
                ...state,
                clearoverlaysymbolData: false,
                createoverlaysymbolData: false,
            }

        default:
            return state;
    }
}

export const actions = {
    startSpin: (): any => ({ type: actionTypes.START_SPIN }),
    resetReelState: (): any => ({ type: actionTypes.RESET_REEL_STATE }),
    setSpinComplete: (allspincomplete: boolean): any => ({ type: actionTypes.SET_ALL_SPIN_COMPLETE, allspincomplete }),
    setOverlaySymbolList: (overlaysymbolList: any): any => ({ type: actionTypes.SET_OVERLAY_SYMBOL_LIST, overlaysymbolList }),
    setOverlaySymbolId: (overlaysymbolSymbolId: number): any => ({ type: actionTypes.SET_OVERLAY_SYMBOL_ID, overlaysymbolSymbolId }),
    createOverlaySymbol: (createoverlaysymbolData: boolean): any => ({ type: actionTypes.CREATE_OVERLAY_SYMBOL, createoverlaysymbolData }),
    clearOverlaySymbol: (): any => ({ type: actionTypes.CLEAR_OVERLAY_SYMBOL }),
};
