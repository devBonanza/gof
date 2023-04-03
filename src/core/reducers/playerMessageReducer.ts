export interface IApplicationState {
    selectContainer: string;
    startInterval: boolean;
    pauseInterval: boolean;
    resumeInterval: boolean;
    leftMessageIndex: number;
    rightMessageIndex: number;
    leftContainerIntervalTime: number;
    rightContainerIntervalTime: number;
}

const initialState: IApplicationState = {
    selectContainer: 'left',
    startInterval: false,
    pauseInterval: false,
    resumeInterval: false,
    leftMessageIndex: 0,
    rightMessageIndex: 0,
    leftContainerIntervalTime: 4000,
    rightContainerIntervalTime: 2000
};

export enum actionTypes {
    SELECTCONTAINER = '@@playerMessage/SELECTCONTAINER',
    STARTINTERVAL = '@@playerMessage/STARTINTERVAL',
    PAUSEINTERVAL = '@@playerMessage/PAUSEINTERVAL',
    RESUMEINTERVAL = '@@playerMessage/RESUMEINTERVAL',
}

export function reducer(
    state: IApplicationState = initialState,
    action: any,
): IApplicationState {
    const {selectContainer, startInterval, pauseInterval, resumeInterval, leftMessageIndex, rightMessageIndex} = action;
    switch (action.type) {
        case actionTypes.STARTINTERVAL:
            return {
                ...state,
                startInterval: startInterval, leftMessageIndex, rightMessageIndex, selectContainer
            };
        case actionTypes.PAUSEINTERVAL:
            return {
                ...state,
                pauseInterval: pauseInterval, leftMessageIndex, rightMessageIndex, selectContainer
            };
        case actionTypes.RESUMEINTERVAL:
            return {
                ...state,
                resumeInterval: resumeInterval, leftMessageIndex, rightMessageIndex, selectContainer
            };
        default:
            return state;
    }
}

export const actions = {
    startTheInterval: (startInterval: boolean, leftMessageIndex: number, rightMessageIndex: number, selectContainer: string): any => ({
        type: actionTypes.STARTINTERVAL,
        startInterval,
        leftMessageIndex,
        rightMessageIndex,
        selectContainer
    }),
    pauseTheInterval: (pauseInterval: boolean, leftMessageIndex: number, rightMessageIndex: number, selectContainer: string): any => ({
        type: actionTypes.PAUSEINTERVAL,
        pauseInterval,
        leftMessageIndex,
        rightMessageIndex,
        selectContainer
    }),
    resumeTheInterval: (resumeInterval: boolean, leftMessageIndex: number, rightMessageIndex: number, selectContainer: string): any => ({
        type: actionTypes.RESUMEINTERVAL,
        resumeInterval,
        leftMessageIndex,
        rightMessageIndex,
        selectContainer
    }),

};
