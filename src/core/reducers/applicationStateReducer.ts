export interface IApplicationState {
    isLoading: boolean;
    gamePause: boolean;
    buttonPanelVisibility: boolean;
    layoutMode: string;
    handMode: string;
    resizeWidth: number;
    resizeHeight: number;
    scaleX: number;
    scaleY: number;
    decreaseBet: boolean;
    increaseBet: boolean;
    maxBet: boolean;
    showPaytable: boolean;
    spin: boolean;
    autoPlayLossLimitEnabled: boolean;
    debugEnabled: boolean;
    autoPlaySingleWinLimitPercentage: number;
    currencySymbolPrintedBefore: boolean;
    autoPlaySpinStartValue: number;
    showSlotSessionStatistics: boolean;
    minimumGameDurationMs: number;
    maxWinMultiplier: number;
    autoPlayExpertMode: boolean;
    autoPlaySpinSteps: object;
    autoPlaySimpleMode: boolean;
    locale: string;
    autoPlaySpinResetToStartValue: boolean;
    responsibleGamingUrl: string;
    autoPlayWinLimitPercentage: number;
    showResponsibleGamingIcon: boolean;
    autoPlayFreeGamesAutoStart: boolean;
    autoPlayLossLimitPercentage: number;
    currencySymbol: string;
    responsibleGamingIconPath: string;
    autoPlayAbortOnFreeGameWinEnabled: boolean;
    requestCommand: boolean;
    //end
    currencyAdditionalMultiplier: number;
    autoPlayLossLimitMandatory: boolean;
    autoPlaySingleWinLimitEnabled: boolean;
    autoPlaySingleWinLimitMandatory: boolean;
    autoPlayWinLimitEnabled: boolean;
    autoPlayWinLimitMandatory: boolean;
    cheatingEnabled: boolean;
    countryCode: string;
    currencyCode: string;
    currencyDecimalSeparator: string;
    currencyGroupingSeparator: string;
    currencyIgnoreDecimals: boolean;
    disableQuickSpin: boolean;
    disableQuickStop: boolean;
    enableAutoPlay: boolean;
    enableRiskCard: boolean;
    enableRiskLadder: boolean;
    historyUrl: string;
    homeUrl: string;
    languageCode: string;
    realityCheckTimePassedInSeconds: number;
    realityCheckTimeoutInSeconds: number;
    sessionTimeoutInSeconds: number;
    showCloseButton: boolean;
    showFullScreenButton: boolean;
    showHelpButton: boolean;
    showHelpText: boolean;
    showRTP: boolean;
    showSettingsControl: boolean;
    showTime: boolean;
    showVolumeControl: boolean;
    balance: number,
    previousbalance: number,
    roundId: number,
    error: string,
    jackpot: number,
    showTopWinOdds: boolean,
    suppressCelebrationForWinsBelowStake: boolean,
    isGameSettingFirstTime: boolean,
    jurisdictionKey: string,
    isSoundPrint: boolean,
    soundOnOff: boolean,
    gameVersion: string,
}

const initialState: IApplicationState = {
    gamePause: false,
    isLoading: false,
    buttonPanelVisibility: false,
    layoutMode: '',
    handMode: 'right',
    resizeWidth: 0,
    resizeHeight: 0,
    scaleX: 1,
    scaleY: 1,
    decreaseBet: false,
    increaseBet: false,
    maxBet: false,
    showPaytable: false,
    spin: false,
    currencyAdditionalMultiplier: 0,
    autoPlayLossLimitEnabled: false,
    debugEnabled: false,
    autoPlayLossLimitMandatory: false,
    autoPlaySingleWinLimitEnabled: false,
    autoPlaySingleWinLimitMandatory: false,
    autoPlayWinLimitEnabled: false,
    autoPlayWinLimitMandatory: false,
    cheatingEnabled: false,
    countryCode: "",
    currencyCode: "",
    currencyDecimalSeparator: "",
    currencyGroupingSeparator: "",
    currencyIgnoreDecimals: false,
    disableQuickSpin: false,
    disableQuickStop: false,
    enableAutoPlay: false,
    enableRiskCard: false,
    enableRiskLadder: false,
    autoPlaySingleWinLimitPercentage: 0,
    currencySymbolPrintedBefore: false,
    autoPlaySpinStartValue: 0,
    showSlotSessionStatistics: false,
    minimumGameDurationMs: 1000,
    maxWinMultiplier: 0,
    autoPlayExpertMode: false,
    autoPlaySpinSteps: [],
    autoPlaySimpleMode: false,
    locale: "",
    autoPlaySpinResetToStartValue: false,
    responsibleGamingUrl: "",
    autoPlayWinLimitPercentage: 0,
    showResponsibleGamingIcon: false,
    autoPlayFreeGamesAutoStart: false,
    autoPlayLossLimitPercentage: 0,
    currencySymbol: "",
    responsibleGamingIconPath: "",
    autoPlayAbortOnFreeGameWinEnabled: false,
    requestCommand: false,
    historyUrl: "",
    homeUrl: "",
    languageCode: "",
    realityCheckTimePassedInSeconds: 0,
    realityCheckTimeoutInSeconds: 0,
    sessionTimeoutInSeconds: 0,
    showCloseButton: false,
    showFullScreenButton: false,
    showHelpButton: false,
    showHelpText: false,
    showRTP: false,
    showSettingsControl: false,
    showTime: false,
    showVolumeControl: false,
    balance: 0,
    previousbalance: 0,
    roundId: 0,
    error: "",
    jackpot: 0,
    showTopWinOdds: false,
    suppressCelebrationForWinsBelowStake: false,
    isGameSettingFirstTime: false,
    jurisdictionKey: "",
    isSoundPrint: false,
    soundOnOff: false,
    gameVersion: "v0.0.1"
};

export enum actionTypes {

