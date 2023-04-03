export interface IApplicationState {

    spinStart: boolean
    blastStart: boolean
    immediateResponseReceived: boolean
    spinStartID: number
    spinStopID: number
    spinStop: boolean
    InTurboMode: boolean
    stopable: any
    stopNextReelId: number
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
    anticipationOnReelPlaying: number
    reel_data: any
    blastPosition: any
    previousReelStoppedId: number
    reelStrips: any
    currentReelStripIndex: number
    countStopReels: number
    totalCascadeCount: number
    currentCascadeCount: number
    finalSymbolsSpinningCount: number
    displayReelGridSymbolCount: any
    playAnticipation: boolean
    resetDropAfterDrop: boolean
    inSpinning: boolean
    isSlamSpin: boolean,
}

const initialState: IApplicationState = {

    immediateResponseReceived: true,
    isSpinning: false,
    spinStart: false,
    blastStart: false,
    allSpinComplete: true,
    forcespinStop: false,
    InTurboMode: false,
    spinStop: false,
    stopable: [],
    stopNextReelId: -1,
    countStopReels: 0,
    finalSymbolsSpinningCount: 0,
    isPause: false,
    spinResponseReceived: false,
    reelStrips: [[]],
    currentReelStripIndex: -1,
    stoppingReel: -1,
    spinType: -1,
    stoppedReel: -1,
    spinStartID: -1,
    spinStopID: -1,
    winningList: [],
    anticipationOnReel: [],
    anticipationOnReelPlaying: 0,
    blastPosition: [],
    reel_data: {},
    previousReelStoppedId: -1,
    displayReelGridSymbolCount: [],
    totalCascadeCount: 0,
    currentCascadeCount: 0,
    playAnticipation: false,
    resetDropAfterDrop: false,
    inSpinning: false,
    isSlamSpin: false,
};

export enum actionTypes {
    GET_REELS_INIT_SUCCESS = '@@reelgrid/GET_REELS_INIT_SUCCESS',
    GET_APPLICATION_SPIN_SUCCESS = '@@reelgrid/GET_APPLICATION_SPIN_SUCCESS',
    GET_APPLICATION_CASCADE_SUCCESS = '@@reelgrid/GET_APPLICATION_CASCADE_SUCCESS',
    UPDATE_REEL_DATA = '@@reelgrid/UPDATE_REEL_DATA',
    SET_SPIN_TYPE = '@@reelgrid/SET_SPIN_TYPE',
    SET_REELS_SPIN_START_ID = '@@reelgrid/SET_REELS_SPIN_START_ID',
    SET_REELS_SPIN_STOP_ID = '@@reelgrid/SET_REELS_SPIN_STOP_ID',
    SET_REELS_SPINNING = '@@reelgrid/SET_REELS_SPINNING',
    GET_REELS_SPINNING = '@@reelgrid/GET_REELS_SPINNING',
    SET_ALL_SPIN_COMPLETE = '@@reelgrid/SET_ALL_SPIN_COMPLETE',
    GET_ALL_SPIN_COMPLETE = '@@reelgrid/GET_ALL_SPIN_COMPLETE',
    SPIN_RESPONSE_RECEIVED = '@@reelgrid/SPIN_RESPONSE_RECEIVED',
    START_SPIN = '@@reelgrid/START_SPIN',
    STOP_SPIN = '@@reelgrid/STOP_SPIN',
    FORCE_STOP_SPIN = '@@reelgrid/FORCE_STOP_SPIN',
    STOPPING_REEL = '@@reelgrid/STOPPING_REEL',
    STOPPED_REEL = '@@reelgrid/STOPPED_REEL',
    REELS_PAUSE = '@@reelgrid/REELS_PAUSE',
    REELS_RESUME = '@@reelgrid/REELS_RESUME',
    RESET_REEL_STATE = '@@reelgrid/RESET_REEL_STATE',
    BLAST_START = '@@reelgrid/BLAST_START',
    SET_IMMEDIATE_RESPONSE_RECEIVED = '@@reelgrid/SET_IMMEDIATE_RESPONSE_RECEIVED',
    SET_FINAL_SYMBOL_SPINING_COUNT = '@@reelgrid/SET_FINAL_SYMBOL_SPINING_COUNT',
    SET_Next_REEL_STOPPED_ID = '@@reelgrid/SET_Next_REEL_STOPPED_ID',
    SET_REEL_STRIP = '@@reelgrid/SET_REEL_STRIP',
    SET_REEL_STRIP_INDEX = '@@reelgrid/SET_REEL_STRIP_INDEX',
    SET_REEL_STOPPABLE = '@@reelgrid/SET_REEL_STOPPABLE',
    SET_REEL_TURBO_MODE = '@@reelgrid/SET_REEL_TURBO_MODE',
    SET_BLAST_POSITION = '@@reelgrid/SET_BLAST_POSITION',
    SET_TOTAL_CASCADE_COUNT = '@@reelgrid/SET_TOTAL_CASCADE_COUNT',
    SET_CURRENT_CASCADE_COUNT = '@@reelgrid/SET_CURRENT_CASCADE_COUNT',
    SET_DISPLAY_REEL_GRID_SYMBOLS_COUNT = '@@reelgrid/SET_DISPLAY_REEL_GRID_SYMBOLS_COUNT',
    SET_PLAY_ANTICIPATION = '@@reelgrid/SET_PLAY_ANTICIPATION',
    SET_ANTICIPATION_ON_REELS = '@@reelgrid/SET_ANTICIPATION_ON_REELS',
    RESET_DROP_AFTER_BLAST = '@@reelgrid/RESET_DROP_AFTER_BLAST',
    SET_IN_BETWEEN_SPINNING = '@@reels/SET_IN_BETWEEN_SPINNING',
    SET_SLAM_SPIN = '@@reels/SET_SLAM_SPIN',
}

