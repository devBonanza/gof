export interface IApplicationState {

    showHistory: boolean;
    historyData: any

}

const initialState: IApplicationState = {
    showHistory: false,
    historyData: []
};

export enum actionTypes {

    GET_HISTORY_SUCCESS = '@@history/GET_HISTORY_SUCCESS',
    GET_HISTORY_FAILURE = '@@history/GET_HISTORY_FAILURE',
    SHOW_HISTORY = '@@history/SHOW_HISTORY',
    HIDE_HISTORY = '@@history/HIDE_HISTORY',

}

export function reducer(
    state: IApplicationState = initialState,
    action: any,
): IApplicationState {
    const {result_spin} = action;
    switch (action.type) {
        case actionTypes.SHOW_HISTORY:
            return {...state, showHistory: true};
        case actionTypes.HIDE_HISTORY:

            return {
                ...state, showHistory: false,
            };
        case actionTypes.GET_HISTORY_SUCCESS:


            return {
                ...state,
                historyData: result_spin
            };
        default:
            return state;
    }
}

export const actions = {
    showHistory: (): any => ({type: actionTypes.SHOW_HISTORY}),
    hideHistory: (): any => ({type: actionTypes.HIDE_HISTORY}),

};
