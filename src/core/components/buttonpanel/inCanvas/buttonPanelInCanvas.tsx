import {_ReactPixi} from '@inlet/react-pixi'
import React, { Ref} from "react";
import PIXI from "pixi.js";
import {connect} from 'react-redux'
import {Dispatch} from 'redux';
import {IStore} from "../../../store/IStore";
import {actions as baseGameActions} from "../../../reducers/baseGameReducer";
import {actions as layoutssActions} from "../../../reducers/layoutsStateReducer";
import {actions as reelsActions} from "../../../reducers/reelsStateReducer";
import {actions as reelgridActions} from "../../../reducers/reelgridStateReducer";
import {actions as gridsActions} from "../../../reducers/gridStateReducer";
import {actions as buttonActions} from "../../../reducers/buttonPanelReducer";
import {actions as paytableActions} from "../../../reducers/paytableReducer";
import {actions as autoplayActions} from "../../../reducers/autoplayReducer";
import {actions as menuActions} from "../../../reducers/menuReducer";
import {actions as desktopSettingPanelActions} from "../../../reducers/desktopSettingPanelReducer";
import UIManager from "../../ui/UiBuilder";
import {actions as asyncActions} from "../../../reducers/asyncServerResponseReducer";
import { actions as flowManagerAction } from "../../../reducers/flowManagerReducer";
import {isMobile} from "react-device-detect";
import {actions as showMessageActions} from "../../../reducers/playerMessageReducer";
import {actions as betPanelActions} from "../../../reducers/betPanelReducer";
import {actions as winpresentationAction} from "../../../reducers/winPresentationReducer";
import {actions as soundActions} from "../../../reducers/soundReducer";
import {TIMER} from "../../../utills";

interface IStateToProps {
}

interface IDispatchToProps {
}


interface IProps extends IStateToProps, IDispatchToProps {
    [x: string]: any;
}

interface IState {
    [x: string]: any;
}

class ButtonPanelInCanvas extends React.Component<IProps, IState> {

    protected app: PIXI.Application;
    protected buttonContainer: _ReactPixi.IContainer | Ref<any>;
    protected button_name_1: string;
    protected button_name_2: string;
    protected button_name_3: string;
    protected button_name_4: string;
    protected button_name_5: string;
    protected button_name_6: string;
    protected button_name_7: string;
    protected button_name_8: string;
    protected button_name_9: string;
    protected button_name_10: string;
    protected button_name_11: string;
    protected ui_mode: string;
    protected displayUI: any;

    constructor(props: IProps) {
        super(props);
        this.app = props.app;
        this.button_name_1 = "btn_spin"
        this.button_name_2 = "btn_paytable"
        this.button_name_3 = "btn_bet_increase"
        this.button_name_4 = "btn_bet_decrease"
        this.button_name_5 = "btn_sound"
        this.button_name_6 = "btn_gameRule"
        this.button_name_7 = "btn_autoplay_stop"
        this.button_name_8 = "btn_autoplay"
        this.button_name_9 = "btn_home"
        this.button_name_10 = "btn_maxbet"
        this.button_name_11 = "btn_setting"


        // this.buttonContainer = React.createRef();
        this.buttonContainer = {};
        this.state = {
            [this.button_name_1]: {enable: false},
            [this.button_name_2]: {enable: false},
            [this.button_name_3]: {enable: false},
            [this.button_name_4]: {enable: false},
            [this.button_name_5]: {enable: false},
            [this.button_name_6]: {enable: false},
            [this.button_name_7]: {enable: false},
            [this.button_name_8]: {enable: false},
            [this.button_name_9]: {enable: false},
            [this.button_name_10]: {enable: false},
            [this.button_name_11]: {enable: false},
        }
        if (isMobile) {
            this.ui_mode = "mobile"
        } else {
            this.ui_mode = "desktop"
        }

        this.displayUI = this.props.data.COREBUTTONPANEL.filter(this.checkUiMode.bind(this))


        this.displayUI.map((data: any) => {
            if (data.name === this.button_name_1) {
                data.visible = this.props.spinBtnVisibility || true;
            }
            if (data.name === this.button_name_2) {
                data.visible = this.props.paytableBtnVisibility;
            }
            if (data.name === this.button_name_3) {
                data.visible = this.props.increaseBetBtnVisibility;
            }
            if (data.name === this.button_name_4) {
                data.visible = this.props.decreaseBetBtnVisibility;
            }
            if (data.name === this.button_name_10) {
                data.visible = this.props.maxBetBtnVisibility;
            }
            if (data.name === "btn_autoplay") {
                data.visible = true
            }
            if (data.name === "btn_autoplay_stop") {
                data.visible = false
            }
            if (isMobile) {
                if (data.name === "btn_autoplay_stop") {
                    data.visible = false
                }
            }
        })
    }

