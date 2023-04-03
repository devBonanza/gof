import React, { Component, Ref } from "react";
import { _ReactPixi, withPixiApp } from "@inlet/react-pixi";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import UIManager from "../../core/components/ui/UiBuilder";
import { alllanguage } from "../../data/lang/index";
import { Ilanguage } from "../../core/interface/Icommon";
import withWalletResponseTrackerConfiguration from "./configuration/withWalletResponseTrackerConfiguration";
import { isMobile } from "react-device-detect";
import { configGame, constant } from "../../data/config";
import { actions as layoutssActions } from "../../core/reducers/layoutsStateReducer";
import { actions as gameLevelResponseActions } from "../../gamereducer/asyncGameLevelServerResponseReducer";
import { actions as behaviourAction } from "../../gamereducer/behaviourReducer";
import { TIMER } from "../../core/utills";


interface IStore {
    [x: string]: any;
}

interface IProps {
    [x: string]: any;
}

interface IStateToProps {
    [x: string]: any;
}

interface IDispatchToProps {
}

interface IState {
    [x: string]: any;
}

class WalletResponseTracker extends Component<IProps, IState> {
    protected app: PIXI.Application;
    protected walletResponseTrackerContainer: _ReactPixi.IContainer | Ref<any>;
    private alllanguage: Ilanguage;
    protected tweening: any;
    protected ui_mode: string;
    protected displayUI: any;
    protected currentTime: number = 0;
    protected storePreviousTime: number = 0;
    protected walletResponseHitTimer: number = 30000; //30 sec


    protected currentTime_MessagePopUp: number = 0;
    protected storePreviousTime_MessagePopUp: number = 0;
    protected walletResponseHitTimer_MessagePopUp: number = 1800000; //30 mins

    constructor(props: IProps) {
        super(props);
        this.app = props.app;
        this.alllanguage = alllanguage;
        this.state = {
            uiElements: [],
            lang: "en",
        }
        this.walletResponseTrackerContainer = React.createRef();
        if (isMobile) {
            this.ui_mode = "mobile";
        } else {
            this.ui_mode = "desktop";

        }
        this.currentTime = new Date().getTime();
        this.currentTime_MessagePopUp = new Date().getTime();
        this.displayUI = this.props.data.COMPONENTS.filter(this.checkUiMode.bind(this));

    }

    checkUiMode(uimodeobj: any) {
        if (uimodeobj.uimode === undefined) {
            uimodeobj.uimode = "both"
        }
        if (uimodeobj.uimode === "both" || uimodeobj.uimode === this.ui_mode) {
            return uimodeobj;
        }
    }

    layoutChange(currentLayout: string) {
        this.displayUI.map((data: any, j: number) => {
            if (data.layout === true) {
                this.props.setApplicationLayoutObject(data.name);
            }
        });
    }







