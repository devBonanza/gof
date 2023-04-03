export interface IApplicationState {
    showPaytable: boolean;
}

const initialState: IApplicationState = {
    showPaytable: false,
};

export enum actionTypes {
    SHOW_PAYTABLE = '@@paytable/SHOW_PAYTABLE',
    HIDE_PAYTABLE = '@@paytable/HIDE_PAYTABLE',
}

export function reducer(
    state: IApplicationState = initialState,
    action: any,
): IApplicationState {
    switch (action.type) {
        case actionTypes.SHOW_PAYTABLE:
            return {...state, showPaytable: true};
        case actionTypes.HIDE_PAYTABLE:
            return {
                ...state, showPaytable: false,
            };
        default:
            return state;
    }
}

export const actions = {
    showPaytable: (): any => ({type: actionTypes.SHOW_PAYTABLE}),
    hidePaytable: (): any => ({type: actionTypes.HIDE_PAYTABLE}),
};
