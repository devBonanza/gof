export interface IApplicationState {
    freegameNextSpin: boolean;
    isSpinning: boolean;
    inFreeGame: boolean;
    currentBetIndex: number;
    freegameCount: number;
    wins: Array<any>,
    feature: Array<any>,
    winAmount: number,
    totalwinAmount: number,
    balance: number,
    scatterWinnings: number,
    freegameSpinCount: number,
    freegameSpinCountWin: number,
    freegameSpinCountRemaining: number,
    featureJustTriggered: boolean,
    featureJustFinished: boolean,
    featureType: string,
    reel_data: any,
    featureJustReTriggered: boolean,
}

const initialState: IApplicationState = {
    featureJustTriggered: false,
    featureJustFinished: false,

    isSpinning: false,
    inFreeGame: false,
    currentBetIndex: -1,
    freegameCount: -1,

    reel_data: {},
    wins: [],
    feature: [],
    totalwinAmount: 0,
    winAmount: 0,
    balance: 0,
    scatterWinnings: -1,
    freegameSpinCount: 0,
    freegameSpinCountWin: 0,
    freegameSpinCountRemaining: 0,
    featureType: "FREEGAME",
    freegameNextSpin: false,
    featureJustReTriggered: false
};

export enum actionTypes {
    GET_APPLICATION_INIT_SUCCESS = '@@freegame/GET_APPLICATION_INIT_SUCCESS',
    GET_APPLICATION_SPIN_SUCCESS = '@@freegame/GET_APPLICATION_SPIN_SUCCESS',
    SET_APPLICATION_CURRENT_BET_INDEX = '@@freegame/SET_APPLICATION_CURRENT_BET_INDEX',
    APPLICATION_NEXT_FREESPIN = '@@freegame/APPLICATION_NEXT_AUTOPLAY',
    APPLICATION_START_FREEGAME = '@@freegame/APPLICATION_START_AUTOPLAY',
    APPLICATION_STOP_FREEGAME = '@@freegame/APPLICATION_STOP_AUTOPLAY',
    APPLICATION_OUTRO_DONE = '@@freegame/APPLICATION_OUTRO_DONE',
    SET_APPLICATION_FREEGAME_COUNT = '@@freegame/SET_APPLICATION_COUNT',

    SET_FEATURE_RE_TRIGGERED = '@@freegame/SET_FEATURE_RE_TRIGGERED',
    SET_FEATURE_JUST_FINISHED = '@@freegame/SET_FEATURE_JUST_FINISHED',
    SET_APPLICATION_BALANCE = '@@freegame/SET_APPLICATION_BALANCE',
    SET_APPLICATION_WIN_AMOUNT = '@@freegame/SET_APPLICATION_WIN_AMOUNT',

}

export function reducer(
    state: IApplicationState = initialState,
    action: any,
): IApplicationState {
    const {inFreeGame, freegameSpinCountRemaining, totalwinAmount, freegameCount} = state;
    const {isLoading, result_basegame, betIndex, freegameCountAction, result_spin, balance, winAmount, wins} = action;
    switch (action.type) {
        case actionTypes.GET_APPLICATION_INIT_SUCCESS:
            return {
                ...state,
                reel_data: result_basegame,
                currentBetIndex: result_basegame.currentBetIndex
            };
        case actionTypes.GET_APPLICATION_SPIN_SUCCESS:
            if (result_spin.featureType == "") {
                result_spin.featureType = "FREEGAME"
            }
            return {
                
                ...state,
                freegameNextSpin: false,
                reel_data: result_spin,
                wins: result_spin.wins,
                winAmount: result_spin.winAmount,
                balance: result_spin.balance,
                feature: result_spin.feature,
                featureType: result_spin.featureType,
                freegameSpinCount: result_spin.freegameSpinCount,
                scatterWinnings: result_spin.scatterWinnings,
                freegameSpinCountWin: result_spin.freegameSpinCountWin,
                freegameSpinCountRemaining: result_spin.freegameSpinCountRemaining,
            };


        case actionTypes.SET_APPLICATION_BALANCE:
            return {
                ...state, balance: balance,
            };
        case actionTypes.SET_APPLICATION_WIN_AMOUNT:
            return {
                ...state, winAmount: winAmount, totalwinAmount: totalwinAmount + winAmount, wins: wins,
            };
        case actionTypes.SET_FEATURE_JUST_FINISHED:
            return {
                ...state, featureJustFinished: true,
            };
        case actionTypes.SET_APPLICATION_CURRENT_BET_INDEX:
            return {
                ...state, currentBetIndex: betIndex,
            };
        case actionTypes.APPLICATION_OUTRO_DONE:
            return {
                ...state, featureJustFinished: false, inFreeGame: false, totalwinAmount: 0
            };

        case actionTypes.APPLICATION_NEXT_FREESPIN:
            if (!inFreeGame) {
                return {
                    ...state
                }
            }
            if (freegameSpinCountRemaining > 0) {
                return {
                    ...state,
                    freegameNextSpin: true,
                    featureJustReTriggered:false
                }
            } else {
                return {
                    ...state,
                    featureJustFinished: true
                }
            }

        case actionTypes.APPLICATION_START_FREEGAME:
            return {
                ...state,
                inFreeGame: true
            }
        case actionTypes.SET_FEATURE_RE_TRIGGERED:
            return {
                ...state,
                featureJustReTriggered: true
            }
        case actionTypes.APPLICATION_STOP_FREEGAME:
            return {
                ...state,
                inFreeGame: false,
                featureJustFinished: false
            }
        case actionTypes.SET_APPLICATION_FREEGAME_COUNT:
            return {
                ...state,
                freegameCount: freegameCountAction,
                freegameNextSpin: false
            }
        default:
            return state;
    }
}

export const actions = {

    setApplicationCurrentBetIndex: (betIndex: number): any => ({
        type: actionTypes.SET_APPLICATION_CURRENT_BET_INDEX,
        betIndex
    }),
    setFreeeGameSpinSucces: (result_spin: any): any => ({type: actionTypes.GET_APPLICATION_SPIN_SUCCESS, result_spin}),
    reTriggeredFreegame: (): any => ({type: actionTypes.SET_FEATURE_RE_TRIGGERED}),
    nextFreegame: (): any => ({type: actionTypes.APPLICATION_NEXT_FREESPIN}),
    startFreegame: (): any => ({type: actionTypes.APPLICATION_START_FREEGAME}),
    stopFreegame: (): any => ({type: actionTypes.APPLICATION_STOP_FREEGAME}),
    setApplicationFreeGameCount: (freegameCountAction: number): any => ({
        type: actionTypes.SET_APPLICATION_FREEGAME_COUNT,
        freegameCountAction
    }),

    setApplicationBalance: (balance: number): any => ({
        type: actionTypes.SET_APPLICATION_BALANCE,
        balance
    }),
    setApplicationWinAmount: (winAmount: number, totalwinAmount: any, wins: any): any => ({
        type: actionTypes.SET_APPLICATION_WIN_AMOUNT,
        winAmount, totalwinAmount, wins
    }),
    setFeatureJustFinished: (): any => ({
        type: actionTypes.SET_FEATURE_JUST_FINISHED,

    }),
    setOutroDone: (): any => ({
        type: actionTypes.APPLICATION_OUTRO_DONE,

    }),
};
