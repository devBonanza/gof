export interface IApplicationState {
    spinWithSpaceBar: boolean;
    fullScreenOn: boolean;
    winCelebrationForKeyBoardListener: boolean;
}

const initialState: IApplicationState = {
    spinWithSpaceBar: false,
    fullScreenOn: false,
    winCelebrationForKeyBoardListener: false,
};

export enum actionTypes {
    SPINWITHSPACEBAR = '@@keyboardListener/SPINWITHSPACEBAR',
    FULLSCREANON = '@@keyboardListener/FULLSCREANON',
    CHECK_OF_WIN_CELEBRATION_IN_KEYBOARD_LISTENER = '@@keyboardListener/CHECK_OF_WIN_CELEBRATION_IN_KEYBOARD_LISTENER',
}

export function reducer(
    state: IApplicationState = initialState,
    action: any,
): IApplicationState {
    const {spinWithSpaceBar, fullScreenOn,winCelebrationForKeyBoardListener} = action;
    switch (action.type) {
        case actionTypes.SPINWITHSPACEBAR:
            return {
                ...state,
                spinWithSpaceBar: spinWithSpaceBar
            };
        case actionTypes.FULLSCREANON:
            return {
                ...state,
                fullScreenOn: fullScreenOn
            };
        case actionTypes.CHECK_OF_WIN_CELEBRATION_IN_KEYBOARD_LISTENER:
            return {
                ...state,
                winCelebrationForKeyBoardListener: winCelebrationForKeyBoardListener
            };

        default:
            return state;
    }
}

export const actions = {
    spaceBarSpin: (spinWithSpaceBar: boolean): any => ({type: actionTypes.SPINWITHSPACEBAR, spinWithSpaceBar}),
    onFullScreen: (fullScreenOn: boolean): any => ({type: actionTypes.FULLSCREANON, fullScreenOn}),
    setWinCelebrationForKeyboardListener: (winCelebrationForKeyBoardListener: boolean): any => ({type: actionTypes.CHECK_OF_WIN_CELEBRATION_IN_KEYBOARD_LISTENER, winCelebrationForKeyBoardListener}),
};
