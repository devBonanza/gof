export interface IApplicationState {
    autoplayNextSpin: boolean;
    GamePause: boolean;
    isLoading: boolean;
    isSpinning: boolean;
    inAutoplay: boolean;
    currentBetIndex: number;
    autoplayCount: number;
    betList: Array<number>;
    wins: Array<any>,
    feature: Array<any>,
    winAmount: number,
    balance: number,
    featureJustTriggered: boolean,
    basegamestate: boolean,
    featureType: string,
    reel_data: any,
    reConstruction: boolean,
    isActiveAll: boolean,
    isRemoveKeyBoardEvent: boolean,
    startSpinBySpaceBar: boolean,
    firstSpinAfterLoad: boolean,
    storeStake: number,
}

const initialState: IApplicationState = {
    featureJustTriggered: false,
    isLoading: false,
    GamePause: false,
    isSpinning: false,
    inAutoplay: false,
    basegamestate: true,
    currentBetIndex: -1,
    autoplayCount: -1,
    betList: [],
    reel_data: {},
    wins: [],
    feature: [],
    winAmount: 0,
    balance: 0,
    featureType: "BASEGAME",
    autoplayNextSpin: false,
    reConstruction: false,
    isActiveAll: true,
    isRemoveKeyBoardEvent: false,
    startSpinBySpaceBar: false,
    firstSpinAfterLoad: false,
    storeStake: 0,
};

export enum actionTypes {
    GET_APPLICATION_INIT_SUCCESS = '@@basegame/GET_APPLICATION_INIT_SUCCESS',
    GET_APPLICATION_SPIN_SUCCESS = '@@basegame/GET_APPLICATION_SPIN_SUCCESS',
    SET_APPLICATION_LOADING = '@@basegame/SET_APPLICATION_LOADING',
    GET_APPLICATION_LOADING = '@@basegame/GET_APPLICATION_LOADING',
    SET_APPLICATION_BASEGAME_STATE = '@@basegame/SET_APPLICATION_BASEGAME_STATE',
    SET_APPLICATION_CURRENT_BET_INDEX = '@@basegame/SET_APPLICATION_CURRENT_BET_INDEX',
    APPLICATION_NEXT_AUTOPLAY = '@@basegame/APPLICATION_NEXT_AUTOPLAY',
    APPLICATION_START_AUTOPLAY = '@@basegame/APPLICATION_START_AUTOPLAY',
    APPLICATION_STOP_AUTOPLAY = '@@basegame/APPLICATION_STOP_AUTOPLAY',
    SET_APPLICATION_COUNT = '@@basegame/SET_APPLICATION_COUNT',
    APPLICATION_INTRO_DONE = '@@basegame/APPLICATION_INTRO_DONE',
    SET_APPLICATION_BALANCE = '@@basegame/SET_APPLICATION_BALANCE',
    SET_APPLICATION_WIN_AMOUNT = '@@basegame/SET_APPLICATION_WIN_AMOUNT',
    SET_RECONSTRUCTION = '@@basegame/SET_RECONSTRUCTION',
    START_SPIN = '@@basegame/START_SPIN',
    SET_ACTIVE_ALL = '@@basegame/SET_ACTIVE_ALL',
    SET_REMOVE_KEYBOARD_EVENT = '@@basegame/SET_REMOVE_KEYBOARD_EVENT',
    SET_START_SPIN_SPACEBAR = '@@basegame/SET_START_SPIN_SPACEBAR',
    FIRST_SPIN_AFTER_LOAD = '@@basegame/FIRST_SPIN_AFTER_LOAD',
    STORE_STAKE = '@@basegame/STORE_STAKE',
}

