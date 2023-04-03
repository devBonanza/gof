export interface IApplicationState {
    lineType: boolean,
    waysType: boolean,
    winPresentationStart: boolean,
    winPresentationStop: boolean,
    displayAllWintogether: boolean,
    startToggle: boolean,
    endToggle: boolean,
    playSymbolAnimation: boolean
    winCycleComplete: boolean
    displayWinBox: boolean
    currentToggleIndex: number
    currentToggleId: number
    winSymbolCoOrdinate: any,
    staticwinSymbolCoOrdinate: any,
    wonSymbolIds: any,
    winningList: any,
    winpositions: any,
    SymbolAnimationPositions: any,
    currentwinpositions: any,
    winLineCount: number,
    phaseCount: number,
    isPause: boolean,
    isPostFeatureRequired: boolean,
    gridSymbols: any,
    endBlastSymbolCoOrdinate: any,

}

const initialState: IApplicationState = {
    lineType: false,
    waysType: false,
    winPresentationStart: false,
    winPresentationStop: false,
    displayAllWintogether: false,
    startToggle: false,
    endToggle: false,
    winCycleComplete: false,
    displayWinBox: false,
    playSymbolAnimation: false,
    winSymbolCoOrdinate: [],
    staticwinSymbolCoOrdinate: [],
    winningList: [],
    winpositions: [],
    SymbolAnimationPositions: [],
    wonSymbolIds: [],
    currentToggleIndex: -1,
    currentToggleId: -1,
    currentwinpositions: [],
    winLineCount: -1,
    phaseCount: -1,
    isPause: false,
    isPostFeatureRequired: false,
    gridSymbols: [],
    endBlastSymbolCoOrdinate: [],

};

export enum actionTypes {
    GET_APPLICATION_SPIN_SUCCESS = '@@presentation/GET_APPLICATION_SPIN_SUCCESS',
    SET_LINE_TYPE = '@@presentation/SET_LINE_TYPE',
    SET_WAYS_TYPE = '@@presentation/SET_WAYS_TYPE',
    PLAY_ANIM_WIN_SYMBOL = '@@presentation/PLAY_ANIM_WIN_SYMBOL',
    SET_WIN_SYMBOL_CO_ORDINATE = '@@presentation/SET_WIN_SYMBOL_CO_ORDINATE',
    SET_STATIC_WIN_SYMBOL_CO_ORDINATE = '@@presentation/SET_STATIC_WIN_SYMBOL_CO_ORDINATE',
    GET_WIN_SYMBOL_CO_ORDINATE = '@@presentation/GET_WIN_SYMBOL_CO_ORDINATE',
    START_WIN_PRESENTATION = '@@presentation/START_WIN_PRESENTATION',
    STOP_WIN_PRESENTATION = '@@presentation/STOP_WIN_PRESENTATION',
    SET_WINNING_ID_LIST = '@@presentation/SET_WINNING_ID_LIST',
    SET_DISPLAY_ALL_WIN_TOGETHER = '@@presentation/SET_DISPLAY_ALL_WIN_TOGETHER',
    START_WIN_TOGGLE = '@@presentation/START_WIN_TOGGLE',
    END_WIN_TOGGLE = '@@presentation/END_WIN_TOGGLE',
    WIN_CYCLE_COMPLETE = '@@presentation/WIN_CYCLE_COMPLETE',
    SET_CURRENT_TOGGLE_ID = '@@presentation/SET_CURRENT_TOGGLE_ID',
    GET_CURRENT_TOGGLE_INDEX = '@@presentation/GET_CURRENT_TOGGLE_INDEX',
    SET_WIN_LINE_COUNT = '@@presentation/SET_WIN_LINE_COUNT',
    SET_PHASE_COUNT = '@@presentation/SET_PHASE_COUNT',
    WIN_PAUSE = '@@presentation/WIN_PAUSE',
    WIN_RESUME = '@@presentation/WIN_RESUME',
    DISPLAY_WINBOX = '@@presentation/DISPLAY_WINBOX',
    SET_SYMBOL_ANIMATION_DATA = '@@presentation/SET_SYMBOL_ANIMATION_DATA',
    IS_POST_FEATURE_REQUIRED = '@@presentation/IS_POST_FEATURE_REQUIRED',

