export interface IApplicationState {

    spinStart: boolean
    spinStartID: number
    spinStopID: number
    spinStop: boolean
    blastStart: boolean,
    forcespinStop: boolean
    allSpinComplete: boolean
    isPause: boolean
    spinResponseReceived: boolean
    isSpinning: boolean
    spinType: number
    stoppingReel: number
    stoppedReel: number
    winningList: any
    anticipationOnReel: any
    reel_data: any
    stickyWildId: number
    previousReelStoppedId: number
    stickyWildData: any
    createStickyWildData: boolean
    clearStickyWildData: boolean
    reelStrips: any
    countStopReels: number
    currentReelStripIndex: number
    anticipationOnReelPlaying: number
    stopNextReelId: number
    stopable: any,

    displayReelGridSymbolCount: any
}

const initialState: IApplicationState = {

    isSpinning: false,
    spinStart: false,
    allSpinComplete: true,
    blastStart: false,
    forcespinStop: false,
    spinStop: false,
    isPause: false,
    spinResponseReceived: false,
    countStopReels: 0,
    stoppingReel: -1,
    spinType: -1,
    stoppedReel: -1,
    spinStartID: -1,
    spinStopID: -1,
    winningList: [],
    anticipationOnReel: [],
    stickyWildData: [],
    stickyWildId: -1,
    reel_data: {},
    anticipationOnReelPlaying: 0,
    previousReelStoppedId: -1,
    createStickyWildData: false,
    clearStickyWildData: false,
    reelStrips: [[]],
    currentReelStripIndex: -1,
    stopable: [],
    stopNextReelId: -1,

    displayReelGridSymbolCount: [],
};

export enum actionTypes {
    GET_REELS_INIT_SUCCESS = '@@reels/GET_REELS_INIT_SUCCESS',
    GET_APPLICATION_SPIN_SUCCESS = '@@reels/GET_APPLICATION_SPIN_SUCCESS',
    UPDATE_REEL_DATA = '@@reels/UPDATE_REEL_DATA',
    SET_SPIN_TYPE = '@@reels/SET_SPIN_TYPE',
    SET_REELS_SPIN_START_ID = '@@reels/SET_REELS_SPIN_START_ID',
    SET_REELS_SPIN_STOP_ID = '@@reels/SET_REELS_SPIN_STOP_ID',
    SET_REELS_SPINNING = '@@reels/SET_REELS_SPINNING',
    GET_REELS_SPINNING = '@@reels/GET_REELS_SPINNING',
    SET_ALL_SPIN_COMPLETE = '@@reels/SET_ALL_SPIN_COMPLETE',
    GET_ALL_SPIN_COMPLETE = '@@reels/GET_ALL_SPIN_COMPLETE',
    SPIN_RESPONSE_RECEIVED = '@@reels/SPIN_RESPONSE_RECEIVED',
    START_SPIN = '@@reels/START_SPIN',
    STOP_SPIN = '@@reels/STOP_SPIN',
    FORCE_STOP_SPIN = '@@reels/FORCE_STOP_SPIN',
    STOPPING_REEL = '@@reels/STOPPING_REEL',
    STOPPED_REEL = '@@reels/STOPPED_REEL',
    REELS_PAUSE = '@@reels/REELS_PAUSE',
    REELS_RESUME = '@@reels/REELS_RESUME',
    RESET_REEL_STATE = '@@reels/RESET_REEL_STATE',
    SET_PREVIOUS_REEL_STOPPED_ID = '@@reels/PREVIOUS_REEL_STOPPED_ID',
    SET_STICKY_WILD_LIST = '@@reels/SET_STICKY_WILD_LIST',
    SET_STICKY_WILD_ID = '@@reels/SET_STICKY_WILD_ID',
    CREATE_STICKY_WILD = '@@reels/CREATE_STICKY_WILD',
    CLEAR_STICKY_WILD = '@@reels/CLEAR_STICKY_WILD',
    SET_REEL_STRIP = '@@reels/SET_REEL_STRIP',
    SET_REEL_STRIP_INDEX = '@@reels/SET_REEL_STRIP_INDEX',
    SET_DISPLAY_REEL_GRID_SYMBOLS_COUNT = '@@reels/SET_DISPLAY_REEL_GRID_SYMBOLS_COUNT',
    SET_REEL_STOPPABLE = '@@reels/SET_REEL_STOPPABLE',
    SET_Next_REEL_STOPPED_ID = '@@reels/SET_Next_REEL_STOPPED_ID',
    BLAST_START = '@@reelgrid/BLAST_START',
}