export function reducer(
    state: IApplicationState = initialState,
    action: any,
): IApplicationState {
    const { storeStake, firstSpinAfterLoad, isLoading, result_basegame, betIndex, autoplayCount, result_spin, balance, winAmount, wins, basegamestatefromaction, reConstruction, isActiveAll, isRemoveKeyBoardEvent, startSpinBySpaceBar } = action;

    const { feature, basegamestate, featureType } = state;
    switch (action.type) {

        case actionTypes.GET_APPLICATION_INIT_SUCCESS:
            return {
                ...state,
                reel_data: result_basegame,
                betList: result_basegame.betList,
                currentBetIndex: result_basegame.currentBetIndex,
                feature: result_basegame.feature,
                //featureJustTriggered: result_basegame.feature.length > 0 || false,
                featureJustTriggered: false,
            };
        case actionTypes.GET_APPLICATION_SPIN_SUCCESS:
            if (result_spin.featureType == "") {
                result_spin.featureType = "BASEGAME"
            }
            return {
                ...state,
                reel_data: result_spin,
                wins: result_spin.wins,
                winAmount: result_spin.winAmount,
                balance: result_spin.balance,
                feature: result_spin.feature,
                featureType: result_spin.featureType,
            };
        case actionTypes.SET_APPLICATION_BALANCE:
            return {
                ...state, balance: balance,
            };
        case actionTypes.SET_APPLICATION_WIN_AMOUNT:
            return {
                ...state, winAmount: winAmount, wins: wins,
            };
        case actionTypes.GET_APPLICATION_LOADING:
            return { ...state };
        case actionTypes.APPLICATION_INTRO_DONE:
            return { ...state, featureJustTriggered: false };
        case actionTypes.SET_APPLICATION_LOADING:
            return {
                ...state, isLoading: isLoading,
            };
        case actionTypes.SET_APPLICATION_BASEGAME_STATE:

            return {
                ...state,
                basegamestate: basegamestatefromaction,
                autoplayNextSpin: false,
                winAmount: 0,
                feature: [],
                featureType: basegamestatefromaction && "BASEGAME" || "FREEGAME"
            };
        case actionTypes.SET_APPLICATION_CURRENT_BET_INDEX:
            return {
                ...state, currentBetIndex: betIndex,
            };
        case actionTypes.START_SPIN:
            return {
                ...state,
                isSpinning: true,


            }
        case actionTypes.APPLICATION_NEXT_AUTOPLAY:
            //basegamestate
            if (!basegamestate) {
                return {
                    ...state
                }
            }
            let bgstate = true;
            if (feature.length > 0) {
                bgstate = false;
            }
            return {
                ...state,
                autoplayNextSpin: true,
                featureJustTriggered: feature.length > 0 || false,
                // basegamestate: (featureType=="BONUS") || bgstate
            }
        case actionTypes.APPLICATION_START_AUTOPLAY:
            return {
                ...state,
                inAutoplay: true
            }
        case actionTypes.APPLICATION_STOP_AUTOPLAY:
            return {
                ...state,
                inAutoplay: false,
                autoplayCount: 0
            }
        case actionTypes.SET_APPLICATION_COUNT:
            return {
                ...state,
                autoplayCount: autoplayCount,
                autoplayNextSpin: false
            }
        case actionTypes.SET_RECONSTRUCTION:
            return {
                ...state,
                reConstruction: reConstruction,
            }

        case actionTypes.SET_ACTIVE_ALL:
            return {
                ...state, isActiveAll: isActiveAll,
            };
        case actionTypes.SET_REMOVE_KEYBOARD_EVENT:
            return {
                ...state, isRemoveKeyBoardEvent: isRemoveKeyBoardEvent,
            };
        case actionTypes.SET_START_SPIN_SPACEBAR:
            return {
                ...state, startSpinBySpaceBar: startSpinBySpaceBar,
            };
        case actionTypes.FIRST_SPIN_AFTER_LOAD:
            return {
                ...state, firstSpinAfterLoad: firstSpinAfterLoad,
            };
        case actionTypes.STORE_STAKE:
            return {
                ...state, storeStake: storeStake,
            };
        default:
            return state;
    }
}

export const actions = {
    stakeTore: (storeStake: number): any => ({ type: actionTypes.STORE_STAKE, storeStake }),
    spinAfterLoad: (firstSpinAfterLoad: boolean): any => ({ type: actionTypes.FIRST_SPIN_AFTER_LOAD, firstSpinAfterLoad }),
    setApplicationLoading: (isLoading: boolean): any => ({ type: actionTypes.SET_APPLICATION_LOADING, isLoading }),
    setApplicationCurrentBetIndex: (betIndex: number): any => ({
        type: actionTypes.SET_APPLICATION_CURRENT_BET_INDEX,
        betIndex
    }),
    setApplicationToBaseGameState: (basegamestatefromaction: boolean): any => ({
        type: actionTypes.SET_APPLICATION_BASEGAME_STATE, basegamestatefromaction
    }),
    setBaseGameInitSucces: (result_basegame: any): any => ({
        type: actionTypes.GET_APPLICATION_INIT_SUCCESS,
        result_basegame
    }),
    getApplicationLoading: (): any => ({ type: actionTypes.GET_APPLICATION_LOADING }),
    //startSpin: (): any => ({type: actionTypes.START_SPIN}),
    nextAutoplay: (): any => ({ type: actionTypes.APPLICATION_NEXT_AUTOPLAY }),
    startAutoplay: (): any => ({ type: actionTypes.APPLICATION_START_AUTOPLAY }),
    stopAutoplay: (): any => ({ type: actionTypes.APPLICATION_STOP_AUTOPLAY }),
    setIntroDone: (): any => ({ type: actionTypes.APPLICATION_INTRO_DONE }),
    setBaseGameSpinSucces: (result_spin: any): any => ({ type: actionTypes.GET_APPLICATION_SPIN_SUCCESS, result_spin }),
    setApplicationAutoplayCount: (autoplayCount: number): any => ({
        type: actionTypes.SET_APPLICATION_COUNT,
        autoplayCount
    }),
    setApplicationBalance: (balance: number): any => ({
        type: actionTypes.SET_APPLICATION_BALANCE,
        balance
    }),
    setApplicationWinAmount: (winAmount: number, wins: any): any => ({
        type: actionTypes.SET_APPLICATION_WIN_AMOUNT,
        winAmount, wins
    }),
    setReConstruction: (reConstruction: boolean): any => ({ type: actionTypes.SET_RECONSTRUCTION, reConstruction }),
    setActiveall: (isActiveAll: boolean): any => ({ type: actionTypes.SET_ACTIVE_ALL, isActiveAll }),
    removeKeyBoardEvent: (isRemoveKeyBoardEvent: boolean): any => ({ type: actionTypes.SET_REMOVE_KEYBOARD_EVENT, isRemoveKeyBoardEvent }),
    setStartSpinBySpaceBar: (startSpinBySpaceBar: boolean): any => ({ type: actionTypes.SET_START_SPIN_SPACEBAR, startSpinBySpaceBar }),
};