    onBetDecrease() {

        this.props.setApplicationCurrentBetIndex(this.props.currentBetIndex - 1)
    }

    onBetIncrease() {

        this.props.setApplicationCurrentBetIndex(this.props.currentBetIndex + 1)
    }

    onAutoplayShow() {
        this.props.showAutoplay();
        this.props.setAllButtonDisable();
    }

    onAutoplay() {
        this.props.setApplicationAutoplayCount(this.props.AutoplayCount);
        this.props.startAutoplay();
        this.onSpin();
    }

    onMenuShow() {
        this.props.showMenuUI();
        this.props.limitOfLoss(false);
        this.props.setAllButtonDisable();
    }

    onAutoplayStop() {

        this.setState((prevState) => {
            return {
                ...prevState,
                ["btn_autoplay_stop"]: {enable: false}
            }
        })
        this.props.setApplicationAutoplayCount(0);
        this.props.stopAutoplay();

    }

    onHelp() {
    }

    onPaytable() {
        this.props.showPaytable();
    }

    onSpin() {

        this.props.getApplicationSpinResponse();
        this.props.resetReelState();
        this.props.setAllButtonDisable();

    }

    handleEvent = (e: any) => {
        this.props.setApplicationButtonClicked(true);
        this.props.setApplicationButtonClicked(false);

        switch (e.target.name) {
            case this.button_name_1:
                this.onSpin();
                return;
            case this.button_name_2:
                this.onPaytable();
                return;
            case this.button_name_3:
                this.onBetIncrease();
                return;
            case this.button_name_4:
                this.onBetDecrease();
                return;
            case this.button_name_5:
                if (this.props.resumeInterval) {
                    this.props.resumeTheInterval(false, 0, 0, "both")
                } else {
                    this.props.resumeTheInterval(true, 0, 0, "both")
                }
                return;
            case this.button_name_6:
                this.props.pauseTheInterval(true, 7, 2, "both")
                this.onHelp();
                return;
            case this.button_name_7:
                this.onAutoplayStop();
                return;
            case this.button_name_8:
                this.onAutoplayShow();
                return;
            case this.button_name_9:
                this.props.startTheInterval(true, 3, 2, "both")
                return;
            case this.button_name_10:
                return;
            case this.button_name_11:
                if (this.props.showSettingPanelUI) {
                    this.props.showDesktopSettingPanelUI(false)
                    this.props.setAllButtonEnable();
                } else {
                    this.props.showDesktopSettingPanelUI(true)
                    this.props.setAllButtonDisable();
                }
                return;
            default:
                return 'No buttons';
        }
    }