    SET_APPLICATION_PAUSE = '@@application/SET_APPLICATION_PAUSE',
    SET_APPLICATION_RESIZE_STATE = '@@application/SET_APPLICATION_RESIZE_STATE',
    SET_APPLICATION_LAYOUT_MODE = '@@application/SET_APPLICATION_LAYOUT_MODE',
    SET_APPLICATION_HAND_MODE = '@@application/SET_APPLICATION_HAND_MODE',
    SET_APPLICATION_BUTTONPANEL_VISIBILITY = '@@application/SET_APPLICATION_BUTTONPANEL_VISIBILITY',
    SET_APPLICATION_LOADING = '@@application/SET_APPLICATION_LOADING',
    GET_APPLICATION_LOADING = '@@application/GET_APPLICATION_LOADING',
    SET_APPLICATION_DECREASE_BET = '@@application/ SET_APPLICATION_DECREASE_BET',
    SET_APPLICATION_INCREASE_BET = '@@application/ SET_APPLICATION_INCREASE_BET',
    SET_APPLICATION_MAX_BET = '@@application/ SET_APPLICATION_MAX_BET',
    SET_APPLICATION_SHOW_PAYTABLE = '@@application/ SET_APPLICATION_SHOW_PAYTABLE',
    SET_APPLICATION_SPIN = '@@application/ SET_APPLICATION_SPIN',
    SET_APPLICATION_DEBUG_ENABLE = '@@application/ SET_APPLICATION_DEBUG_ENABLE',
    SET_APPLICATION_AUTOPLAY_LOSS_LIMIT_ENABLED = '@@application/ SET_APPLICATION_AUTOPLAY_LOSS_LIMIT_ENABLED',
    SET_CURRENCY_ADDITIONAL_MULTIPLIER = '@@application/ SET_CURRENCY_ADDITIONAL_MULTIPLIER',
    SET_APPLICATION_AUTOPLAY_LOSS_LIMIT_MANDATORY = '@@application/ SET_APPLICATION_AUTOPLAY_LOSS_LIMIT_MANDATORY',
    SET_APPLICATION_AUTOPLAY_SINGLE_WIN_LIMIT_ENABLED = '@@application/ SET_APPLICATION_AUTOPLAY_SINGLE_WIN_LIMIT_ENABLED',
    SET_APPLICATION_AUTOPLAY_SINGLE_WIN_LIMIT_MANDATORY = '@@application/ SET_APPLICATION_AUTOPLAY_SINGLE_WIN_LIMIT_MANDATORY',
    SET_APPLICATION_AUTOPLAY_WIN_LIMIT_ENABLED = '@@application/ SET_APPLICATION_AUTOPLAY_WIN_LIMIT_ENABLED',
    SET_APPLICATION_AUTOPLAY_WIN_LIMIT_MANDATORY = '@@application/ SET_APPLICATION_AUTOPLAY_WIN_LIMIT_MANDATORY',
    SET_APPLICATION_CHEATING_ENABLED = '@@application/ SET_APPLICATION_CHEATING_ENABLED',
    SET_APPLICATION_COUNTRY_CODE = '@@application/ SET_APPLICATION_COUNTRY_CODE',
    SET_APPLICATION_CURRENCY_CODE = '@@application/ SET_APPLICATION_CURRENCY_CODE',
    SET_APPLICATION_CURRENCY_DECIMAL_SEPARATOR = '@@application/ SET_APPLICATION_CURRENCY_DECIMAL_SEPARATOR',
    SET_APPLICATION_CURRENCY_GROUPING_SEPARATOR = '@@application/ SET_APPLICATION_CURRENCY_GROUPING_SEPARATOR',
    SET_APPLICATION_CURRENCY_IGNORE_DECIMALS = '@@application/ SET_APPLICATION_CURRENCY_IGNORE_DECIMALS',
    SET_APPLICATION_DISABLE_QUICK_SPIN = '@@application/ SET_APPLICATION_DISABLE_QUICK_SPIN',
    SET_APPLICATION_DISABLE_QUICK_STOP = '@@application/ SET_APPLICATION_DISABLE_QUICK_STOP',
    SET_APPLICATION_ENABLE_AUTOPLAY = '@@application/ SET_APPLICATION_ENABLE_AUTOPLAY',
    SET_APPLICATION_ENABLE_RISK_CARD = '@@application/ SET_APPLICATION_ENABLE_RISK_CARD',
    SET_APPLICATION_ENABLE_RISK_LADDER = '@@application/ SET_APPLICATION_ENABLE_RISK_LADDER',
    SET_APPLICATION_HISTORY_URL = '@@application/ SET_APPLICATION_HISTORY_URL',
    SET_APPLICATION_HOME_URL = '@@application/ SET_APPLICATION_HOME_URL',
    SET_APPLICATION_LANGUAGE_CODE = '@@application/ SET_APPLICATION_LANGUAGE_CODE',
    SET_APPLICATION_REALITY_CHECK_TIME_PASSED_IN_SECONDS = '@@application/ SET_APPLICATION_REALITY_CHECK_TIME_PASSED_IN_SECONDS',
    SET_APPLICATION_REALITY_CHECK_TIMEOUT_IN_SECONDS = '@@application/ SET_APPLICATION_REALITY_CHECK_TIMEOUT_IN_SECONDS',
    SET_APPLICATION_SESSION_TIMEOUT_IN_SECONDS = '@@application/ SET_APPLICATION_SESSION_TIMEOUT_IN_SECONDS',
    SET_APPLICATION_SHOW_CLOSE_BUTTON = '@@application/ SET_APPLICATION_SHOW_CLOSE_BUTTON',
    SET_APPLICATION_SHOW_FULL_SCREEN_BUTTON = '@@application/ SET_APPLICATION_SHOW_FULL_SCREEN_BUTTON',
    SET_APPLICATION_SHOW_HELP_BUTTON = '@@application/ SET_APPLICATION_SHOW_HELP_BUTTON',
    SET_APPLICATION_SHOW_RTP = '@@application/ SET_APPLICATION_SHOW_RTP',
    SET_APPLICATION_SHOW_SETTINGS_CONTROL = '@@application/ SET_APPLICATION_SHOW_SETTINGS_CONTROL',
    SET_APPLICATION_SHOW_TIME = '@@application/ SET_APPLICATION_SHOW_TIME',
    SET_APPLICATION_SHOW_VOLUME_CONTROL = '@@application/ SET_APPLICATION_SHOW_VOLUME_CONTROL',
    SET_APPLICATION_SHOW_HELP_TEXT = '@@application/ SET_APPLICATION_SHOW_HELP_TEXT',
    SET_APPLICATION_BALANCE = '@@application/SET_APPLICATION_BALANCE',
    SET_APPLICATION_PREVIOUS_BALANCE = '@@application/SET_APPLICATION_PREVIOUS_BALANCE',
    SET_APPLICATION_ROUND_ID = '@@application/SET_APPLICATION_ROUND_ID',
    SET_APPLICATION_ERROR = '@@application/SET_APPLICATION_ERROR',
    SET_APPLICATION_JACKPOT = '@@application/SET_APPLICATION_JACKPOT',
    SET_TOP_WIN_ODDS = '@@application/SET_TOP_WIN_ODDS',
    SET_APPLICATION_AUTOPLAY_SINGLE_WIN_LIMIT_PERCENTAGE = '@@application/SET_APPLICATION_AUTOPLAY_SINGLE_WIN_LIMIT_PERCENTAGE',
    SET_APPLICATION_AUTOPLAY_SPIN_START_VALUE = '@@application/SET_APPLICATION_AUTOPLAY_SPIN_START_VALUE',
    SET_APPLICATION_SHOW_SLOT_SESSION_STATISTICS = '@@application/SET_APPLICATION_SHOW_SLOT_SESSION_STATISTICS',
    SET_APPLICATION_MINIMUM_GAME_DURATION_MS = '@@application/SET_APPLICATION_MINIMUM_GAME_DURATION_MS',
    SET_APPLICATION_MAX_WIN_MULTIPLIER = '@@application/SET_APPLICATION_MAX_WIN_MULTIPLIER',
    SET_APPLICATION_AUTO_PLAY_EXPERT_MODE = '@@application/SET_APPLICATION_AUTO_PLAY_EXPERT_MODE',
    SET_APPLICATION_AUTO_PLAY_SPIN_STEPS = '@@application/SET_APPLICATION_AUTO_PLAY_SPIN_STEPS',
    SET_APPLICATION_AUTO_PLAY_SIMPLE_MODE = '@@application/SET_APPLICATION_AUTO_PLAY_SIMPLE_MODE',
    SET_APPLICATION_LOCALE = '@@application/SET_APPLICATION_LOCALE',
    SET_APPLICATION_AUTOPLAY_SPIN_RESET_TO_STARTVALUE = '@@application/SET_APPLICATION_AUTOPLAY_SPIN_RESET_TO_STARTVALUE',
    SET_APPLICATION_RESPONSIBLE_GAME_URL = '@@application/SET_APPLICATION_RESPONSIBLE_GAME_URL',
    SET_APPLICATION_AUTOPLAY_WIN_LIMIT_PERCENTAGE = '@@application/SET_APPLICATION_AUTOPLAY_WIN_LIMIT_PERCENTAGE',
    SET_APPLICATION_SHOW_RESPONSIBLE_GAMING_ICON = '@@application/SET_APPLICATION_SHOW_RESPONSIBLE_GAMING_ICON',
    SET_APPLICATION_AUTOPLAY_FREEGAME_AUTOSTART = '@@application/SET_APPLICATION_AUTOPLAY_FREEGAME_AUTOSTART',
    SET_APPLICATION_AUTOPLAY_LOSSLIMIT_PERCENTAGE = '@@application/SET_APPLICATION_AUTOPLAY_LOSSLIMIT_PERCENTAGE',
    SET_APPLICATION_RESPOSIBLE_GAMING_ICONPATH = '@@application/SET_APPLICATION_RESPOSIBLE_GAMING_ICONPATH',
    SET_APPLICATION_AUTOPLAY_ABORTON_FREEGAME_WINENDABLED = '@@application/SET_APPLICATION_AUTOPLAY_ABORTON_FREEGAME_WINENDABLED',
    SET_APPLICATION_REQUEST_COMMAND = '@@application/SET_APPLICATION_REQUEST_COMMAND',
    SET_APPLICATION_CURRENCY_SYMBOL = '@@application/SET_APPLICATION_CURRENCY_SYMBOL',
    SET_APPLICATION_CURRENCY_SYMBOL_PRINTED_BEFOR = '@@application/SET_APPLICATION_CURRENCY_SYMBOL_PRINTED_BEFOR',
    SET_SUPPRESS_CELEBRATION_FOR_WINS_BELOW_STAKE = '@@application/SET_SUPPRESS_CELEBRATION_FOR_WINS_BELOW_STAKE',
    SET_GAME_SETTING_FIRSTTIME = '@@application/SET_GAME_SETTING_FIRSTTIME',
    SET_APPLICATION_JURISDICTION_KEY = '@@application/SET_APPLICATION_JURISDICTION_KEY',
    SET_SOUND_PRINT = '@@application/SET_SOUND_PRINT',
    SET_SOUND_ONOFF = '@@application/SET_SOUND_ONOFF',
    SET_GAME_VERSION = '@@application/SET_GAME_VERSION',
}

