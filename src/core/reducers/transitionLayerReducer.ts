export interface IApplicationState {
    transitionLayerOn: boolean;
}

const initialState: IApplicationState = {
    transitionLayerOn: false,
};

export enum actionTypes {
    START_TRANSITION_LAYER = '@@transitionLayer/START_TRANSITION_LAYER',
}

export function reducer(
    state: IApplicationState = initialState,
    action: any,
): IApplicationState {
    const {
        transitionLayerOn
    } = action;

    switch (action.type) {
        case actionTypes.START_TRANSITION_LAYER:
            return {
                ...state, transitionLayerOn: transitionLayerOn
            };
        default:
            return state;
    }
}

export const actions = {
    onTransitionLayer: (transitionLayerOn: boolean): any => ({
        type: actionTypes.START_TRANSITION_LAYER,
        transitionLayerOn
    }),

};
