export interface IApplicationState {
    spinButtonActive: boolean;
    stopButtonActive: boolean;
    spinButtonClicked: boolean;
    betIncreaseButtonClicked: boolean;
    betDecreaseButtonClicked: boolean;
    buttonClickedSound: boolean;
    allButtonEnable: boolean;
    exceptBtnList: Array<string>;
    enableParticularButton: boolean;
    screenOnOff: boolean,
    clickedButtonName: string,

}

const initialState: IApplicationState = {
    spinButtonActive: false,
    stopButtonActive: false,
    spinButtonClicked: false,
    betIncreaseButtonClicked: false,
    betDecreaseButtonClicked: false,
    allButtonEnable: true,
    buttonClickedSound: false,
    exceptBtnList: [],
    enableParticularButton: false,
    screenOnOff: false,
    clickedButtonName: "",
};

export enum actionTypes {
    BUTTON_CLICKED = '@@application/BUTTON_CLICKED',
    SET_All_BUTTON_ENABLE = '@@application/SET_All_BUTTON_ENABLE',
    SET_All_BUTTON_DISABLE = '@@application/SET_All_BUTTON_DISABLE',
    SET_APPLICATION_STOP_ACTIVE = '@@application/SET_APPLICATION_STOP_ACTIVE',
    GET_APPLICATION_SPIN_CLICK = '@@application/GET_APPLICATION_SPIN_CLICK',
    SET_APPLICATION_SPIN_CLICK = '@@application/SET_APPLICATION_SPIN_CLICK',
    SET_APPLICATION_BET_INCREASE_CLICK = '@@application/SET_APPLICATION_BET_INCREASE_CLICK',
    GET_APPLICATION_BET_INCREASE_CLICK = '@@application/GET_APPLICATION_BET_INCREASE_CLICK',
    SET_APPLICATION_BET_DECREASE_CLICK = '@@application/SET_APPLICATION_BET_DECREASE_CLICK',
    GET_APPLICATION_BET_DECREASE_CLICK = '@@application/GET_APPLICATION_BET_DECREASE_CLICK',
    ENABLE_PARTICULAR_BUTTON = '@@application/ENABLE_PARTICULAR_BUTTON',
    SET_SCREEN_ON_OFF = '@@application/SET_SCREEN_ON_OFF',
    CLICKED_BUTTON_NAME = '@@application/CLICKED_BUTTON_NAME',
}

export function reducer(
    state: IApplicationState = initialState,
    action: any,
): IApplicationState {
    const { exceptBtnList } = state
    const { isClicked, exceptBtnListFromAction, resetOldList, stopActive, enableParticularButton, screenOnOff, clickedButtonName } = action;
    switch (action.type) {
        case actionTypes.GET_APPLICATION_SPIN_CLICK:
            return { ...state };
        case actionTypes.SET_APPLICATION_SPIN_CLICK:
            return {
                ...state, spinButtonClicked: isClicked,
            };
        case actionTypes.SET_APPLICATION_STOP_ACTIVE:
            return {
                ...state, stopButtonActive: stopActive,
            };

        case actionTypes.BUTTON_CLICKED:
            return {
                ...state, buttonClickedSound: isClicked,
            };
        case actionTypes.SET_All_BUTTON_ENABLE:
            return {
                ...state, allButtonEnable: true, exceptBtnList: exceptBtnListFromAction,
            };
        case actionTypes.SET_All_BUTTON_DISABLE:
            return {
                ...state, allButtonEnable: false, exceptBtnList: exceptBtnListFromAction,
            };

        case actionTypes.GET_APPLICATION_BET_INCREASE_CLICK:
            return { ...state };
        case actionTypes.SET_APPLICATION_BET_INCREASE_CLICK:
            return {
                ...state, betIncreaseButtonClicked: isClicked,
            };

        case actionTypes.GET_APPLICATION_BET_DECREASE_CLICK:
            return { ...state };
        case actionTypes.SET_APPLICATION_BET_DECREASE_CLICK:
            return {
                ...state, betDecreaseButtonClicked: isClicked,
            };
        case actionTypes.ENABLE_PARTICULAR_BUTTON:
            return {
                ...state, enableParticularButton: enableParticularButton,
            };
        case actionTypes.SET_SCREEN_ON_OFF:
            return {
                ...state, screenOnOff: screenOnOff,
            };
        case actionTypes.CLICKED_BUTTON_NAME:
            return {
                ...state, clickedButtonName: clickedButtonName,
            };

        default:
            return state;
    }
}

export const actions = {
    setIsScreenOnOff: (screenOnOff: Boolean): any => ({
        type: actionTypes.SET_SCREEN_ON_OFF,
        screenOnOff
    }),
    particularButtonEnable: (enableParticularButton: boolean): any => ({
        type: actionTypes.ENABLE_PARTICULAR_BUTTON,
        enableParticularButton
    }),
    setApplicationSpinButtonClicked: (isClicked: boolean): any => ({
        type: actionTypes.SET_APPLICATION_SPIN_CLICK,
        isClicked
    }),
    setApplicationButtonClicked: (isClicked: boolean): any => ({
        type: actionTypes.BUTTON_CLICKED,
        isClicked
    }),
    setStopActive: (stopActive: boolean): any => ({
        type: actionTypes.SET_APPLICATION_STOP_ACTIVE,
        stopActive
    }),
    getApplicationSpinButtonClicked: (): any => ({ type: actionTypes.GET_APPLICATION_SPIN_CLICK }),

    setApplicationIncreaseButtonClicked: (isClicked: boolean): any => ({
        type: actionTypes.SET_APPLICATION_BET_INCREASE_CLICK,
        isClicked
    }),
    getApplicationIncreaseButtonClicked: (): any => ({ type: actionTypes.GET_APPLICATION_BET_INCREASE_CLICK }),

    setApplicationDecreaseButtonClicked: (isClicked: boolean): any => ({
        type: actionTypes.SET_APPLICATION_BET_DECREASE_CLICK,
        isClicked
    }),
    getApplicationDecreaseButtonClicked: (): any => ({ type: actionTypes.GET_APPLICATION_BET_DECREASE_CLICK }),
    setAllButtonEnable: (exceptBtnListFromAction: Array<string> = [], resetOldList: boolean = false): any => ({
        type: actionTypes.SET_All_BUTTON_ENABLE, exceptBtnListFromAction, resetOldList
    }),
    setAllButtonDisable: (exceptBtnListFromAction: Array<string> = [], resetOldList: boolean = false): any => ({
        type: actionTypes.SET_All_BUTTON_DISABLE, exceptBtnListFromAction, resetOldList
    }),
    buttonClickedName: (clickedButtonName: string): any => ({
        type: actionTypes.CLICKED_BUTTON_NAME,
        clickedButtonName
    }),

};