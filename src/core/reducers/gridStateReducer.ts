export interface IApplicationState {

    spinStart: boolean
    blastStart: boolean
    immediateResponseReceived: boolean
    spinStop: boolean
    forcespinStop: boolean
    allSpinComplete: boolean
    isPause: boolean
    spinResponseReceived: boolean
    isSpinning: boolean
    stoppingReel: number
    spinType: number
    InTurboMode: boolean
    stoppedReel: number
    winningList: any
    anticipationOnReel: any
    reel_data: any
    blastPosition: any
    reelStrips: any
    currentReelStripIndex: number
    startDropCompleteCount: number
    totalCascadeCount: number
    currentCascadeCount: number,
    countStopReels: number
    resetDropAfterDrop: boolean,
    displayReelGridSymbolCount: any,
    setReelDurationStart: number,
    setReelDurationSingle: number,
    setReelDurationColumn: number,
    symbolDropStart: boolean,
    dropSymbolAfterBlast: boolean,

}

const initialState: IApplicationState = {
    countStopReels: 0,
    isSpinning: false,
    spinStart: false,
    blastStart: false,
    allSpinComplete: true,
    forcespinStop: false,
    spinStop: false,
    InTurboMode: false,
    isPause: false,
    spinResponseReceived: false,
    spinType: -1,
    stoppingReel: -1,
    stoppedReel: -1,
    winningList: [],
    anticipationOnReel: [],
    blastPosition: [],
    reel_data: {},
    reelStrips: [[]],
    currentReelStripIndex: -1,
    startDropCompleteCount: 0,
    totalCascadeCount: 0,
    currentCascadeCount: 0,
    resetDropAfterDrop: false,
    displayReelGridSymbolCount: [],
    immediateResponseReceived: true,
    setReelDurationStart: 1,
    setReelDurationSingle: 1,
    setReelDurationColumn: 1,
    symbolDropStart: false,
    dropSymbolAfterBlast: false,
};

export enum actionTypes {
    GET_REELS_INIT_SUCCESS = '@@grid/GET_REELS_INIT_SUCCESS',
    GET_APPLICATION_SPIN_SUCCESS = '@@grid/GET_APPLICATION_SPIN_SUCCESS',
    GET_APPLICATION_CASCADE_SUCCESS = '@@grid/GET_APPLICATION_CASCADE_SUCCESS',
    UPDATE_REEL_DATA = '@@grid/UPDATE_REEL_DATA',
    SET_SPIN_TYPE = '@@grid/SET_SPIN_TYPE',
    SET_REELS_SPINNING = '@@grid/SET_REELS_SPINNING',
    GET_REELS_SPINNING = '@@grid/GET_REELS_SPINNING',
    SET_ALL_SPIN_COMPLETE = '@@grid/SET_ALL_SPIN_COMPLETE',
    GET_ALL_SPIN_COMPLETE = '@@grid/GET_ALL_SPIN_COMPLETE',
    SPIN_RESPONSE_RECEIVED = '@@grid/SPIN_RESPONSE_RECEIVED',
    BLAST_START = '@@grid/BLAST_START',
    START_SPIN = '@@grid/START_SPIN',
    STOP_SPIN = '@@grid/STOP_SPIN',
    FORCE_STOP_SPIN = '@@grid/FORCE_STOP_SPIN',
    STOPPING_REEL = '@@grid/STOPPING_REEL',
    STOPPED_REEL = '@@grid/STOPPED_REEL',
    REELS_PAUSE = '@@grid/REELS_PAUSE',
    REELS_RESUME = '@@grid/REELS_RESUME',
    RESET_REEL_STATE = '@@grid/RESET_REEL_STATE',
    SET_REEL_STRIP = '@@grid/SET_REEL_STRIP',
    SET_REEL_STRIP_INDEX = '@@grid/SET_REEL_STRIP_INDEX',
    SET_BLAST_POSITION = '@@grid/SET_BLAST_POSITION',
    SET_START_DROP_COMPLETE_COUNT = '@@grid/SET_START_DROP_COMPLETE_COUNT',
    SET_TOTAL_CASCADE_COUNT = '@@grid/SET_TOTAL_CASCADE_COUNT',
    SET_CURRENT_CASCADE_COUNT = '@@grid/SET_CURRENT_CASCADE_COUNT',
    SET_DISPLAY_REEL_GRID_SYMBOLS_COUNT = '@@grid/SET_DISPLAY_REEL_GRID_SYMBOLS_COUNT',
    RESET_DROP_AFTER_BLAST = '@@grid/RESET_DROP_AFTER_BLAST',
    SET_REEL_TURBO_MODE = '@@grid/SET_REEL_TURBO_MODE',
    SET_IMMEDIATE_RESPONSE_RECEIVED = '@@grid/SET_IMMEDIATE_RESPONSE_RECEIVED',
    SET_REEL_DURATION_START = '@@grid/SET_REEL_DURATION_START',
    SET_REEL_DURATION_SINGLE = '@@grid/ET_REEL_DURATION_SINGLE',
    SET_REEL_DURATION_COLUMN = '@@grid/ET_REEL_DURATION_COLUMN',
    SYMBOL_DROP_START = '@@grid/SYMBOL_DROP_START',
    SYMBOL_DROP_AFTER_BLAST = '@@grid/SYMBOL_DROP_AFTER_BLAST',
}

