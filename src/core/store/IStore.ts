import { IApplicationState } from '../reducers/applicationStateReducer';
import { ILayoutsState } from '../reducers/layoutsStateReducer';
import { IApplicationState as IBasegameState } from '../reducers/baseGameReducer'
import { IApplicationState as IFreegameState } from '../reducers/freeGameReducer'
import { IApplicationState as IbonusState } from '../reducers/bonusReducer'
import { IApplicationState as IAutoplayState } from '../reducers/autoplayReducer'
import { IApplicationState as IAsyncInitAction } from '../reducers/asyncInitAction'
import { IApplicationState as IAsyncServerAction } from '../reducers/asyncServerResponseReducer'
import { IApplicationState as IButtonPanelState } from '../reducers/buttonPanelReducer'
import { IApplicationState as IReelsReducer } from '../reducers/reelsStateReducer'
import { IApplicationState as IReelGridReducer, reducer as reelgridreducer } from '../reducers/reelgridStateReducer'
import { IApplicationState as IGridsReducer } from '../reducers/gridStateReducer'
import { IApplicationState as ISymbolReducer } from '../reducers/symbolStateReducer'
import { IApplicationState as IwinPresentationReducer } from '../reducers/winPresentationReducer'
import { IApplicationState as IpaytableReducer } from '../reducers/paytableReducer'
import { IApplicationState as IcurrencyManagerReducer } from '../reducers/currencymanagerReducer'
import { IApplicationState as IplayerMessageReducer } from '../reducers/playerMessageReducer'
import { IApplicationState as IhistoryReducer } from '../reducers/historyreducer'
import { IApplicationState as IhelpReducer } from '../reducers/helpreducer'
import { IApplicationState as IbetpanelReducer } from '../reducers/betPanelReducer'
import { IApplicationState as IsoundReducer } from '../reducers/soundReducer'
import { IApplicationState as IMenuReducer } from '../reducers/menuReducer'
import { IApplicationState as IkeyboardListenerReducer } from '../reducers/keyboardListenerReducer'
import { IApplicationState as ItransitionLayerReducer } from '../reducers/transitionLayerReducer';
import { IApplicationState as IFlowManagerReducer } from '../reducers/flowManagerReducer';
import { IApplicationState as ILandingSymbolReducer } from '../reducers/landingsymbolreducer';
import { IApplicationState as IoverlaySymbolReducer } from '../reducers/overlayreducer';
import { IApplicationState as IintroductionScreenReducer } from '../reducers/introductionScreenReducer';

import {
    IApplicationState as desktopSettingPanelReducer
} from '../reducers/desktopSettingPanelReducer'

export interface IStore {
    applicationState: IApplicationState;
    layoutsState: ILayoutsState;
    menuState: IMenuReducer,
    basegameState: IBasegameState,
    freegameState: IFreegameState,
    bonusState: IbonusState,
    autoplayState: IAutoplayState,
    asyncInitAction: IAsyncInitAction,
    asyncServerAction: IAsyncServerAction,
    buttonPanelState: IButtonPanelState,
    reelsState: IReelsReducer,
    reelgridState: IReelGridReducer,
    gridsState: IGridsReducer,
    symbolState: ISymbolReducer,
    winpresentationState: IwinPresentationReducer,
    paytableState: IpaytableReducer,
    historyState: IhistoryReducer,
    helpState: IhelpReducer,
    betPanelState: IbetpanelReducer,
    soundState: IsoundReducer,
    desktopSettingPanelState: desktopSettingPanelReducer,
    currencyManagerState: IcurrencyManagerReducer,
    playerMessageState: IplayerMessageReducer,
    keyboardListenerState: IkeyboardListenerReducer,
    transitionLayerState: ItransitionLayerReducer,
    flowManagerState: IFlowManagerReducer,
    landingState: ILandingSymbolReducer,
    overlaySymbolState: IoverlaySymbolReducer,
    introductionScreenState: IintroductionScreenReducer,

}