export function reducer(
    state: IApplicationState = initialState,
    action: any,
): IApplicationState {
    const { spinType } = state;
    const {
        stoppingReel,
        stoppedReel,
        allspincomplete,
        spinning,
        result_reel,
        result_spin,
        startreel,
        stopreel,
        IsTurboMode,
        reelStrips,
        currentReelStripIndex,
        stopable,
        stopNextReelId,
        reelData,
        blastPosition,
        displayReelGridSymbolCount,
        totalCascadeCountAction,
        currentCascadeCountAction,
        playAnticipation,
        anticipationOnReelAction,
        immediateResponseReceivedAction,
        inSpinning,
        isSlamSpin,

    } = action;
    switch (action.type) {
        case actionTypes.GET_APPLICATION_SPIN_SUCCESS:
            if (spinType === 2) {
                return {
                    ...state,
                    reel_data: result_spin,
                    spinResponseReceived: true,
                    winningList: result_spin.wins,
                    resetDropAfterDrop: false,
                    totalCascadeCount: 0,
                    currentCascadeCount: 0
                };
            }
        case actionTypes.GET_APPLICATION_CASCADE_SUCCESS:
            if (spinType === 2) {
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
        case actionTypes.GET_REELS_INIT_SUCCESS:
            return { ...state, reel_data: result_reel };
        case actionTypes.GET_REELS_SPINNING:
            return { ...state };
        case actionTypes.SET_REEL_STRIP:
            return {
                ...state, reelStrips: reelStrips
            };
        case actionTypes.SET_IMMEDIATE_RESPONSE_RECEIVED:

            return {
                ...state, immediateResponseReceived: immediateResponseReceivedAction
            };

        case actionTypes.SET_REEL_STOPPABLE:

            return {
                ...state, stopable: stopable
            };
        case actionTypes.SET_REEL_TURBO_MODE:
            return {
                ...state, InTurboMode: IsTurboMode
            };
        case actionTypes.SET_REEL_STRIP_INDEX:
            return {
                ...state, currentReelStripIndex: currentReelStripIndex
            };
        case actionTypes.SET_REELS_SPINNING:
            return {

                ...state, isSpinning: spinning, spinStart: false,
            };
        case actionTypes.BLAST_START:

            return {
                ...state,
                blastStart: true,
            }
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
                spinStart: true,
                finalSymbolsSpinningCount: 0
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
                resetDropAfterDrop: false,
                currentCascadeCount: currentCascadeCountAction,
            }
        case actionTypes.STOP_SPIN:
            return {
                ...state,
                spinStop: true
            }
        case actionTypes.SET_SPIN_TYPE:
            return {
                ...state,
                spinType: 2
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
        case actionTypes.RESET_DROP_AFTER_BLAST:
            return {
                ...state,
                resetDropAfterDrop: true
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
        case actionTypes.SET_FINAL_SYMBOL_SPINING_COUNT:
            return {
                ...state,
                finalSymbolsSpinningCount: state.finalSymbolsSpinningCount + 1,
            }

        case actionTypes.SET_Next_REEL_STOPPED_ID:
            return {
                ...state,
                stopNextReelId: stopNextReelId
            }
        case actionTypes.SET_ALL_SPIN_COMPLETE:
            return {
                ...state,

                stopNextReelId: 0,
                countStopReels: 0,
                anticipationOnReelPlaying: 0,
                resetDropAfterDrop: false,
                blastStart: false,
                isSpinning: false,
                spinStart: false,
                spinStop: false,
                forcespinStop: false,
                spinResponseReceived: false,
                spinStartID: -1,
                spinStopID: -1,
                allSpinComplete: allspincomplete,

            }
        case actionTypes.RESET_REEL_STATE:

            return {
                ...state,
                isSpinning: false,
                spinStart: false,
                spinStop: false,
                forcespinStop: false,
                spinResponseReceived: false,
                allSpinComplete: false,
                countStopReels: 0,
                anticipationOnReelPlaying: 0
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
        case actionTypes.SET_PLAY_ANTICIPATION:
            return {
                ...state,
                playAnticipation: playAnticipation
            }
        case actionTypes.SET_ANTICIPATION_ON_REELS:
            return {
                ...state,
                anticipationOnReel: anticipationOnReelAction
            }
        case actionTypes.SET_IN_BETWEEN_SPINNING:
            return {
                ...state,
                inSpinning: inSpinning,
            };
            case actionTypes.SET_SLAM_SPIN:
                return {
                    ...state, isSlamSpin: isSlamSpin
                };
        default:
            return state;
    }
}

export const actions = {
    spinResponseReceived: (): any => ({ type: actionTypes.SPIN_RESPONSE_RECEIVED }),
    setfinalSymbolSpiningCount: (): any => ({ type: actionTypes.SET_FINAL_SYMBOL_SPINING_COUNT }),
    startSpin: (): any => ({ type: actionTypes.START_SPIN }),
    stopSpin: (): any => ({ type: actionTypes.STOP_SPIN }),
    blastStart: (): any => ({ type: actionTypes.BLAST_START }),
    forceStopSpin: (): any => ({ type: actionTypes.FORCE_STOP_SPIN }),
    resetReelState: (): any => ({ type: actionTypes.RESET_REEL_STATE }),
    setReelInitSucces: (result_reel: any): any => ({ type: actionTypes.GET_REELS_INIT_SUCCESS, result_reel }),
    setReelSpinSucces: (result_spin: any): any => ({ type: actionTypes.GET_APPLICATION_SPIN_SUCCESS, result_spin }),
    setReelSpinCascadeSucces: (result_spin: any): any => ({ type: actionTypes.GET_APPLICATION_CASCADE_SUCCESS, result_spin }),
    updateReelData: (reelData: any): any => ({ type: actionTypes.UPDATE_REEL_DATA, reelData }),
    getSpinningState: (): any => ({ type: actionTypes.GET_REELS_SPINNING }),
    setSpinType: (): any => ({ type: actionTypes.SET_SPIN_TYPE }),
    setSpinningReelStart: (startreel: number): any => ({ type: actionTypes.SET_REELS_SPIN_START_ID, startreel }),
    setSpinningReelStop: (stopreel: number): any => ({ type: actionTypes.SET_REELS_SPIN_STOP_ID, stopreel }),
    setSpinningState: (spinning: boolean): any => ({ type: actionTypes.SET_REELS_SPINNING, spinning }),
    setSpinComplete: (allspincomplete: boolean): any => ({ type: actionTypes.SET_ALL_SPIN_COMPLETE, allspincomplete }),
    setStoppingReel: (stoppingReel: number): any => ({ type: actionTypes.STOPPING_REEL, stoppingReel }),
    setStoppedReel: (stoppedReel: number): any => ({ type: actionTypes.STOPPED_REEL, stoppedReel }),
    setTotalCascadeCount: (totalCascadeCountAction: number): any => ({ type: actionTypes.SET_TOTAL_CASCADE_COUNT, totalCascadeCountAction }),
    setCurrentCascadeCount: (currentCascadeCountAction: number): any => ({ type: actionTypes.SET_CURRENT_CASCADE_COUNT, currentCascadeCountAction }),
    setReelStrips: (reelStrips: any): any => ({ type: actionTypes.SET_REEL_STRIP, reelStrips }),
    setReelStopable: (stopable: any): any => ({ type: actionTypes.SET_REEL_STOPPABLE, stopable }),
    setTurboMode: (IsTurboMode: any): any => ({ type: actionTypes.SET_REEL_TURBO_MODE, IsTurboMode }),
    setReelStripsIndex: (currentReelStripIndex: number): any => ({ type: actionTypes.SET_REEL_STRIP_INDEX, currentReelStripIndex }),
    setImmediateResponse: (immediateResponseReceivedAction: boolean): any => ({ type: actionTypes.SET_IMMEDIATE_RESPONSE_RECEIVED, immediateResponseReceivedAction }),
    setNextReelStoppedId: (stopNextReelId: number): any => ({ type: actionTypes.SET_Next_REEL_STOPPED_ID, stopNextReelId }),
    blastPositionSet: (blastPosition: any): any => ({ type: actionTypes.SET_BLAST_POSITION, blastPosition }),
    relGridSymbolCountDisplay: (displayReelGridSymbolCount: any): any => ({ type: actionTypes.SET_DISPLAY_REEL_GRID_SYMBOLS_COUNT, displayReelGridSymbolCount }),
    anticipationPlay: (playAnticipation: boolean): any => ({ type: actionTypes.SET_PLAY_ANTICIPATION, playAnticipation }),
    setAnticipationOnReels: (anticipationOnReelAction: any): any => ({ type: actionTypes.SET_ANTICIPATION_ON_REELS, anticipationOnReelAction }),
    resetDropAfterBlast: (): any => ({ type: actionTypes.RESET_DROP_AFTER_BLAST }),
    inBetweenSpinning: (inSpinning: boolean): any => ({ type: actionTypes.SET_IN_BETWEEN_SPINNING, inSpinning }),
    setSlamSpin: (isSlamSpin: boolean): any => ({ type: actionTypes.SET_SLAM_SPIN, isSlamSpin}),
};