export function reducer(
    state: IApplicationState = initialState,
    action: any,
): IApplicationState {
    const { spinType, startDropCompleteCount } = state;
    const {
        stoppingReel,
        stoppedReel,
        allspincomplete,
        spinning,
        reelStrips,
        result_reel,
        reelData,
        IsTurboMode,
        blastPosition,
        result_spin,
        currentReelStripIndex,
        currentCascadeCountAction,
        displayReelGridSymbolCount,
        totalCascadeCountAction,
        immediateResponseReceivedAction,
        setReelDurationStart,
        setReelDurationSingle,
        setReelDurationColumn,
        symbolDropStart,
        dropSymbolAfterBlast,
    } = action;
    switch (action.type) {

        case actionTypes.SET_START_DROP_COMPLETE_COUNT:
            return {
                ...state, startDropCompleteCount: startDropCompleteCount + 1
            };
        case actionTypes.SET_IMMEDIATE_RESPONSE_RECEIVED:

            return {
                ...state, immediateResponseReceived: immediateResponseReceivedAction
            };
        case actionTypes.GET_APPLICATION_SPIN_SUCCESS:

            if (spinType === 1) {
                return {
                    ...state,
                    reel_data: result_spin,
                    spinResponseReceived: true,
                    totalCascadeCount: 0,
                    currentCascadeCount: 0,
                    countStopReels: 0,
                    resetDropAfterDrop: false,
                    winningList: result_spin.wins,
                };
            }

        case actionTypes.GET_APPLICATION_CASCADE_SUCCESS:
            if (spinType === 1) {
                return {
                    ...state,
                    reel_data: result_spin,
                    winningList: result_spin.wins,
                    resetDropAfterDrop: false,
                    totalCascadeCount: 0,
                    currentCascadeCount: 0
                };
            }
        case actionTypes.UPDATE_REEL_DATA:
            return {
                ...state,
                reel_data: reelData,
            };
        case actionTypes.SET_REEL_TURBO_MODE:
            return {
                ...state, InTurboMode: IsTurboMode
            };
        case actionTypes.RESET_DROP_AFTER_BLAST:
            return {
                ...state,
                resetDropAfterDrop: true
            }
        case actionTypes.SET_REEL_STRIP:
            return {
                ...state, reelStrips: reelStrips
            };
        case actionTypes.SET_REEL_STRIP_INDEX:
            return {
                ...state, currentReelStripIndex: currentReelStripIndex
            };
        case actionTypes.SET_SPIN_TYPE:
            return {
                ...state,
                spinType: 1
            }
        case actionTypes.GET_REELS_INIT_SUCCESS:
            return { ...state, reel_data: result_reel };
        case actionTypes.GET_REELS_SPINNING:
            return { ...state };
        case actionTypes.SET_REELS_SPINNING:
            return {
                ...state, isSpinning: spinning, spinStart: false
            };
        case actionTypes.BLAST_START:
            return {
                ...state,
                blastStart: true,
                startDropCompleteCount: 0,
                countStopReels: 0,
            }
        case actionTypes.START_SPIN:
            return {
                ...state,
                spinStart: true,
            }
        case actionTypes.SET_TOTAL_CASCADE_COUNT:
            return {
                ...state,
                totalCascadeCount: totalCascadeCountAction,
            }
        case actionTypes.SET_CURRENT_CASCADE_COUNT:
            return {
                ...state,
                blastStart: false,
                currentCascadeCount: currentCascadeCountAction,
            }
        case actionTypes.STOP_SPIN:
            return {
                ...state,
                spinStop: true
            }
        case actionTypes.FORCE_STOP_SPIN:
            return {
                ...state,
                forcespinStop: true
            }
        case actionTypes.REELS_PAUSE:
            return {
                ...state,
                isPause: true
            }
        case actionTypes.REELS_RESUME:
            return {
                ...state,
                isPause: false
            }
        case actionTypes.STOPPING_REEL:
            return {
                ...state,
                stoppingReel: stoppingReel
            }
        case actionTypes.STOPPED_REEL:
            return {
                ...state,
                stoppedReel: stoppedReel,
                countStopReels: state.countStopReels + 1,
            }
        case actionTypes.SET_ALL_SPIN_COMPLETE:
            return {
                ...state,
                isSpinning: false,
                spinStart: false,
                spinStop: false,
                forcespinStop: false,
                spinResponseReceived: false,
                allSpinComplete: allspincomplete
            }
        case actionTypes.RESET_REEL_STATE:
            return {
                ...state,
                startDropCompleteCount: 0,
                isSpinning: false,
                spinStart: false,
                blastStart: false,
                spinStop: false,
                forcespinStop: false,
                spinResponseReceived: false,
                allSpinComplete: false,
                countStopReels: 0,
            }
        case actionTypes.SET_BLAST_POSITION:

            return {
                ...state,
                blastPosition: blastPosition
            }
        case actionTypes.SET_DISPLAY_REEL_GRID_SYMBOLS_COUNT:
            return {
                ...state,
                displayReelGridSymbolCount: displayReelGridSymbolCount
            }
        case actionTypes.SET_REEL_DURATION_START:
            return {
                ...state,
                setReelDurationStart: setReelDurationStart
            }
        case actionTypes.SET_REEL_DURATION_SINGLE:
            return {
                ...state,
                setReelDurationSingle: setReelDurationSingle
            }
        case actionTypes.SET_REEL_DURATION_COLUMN:
            return {
                ...state,
                setReelDurationColumn: setReelDurationColumn
            }

        case actionTypes.SYMBOL_DROP_START:
            return {
                ...state, symbolDropStart: symbolDropStart
            };
        case actionTypes.SYMBOL_DROP_AFTER_BLAST:
            return {
                ...state, dropSymbolAfterBlast: dropSymbolAfterBlast
            };
        default:
            return state;
    }
}

