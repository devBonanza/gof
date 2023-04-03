export interface IApplicationState {

    showBetpanel: boolean;
    selectedLine: number;
    selectedBet: number;
    selectedCoin: number;
    betList: any;
    coinList: any;
    lineList: any;
    maxbetvalue: number,
    minbetvalue: number,
    defaultbetvalue: number,
    maxlinevalue: number,
    minlinevalue: number,
    defaultlinevalue: number,
    defaultdenominationsvalue: number,
    denominations: any,
    currentbetvalue: number,
    currentlinevalue: number,
    currentdenominationsvalue: number,
}

const initialState: IApplicationState = {
    showBetpanel: false,
    selectedLine: -1,
    selectedBet: -1,
    selectedCoin: -1,
    betList: [],
    coinList: [],
    lineList: [],
    maxbetvalue: 0,
    minbetvalue: 0,
    defaultbetvalue: 0,
    maxlinevalue: 0,
    minlinevalue: 0,
    defaultlinevalue: 0,
    defaultdenominationsvalue: 0,
    denominations: [],
    currentbetvalue: 0,
    currentlinevalue: 0,
    currentdenominationsvalue: 0,
};

export enum actionTypes {

    SHOW_BETPANEL = '@@betpanel/SHOW_BETPANEL',
    HIDE_BETPANEL = '@@betpanel/HIDE_BETPANEL',
    SET_BETLIST = '@@betpanel/SET_BETLIST',
    SET_COINLIST = '@@betpanel/SET_COINLIST',
    SET_LINELIST = '@@betpanel/SET_LINELIST',
    SET_SELECTED_BET = '@@betpanel/SET_SELECTED_BET',
    SET_SELECTED_LINE = '@@betpanel/SET_SELECTED_LINE',
    SET_SELECTED_COIN = '@@betpanel/SET_SELECTED_COIN',
    SET__MAX_BET_VALUE = '@@betpanel/SET__MAX_BET_VALUE',
    SET__MIN_BET_VALUE = '@@betpanel/SET__MIN_BET_VALUE',
    SET__DEFAULT_BET_VALUE = '@@betpanel/SET__DEFAULT_BET_VALUE',

    SET__MAX_LINE_VALUE = '@@betpanel/SET__MAX_LINE_VALUE',
    SET__MIN_LINE_VALUE = '@@betpanel/SET__MIN_LINE_VALUE',
    SET__DEFAULT_LINE_VALUE = '@@betpanel/SET__DEFAULT_LINE_VALUE',

    SET__DEFAULT_DENOMINATION_VALUE = '@@betpanel/SET__DEFAULT_DENOMINATION_VALUE',
    SET__DENOMINATION_LIST = '@@betpanel/SET__DENOMINATION_LIST',
}

export function reducer(
    state: IApplicationState = initialState,
    action: any,
): IApplicationState {

    const {
        betList, coinList, lineList, selectedBet, selectedLine, selectedCoin,
        defaultdenominationvalue, denominationlist, defaultlinevalue, minlinevalue, maxlinevalue, defaultbetvalue,
        minbetvalue, maxbetvalue,
    } = action;
    switch (action.type) {
        case actionTypes.SHOW_BETPANEL:
            return {...state, showBetpanel: true};
        case actionTypes.HIDE_BETPANEL:

            return {
                ...state, showBetpanel: false,
            };
        case actionTypes.SET_BETLIST:

            return {
                ...state, betList: betList,
            };
        case actionTypes.SET_COINLIST:

            return {
                ...state, coinList: coinList,
            };
        case actionTypes.SET_LINELIST:

            return {
                ...state, lineList: lineList,
            };
        case actionTypes.SET_SELECTED_BET:

            return {
                ...state, currentbetvalue: selectedBet, selectedBet: selectedBet,
            };
        case actionTypes.SET_SELECTED_LINE:

            return {
                ...state, currentlinevalue: selectedLine, selectedLine: selectedLine,
            };
        case actionTypes.SET_SELECTED_COIN:

            return {
                ...state, currentdenominationsvalue: selectedCoin, selectedCoin: selectedCoin,
            };
        case actionTypes.SET__MAX_BET_VALUE:
            return {
                ...state, maxbetvalue: maxbetvalue,
            };
        case actionTypes.SET__MIN_BET_VALUE:
            return {
                ...state, minbetvalue: minbetvalue,
            };
        case actionTypes.SET__DEFAULT_BET_VALUE:
            return {
                ...state, currentbetvalue: defaultbetvalue, defaultbetvalue: defaultbetvalue,
            };
        case actionTypes.SET__MAX_LINE_VALUE:
            return {
                ...state, maxlinevalue: maxlinevalue,
            };
        case actionTypes.SET__MIN_LINE_VALUE:
            return {
                ...state, minlinevalue: minlinevalue,
            };
        case actionTypes.SET__DEFAULT_LINE_VALUE:
            return {
                ...state, currentlinevalue: defaultlinevalue, defaultlinevalue: defaultlinevalue,
            };
        case actionTypes.SET__DEFAULT_DENOMINATION_VALUE:
            return {
                ...state,
                currentdenominationsvalue: defaultdenominationvalue,
                defaultdenominationsvalue: defaultdenominationvalue,
            };
        case actionTypes.SET__DENOMINATION_LIST:
            return {
                ...state, denominations: denominationlist,
            };
        default:
            return state;
    }
}

export const actions = {
    showBetpanel: (): any => ({type: actionTypes.SHOW_BETPANEL}),
    hideBetpanel: (): any => ({type: actionTypes.HIDE_BETPANEL}),
    setBetList: (betList: any): any => ({type: actionTypes.SET_BETLIST, betList}),
    setCoinList: (coinList: any): any => ({type: actionTypes.SET_COINLIST, coinList}),
    setLineList: (lineList: any): any => ({type: actionTypes.SET_LINELIST, lineList}),
    setSelectedBet: (selectedBet: number): any => ({type: actionTypes.SET_SELECTED_BET, selectedBet}),
    setSelectedLine: (selectedLine: number): any => ({type: actionTypes.SET_SELECTED_LINE, selectedLine}),
    setSelectedCoin: (selectedCoin: number): any => ({type: actionTypes.SET_SELECTED_COIN, selectedCoin}),

    setMaxBetValue: (maxbetvalue: number): any => ({
        type: actionTypes.SET__MAX_BET_VALUE,
        maxbetvalue
    }),
    setMinBetValue: (minbetvalue: number): any => ({
        type: actionTypes.SET__MIN_BET_VALUE,
        minbetvalue
    }),
    setDefaultBetValue: (defaultbetvalue: number): any => ({
        type: actionTypes.SET__DEFAULT_BET_VALUE,
        defaultbetvalue
    }),
    setMaxLineValue: (maxlinevalue: number): any => ({
        type: actionTypes.SET__MAX_LINE_VALUE,
        maxlinevalue
    }),
    setMinLineValue: (minlinevalue: number): any => ({
        type: actionTypes.SET__MIN_LINE_VALUE,
        minlinevalue
    }),
    setDefaultLineValue: (defaultlinevalue: number): any => ({
        type: actionTypes.SET__DEFAULT_LINE_VALUE,
        defaultlinevalue
    }),
    setDefaultDenominationValue: (defaultdenominationvalue: number): any => ({
        type: actionTypes.SET__DEFAULT_DENOMINATION_VALUE,
        defaultdenominationvalue
    }),
    setDenominationList: (denominationlist: any): any => ({
        type: actionTypes.SET__DENOMINATION_LIST,
        denominationlist
    }),


};
