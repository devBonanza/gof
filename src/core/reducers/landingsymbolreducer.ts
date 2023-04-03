export interface IApplicationState {
    playLandingAnimation: boolean;
    landingAnimPositions: any
}

const initialState: IApplicationState = {
    playLandingAnimation: false,
    landingAnimPositions: []
};

export enum actionTypes {
    PLAY_ANIM_LANDING = '@@landing/PLAY_ANIM_LANDING',
    SET_LANDING_POSITIONS = '@@landing/SET_LANDING_POSITIONS',
    RESET_REEL_STATE = '@@reelgrid/RESET_REEL_STATE',
}

export function reducer(
    state: IApplicationState = initialState,
    action: any,
): IApplicationState {
    const {
        landingPosition
    } = action;
    switch (action.type) {
        case actionTypes.PLAY_ANIM_LANDING:
            return { ...state, playLandingAnimation: true };
        case actionTypes.SET_LANDING_POSITIONS:
            return { ...state, landingAnimPositions: landingPosition };
        case actionTypes.RESET_REEL_STATE:
            return {
                ...state,
                landingAnimPositions: [],
                playLandingAnimation: false
            };
        default:
            return state;
    }
}

export const actions = {
    playLandingAnim: (): any => ({ type: actionTypes.PLAY_ANIM_LANDING }),
    setLandingPosition: (landingPosition: any): any => ({ type: actionTypes.SET_LANDING_POSITIONS, landingPosition }),
};
