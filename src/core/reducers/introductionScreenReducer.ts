export interface IApplicationState {
    showIntroScreen: boolean;
    introductionScreenVisible: boolean;
}

const initialState: IApplicationState = {
    showIntroScreen: false,
    introductionScreenVisible: true,
};

export enum actionTypes {
    SHOW_INTRO_SCREEN = '@@IntroductionScreen/SHOW_INTRO_SCREEN',
    VISIBILITY_OF_INTRODUCTION_SCREEN = '@@IntroductionScreen/VISIBILITY_OF_INTRODUCTION_SCREEN',
}

export function reducer(
    state: IApplicationState = initialState,
    action: any,
): IApplicationState {
    const { showIntroScreen, introductionScreenVisible } = action;
    switch (action.type) {
        case actionTypes.SHOW_INTRO_SCREEN:
            return {
                ...state,
                showIntroScreen: showIntroScreen
            };
        case actionTypes.VISIBILITY_OF_INTRODUCTION_SCREEN:
            return {
                ...state, introductionScreenVisible: introductionScreenVisible,
            };
        default:
            return state;
    }
}

export const actions = {
    introScreenVisible: (showIntroScreen: boolean): any => ({ type: actionTypes.SHOW_INTRO_SCREEN, showIntroScreen }),
    introductionVisibleScreen: (introductionScreenVisible: boolean): any => ({ type: actionTypes.VISIBILITY_OF_INTRODUCTION_SCREEN, introductionScreenVisible }),
};
