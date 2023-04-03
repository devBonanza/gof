import { combineReducers, Reducer } from 'redux';
import { IStore } from '../store/IStore';
import { reducer as asyncInitReducer } from './asyncInitAction';
import { reducer as asyncServerReducer } from './asyncServerResponseReducer';
import { reducer as buttonPanelReducer } from './buttonPanelReducer';
import { reducer as applicationReducer } from './applicationStateReducer';
import { reducer as layoutsReducer } from './layoutsStateReducer';
import { reducer as basegamereducer } from './baseGameReducer';
import { reducer as freegamereducer } from './freeGameReducer';
import { reducer as bonusreducer } from './bonusReducer';
import { reducer as reelsreducer } from './reelsStateReducer';
import { reducer as reelgridreducer } from './reelgridStateReducer';
import { reducer as gridsreducer } from './gridStateReducer';
import { reducer as symbolreducer } from './symbolStateReducer';
import { reducer as winpresentationreducer } from './winPresentationReducer';
import { reducer as paytablereducer } from './paytableReducer';
import { reducer as helpreducer } from './helpreducer';
import { reducer as historyreducer } from './historyreducer';
import { reducer as betpanelreducer } from './betPanelReducer';
import { reducer as autoplayReducer } from './autoplayReducer';
import { reducer as menuReducer } from './menuReducer';
import { reducer as soundreducer } from './soundReducer';
import { reducer as desktopSettingPanelReducer } from "./desktopSettingPanelReducer";
import { reducer as currencyManagerReducer } from './currencymanagerReducer';
import { reducer as playerMessageReducer } from './playerMessageReducer';
import { reducer as keyboardListenerReducer } from './keyboardListenerReducer';
import { reducer as transitionLayerReducer } from './transitionLayerReducer';
import { reducer as flowManagerReducer } from './flowManagerReducer';
import { reducer as landingSymbolReducer } from './landingsymbolreducer';
import { reducer as overlaySymbolReducer } from './overlayreducer';
import { reducer as introductionScreenReducer } from './introductionScreenReducer';

const rootReducerData = {
    asyncInitAction: asyncInitReducer,
    asyncServerAction: asyncServerReducer,
    applicationState: applicationReducer,
    layoutsState: layoutsReducer,
    reelsState: reelsreducer,
    reelgridState: reelgridreducer,
    gridsState: gridsreducer,
    basegameState: basegamereducer,
    autoplayState: autoplayReducer,
    buttonPanelState: buttonPanelReducer,
    freegameState: freegamereducer,
    bonusState: bonusreducer,
    menuState: menuReducer,
    symbolState: symbolreducer,
    winpresentationState: winpresentationreducer,
    paytableState: paytablereducer,
    betPanelState: betpanelreducer,
    helpState: helpreducer,
    historyState: historyreducer,
    soundState: soundreducer,
    desktopSettingPanelState: desktopSettingPanelReducer,
    currencyManagerState: currencyManagerReducer,
    playerMessageState: playerMessageReducer,
    keyboardListenerState: keyboardListenerReducer,
    transitionLayerState: transitionLayerReducer,
    flowManagerState: flowManagerReducer,
    landingState: landingSymbolReducer,
    overlaySymbolState: overlaySymbolReducer,
    introductionScreenState: introductionScreenReducer,


}

const combineReducerData = { ...rootReducerData }
const rootReducer: Reducer<IStore> = combineReducers<IStore>(combineReducerData);

export default rootReducer;