export function reducer(
    state: IApplicationState = initialState,
    action: any,
): IApplicationState {
    const {
        isLoading,
        layout,
        resizewidth,
        resizeheight,
        scalex,
        scaley,
        decreaseBet,
        increaseBet,
        maxBet,
        showPaytable,
        spin,
        autoPlayLossLimitEnabled,
        debugEnabled,
        currencyAdditionalMultiplier,
        autoPlayLossLimitMandatory,
        autoPlaySingleWinLimitEnabled,
        autoPlaySingleWinLimitMandatory,
        autoPlayWinLimitEnabled,
        autoPlayWinLimitMandatory,
        cheatingEnabled,
        countryCode,
        currencyCode,
        currencyDecimalSeparator,
        currencyGroupingSeparator,
        currencyIgnoreDecimals,
        disableQuickSpin,
        disableQuickStop,
        enableAutoPlay,
        enableRiskCard,
        enableRiskLadder,
        historyUrl,
        homeUrl,
        languageCode,
        realityCheckTimePassedInSeconds,
        realityCheckTimeoutInSeconds,
        sessionTimeoutInSeconds,
        showCloseButton,
        showFullScreenButton,
        showHelpButton,
        showHelpText,
        showRTP,
        showSettingsControl,
        showTime,
        showVolumeControl,
        jackpot,
        error,
        roundId,
        previousbalance,
        balance,
        visibility,
        handMode,
        pause,
        showTopWinOdds,
        autoPlaySingleWinLimitPercentage,
        currencySymbolPrintedBefore,
        autoPlaySpinStartValue,
        showSlotSessionStatistics,
        minimumGameDurationMs,
        maxWinMultiplier,
        autoPlayExpertMode,
        autoPlaySpinSteps,
        autoPlaySimpleMode,
        locale,
        autoPlaySpinResetToStartValue,
        responsibleGamingUrl,
        autoPlayWinLimitPercentage,
        showResponsibleGamingIcon,
        autoPlayFreeGamesAutoStart,
        autoPlayLossLimitPercentage,
        currencySymbol,
        responsibleGamingIconPath,
        autoPlayAbortOnFreeGameWinEnabled,
        requestCommand,
        suppressCelebrationForWinsBelowStake,
        isGameSettingFirstTime,
        jurisdictionKey,
        isSoundPrint,
        soundOnOff,
        gameVersion,
    } = action;
    switch (action.type) {
        case actionTypes.GET_APPLICATION_LOADING:
            return { ...state };
        case actionTypes.SET_APPLICATION_LOADING:
            return {
                ...state, isLoading: isLoading,
            };
        case actionTypes.SET_APPLICATION_LAYOUT_MODE:
            return {
                ...state, layoutMode: layout,
            };
        case actionTypes.SET_APPLICATION_HAND_MODE:
            return {
                ...state, handMode: handMode,
            };
        case actionTypes.SET_APPLICATION_RESIZE_STATE:
            return {
                ...state,
                resizeWidth: resizewidth,
                resizeHeight: resizeheight,
                scaleX: scalex,
                scaleY: scaley,
            };
        case actionTypes.SET_APPLICATION_DECREASE_BET:
            return {
                ...state, decreaseBet: decreaseBet,
            };
        case actionTypes.SET_APPLICATION_SHOW_HELP_TEXT:
            return {
                ...state, showHelpText: showHelpText,
            };
        case actionTypes.SET_APPLICATION_INCREASE_BET:
            return {
                ...state, increaseBet: increaseBet,
            };
        case actionTypes.SET_APPLICATION_MAX_BET:
            return {
                ...state, maxBet: maxBet,
            };
        case actionTypes.SET_APPLICATION_SHOW_PAYTABLE:
            return {
                ...state, showPaytable: showPaytable,
            };
        case actionTypes.SET_APPLICATION_SPIN:
            return {
                ...state, spin: spin,
            };
        case actionTypes.SET_APPLICATION_DEBUG_ENABLE:
            return {
                ...state, debugEnabled: debugEnabled,
            };
        case actionTypes.SET_APPLICATION_AUTOPLAY_LOSS_LIMIT_ENABLED:
            return {
                ...state, autoPlayLossLimitEnabled: autoPlayLossLimitEnabled,
            };
        case actionTypes.SET_CURRENCY_ADDITIONAL_MULTIPLIER:
            return {
                ...state, currencyAdditionalMultiplier: currencyAdditionalMultiplier,
            };
        case actionTypes.SET_APPLICATION_AUTOPLAY_LOSS_LIMIT_MANDATORY:
            return {
                ...state, autoPlayLossLimitMandatory: autoPlayLossLimitMandatory,
            };
        case actionTypes.SET_APPLICATION_AUTOPLAY_SINGLE_WIN_LIMIT_ENABLED:
            return {
                ...state, autoPlaySingleWinLimitEnabled: autoPlaySingleWinLimitEnabled,
            };
        case actionTypes.SET_APPLICATION_AUTOPLAY_SINGLE_WIN_LIMIT_MANDATORY:
            return {
                ...state, autoPlaySingleWinLimitMandatory: autoPlaySingleWinLimitMandatory,
            };
        case actionTypes.SET_APPLICATION_AUTOPLAY_WIN_LIMIT_ENABLED:
            return {
                ...state, autoPlayWinLimitEnabled: autoPlayWinLimitEnabled,
            };
        case actionTypes.SET_APPLICATION_AUTOPLAY_WIN_LIMIT_MANDATORY:
            return {
                ...state, autoPlayWinLimitMandatory: autoPlayWinLimitMandatory,
            };
        case actionTypes.SET_APPLICATION_CHEATING_ENABLED:
            return {
                ...state, cheatingEnabled: cheatingEnabled,
            };
        case actionTypes.SET_APPLICATION_COUNTRY_CODE:
            return {
                ...state, countryCode: countryCode,
            };
        case actionTypes.SET_APPLICATION_CURRENCY_CODE:
            return {
                ...state, currencyCode: currencyCode,
            };
        case actionTypes.SET_APPLICATION_CURRENCY_DECIMAL_SEPARATOR:
            return {
                ...state, currencyDecimalSeparator: currencyDecimalSeparator,
            };
        case actionTypes.SET_APPLICATION_CURRENCY_GROUPING_SEPARATOR:
            return {
                ...state, currencyGroupingSeparator: currencyGroupingSeparator,
            };
        case actionTypes.SET_APPLICATION_CURRENCY_IGNORE_DECIMALS:
            return {
                ...state, currencyIgnoreDecimals: currencyIgnoreDecimals,
            };
        case actionTypes.SET_APPLICATION_DISABLE_QUICK_SPIN:
            return {
                ...state, disableQuickSpin: disableQuickSpin,
            };
        case actionTypes.SET_APPLICATION_DISABLE_QUICK_STOP:
            return {
                ...state, disableQuickStop: disableQuickStop,
            };
        case actionTypes.SET_APPLICATION_ENABLE_AUTOPLAY:
            return {
                ...state, enableAutoPlay: enableAutoPlay,
            };
        case actionTypes.SET_APPLICATION_ENABLE_RISK_CARD:
            return {
                ...state, enableRiskCard: enableRiskCard,
            };
        case actionTypes.SET_APPLICATION_ENABLE_RISK_LADDER:
            return {
                ...state, enableRiskLadder: enableRiskLadder,
            };
        case actionTypes.SET_APPLICATION_HISTORY_URL:
            return {
                ...state, historyUrl: historyUrl,
            };
        case actionTypes.SET_APPLICATION_HOME_URL:
            return {
                ...state, homeUrl: homeUrl,
            };
        case actionTypes.SET_APPLICATION_BUTTONPANEL_VISIBILITY:
            return {
                ...state, buttonPanelVisibility: visibility,
            };
        case actionTypes.SET_APPLICATION_LANGUAGE_CODE:
            return {
                ...state, languageCode: languageCode,
            };
        case actionTypes.SET_APPLICATION_REALITY_CHECK_TIME_PASSED_IN_SECONDS:
            return {
                ...state, realityCheckTimePassedInSeconds: realityCheckTimePassedInSeconds,
            };
        case actionTypes.SET_APPLICATION_REALITY_CHECK_TIMEOUT_IN_SECONDS:
            return {
                ...state, realityCheckTimeoutInSeconds: realityCheckTimeoutInSeconds,
            };
        case actionTypes.SET_APPLICATION_SESSION_TIMEOUT_IN_SECONDS:
            return {
                ...state, sessionTimeoutInSeconds: sessionTimeoutInSeconds,
            };
        case actionTypes.SET_APPLICATION_SHOW_CLOSE_BUTTON:
            return {
                ...state, showCloseButton: showCloseButton,
            };
        case actionTypes.SET_APPLICATION_SHOW_FULL_SCREEN_BUTTON:
            return {
                ...state, showFullScreenButton: showFullScreenButton,
            };
        case actionTypes.SET_APPLICATION_SHOW_HELP_BUTTON:
            return {
                ...state, showHelpButton: showHelpButton,
            };
        case actionTypes.SET_APPLICATION_SHOW_RTP:
            return {
                ...state, showRTP: showRTP,
            };
        case actionTypes.SET_APPLICATION_SHOW_SETTINGS_CONTROL:
            return {
                ...state, showSettingsControl: showSettingsControl,
            };
        case actionTypes.SET_APPLICATION_SHOW_TIME:
            return {
                ...state, showTime: showTime,
            };
        case actionTypes.SET_APPLICATION_SHOW_VOLUME_CONTROL:
            return {
                ...state, showVolumeControl: showVolumeControl,
            };
        case actionTypes.SET_APPLICATION_BALANCE:
            return {
                ...state, balance: balance,
            };
        case actionTypes.SET_APPLICATION_PREVIOUS_BALANCE:
            return {
                ...state, previousbalance: previousbalance,
            };
        case actionTypes.SET_APPLICATION_ROUND_ID:
            return {
                ...state, roundId: roundId,
            };
        case actionTypes.SET_APPLICATION_ERROR:
            return {
                ...state, error: error,
            };
        case actionTypes.SET_APPLICATION_JACKPOT:
            return {
                ...state, jackpot: jackpot,
            };
        case actionTypes.SET_APPLICATION_PAUSE:
            return {
                ...state, gamePause: pause,
            };
        case actionTypes.SET_TOP_WIN_ODDS:
            return {
                ...state, showTopWinOdds: showTopWinOdds,
            };
        case actionTypes.SET_APPLICATION_AUTOPLAY_SINGLE_WIN_LIMIT_PERCENTAGE:
            return {
                ...state, autoPlaySingleWinLimitPercentage: autoPlaySingleWinLimitPercentage,
            };
        case actionTypes.SET_APPLICATION_AUTOPLAY_SPIN_START_VALUE:
            return {
                ...state, autoPlaySpinStartValue: autoPlaySpinStartValue,
            };
        case actionTypes.SET_APPLICATION_SHOW_SLOT_SESSION_STATISTICS:
            return {
                ...state, showSlotSessionStatistics: showSlotSessionStatistics,
            };
        case actionTypes.SET_APPLICATION_MINIMUM_GAME_DURATION_MS:
            return {
                ...state, minimumGameDurationMs: minimumGameDurationMs,
            };
        case actionTypes.SET_APPLICATION_MAX_WIN_MULTIPLIER:
            return {
                ...state, maxWinMultiplier: maxWinMultiplier,
            };
        case actionTypes.SET_APPLICATION_AUTO_PLAY_EXPERT_MODE:
            return {
                ...state, autoPlayExpertMode: autoPlayExpertMode,
            };
        case actionTypes.SET_APPLICATION_AUTO_PLAY_SPIN_STEPS:
            return {
                ...state, autoPlaySpinSteps: autoPlaySpinSteps,
            };
        case actionTypes.SET_APPLICATION_AUTO_PLAY_SIMPLE_MODE:
            return {
                ...state, autoPlaySimpleMode: autoPlaySimpleMode,
            };
        case actionTypes.SET_APPLICATION_LOCALE:
            return {
                ...state, locale: locale,
            };
        case actionTypes.SET_APPLICATION_AUTOPLAY_SPIN_RESET_TO_STARTVALUE:
            return {
                ...state, autoPlaySpinResetToStartValue: autoPlaySpinResetToStartValue,
            };
        case actionTypes.SET_APPLICATION_RESPONSIBLE_GAME_URL:
            return {
                ...state, responsibleGamingUrl: responsibleGamingUrl,
            };
        case actionTypes.SET_APPLICATION_AUTOPLAY_WIN_LIMIT_PERCENTAGE:
            return {
                ...state, autoPlayWinLimitPercentage: autoPlayWinLimitPercentage,
            };
        case actionTypes.SET_APPLICATION_SHOW_RESPONSIBLE_GAMING_ICON:
            return {
                ...state, showResponsibleGamingIcon: showResponsibleGamingIcon,
            };
        case actionTypes.SET_APPLICATION_AUTOPLAY_FREEGAME_AUTOSTART:
            return {
                ...state, autoPlayFreeGamesAutoStart: autoPlayFreeGamesAutoStart,
            };
        case actionTypes.SET_APPLICATION_AUTOPLAY_LOSSLIMIT_PERCENTAGE:
            return {
                ...state, autoPlayLossLimitPercentage: autoPlayLossLimitPercentage,
            };
        case actionTypes.SET_APPLICATION_RESPOSIBLE_GAMING_ICONPATH:
            return {
                ...state, responsibleGamingIconPath: responsibleGamingIconPath,
            };
        case actionTypes.SET_APPLICATION_AUTOPLAY_ABORTON_FREEGAME_WINENDABLED:
            return {
                ...state, autoPlayAbortOnFreeGameWinEnabled: autoPlayAbortOnFreeGameWinEnabled,
            };
        case actionTypes.SET_APPLICATION_REQUEST_COMMAND:
            return {
                ...state, requestCommand: requestCommand,
            };
        case actionTypes.SET_APPLICATION_CURRENCY_SYMBOL:
            return {
                ...state, currencySymbol: currencySymbol,
            };
        case actionTypes.SET_APPLICATION_CURRENCY_SYMBOL_PRINTED_BEFOR:
            return {
                ...state, currencySymbolPrintedBefore: currencySymbolPrintedBefore,
            };
        case actionTypes.SET_SUPPRESS_CELEBRATION_FOR_WINS_BELOW_STAKE:
            return {
                ...state, suppressCelebrationForWinsBelowStake: suppressCelebrationForWinsBelowStake,
            };
        case actionTypes.SET_GAME_SETTING_FIRSTTIME:
            return {
                ...state, isGameSettingFirstTime: isGameSettingFirstTime,
            };
        case actionTypes.SET_APPLICATION_JURISDICTION_KEY:
            return {
                ...state, jurisdictionKey: jurisdictionKey,
            };
        case actionTypes.SET_SOUND_PRINT:
            return {
                ...state, isSoundPrint: isSoundPrint,
            };
        case actionTypes.SET_SOUND_ONOFF:
            return {
                ...state, soundOnOff: soundOnOff,
            };
        case actionTypes.SET_GAME_VERSION:
            return {
                ...state, gameVersion: gameVersion,
            };
        default:
            return state;
    }
}

