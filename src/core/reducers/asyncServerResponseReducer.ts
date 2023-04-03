export interface IApplicationState {
    isResponseReceived: boolean,
    isRequestSent: boolean,
    result: object,
    allhistoryresult: object,
    spinspecifichistoryresult: object,
    error: object

}

const initialState: IApplicationState = {

    isResponseReceived: false,
    isRequestSent: false,
    result: {},
    allhistoryresult: [],
    spinspecifichistoryresult: {},
    error: {}

};

export enum actionTypes {
    GET_APPLICATION_SPIN_RESPONSE = '@@application/GET_APPLICATION_SPIN_RESPONSE',
    GET_APPLICATION_SPIN_CASCADE_RESPONSE = '@@application/GET_APPLICATION_SPIN_CASCADE_RESPONSE',
    GET_APPLICATION_FREE_SPIN_RESPONSE = '@@application/GET_APPLICATION_FREE_SPIN_RESPONSE',
    GET_APPLICATION_HISTORY_RESPONSE = '@@application/GET_APPLICATION_HISTORY_RESPONSE',
    GET_APPLICATION_SPECIFIC_HISTORY_RESPONSE = '@@application/GET_APPLICATION_SPECIFIC_HISTORY_RESPONSE',
    GET_APPLICATION_BONUS_RESPONSE = '@@application/GET_APPLICATION_BONUS_RESPONSE',
    GET_APPLICATION_BONUS_RESPONSE_FOR_COLOR = '@@application/GET_APPLICATION_BONUS_RESPONSE_FOR_COLOR',
    GET_APPLICATION_SPIN_SUCCESS = '@@application/GET_APPLICATION_SPIN_SUCCESS',
    GET_APPLICATION_CASCADE_SUCCESS = '@@application/GET_APPLICATION_CASCADE_SUCCESS',
    GET_APPLICATION_HISTORY_SUCCESS = '@@application/GET_APPLICATION_HISTORY_SUCCESS',
    GET_APPLICATION_SPECIFIC_HISTORY_SUCCESS = '@@application/GET_APPLICATION_SPECIFIC_HISTORY_SUCCESS',
    GET_APPLICATION_SPIN_FAILURE = '@@application/GET_APPLICATION_SPIN_FAILURE',
}

export function reducer(
    state: IApplicationState = initialState,
    action: any,
): IApplicationState {
    const { result_spin, bet, error } = action;
    switch (action.type) {
        case actionTypes.GET_APPLICATION_SPIN_RESPONSE:
            return { ...state, isRequestSent: true };
        case actionTypes.GET_APPLICATION_SPIN_FAILURE:
            let error_disconnection =
            {
                "data": {
                    "response": {
                        "errorcode": -500,
                        "errordesc": ""
                    }
                }

            }

            return { ...state, error, isResponseReceived: false, isRequestSent: false, result: error_disconnection };
        case actionTypes.GET_APPLICATION_SPIN_SUCCESS:

            return { ...state, result: result_spin, isResponseReceived: true, isRequestSent: false };

        case actionTypes.GET_APPLICATION_CASCADE_SUCCESS:

            return { ...state, result: result_spin, isResponseReceived: true, isRequestSent: false };
        case actionTypes.GET_APPLICATION_HISTORY_SUCCESS:

            return { ...state, allhistoryresult: result_spin };
        default:
            return state;
    }
}

export const actions = {
    getApplicationSpinResponse: (): any => ({ type: actionTypes.GET_APPLICATION_SPIN_RESPONSE }),
    getApplicationSpinCascadeResponse: (): any => ({ type: actionTypes.GET_APPLICATION_SPIN_CASCADE_RESPONSE }),
    getApplicationFreeSpinResponse: (): any => ({ type: actionTypes.GET_APPLICATION_FREE_SPIN_RESPONSE }),
    getApplicationHistoryResponse: (): any => ({ type: actionTypes.GET_APPLICATION_HISTORY_RESPONSE }),
    getApplicationSpecificHistoryResponse: (): any => ({ type: actionTypes.GET_APPLICATION_SPECIFIC_HISTORY_RESPONSE }),
    getApplicationBonusResponse: (): any => ({ type: actionTypes.GET_APPLICATION_BONUS_RESPONSE }),
    getApplicationBonusResponseForColor: (): any => ({ type: actionTypes.GET_APPLICATION_BONUS_RESPONSE_FOR_COLOR }),
};