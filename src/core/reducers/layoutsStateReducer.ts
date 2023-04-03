export interface ILayoutsState {
    layoutObjName: any;
}

const initialState: ILayoutsState = {
    layoutObjName: "",
};

export enum actionTypes {
    SET_APPLICATION_LAYOUT_OBJECT = '@@display/SET_APPLICATION_LAYOUT_OBJECT',
    CLEAR_APPLICATION_LAYOUT_OBJECT = '@@display/CLEAR_APPLICATION_LAYOUT_OBJECT',
}

export function reducer(
    state: ILayoutsState = initialState,
    action: any,
): ILayoutsState {
    const { layoutobjectName } = action;
    switch (action.type) {
        case actionTypes.SET_APPLICATION_LAYOUT_OBJECT:
            return {
                ...state, layoutObjName: [...state.layoutObjName, layoutobjectName],
            };
        case actionTypes.CLEAR_APPLICATION_LAYOUT_OBJECT:
            return {
                ...state, layoutObjName: [],
            };
        default:
            return state;
    }
}

export const actions = {
    setApplicationLayoutObject: (layoutobjectName: any): any => ({ type: actionTypes.SET_APPLICATION_LAYOUT_OBJECT, layoutobjectName }),
    clearApplicationLayoutObject: (): any => ({ type: actionTypes.CLEAR_APPLICATION_LAYOUT_OBJECT }),
};
