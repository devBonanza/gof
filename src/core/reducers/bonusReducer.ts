export interface IApplicationState {
    isResponseReceived: boolean,
    result: object,
    error: object

    isBonusFinished: boolean;
    inBonusGame: boolean;
    currentBetIndex: number;
    wins: Array<any>,
    feature: Array<any>,
    winAmount: number,
    balance: number,
    credits: number,
    totalCredits: number,
    gambleCreditsWon: number,
    multiplier: number,
    InGamble: boolean,
    gambleWon: boolean,
    featureJustTriggered: boolean,
    featureJustFinished: boolean,
    featureType: string,
}

const initialState: IApplicationState = {
    isResponseReceived: false,
    result: {},
    error: {},
    isBonusFinished: false,
    inBonusGame: false,
    currentBetIndex: -1,
    wins: [],
    feature: [],
    winAmount: 0,
    balance: 0,
    credits: 0,
    totalCredits: 0,
    gambleCreditsWon: 0,
    multiplier: 0,
    InGamble: false,
    gambleWon: false,
    featureJustTriggered: false,
    featureJustFinished: false,
    featureType: "BONUS",
}

export enum actionTypes {
    GET_BONUS_PICK_SUCCESS = '@@bonus/GET_BONUS_PICK_SUCCESS',
    BONUS_OUTRO_DONE = '@@bonus/BONUS_OUTRO_DONE',
    GET_BONUS_SUCCESS = '@@bonus/GET_BONUS_SUCCESS',
    GET_BONUS_FAILURE = '@@bonus/GET_BONUS_FAILURE',
    SET_BONUS_RESET = '@@bonus/SET_BONUS_RESET',
    SET_GAMBLE_RESET = '@@bonus/SET_GAMBLE_RESET',
}

export function reducer(
    state: IApplicationState = initialState,
    action: any,
): IApplicationState {


    const {result_spin, bet, error} = action;
    switch (action.type) {
        case actionTypes.SET_BONUS_RESET:
            return {
                ...state, isResponseReceived: false
            };
        case actionTypes.SET_GAMBLE_RESET:
            return {
                ...state, InGamble: false, isResponseReceived: false
            };
        case actionTypes.BONUS_OUTRO_DONE:
            return {
                ...state, featureJustFinished: false, inBonusGame: false
            };

        case actionTypes.GET_BONUS_FAILURE:
            return {...state, error, isResponseReceived: false};
        case actionTypes.GET_BONUS_SUCCESS:


            if (result_spin.featureType == "") {
                result_spin.featureType = "BONUS"
            }
            return {
                ...state,
                isResponseReceived: true,
                isBonusFinished: result_spin.isBonusFinished,
                inBonusGame: result_spin.success,
                credits: result_spin.credits,
                totalCredits: result_spin.extraInfo.totalCredits,
                multiplier: result_spin.multiplier,
                featureType: result_spin.featureType,
                InGamble: result_spin.InGamble,
                gambleWon: result_spin.extraInfo.gambleWon,
                gambleCreditsWon: result_spin.extraInfo.gambleCreditsWon
            };

        default:
            return state;
    }
}

export const actions = {
    getApplicationBonusOutroDone: (): any => ({type: actionTypes.BONUS_OUTRO_DONE}),

    // setApplicationCurrentBetIndex: (betIndex: number): any => ({
    //     type: actionTypes.SET_APPLICATION_CURRENT_BET_INDEX,
    //     betIndex
    // }),
    resetBonus: (): any => ({type: actionTypes.SET_BONUS_RESET}),
    resetGamble: (): any => ({type: actionTypes.SET_GAMBLE_RESET}),
    // startFreegame: (): any => ({type: actionTypes.APPLICATION_START_FREEGAME}),
    // stopFreegame: (): any => ({type: actionTypes.APPLICATION_STOP_FREEGAME}),
    // setApplicationAutoplayCount: (autoplayCount: number): any => ({
    //     type: actionTypes.SET_APPLICATION_FREEGAME_COUNT,
    //     autoplayCount
    // }),
};