    SET_ALL_GRID_SYMBOLS = '@@presentation/SET_ALL_GRID_SYMBOLS',
    SET_END_SYMBOL_BLAST_DATA = '@@presentation/SET_END_SYMBOL_BLAST_DATA',
}

export function reducer(
    state: IApplicationState = initialState,
    action: any,
): IApplicationState {
    const { toggleId, winlinecount, winningIdList, phasecount, winSymbolCoOrdinate, staticwinSymbolCoOrdinate, result_spin, displayWinBox, SymbolAnimationData, isPostFeatureRequired, gridSymbols } = action;
    const { currentToggleIndex, winningList, winPresentationStart, winpositions } = state;

    switch (action.type) {
        case actionTypes.GET_APPLICATION_SPIN_SUCCESS:
            let lineIDs: any = [];
            let winPositions: any = [];
            result_spin.wins.forEach((data: any, index: any) => {
                lineIDs.push(data.id)
                winPositions.push(data.positions)
            });
            return {
                ...state,
                wonSymbolIds: result_spin.wonSymbolIds,
                winningList: lineIDs,
                winpositions: winPositions,
                SymbolAnimationPositions: winPositions,
                currentwinpositions: winPositions[0],
            };

        case actionTypes.PLAY_ANIM_WIN_SYMBOL:
            return {
                ...state, playSymbolAnimation: true
            };
        case actionTypes.SET_LINE_TYPE:
            return {
                ...state, lineType: true
            };
        case actionTypes.DISPLAY_WINBOX:
            return {
                ...state, displayWinBox: displayWinBox
            };
        case actionTypes.SET_PHASE_COUNT:
            return {
                ...state, phaseCount: phasecount
            };
        case actionTypes.SET_WIN_SYMBOL_CO_ORDINATE:
            return {
                ...state, winSymbolCoOrdinate: winSymbolCoOrdinate
            };
        case actionTypes.SET_STATIC_WIN_SYMBOL_CO_ORDINATE:
            return {
                ...state, staticwinSymbolCoOrdinate: staticwinSymbolCoOrdinate
            };
        case actionTypes.GET_WIN_SYMBOL_CO_ORDINATE:
            return {
                ...state
            };
        case actionTypes.SET_WINNING_ID_LIST:
            return {
                ...state,
                winningList: winningIdList
            };
        case actionTypes.SET_WIN_LINE_COUNT:
            return {
                ...state,
                winLineCount: winlinecount
            };
        case actionTypes.GET_CURRENT_TOGGLE_INDEX:
            return {
                ...state
            };
        case actionTypes.SET_CURRENT_TOGGLE_ID:
            return {
                ...state,
                displayAllWintogether: false,
                currentToggleId: toggleId,
            };
        case actionTypes.SET_DISPLAY_ALL_WIN_TOGETHER:
            return {
                ...state, displayAllWintogether: true
            };
        case actionTypes.SET_WAYS_TYPE:
            return {
                ...state, waysType: true
            };
        case actionTypes.START_WIN_PRESENTATION:
            return {
                ...state,
                winPresentationStart: true,
                winPresentationStop: false,
                displayAllWintogether: false
            }
        case actionTypes.STOP_WIN_PRESENTATION:
            return {
                ...state,
                winPresentationStop: true,
                winPresentationStart: false,
                startToggle: false,
                endToggle: false,
                winCycleComplete: false,
                playSymbolAnimation: false,
                currentToggleIndex: -1,
                currentToggleId: -1,
                winSymbolCoOrdinate: [],
                wonSymbolIds: [],
                currentwinpositions: []
            }
        case actionTypes.START_WIN_TOGGLE:
            if (!winPresentationStart) {
                return {
                    ...state,
                    startToggle: false,
                    endToggle: false,
                    winCycleComplete: false,
                    currentToggleIndex: -1,
                    currentToggleId: -1,
                    currentwinpositions: []
                };
            }
            if (winningList.length === currentToggleIndex + 1) {
                return {
                    ...state,
                    startToggle: false,
                    endToggle: false,
                    winCycleComplete: true,
                    currentToggleIndex: -1,
                    currentToggleId: -1,
                    currentwinpositions: []
                }
            }
            return {
                ...state,
                startToggle: true,
                endToggle: false,
                winCycleComplete: false,
                currentToggleIndex: currentToggleIndex + 1,
                currentToggleId: winningList[currentToggleIndex + 1],
                currentwinpositions: winpositions[currentToggleIndex + 1]
            }
        case actionTypes.END_WIN_TOGGLE:
            return {
                ...state,
                startToggle: false,
                endToggle: true,
            }
        case actionTypes.SET_SYMBOL_ANIMATION_DATA:
            return {
                ...state,
                SymbolAnimationPositions: SymbolAnimationData
            }
        case actionTypes.WIN_CYCLE_COMPLETE:
            return {
                ...state,
                winCycleComplete: true
            }

        case actionTypes.WIN_PAUSE:
            return {
                ...state,
                isPause: true
            }
        case actionTypes.WIN_RESUME:
            return {
                ...state,
                isPause: false
            }

        case actionTypes.IS_POST_FEATURE_REQUIRED:
            return {
                ...state,
                isPostFeatureRequired: isPostFeatureRequired
            }
        case actionTypes.SET_ALL_GRID_SYMBOLS:
            return {
                ...state,
                gridSymbols: gridSymbols
            }
        default:
            return state;
    }
}