export function reducer(
    state: IApplicationState = initialState,
    action: any,
): IApplicationState {
    const { spinType } = state;
    const {
        stoppingReel,
        previousReelStoppedId,
        stoppedReel,
        allspincomplete,
        spinning,
        result_reel,
        result_spin,
        startreel,
        stopreel,
        stickyWildDataList,
        stickyWildSymbolId,
        createStickyWildData,
        reelStrips,
        reelData,
        currentReelStripIndex,
        stopable,
        stopNextReelId,
        displayReelGridSymbolCount,
    } = action;
    switch (action.type) {
        case actionTypes.SET_DISPLAY_REEL_GRID_SYMBOLS_COUNT:
            return {
                ...state,
                displayReelGridSymbolCount: displayReelGridSymbolCount
            }
        case actionTypes.GET_APPLICATION_SPIN_SUCCESS:
            if (spinType === 1) {
                return {
                    ...state,
                    reel_data: result_spin,
                    spinResponseReceived: true,
                    winningList: result_spin.wins,
                };
            }
        case actionTypes.UPDATE_REEL_DATA:
            return {
                ...state,
                reel_data: reelData,
            };
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
            }
        case actionTypes.CREATE_STICKY_WILD:
            return {
                ...state, createStickyWildData: createStickyWildData
            };
        case actionTypes.CLEAR_STICKY_WILD:
            return {
                ...state, clearStickyWildData: true
            };
        case actionTypes.SET_STICKY_WILD_ID:
            return {
                ...state, stickyWildId: stickyWildSymbolId
            };
        case actionTypes.SET_STICKY_WILD_LIST:
            return {
                ...state, stickyWildData: stickyWildDataList
            };
        case actionTypes.SET_REELS_SPIN_START_ID:
            return {
                ...state, spinStartID: startreel
            };
        case actionTypes.SET_REELS_SPIN_STOP_ID:

            return {
                ...state, spinStopID: stopreel
            };
        case actionTypes.START_SPIN:
            return {
                ...state,
                createStickyWildData: false,
                spinStart: true,
            }
        case actionTypes.STOP_SPIN:
            return {
                ...state,
                spinStop: true
            }
        case actionTypes.SET_SPIN_TYPE:
            return {
                ...state,
                spinType: 1
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
                stoppingReel: stoppingReel + 1
            }
        case actionTypes.STOPPED_REEL:
            return {
                ...state,
                stoppedReel: stoppedReel,
                countStopReels: state.countStopReels + 1,
                anticipationOnReelPlaying: state.countStopReels + 1
            }
        case actionTypes.SET_PREVIOUS_REEL_STOPPED_ID:
            return {
                ...state,
                previousReelStoppedId: previousReelStoppedId
            }
        case actionTypes.SET_ALL_SPIN_COMPLETE:
            return {
                ...state,
                stopNextReelId: 0,
                countStopReels: 0,
                anticipationOnReelPlaying: 0,
                clearStickyWildData: false,
                createStickyWildData: true,
                isSpinning: false,
                spinStart: false,
                spinStop: false,
                blastStart: false,
                forcespinStop: false,
                spinResponseReceived: false,
                spinStartID: -1,
                spinStopID: -1,
                allSpinComplete: allspincomplete
            }
        case actionTypes.RESET_REEL_STATE:
            return {
                ...state,
                clearStickyWildData: false,
                createStickyWildData: false,
                isSpinning: false,
                spinStart: false,
                spinStop: false,
                forcespinStop: false,
                spinResponseReceived: false,
                allSpinComplete: false,
                countStopReels: 0,
                anticipationOnReelPlaying: 0
            }
        case actionTypes.SET_REEL_STRIP:
            return {
                ...state, reelStrips: reelStrips
            };
        case actionTypes.SET_REEL_STRIP_INDEX:
            return {
                ...state, currentReelStripIndex: currentReelStripIndex
            };
        case actionTypes.SET_REEL_STOPPABLE:
            return {
                ...state, stopable: stopable
            };
        case actionTypes.SET_Next_REEL_STOPPED_ID:
            return {
                ...state,
                stopNextReelId: stopNextReelId
            }
        default:
            return state;
    }
}