    shouldComponentUpdate(nextProps: Readonly<IProps>, nextState: Readonly<IState>, nextContext: any): boolean {
        if (nextProps.currentBetIndex !== this.props.currentBetIndex ||
            nextProps.allButtonEnable !== this.props.allButtonEnable ||
            nextProps.autoplayCount !== this.props.autoplayCount ||
            nextProps.autoplayNextSpin !== this.props.autoplayNextSpin ||
            nextProps.inAutoplay !== this.props.inAutoplay ||
            nextProps.showAutoplayUI !== this.props.showAutoplayUI ||
            nextProps.feature !== this.props.feature ||
            nextProps.spinResponseReceived !== this.props.spinResponseReceived ||
            nextProps.layoutMode !== this.props.layoutMode
            ||      nextProps.currentPhase !== this.props.currentPhase
        ) {
            if (nextProps.layoutMode !== this.props.layoutMode) {
                this.layoutChange(nextProps.layoutMode)
            }
            if (nextProps.currentPhase !== this.props.currentPhase) {
                if (nextProps.currentPhase == "peri") {
                    this.onSpin();
                }
            }
            if (nextProps.spinResponseReceived && nextProps.spinResponseReceived !== this.props.spinResponseReceived) {

                if (nextProps.configGame["SPIN_TYPE"] === 0) {
                    const {
                        startSpin
                    } = nextProps;
                    startSpin();
                } else if (nextProps.configGame["SPIN_TYPE"] === 2) {
                    const {
                        startRGSpin
                    } = nextProps;
                    startRGSpin();
                } else {
                    const {
                        startGridSpin
                    } = nextProps;
                    startGridSpin();
                }
            }
            if (nextProps.currentBetIndex !== this.props.currentBetIndex && !nextProps.inAutoplay && nextProps.layoutMode == this.props.layoutMode || nextProps.allButtonEnable && !nextProps.inAutoplay && nextProps.layoutMode == this.props.layoutMode) {
                if (nextProps.feature.length > 0) {
                    this.disableAllBtn();
                } else {
                    this.enableAllBtn(["btn_autoplay_stop"]);
                }
                if (nextProps.currentBetIndex == nextProps.betList.length - 1) {

                    this.enableAllBtn(["btn_bet_increase", "btn_autoplay_stop"]);
                }
                if (nextProps.currentBetIndex == 0) {
                    this.enableAllBtn(["btn_bet_decrease", "btn_autoplay_stop"]);
                }
            }
            if (!nextProps.allButtonEnable && nextProps.allButtonEnable !== this.props.allButtonEnable) {

                if (nextProps.inAutoplay) {
                    this.disableAllBtn(["btn_autoplay_stop"]);
                } else {
                    this.disableAllBtn();
                }
            }
            if (nextProps.inAutoplay && nextProps.inAutoplay !== this.props.inAutoplay) {
                this.disableAllBtn(["btn_autoplay_stop"]);
                this.displayUI.map((data: any) => {
                    if (data.name === "btn_autoplay") {
                        data.visible = false
                    }
                    if (data.name === "btn_autoplay_stop") {
                        data.visible = true
                    }
                })

                if (isMobile) {

                    this.displayUI.map((data: any) => {
                        if (data.name === "btn_autoplay_stop") {
                            data.visible = true
                        }
                    })
                }


                return false;
            } else if (!nextProps.inAutoplay && nextProps.inAutoplay !== this.props.inAutoplay) {
                this.displayUI.map((data: any) => {
                    if (data.name === "btn_autoplay") {
                        data.visible = true
                    }
                    if (data.name === "btn_autoplay_stop") {
                        data.visible = false
                    }
                })

                if (isMobile) {
                    this.displayUI.map((data: any) => {
                        if (data.name === "btn_autoplay_stop") {
                            data.visible = false
                        }
                    })

                }
                return false;
            }


            if (nextProps.autoplayCount > 0 && nextProps.inAutoplay && nextProps.autoplayNextSpin) {

                let timer = TIMER.TimerManager.createTimer(1000);
                timer.on('end', (e: any, data: any) => {
                    e.remove();
                    this.onSpin();
                })
                timer.start();
                let remainingAutoplay = nextProps.autoplayCount - 1;
                if (remainingAutoplay <= 0) {
                    this.props.stopAutoplay();
                    this.displayUI.map((data: any) => {
                        if (data.name === "btn_autoplay") {
                            data.visible = true
                        }
                        if (data.name === "btn_autoplay_stop") {
                            data.visible = false
                        }
                    })

                    if (isMobile) {
                        this.displayUI.map((data: any) => {
                            if (data.name === "btn_autoplay_stop") {
                                data.visible = false
                            }
                        })
                    }
                }
                this.props.setApplicationAutoplayCount(remainingAutoplay);
            }

            return false
        }
        return true;
    }

    layoutChange(currentLayout: string) {
        this.displayUI.map((data: any, j: number) => {
                if (data.layout === true) {
                    this.props.setApplicationLayoutObject(data.name)
                }
            }
        )
    }

    componentWillUnmount() {
    }

    componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<IState>, snapshot?: any) {
        this.layoutChange(this.props.layoutMode)
    }

    componentDidMount() {

        this.displayUI.map((data: any, j: number) => {
            let obj = this.state[data.name];

            if (obj) {
                obj.enable = data.interactive;
                this.setState((prevState) => {
                    return {
                        ...prevState,
                        [data.name]: obj
                    }
                })
            }
        })
    }

    disableAllBtn(exceptList: Array<string> = []) {
        this.props.setAllButtonDisable(exceptList);
        this.displayUI.map((data: any, j: number) => {
            let obj = this.state[data.name];

            if (obj) {
                if (exceptList.indexOf(data.name) > -1 || (this.props.data.alwaysEnableButtonNameList.indexOf(data.name) > -1)) {
                    obj.enable = true;
                } else {
                    obj.enable = false;
                }
                this.setState((prevState) => {
                    return {
                        ...prevState,
                        [data.name]: obj
                    }
                })
            }
        })
    }

    enableAllBtn(exceptList: Array<string> = []) {
        this.props.setAllButtonEnable(exceptList);
        this.displayUI.map((data: any, j: number) => {
            let obj = this.state[data.name];

            if (obj) {
                if (exceptList.indexOf(data.name) > -1 && (this.props.data.alwaysEnableButtonNameList.indexOf(data.name) == -1)) {
                    obj.enable = false;
                } else {
                    obj.enable = true;
                }
                this.setState((prevState) => {
                    return {
                        ...prevState,
                        [data.name]: obj
                    }
                })
            }
        })
    }

    checkUiMode(uimodeobj: any) {

        if (uimodeobj.uimode === undefined) {
            uimodeobj.uimode = "both"
        }
        if (uimodeobj.uimode === "both" || uimodeobj.uimode === this.ui_mode) {
            return uimodeobj;
        }
    }

    render() {
        return (<UIManager ref={i => this.buttonContainer = i} type={"Container"} key={`UIManager-${Math.random()}`}
                           id={"buttonContainer"} name={"buttonContainer"} app={this.app}>
            {
                this.displayUI.map((data: any, j: number) => (

                        (this.props.data.alwaysEnableButtonNameList.indexOf(data.name) > -1 || this.props.exceptBtnList.indexOf(data.name) > -1) && (

                            (this.props.data.alwaysEnableButtonNameList.indexOf(data.name) > -1) &&

                            <UIManager key={`UIManager-${Math.random()}`} type={data.type}
                                       ClickHandler={this.handleEvent} langObj={this.props.langObj}
                                       disabled={!this.state[data.name].enable} id={data.id} {...data} app={this.app}/>
                            ||
                            (this.props.allButtonEnable && this.props.exceptBtnList.indexOf(data.name) > -1) &&
                            <UIManager key={`UIManager-${Math.random()}`} type={data.type} app={this.app}
                                       ClickHandler={this.handleEvent} langObj={this.props.langObj}
                                       disabled={!this.state[data.name].enable} id={data.id} {...data}/>
                            ||
                            <UIManager key={`UIManager-${Math.random()}`} type={data.type} app={this.app}
                                       ClickHandler={this.handleEvent} langObj={this.props.langObj}
                                       disabled={!this.state[data.name].enable} id={data.id} {...data}/>
                        )
                        ||
                        (

                            <UIManager key={`UIManager-${Math.random()}`} type={data.type} app={this.app}
                                       ClickHandler={this.handleEvent} langObj={this.props.langObj}
                                       disabled={this.state[data.name] && !this.state[data.name].enable}
                                       id={data.id} {...data}/>)
                    )
                )
            }
        </UIManager>)
    }
}


