export interface IApplicationState {

    showAutoplay: boolean;
    AutoplayCount: number;
    autoplayStopped: boolean;
    lossLimit: boolean;
    numberButtonValue: number;
    stopIfCashIncreasedBy: number;
    stopIfCashDecreasedBy: number;
    stopIfBalanceIncreasedBy: number;
    stopIfBalanceDecreasedBy: number;
    stopIfSingleWinExceed: number;
    resetAutoplay: boolean;
    startButtonInteractivity: boolean;
    stopAutoplayOnAnyWin: boolean;
    stopAutoplayOnBonus: boolean;
    stopAutoplayOnFreegame: boolean;

}

const initialState: IApplicationState = {
    showAutoplay: false,
    AutoplayCount: 0,
    autoplayStopped: false,
    lossLimit: false,
    numberButtonValue: 0,
    stopIfBalanceIncreasedBy: -1,
    stopIfBalanceDecreasedBy: -1,
    stopIfCashIncreasedBy: -1,
    stopIfCashDecreasedBy: -1,
    stopIfSingleWinExceed: -1,
    resetAutoplay: false,
    startButtonInteractivity: false,
    stopAutoplayOnAnyWin: false,
    stopAutoplayOnBonus: true,
    stopAutoplayOnFreegame: true,

};

export enum actionTypes {

    SHOW_AUTOPLAY = '@@autoplay/SHOW_AUTOPLAY',
    HIDE_AUTOPLAY = '@@autoplay/HIDE_AUTOPLAY',
    GET_AUTOPLAY_COUNT = '@@autoplay/GET_AUTOPLAY_COUNT',
    SET_AUTOPLAY_COUNT = '@@autoplay/SET_AUTOPLAY_COUNT',
    SET_IF_CASH_INCREASED_BY = '@@autoplay/SET_IF_CASH_INCREASED_BY',
    SET_IF_CASH_DECREASED_BY = '@@autoplay/SET_IF_CASH_DECREASED_BY',
    SET_IF_BALANCE_INCREASED_BY = '@@autoplay/SET_IF_BALANCE_INCREASED_BY',
    SET_IF_BALANCE_DECREASED_BY = '@@autoplay/SET_IF_BALANCE_DECREASED_BY',
    SET_IF_SINGLE_WIN_EXCEED = '@@autoplay/SET_IF_SINGLE_WIN_EXCEED',
    AUTOPLAY_STOPPED_SCREEN = '@@autoplay/AUTOPLAY_STOPPED_SCREEN',
    AUTOPLAY_STOPPED_ON_WIN = '@@autoplay/AUTOPLAY_STOPPED_ON_WIN',
    AUTOPLAY_STOPPED_ON_BONUS = '@@autoplay/AUTOPLAY_STOPPED_ON_BONUS',
    AUTOPLAY_STOPPED_ON_FREEGAME = '@@autoplay/AUTOPLAY_STOPPED_ON_FREEGAME',

    LOSS_LIMIT = '@@autoplay/LOSS_LIMIT',
    NUMBER_BUTTON_VALUE = '@@autoplay/NUMBER_BUTTON_VALUE',
    RESET_AUTOPLAY = '@@autoplay/RESET_AUTOPLAY',
    INTERACTIVITY_OF_START_BUTTON = '@@autoplay/INTERACTIVITY_OF_START_BUTTON'

}