export const actions = {
    spinResponseReceived: (): any => ({ type: actionTypes.SPIN_RESPONSE_RECEIVED }),
    startSpin: (): any => ({ type: actionTypes.START_SPIN }),
    stopSpin: (): any => ({ type: actionTypes.STOP_SPIN }),
    blastStart: (): any => ({ type: actionTypes.BLAST_START }),
    forceStopSpin: (): any => ({ type: actionTypes.FORCE_STOP_SPIN }),
    resetReelState: (): any => ({ type: actionTypes.RESET_REEL_STATE }),
    setReelInitSucces: (result_reel: any): any => ({ type: actionTypes.GET_REELS_INIT_SUCCESS, result_reel }),
    setReelSpinSucces: (result_spin: any): any => ({ type: actionTypes.GET_APPLICATION_SPIN_SUCCESS, result_spin }),
    updateReelData: (reelData: any): any => ({ type: actionTypes.UPDATE_REEL_DATA, reelData }),
    getSpinningState: (): any => ({ type: actionTypes.GET_REELS_SPINNING }),
    setSpinType: (): any => ({ type: actionTypes.SET_SPIN_TYPE }),
    setSpinningReelStart: (startreel: number): any => ({ type: actionTypes.SET_REELS_SPIN_START_ID, startreel }),
    setSpinningReelStop: (stopreel: number): any => ({ type: actionTypes.SET_REELS_SPIN_STOP_ID, stopreel }),
    setSpinningState: (spinning: boolean): any => ({ type: actionTypes.SET_REELS_SPINNING, spinning }),
    setSpinComplete: (allspincomplete: boolean): any => ({ type: actionTypes.SET_ALL_SPIN_COMPLETE, allspincomplete }),
    setStoppingReel: (stoppingReel: number): any => ({ type: actionTypes.STOPPING_REEL, stoppingReel }),
    setStoppedReel: (stoppedReel: number): any => ({ type: actionTypes.STOPPED_REEL, stoppedReel }),
    setPreviousReelStoppedId: (previousReelStoppedId: number): any => ({ type: actionTypes.SET_PREVIOUS_REEL_STOPPED_ID, previousReelStoppedId }),
    setStickyWildList: (stickyWildDataList: any): any => ({ type: actionTypes.SET_STICKY_WILD_LIST, stickyWildDataList }),
    setStickyWildId: (stickyWildSymbolId: number): any => ({ type: actionTypes.SET_STICKY_WILD_ID, stickyWildSymbolId }),
    createStickyWild: (createStickyWildData: boolean): any => ({ type: actionTypes.CREATE_STICKY_WILD, createStickyWildData }),
    clearStickyWild: (): any => ({ type: actionTypes.CLEAR_STICKY_WILD }),
    setReelStrips: (reelStrips: any): any => ({ type: actionTypes.SET_REEL_STRIP, reelStrips }),
    setReelStripsIndex: (currentReelStripIndex: number): any => ({ type: actionTypes.SET_REEL_STRIP_INDEX, currentReelStripIndex }),
    setNextReelStoppedId: (stopNextReelId: number): any => ({ type: actionTypes.SET_Next_REEL_STOPPED_ID, stopNextReelId }),
    relGridSymbolCountDisplay: (displayReelGridSymbolCount: any): any => ({ type: actionTypes.SET_DISPLAY_REEL_GRID_SYMBOLS_COUNT, displayReelGridSymbolCount }),
    setReelStopable: (stopable: any): any => ({ type: actionTypes.SET_REEL_STOPPABLE, stopable }),
};