export default connect(
    (state: Pick<IStore, 'reelgridState' | 'betPanelState' | 'reelsState' | 'buttonPanelState' | 'basegameState' | 'gridsState' | 'autoplayState' | 'applicationState' | 'desktopSettingPanelState' | 'playerMessageState'>, ownProps?: any) =>
        ({
        }),
    (dispatch: Dispatch, ownProps?: any): IDispatchToProps => ({
        resetReelState: (): any => dispatch(ownProps && ownProps.configGame["SPIN_TYPE"] === 0 && reelsActions.resetReelState() || ownProps && ownProps.configGame["SPIN_TYPE"] === 1 && gridsActions.resetReelState() || ownProps && ownProps.configGame["SPIN_TYPE"] === 2 && reelgridActions.resetReelState()),
        startSpin: (): any => dispatch(reelsActions.startSpin()),
        startRGSpin: (): any => dispatch(reelgridActions.startSpin()),
        startGridSpin: (): any => dispatch(gridsActions.startSpin()),
        startAutoplay: (): any => dispatch(baseGameActions.startAutoplay()),
        stopAutoplay: (): any => dispatch(baseGameActions.stopAutoplay()),
        stopSpin: (): any => dispatch(reelsActions.stopSpin()),
        stopRGSpin: (): any => dispatch(reelgridActions.stopSpin()),
        forcestopSpin: (): any => dispatch(reelsActions.forceStopSpin()),
        forcestopRGSpin: (): any => dispatch(reelgridActions.forceStopSpin()),
        setApplicationAutoplayCount: (autoplaycount: number): any => dispatch(baseGameActions.setApplicationAutoplayCount(autoplaycount)),
        setApplicationCurrentBetIndex: (betIndex: number): any => dispatch(baseGameActions.setApplicationCurrentBetIndex(betIndex)),
        setAllButtonDisable: (exceptBtnList: Array<string>): any => dispatch(buttonActions.setAllButtonDisable(exceptBtnList)),
        setAllButtonEnable: (exceptBtnList: Array<string>): any => dispatch(buttonActions.setAllButtonEnable(exceptBtnList)),
        getApplicationSpinResponse: (): any => dispatch(asyncActions.getApplicationSpinResponse()),
        getApplicationHistoryResponse: (): any => dispatch(asyncActions.getApplicationHistoryResponse()),
        showPaytable: (): any => dispatch(paytableActions.showPaytable()),
        hidePaytable: (): any => dispatch(paytableActions.hidePaytable()),
        showAutoplay: (): any => dispatch(autoplayActions.showAutoplayUI()),
        hideAutoplay: (): any => dispatch(autoplayActions.hideAutoplayUI()),
        showMenuUI: (): any => dispatch(menuActions.showMenuUI()),
        setApplicationButtonClicked: (clicked: boolean): any => dispatch(buttonActions.setApplicationButtonClicked(clicked)),
        limitOfLoss: (lossLimit: boolean): any => dispatch(autoplayActions.limitOfLoss(lossLimit)),
        setApplicationLayoutObject: (layoutobjectlist: string): any => dispatch(layoutssActions.setApplicationLayoutObject(layoutobjectlist)),
        showDesktopSettingPanelUI: (showSettingPanel: boolean): any => dispatch(desktopSettingPanelActions.showDesktopSettingPanelUI(showSettingPanel)),
        startTheInterval: (startInterval: boolean, leftMessageIndex: number, rightMessageIndex: number, selectContainer: string): any => dispatch(showMessageActions.startTheInterval(startInterval, leftMessageIndex, rightMessageIndex, selectContainer)),
        resumeTheInterval: (resumeInterval: boolean, leftMessageIndex: number, rightMessageIndex: number, selectContainer: string): any => dispatch(showMessageActions.resumeTheInterval(resumeInterval, leftMessageIndex, rightMessageIndex, selectContainer)),
        pauseTheInterval: (pauseInterval: boolean, leftMessageIndex: number, rightMessageIndex: number, selectContainer: string): any => dispatch(showMessageActions.pauseTheInterval(pauseInterval, leftMessageIndex, rightMessageIndex, selectContainer)),
        setSelectedBet: (selectedBet: number): any => dispatch(betPanelActions.setSelectedBet(selectedBet)),
        setSelectedLine: (selectedLine: number): any => dispatch(betPanelActions.setSelectedLine(selectedLine)),
        stopWinPresentation: (): any => dispatch(winpresentationAction.stopWinPresentation()),
        playSound: (soundName: any): any => dispatch(soundActions.playSound(soundName)),
        resetPhase: (): any => dispatch(flowManagerAction.resetPhase()),
        changePhase: (): any => dispatch(flowManagerAction.changePhase()),
        jumpPhase: (namePhase:string): any => dispatch(flowManagerAction.jumpPhase(namePhase)),
    })
)(ButtonPanelInCanvas);