export const actions = {
    setWinsSucces: (result_spin: any): any => ({ type: actionTypes.GET_APPLICATION_SPIN_SUCCESS, result_spin }),
    getCurrentToggleIndex: (): any => ({ type: actionTypes.GET_CURRENT_TOGGLE_INDEX }),
    startWinPresentation: (): any => ({ type: actionTypes.START_WIN_PRESENTATION }),
    stopWinPresentation: (): any => ({ type: actionTypes.STOP_WIN_PRESENTATION }),
    playSymbolAnim: (): any => ({ type: actionTypes.PLAY_ANIM_WIN_SYMBOL }),
    startToggle: (): any => ({ type: actionTypes.START_WIN_TOGGLE }),
    endToggle: (): any => ({ type: actionTypes.END_WIN_TOGGLE }),
    winCycleComplete: (): any => ({ type: actionTypes.WIN_CYCLE_COMPLETE }),
    setWinSymbolCoOrdinate: (winSymbolCoOrdinate: number): any => ({ type: actionTypes.SET_WIN_SYMBOL_CO_ORDINATE, winSymbolCoOrdinate }),
    setStaticWinSymbolCoOrdinate: (staticwinSymbolCoOrdinate: number): any => ({ type: actionTypes.SET_STATIC_WIN_SYMBOL_CO_ORDINATE, staticwinSymbolCoOrdinate }),
    setSymbolAnimationPosition: (SymbolAnimationData: any): any => ({ type: actionTypes.SET_SYMBOL_ANIMATION_DATA, SymbolAnimationData }),
    getWinSymbolCoOrdinate: (): any => ({ type: actionTypes.GET_WIN_SYMBOL_CO_ORDINATE }),
    setWinningIdList: (winningIdList: number): any => ({ type: actionTypes.SET_WINNING_ID_LIST, winningIdList }),
    setWinLineCount: (winlinecount: number): any => ({ type: actionTypes.SET_WIN_LINE_COUNT, winlinecount }),
    setCurrentToggleId: (toggleId: number): any => ({ type: actionTypes.SET_CURRENT_TOGGLE_ID, toggleId }),
    setPhaseCount: (phasecount: number): any => ({ type: actionTypes.SET_PHASE_COUNT, phasecount }),
    displayWinBox: (displayWinBox: boolean): any => ({ type: actionTypes.DISPLAY_WINBOX, displayWinBox }),
    setDisplayAllWinTogether: (): any => ({ type: actionTypes.SET_DISPLAY_ALL_WIN_TOGETHER }),
    setLineWinpresentationType: (): any => ({ type: actionTypes.SET_LINE_TYPE }),
    setWaysWinpresentationType: (): any => ({ type: actionTypes.SET_WAYS_TYPE }),
    setPostFeature: (isPostFeatureRequired: boolean): any => ({ type: actionTypes.IS_POST_FEATURE_REQUIRED, isPostFeatureRequired }),
    setAllGridSymbols: (gridSymbols: any): any => ({ type: actionTypes.SET_ALL_GRID_SYMBOLS, gridSymbols }),
};