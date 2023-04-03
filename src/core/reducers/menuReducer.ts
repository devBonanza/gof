export interface IApplicationState {
    showMenu: boolean;
    TotalBet: number;
}

const initialState: IApplicationState = {
    showMenu: false,
    TotalBet: 0,
};

export enum actionTypes {
    SHOW_MENU = '@@menu/SHOW_AUTOPLAY',
    HIDE_MENU = '@@menu/HIDE_AUTOPLAY',
    GET_TOTEL_BET = '@@menu/GET_TOTEL_BET',
    SET_TOTEL_BET = '@@menu/SET_TOTEL_BET',
}

export function reducer(
    state: IApplicationState = initialState,
    action: any,
): IApplicationState {
    switch (action.type) {
        case actionTypes.SHOW_MENU:
            return {...state, showMenu: true};
        case actionTypes.HIDE_MENU:
            return {
                ...state, showMenu: false,
            };
        default:
            return state;
    }
}

export const actions = {
    showMenuUI: (): any => ({type: actionTypes.SHOW_MENU}),
    hideMenuUI: (): any => ({type: actionTypes.HIDE_MENU}),
};