export function reducer(
    state: IApplicationState = initialState,
    action: any,
): IApplicationState {
    const {
        autoplayCount,
        lossLimit,
        autoplayStopped,
        numberButtonValue,
        resetAutoplay,
        startButtonInteractivity,
        stopIfCashIncreasedBy,
        stopIfCashDecreasedBy,
        stopIfBalanceIncreasedBy,
        stopIfBalanceDecreasedBy,
        stopIfSingleWinExceed
    } = action;
    const {stopAutoplayOnAnyWin, stopAutoplayOnBonus, stopAutoplayOnFreegame} = state;
    switch (action.type) {
        case actionTypes.SHOW_AUTOPLAY:
            return {...state, showAutoplay: true};
        case actionTypes.HIDE_AUTOPLAY:
            return {
                ...state, showAutoplay: false,
            };
        case actionTypes.GET_AUTOPLAY_COUNT:
            return {...state};
        case actionTypes.SET_AUTOPLAY_COUNT:
            return {
                ...state, AutoplayCount: autoplayCount,
            };
        case actionTypes.SET_IF_CASH_INCREASED_BY:
            return {
                ...state, stopIfCashIncreasedBy: stopIfCashIncreasedBy,
            };
        case actionTypes.SET_IF_CASH_DECREASED_BY:
            return {
                ...state, stopIfCashDecreasedBy: stopIfCashDecreasedBy,
            };
        case actionTypes.SET_IF_BALANCE_INCREASED_BY:
            return {
                ...state, stopIfBalanceIncreasedBy: stopIfBalanceIncreasedBy,
            };
        case actionTypes.SET_IF_BALANCE_DECREASED_BY:
            return {
                ...state, stopIfBalanceDecreasedBy: stopIfBalanceDecreasedBy,
            };
        case actionTypes.SET_IF_SINGLE_WIN_EXCEED:
            return {
                ...state, stopIfSingleWinExceed: stopIfSingleWinExceed,
            };
        case actionTypes.AUTOPLAY_STOPPED_SCREEN:
            return {
                ...state, autoplayStopped: autoplayStopped
            };
        case actionTypes.AUTOPLAY_STOPPED_ON_WIN:
            return {
                ...state, stopAutoplayOnAnyWin: !stopAutoplayOnAnyWin
            };
        case actionTypes.AUTOPLAY_STOPPED_ON_BONUS:
            return {
                ...state, stopAutoplayOnBonus: !stopAutoplayOnBonus
            };
        case actionTypes.AUTOPLAY_STOPPED_ON_FREEGAME:
            return {
                ...state, stopAutoplayOnFreegame: !stopAutoplayOnFreegame
            };
        case actionTypes.LOSS_LIMIT:
            return {
                ...state, lossLimit: lossLimit
            };
        case actionTypes.NUMBER_BUTTON_VALUE:
            return {
                ...state, numberButtonValue: numberButtonValue
            };
        case actionTypes.RESET_AUTOPLAY:
            return {
                ...state, resetAutoplay: resetAutoplay
            };
        case actionTypes.INTERACTIVITY_OF_START_BUTTON:
            return {
                ...state, startButtonInteractivity: startButtonInteractivity
            };
        default:
            return state;
    }
}

export const actions = {
    showAutoplayUI: (): any => ({type: actionTypes.SHOW_AUTOPLAY}),
    hideAutoplayUI: (): any => ({type: actionTypes.HIDE_AUTOPLAY}),
    setAutoplayCount: (autoplayCount: number): any => ({type: actionTypes.SET_AUTOPLAY_COUNT, autoplayCount}),
    setCashIncreasedBy: (stopIfCashIncreasedBy: number): any => ({
        type: actionTypes.SET_IF_CASH_INCREASED_BY,
        stopIfCashIncreasedBy
    }),
    setCashDecreasedBy: (stopIfCashDecreasedBy: number): any => ({
        type: actionTypes.SET_IF_CASH_DECREASED_BY,
        stopIfCashDecreasedBy
    }),
    setBalanceIncreasedBy: (stopIfBalanceIncreasedBy: number): any => ({
        type: actionTypes.SET_IF_BALANCE_INCREASED_BY,
        stopIfBalanceIncreasedBy
    }),
    setBalanceDecreasedBy: (stopIfBalanceDecreasedBy: number): any => ({
        type: actionTypes.SET_IF_BALANCE_DECREASED_BY,
        stopIfBalanceDecreasedBy
    }),
    setSingleWinExceed: (stopIfSingleWinExceed: number): any => ({
        type: actionTypes.SET_IF_SINGLE_WIN_EXCEED,
        stopIfSingleWinExceed
    }),
    getAutoplayCount: (): any => ({type: actionTypes.GET_AUTOPLAY_COUNT}),
    stoppedAutoplayUI: (autoplayStopped: boolean): any => ({
        type: actionTypes.AUTOPLAY_STOPPED_SCREEN,
        autoplayStopped
    }),
    limitOfLoss: (lossLimit: boolean): any => ({type: actionTypes.LOSS_LIMIT, lossLimit}),
    setValueOfNumberButton: (numberButtonValue: number): any => ({
        type: actionTypes.NUMBER_BUTTON_VALUE,
        numberButtonValue
    }),
    autoplayReset: (resetAutoplay: boolean): any => ({type: actionTypes.RESET_AUTOPLAY, resetAutoplay}),
    interactivityOfStartButton: (startButtonInteractivity: boolean): any => ({
        type: actionTypes.INTERACTIVITY_OF_START_BUTTON,
        startButtonInteractivity
    }),
    stoppedAutoplayOnWin: (): any => ({type: actionTypes.AUTOPLAY_STOPPED_ON_WIN}),
    stoppedAutoplayOnBonus: (): any => ({type: actionTypes.AUTOPLAY_STOPPED_ON_BONUS}),
    stoppedAutoplayOnFreeGame: (): any => ({type: actionTypes.AUTOPLAY_STOPPED_ON_FREEGAME}),
};
