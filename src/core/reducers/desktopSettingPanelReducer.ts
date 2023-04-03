export interface IApplicationState {

    showSettingPanel: boolean;
}

const initialState: IApplicationState = {
    showSettingPanel: false,
};

export enum actionTypes {

    SHOW_SETTING_PANEL = '@@desktopSettingPanel/SHOW_SETTING_PANEL',

}

export function reducer(
    state: IApplicationState = initialState,
    action: any,
): IApplicationState {
    const {showSettingPanel} = action;

    switch (action.type) {
        case actionTypes.SHOW_SETTING_PANEL:
            return {
                ...state, showSettingPanel: showSettingPanel,
            };
        default:
            return state;
    }
}

export const actions = {
    showDesktopSettingPanelUI: (showSettingPanel: boolean): any => ({
        type: actionTypes.SHOW_SETTING_PANEL,
        showSettingPanel
    }),


};



