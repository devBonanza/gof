export interface IApplicationState {
    phases: any,
    currentIndex: number,
    currentPhase: string,
    cleanPhase: boolean,
    callFlowManager: boolean,
}

const initialState: IApplicationState = {
    phases: ["pre", "peri", "post", "off"],//respect to reel spining
    currentIndex: -1,
    currentPhase: "",
    cleanPhase: false,
    callFlowManager: false,
};

export enum actionTypes {
    RESET_PHASE = '@@flowmanager/RESET_PHASE',
    CHANGE_PHASE = '@@flowmanager/CHANGE_PHASE',
    JUMP_PHASE = '@@flowmanager/JUMP_PHASE',
    CALL_FLOW_MANAGER = '@@flowManager/CALL_FLOW_MANAGER',
}

export function reducer(
    state: IApplicationState = initialState,
    action: any,
): IApplicationState {
    const { currentIndex, phases, currentPhase } = state
    const { phaseName,callFlowManager } = action
    switch (action.type) {
        case actionTypes.CHANGE_PHASE:
            if (currentPhase == "off") {
                return state;
            }
            return { ...state, currentIndex: currentIndex + 1, currentPhase: phases[currentIndex + 1], cleanPhase: false };
        case actionTypes.JUMP_PHASE:
            return { ...state, currentIndex: phases.indexOf(phaseName), currentPhase: phaseName, cleanPhase: false };
        case actionTypes.RESET_PHASE:
            return {
                ...state,
                currentIndex: -1,
                currentPhase: "",
                cleanPhase: true
            };
        case actionTypes.CALL_FLOW_MANAGER:
            return {
                ...state,
                callFlowManager:callFlowManager
            };
        default:
            return state;
    }
}

export const actions = {
    changePhase: (): any => ({ type: actionTypes.CHANGE_PHASE }),
    resetPhase: (): any => ({ type: actionTypes.RESET_PHASE }),
    jumpPhase: (phaseName: string): any => ({ type: actionTypes.JUMP_PHASE, phaseName }),
    flowManagerCalled: (callFlowManager: boolean): any => ({type: actionTypes.CALL_FLOW_MANAGER, callFlowManager}),
};