export const actions = {
    droppingSymbolStart: (symbolDropStart: boolean): any => ({ type: actionTypes.SYMBOL_DROP_START, symbolDropStart }),
    droppingSymbolAfterBlast: (dropSymbolAfterBlast: boolean): any => ({ type: actionTypes.SYMBOL_DROP_AFTER_BLAST, dropSymbolAfterBlast }),

    setImmediateResponse: (immediateResponseReceivedAction: boolean): any => ({ type: actionTypes.SET_IMMEDIATE_RESPONSE_RECEIVED, immediateResponseReceivedAction }),
    spinResponseReceived: (): any => ({ type: actionTypes.SPIN_RESPONSE_RECEIVED }),
    startSpin: (): any => ({ type: actionTypes.START_SPIN }),
    blastStart: (): any => ({ type: actionTypes.BLAST_START }),
    stopSpin: (): any => ({ type: actionTypes.STOP_SPIN }),
    forceStopSpin: (): any => ({ type: actionTypes.FORCE_STOP_SPIN }),
    resetReelState: (): any => ({ type: actionTypes.RESET_REEL_STATE }),
    setStartDropComplete: (): any => ({ type: actionTypes.SET_START_DROP_COMPLETE_COUNT }),
    setReelInitSucces: (result_reel: any): any => ({ type: actionTypes.GET_REELS_INIT_SUCCESS, result_reel }),
    setReelSpinCascadeSucces: (result_spin: any): any => ({ type: actionTypes.GET_APPLICATION_CASCADE_SUCCESS, result_spin }),
    setReelSpinSucces: (result_spin: any): any => ({ type: actionTypes.GET_APPLICATION_SPIN_SUCCESS, result_spin }),
    updateReelData: (reelData: any): any => ({ type: actionTypes.UPDATE_REEL_DATA, reelData }),
    setSpinType: (): any => ({ type: actionTypes.SET_SPIN_TYPE }),
    getSpinningState: (): any => ({ type: actionTypes.GET_REELS_SPINNING }),
    setSpinningState: (spinning: boolean): any => ({ type: actionTypes.SET_REELS_SPINNING, spinning }),
    setSpinComplete: (allspincomplete: boolean): any => ({ type: actionTypes.SET_ALL_SPIN_COMPLETE, allspincomplete }),
    setStoppingReel: (stoppingReel: number): any => ({ type: actionTypes.STOPPING_REEL, stoppingReel }),
    setStoppedReel: (stoppedReel: number): any => ({ type: actionTypes.STOPPED_REEL, stoppedReel }),
    setReelStrips: (reelStrips: any): any => ({ type: actionTypes.SET_REEL_STRIP, reelStrips }),
    setReelStripsIndex: (currentReelStripIndex: number): any => ({ type: actionTypes.SET_REEL_STRIP_INDEX, currentReelStripIndex }),
    blastPositionSet: (blastPosition: any): any => ({ type: actionTypes.SET_BLAST_POSITION, blastPosition }),
    relGridSymbolCountDisplay: (displayReelGridSymbolCount: any): any => ({ type: actionTypes.SET_DISPLAY_REEL_GRID_SYMBOLS_COUNT, displayReelGridSymbolCount }),
    setTotalCascadeCount: (totalCascadeCountAction: number): any => ({ type: actionTypes.SET_TOTAL_CASCADE_COUNT, totalCascadeCountAction }),
    setCurrentCascadeCount: (currentCascadeCountAction: number): any => ({ type: actionTypes.SET_CURRENT_CASCADE_COUNT, currentCascadeCountAction }),
    resetDropAfterBlast: (): any => ({ type: actionTypes.RESET_DROP_AFTER_BLAST }),
    setTurboMode: (IsTurboMode: any): any => ({ type: actionTypes.SET_REEL_TURBO_MODE, IsTurboMode }),
    setReelDurationStart: (setReelDurationStart: number): any => ({ type: actionTypes.SET_REEL_DURATION_START, setReelDurationStart }),
    setReelDurationSingle: (setReelDurationSingle: number): any => ({ type: actionTypes.SET_REEL_DURATION_SINGLE, setReelDurationSingle }),
    setReelDurationColumn: (setReelDurationColumn: number): any => ({ type: actionTypes.SET_REEL_DURATION_COLUMN, setReelDurationColumn }),
};