    resetTime() {
        this.currentTime_MessagePopUp = new Date().getTime();
    }
    shouldComponentUpdate(nextProps: Readonly<IProps>, nextState: Readonly<IState>, nextContext: any): boolean {

        if (nextProps.isInitResponseReceived != this.props.isInitResponseReceived
            || nextProps.spinResult != this.props.spinResult
            || nextProps.initResult != this.props.initResult
            || nextProps.increaseBetResult != this.props.increaseBetResult
            || nextProps.requestSent != this.props.requestSent
            || nextProps.showIntroScreen != this.props.showIntroScreen
            || nextProps.showMobileMenuPanel != this.props.showMobileMenuPanel
            || nextProps.showSettingPanel != this.props.showSettingPanel
            || nextProps.showAutoplay != this.props.showAutoplay
            || nextProps.showPaytable != this.props.showPaytable) {

            if (nextProps.showIntroScreen != this.props.showIntroScreen
                || nextProps.showMobileMenuPanel != this.props.showMobileMenuPanel
                || nextProps.showSettingPanel != this.props.showSettingPanel
                || nextProps.showAutoplay != this.props.showAutoplay
                || nextProps.showPaytable != this.props.showPaytable) {
                if (!nextProps.showIntroScreen || !nextProps.showMobileMenuPanel || !nextProps.showSettingPanel || !nextProps.showAutoplay || !nextProps.showPaytable) {
                    this.resetTime();
                }
                if (nextProps.showIntroScreen || nextProps.showMobileMenuPanel || nextProps.showSettingPanel || nextProps.showAutoplay || nextProps.showPaytable) {
                    return false;
                }
            }

            this.storePreviousTime = new Date().getTime() - this.currentTime;
            this.storePreviousTime_MessagePopUp = new Date().getTime() - this.currentTime_MessagePopUp;
            if (nextProps.requestSent != this.props.requestSent) {
                if (this.storePreviousTime > this.walletResponseHitTimer) {
                    this.props.getApplicationWalletResponse();
                    this.currentTime = new Date().getTime();
                }
                if (this.storePreviousTime_MessagePopUp > this.walletResponseHitTimer_MessagePopUp) {
                    !nextProps.showPaytable && !nextProps.showAutoplay && !nextProps.showSettingPanel && !nextProps.showMobileMenuPanel && !nextProps.showIntroScreen && !nextProps.isSpinning && !nextProps.spinStart && !nextProps.showWinCelebration && !nextProps.showWinShower && !this.props.noInternetPopupVisible && this.props.visibleNoInternetPopUp(true, "noInternetPopUpText4", true, true);
                    this.resetTime();
                }
                nextProps.setRequestSent(false);

            }
            else {
                if (this.storePreviousTime < this.walletResponseHitTimer) {
                    this.currentTime = new Date().getTime();
                } else {
                    this.props.getApplicationWalletResponse();
                    this.currentTime = new Date().getTime();
                }
                if (this.storePreviousTime_MessagePopUp < this.walletResponseHitTimer_MessagePopUp) {
                    this.resetTime();
                } else {
                    !nextProps.showPaytable && !nextProps.showAutoplay && !nextProps.showSettingPanel && !nextProps.showMobileMenuPanel && !nextProps.showIntroScreen && !nextProps.isSpinning && !nextProps.spinStart && !nextProps.showWinCelebration && !nextProps.showWinShower && !this.props.noInternetPopupVisible && this.props.visibleNoInternetPopUp(true, "noInternetPopUpText4", true, true);
                    this.resetTime();
                }
            }


            return false;
        }
        return false;

    }
    render() {
        return (
            <UIManager id={"walletResponseTrackerContainer"} name={"walletResponseTrackerContainer"}
                type={"Container"} app={this.app} configGame={configGame}
                ref={i => this.walletResponseTrackerContainer = i}>
                {
                    this.displayUI && this.displayUI.map((i: any) =>
                        <UIManager key={`UIManager-${Math.random()}`} langObj={this.props.langObj} type={i.type}
                            app={this.app} configGame={configGame} constant={constant}
                            id={i.id} name={i.name} {...i}
                        />)
                }
            </UIManager>
        );
    }
}

export default withPixiApp(connect(
    (state: Pick<IStore, 'asyncInitAction' | 'applicationState' | 'gameactionstate' | 'asyncServerAction' | 'asyncGameLevelSeverState' | 'behaviourState' | 'winCelebrationState' | 'winShowerState' | 'reelgridState' | 'introductionScreenState' | 'desktopSettingPanelState' | 'autoplayState' | 'paytableState'>): IStateToProps =>
    ({
        layoutMode: state.applicationState.layoutMode,
        isInitResponseReceived: state.asyncInitAction.isInitResponseReceived,
        spinResult: state.asyncServerAction.result,
        initResult: state.asyncInitAction.result,
        actionResult: state.gameactionstate.result,
        increaseBetResult: state.asyncGameLevelSeverState.result,
        requestSent: state.behaviourState.requestSent,
        noInternetPopupVisible: state.behaviourState.noInternetPopupVisible,
        showWinCelebration: state.winCelebrationState.showWinCelebration,
        showWinShower: state.winShowerState.showWinShower,
        spinStart: state.reelgridState.spinStart,
        isSpinning: state.reelgridState.isSpinning,
        showIntroScreen: state.introductionScreenState.showIntroScreen,
        showMobileMenuPanel: state.behaviourState.showMobileMenuPanel,
        showSettingPanel: state.desktopSettingPanelState.showSettingPanel,
        showAutoplay: state.autoplayState.showAutoplay,
        showPaytable: state.paytableState.showPaytable,

    }),
    (dispatch: Dispatch): IDispatchToProps => ({
        setApplicationLayoutObject: (layoutobjectlist: any): any => dispatch(layoutssActions.setApplicationLayoutObject(layoutobjectlist)),
        getApplicationWalletResponse: (): any => dispatch(gameLevelResponseActions.getApplicationWalletResponse()),
        setRequestSent: (requestSent: boolean): any => dispatch(behaviourAction.setRequestSent(requestSent)),
        visibleNoInternetPopUp: (noInternetPopupVisible: boolean, text: string, closeButton: boolean, continueButton: boolean): any => dispatch(behaviourAction.visibleNoInternetPopUp(noInternetPopupVisible, text, closeButton, continueButton)),
    }))(withWalletResponseTrackerConfiguration(WalletResponseTracker)));