export const actions = {
    setApplicationGameVersion: (gameVersion: string): any => ({
        type: actionTypes.SET_GAME_VERSION,
        gameVersion
    }),
    setIsSoundOnOff: (soundOnOff: Boolean): any => ({
        type: actionTypes.SET_SOUND_ONOFF,
        soundOnOff
    }),
    setIsSoundPrint: (isSoundPrint: Boolean): any => ({
        type: actionTypes.SET_SOUND_PRINT,
        isSoundPrint
    }),
    setApplicationJurisdictionKey: (jurisdictionKey: string): any => ({
        type: actionTypes.SET_APPLICATION_JURISDICTION_KEY,
        jurisdictionKey
    }),
   
    setIsGameSettingFirstTime: (isGameSettingFirstTime: Boolean): any => ({
        type: actionTypes.SET_GAME_SETTING_FIRSTTIME,
        isGameSettingFirstTime
    }),
    setSuppressCelebrationForWinsBelowStake: (suppressCelebrationForWinsBelowStake: Boolean): any => ({
        type: actionTypes.SET_SUPPRESS_CELEBRATION_FOR_WINS_BELOW_STAKE,
        suppressCelebrationForWinsBelowStake
    }),
    setApplicationAutoPlaySingleWinLimitPercentage: (autoPlaySingleWinLimitPercentage: number): any => ({
        type: actionTypes.SET_APPLICATION_AUTOPLAY_SINGLE_WIN_LIMIT_PERCENTAGE,
        autoPlaySingleWinLimitPercentage
    }),
    setApplicationAutoPlaySpinStartValue: (autoPlaySpinStartValue: number): any => ({
        type: actionTypes.SET_APPLICATION_AUTOPLAY_SPIN_START_VALUE,
        autoPlaySpinStartValue
    }),
    setApplicationShowSlotSessionStatistics: (showSlotSessionStatistics: boolean): any => ({
        type: actionTypes.SET_APPLICATION_SHOW_SLOT_SESSION_STATISTICS,
        showSlotSessionStatistics
    }),
    setApplicationMinimumGameDurationMs: (minimumGameDurationMs: number): any => ({
        type: actionTypes.SET_APPLICATION_MINIMUM_GAME_DURATION_MS,
        minimumGameDurationMs
    }),
    setApplicationMaxWinMultiplier: (maxWinMultiplier: number): any => ({
        type: actionTypes.SET_APPLICATION_MAX_WIN_MULTIPLIER,
        maxWinMultiplier
    }),
    setApplicationAutoPlayExpertMode: (autoPlayExpertMode: boolean): any => ({
        type: actionTypes.SET_APPLICATION_AUTO_PLAY_EXPERT_MODE,
        autoPlayExpertMode
    }),
    setApplicationAutoPlaySpinSteps: (autoPlaySpinSteps: object): any => ({
        type: actionTypes.SET_APPLICATION_AUTO_PLAY_SPIN_STEPS,
        autoPlaySpinSteps
    }),
    setApplicationAutoPlaySimpleMode: (autoPlaySimpleMode: boolean): any => ({
        type: actionTypes.SET_APPLICATION_AUTO_PLAY_SIMPLE_MODE,
        autoPlaySimpleMode
    }),
    setApplicationLocale: (locale: string): any => ({
        type: actionTypes.SET_APPLICATION_LOCALE,
        locale
    }),
    setApplicationAutoPlaySpinResetToStartValue: (autoPlaySpinResetToStartValue: boolean): any => ({
        type: actionTypes.SET_APPLICATION_AUTOPLAY_SPIN_RESET_TO_STARTVALUE,
        autoPlaySpinResetToStartValue
    }),
    setApplicationResponsibleGamingUrl: (responsibleGamingUrl: string): any => ({
        type: actionTypes.SET_APPLICATION_RESPONSIBLE_GAME_URL,
        responsibleGamingUrl
    }),
    setApplicationAutoPlayWinLimitPercentage: (autoPlayWinLimitPercentage: number): any => ({
        type: actionTypes.SET_APPLICATION_AUTOPLAY_WIN_LIMIT_PERCENTAGE,
        autoPlayWinLimitPercentage
    }),
    setApplicationShowResponsibleGamingIcon: (showResponsibleGamingIcon: boolean): any => ({
        type: actionTypes.SET_APPLICATION_SHOW_RESPONSIBLE_GAMING_ICON,
        showResponsibleGamingIcon
    }),
    setApplicationAutoPlayFreeGamesAutoStart: (autoPlayFreeGamesAutoStart: boolean): any => ({
        type: actionTypes.SET_APPLICATION_AUTOPLAY_FREEGAME_AUTOSTART,
        autoPlayFreeGamesAutoStart
    }),
    setApplicationShowHelpText: (showHelpText: boolean): any => ({
        type: actionTypes.SET_APPLICATION_SHOW_HELP_TEXT,
        showHelpText
    }),
    setApplicationAutoPlayLossLimitPercentage: (autoPlayLossLimitPercentage: number): any => ({
        type: actionTypes.SET_APPLICATION_AUTOPLAY_LOSSLIMIT_PERCENTAGE,
        autoPlayLossLimitPercentage
    }),
    setApplicationResponsibleGamingIconPath: (responsibleGamingIconPath: string): any => ({
        type: actionTypes.SET_APPLICATION_RESPOSIBLE_GAMING_ICONPATH,
        responsibleGamingIconPath
    }),
    setApplicationAutoPlayAbortOnFreeGameWinEnabled: (autoPlayAbortOnFreeGameWinEnabled: boolean): any => ({
        type: actionTypes.SET_APPLICATION_AUTOPLAY_ABORTON_FREEGAME_WINENDABLED,
        autoPlayAbortOnFreeGameWinEnabled
    }),
    setApplicationRequestCommand: (requestCommand: boolean): any => ({
        type: actionTypes.SET_APPLICATION_REQUEST_COMMAND,
        requestCommand
    }),
    setApplicationCurrencySymbol: (currencySymbol: string): any => ({
        type: actionTypes.SET_APPLICATION_CURRENCY_SYMBOL,
        currencySymbol
    }),
    setApplicationCurrencySymbolPrintedBefore: (currencySymbolPrintedBefore: boolean): any => ({
        type: actionTypes.SET_APPLICATION_CURRENCY_SYMBOL_PRINTED_BEFOR,
        currencySymbolPrintedBefore
    }),
    setTopwinOddsShow: (showTopWinOdds: boolean): any => ({
        type: actionTypes.SET_TOP_WIN_ODDS,
        showTopWinOdds
    }),
    setApplicationPause: (pause: boolean): any => ({
        type: actionTypes.SET_APPLICATION_PAUSE,
        pause
    }),
    setApplicationBalance: (balance: number): any => ({
        type: actionTypes.SET_APPLICATION_BALANCE,
        balance
    }),
    setApplicationPreviousBalance: (previousbalance: number): any => ({
        type: actionTypes.SET_APPLICATION_PREVIOUS_BALANCE,
        previousbalance
    }),
    setApplicationRoundId: (roundId: number): any => ({
        type: actionTypes.SET_APPLICATION_ROUND_ID,
        roundId
    }),
    setApplicationError: (error: string): any => ({
        type: actionTypes.SET_APPLICATION_ERROR,
        error
    }),
    setApplicationJackpot: (jackpot: number): any => ({
        type: actionTypes.SET_APPLICATION_JACKPOT,
        jackpot
    }),
    setApplicationLayoutMode: (layout: string): any => ({ type: actionTypes.SET_APPLICATION_LAYOUT_MODE, layout }),
    setApplicationHandMode: (handMode: string): any => ({ type: actionTypes.SET_APPLICATION_HAND_MODE, handMode }),
    setApplicationLoading: (isLoading: boolean): any => ({ type: actionTypes.SET_APPLICATION_LOADING, isLoading }),
    setApplicationDecreaseBet: (decreaseBet: boolean): any => ({
        type: actionTypes.SET_APPLICATION_DECREASE_BET,
        decreaseBet
    }),
    setApplicationIncreaseBet: (increaseBet: boolean): any => ({
        type: actionTypes.SET_APPLICATION_INCREASE_BET,
        increaseBet
    }),
    setApplicationMaxBet: (maxBet: boolean): any => ({ type: actionTypes.SET_APPLICATION_MAX_BET, maxBet }),
    setApplicationShowPaytable: (showPaytable: boolean): any => ({
        type: actionTypes.SET_APPLICATION_SHOW_PAYTABLE,
        showPaytable
    }),
    setApplicationSpin: (spin: boolean): any => ({ type: actionTypes.SET_APPLICATION_SPIN, spin }),
    setApplicationAutoPlayLossLimitEnabled: (autoPlayLossLimitEnabled: boolean): any => ({
        type: actionTypes.SET_APPLICATION_AUTOPLAY_LOSS_LIMIT_ENABLED,
        autoPlayLossLimitEnabled
    }),
    setApplicationDebugEnabled: (debugEnabled: boolean): any => ({
        type: actionTypes.SET_APPLICATION_DEBUG_ENABLE,
        debugEnabled
    }),
    setApplicationEnableRiskLadder: (enableRiskLadder: boolean): any => ({
        type: actionTypes.SET_APPLICATION_ENABLE_RISK_LADDER,
        enableRiskLadder
    }),
    setApplicationCurrencyAdditionalMultiplier: (currencyAdditionalMultiplier: number): any => ({
        type: actionTypes.SET_CURRENCY_ADDITIONAL_MULTIPLIER,
        currencyAdditionalMultiplier
    }),
    setApplicationAutoPlayLossLimitMandatory: (autoPlayLossLimitMandatory: boolean): any => ({
        type: actionTypes.SET_APPLICATION_AUTOPLAY_LOSS_LIMIT_MANDATORY,
        autoPlayLossLimitMandatory
    }),
    setApplicationAutoPlaySingleWinLimitEnabled: (autoPlaySingleWinLimitEnabled: boolean): any => ({
        type: actionTypes.SET_APPLICATION_AUTOPLAY_SINGLE_WIN_LIMIT_ENABLED,
        autoPlaySingleWinLimitEnabled
    }),
    setApplicationAutoPlaySingleWinLimitMandatory: (autoPlaySingleWinLimitMandatory: boolean): any => ({
        type: actionTypes.SET_APPLICATION_AUTOPLAY_SINGLE_WIN_LIMIT_MANDATORY,
        autoPlaySingleWinLimitMandatory
    }),
    setApplicationAutoPlayWinLimitEnabled: (autoPlayWinLimitEnabled: boolean): any => ({
        type: actionTypes.SET_APPLICATION_AUTOPLAY_WIN_LIMIT_ENABLED,
        autoPlayWinLimitEnabled
    }),
    setApplicationAutoPlayWinLimitMandatory: (autoPlayWinLimitMandatory: boolean): any => ({
        type: actionTypes.SET_APPLICATION_AUTOPLAY_WIN_LIMIT_MANDATORY,
        autoPlayWinLimitMandatory
    }),
    setApplicationCheatingEnabled: (cheatingEnabled: boolean): any => ({
        type: actionTypes.SET_APPLICATION_CHEATING_ENABLED,
        cheatingEnabled
    }),
    setApplicationCountryCode: (countryCode: string): any => ({
        type: actionTypes.SET_APPLICATION_COUNTRY_CODE,
        countryCode
    }),
    setApplicationCurrencyCode: (currencyCode: string): any => ({
        type: actionTypes.SET_APPLICATION_CURRENCY_CODE,
        currencyCode
    }),
    setApplicationCurrencyDecimalSeparator: (currencyDecimalSeparator: string): any => ({
        type: actionTypes.SET_APPLICATION_CURRENCY_DECIMAL_SEPARATOR,
        currencyDecimalSeparator
    }),
    setApplicationCurrencyGroupingSeparator: (currencyGroupingSeparator: string): any => ({
        type: actionTypes.SET_APPLICATION_CURRENCY_GROUPING_SEPARATOR,
        currencyGroupingSeparator
    }),
    setApplicationCurrencyIgnoreDecimals: (currencyIgnoreDecimals: boolean): any => ({
        type: actionTypes.SET_APPLICATION_CURRENCY_IGNORE_DECIMALS,
        currencyIgnoreDecimals
    }),
    setApplicationDisableQuickSpin: (disableQuickSpin: boolean): any => ({
        type: actionTypes.SET_APPLICATION_DISABLE_QUICK_SPIN,
        disableQuickSpin
    }),
    setApplicationDisableQuickStop: (disableQuickStop: boolean): any => ({
        type: actionTypes.SET_APPLICATION_DISABLE_QUICK_STOP,
        disableQuickStop
    }),
    setApplicationEnableAutoPlay: (enableAutoPlay: boolean): any => ({
        type: actionTypes.SET_APPLICATION_ENABLE_AUTOPLAY,
        enableAutoPlay
    }),
    setApplicationEnableRiskCard: (enableRiskCard: boolean): any => ({
        type: actionTypes.SET_APPLICATION_ENABLE_RISK_CARD,
        enableRiskCard
    }),
    setApplicationHistoryUrl: (historyUrl: string): any => ({
        type: actionTypes.SET_APPLICATION_HISTORY_URL,
        historyUrl
    }),
    setApplicationHomeUrl: (homeUrl: string): any => ({ type: actionTypes.SET_APPLICATION_HOME_URL, homeUrl }),
    setApplicationButtonpanelVisibility: (visibility: boolean): any => ({
        type: actionTypes.SET_APPLICATION_BUTTONPANEL_VISIBILITY,
        visibility
    }),
    setApplicationLanguageCode: (languageCode: string): any => ({
        type: actionTypes.SET_APPLICATION_LANGUAGE_CODE,
        languageCode
    }),
    setApplicationRealityCheckTimePassedInSeconds: (realityCheckTimePassedInSeconds: number): any => ({
        type: actionTypes.SET_APPLICATION_REALITY_CHECK_TIME_PASSED_IN_SECONDS,
        realityCheckTimePassedInSeconds
    }),
    setApplicationRealityCheckTimeoutInSeconds: (realityCheckTimeoutInSeconds: number): any => ({
        type: actionTypes.SET_APPLICATION_REALITY_CHECK_TIMEOUT_IN_SECONDS,
        realityCheckTimeoutInSeconds
    }),
    setApplicationSessionTimeoutInSeconds: (sessionTimeoutInSeconds: number): any => ({
        type: actionTypes.SET_APPLICATION_SESSION_TIMEOUT_IN_SECONDS,
        sessionTimeoutInSeconds
    }),
    setApplicationShowCloseButton: (showCloseButton: boolean): any => ({
        type: actionTypes.SET_APPLICATION_SHOW_CLOSE_BUTTON,
        showCloseButton
    }),
    setApplicationShowFullScreenButton: (showFullScreenButton: boolean): any => ({
        type: actionTypes.SET_APPLICATION_SHOW_FULL_SCREEN_BUTTON,
        showFullScreenButton
    }),
    setApplicationShowHelpButton: (showHelpButton: boolean): any => ({
        type: actionTypes.SET_APPLICATION_SHOW_HELP_BUTTON,
        showHelpButton
    }),
    setApplicationShowRTP: (showRTP: boolean): any => ({ type: actionTypes.SET_APPLICATION_SHOW_RTP, showRTP }),
    setApplicationShowSettingsControl: (showSettingsControl: boolean): any => ({
        type: actionTypes.SET_APPLICATION_SHOW_SETTINGS_CONTROL,
        showSettingsControl
    }),
    setApplicationShowTime: (showTime: boolean): any => ({ type: actionTypes.SET_APPLICATION_SHOW_TIME, showTime }),
    setApplicationShowVolumeControl: (showVolumeControl: boolean): any => ({
        type: actionTypes.SET_APPLICATION_SHOW_VOLUME_CONTROL,
        showVolumeControl
    }),


    setApplicationResizeState: (resizewidth: number, resizeheight: number, scalex: number, scaley: number): any => ({
        type: actionTypes.SET_APPLICATION_RESIZE_STATE,
        resizewidth,
        resizeheight,
        scalex,
        scaley
    }),
    getApplicationLoading: (): any => ({ type: actionTypes.GET_APPLICATION_LOADING }),
};
