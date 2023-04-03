export interface IApplicationState {

    currencyCode: string,
    majorSymbol: string,
    minorSymbol: string,
    thouSeperator: string,
    thouPlaces: number,
    dpSeperator: string,
    decimalPlaces: number,
    currencyScale: number,
    prefixMajor: boolean,
    baseValue: number,

}

const initialState: IApplicationState = {
    currencyCode: "GBP",
    majorSymbol: "£",
    minorSymbol: "p",
    thouSeperator: ",",
    thouPlaces: 3,
    dpSeperator: ".",
    decimalPlaces: 2,
    currencyScale: 1,
    prefixMajor: true,
    baseValue: 0,
};

export enum actionTypes {

    SET_CURRENCY = '@@CurrencyManager/SET_CURRENCY',

}

export function reducer(
    state: IApplicationState = initialState,
    action: any,
): IApplicationState {

    const {
        action_currencyCode,
        action_majorSymbol,
        action_minorSymbol,
        action_thouSeperator,
        action_thouPlaces,
        action_dpSeperator,
        action_decimalPlaces,
        action_currencyScale,
        action_prefixMajor,
        action_baseValue,
    } = action;

    switch (action.type) {
        case actionTypes.SET_CURRENCY:

            return {
                ...state, currencyCode: action_currencyCode,
                majorSymbol: action_majorSymbol,
                minorSymbol: action_minorSymbol,
                thouSeperator: action_thouSeperator,
                thouPlaces: action_thouPlaces,
                dpSeperator: action_dpSeperator,
                decimalPlaces: action_decimalPlaces,
                currencyScale: action_currencyScale,
                prefixMajor: action_prefixMajor,
                baseValue: action_baseValue,
            };

        default:
            return state;
    }
}

export const actions = {

    setCurrency: (action_currencyCode: string,
                     action_majorSymbol: string,
                     action_minorSymbol: string,
                     action_thouSeperator: string,
                     action_thouPlaces: number,
                     action_dpSeperator: string,
                     action_decimalPlaces: number,
                     action_currencyScale: number,
                     action_prefixMajor: boolean,
                     action_baseValue: number,): any => ({
        type: actionTypes.SET_CURRENCY, action_currencyCode,
        action_majorSymbol,
        action_minorSymbol,
        action_thouSeperator,
        action_thouPlaces,
        action_dpSeperator,
        action_decimalPlaces,
        action_currencyScale,
        action_prefixMajor,
        action_baseValue,
    }),
};
