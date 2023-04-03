import React, { Component } from "react";
import { withPixiApp } from "@inlet/react-pixi";
import withKeyboardListenerConfiguration from "./configuration/withKeyboardListenerConfiguration";
import * as PIXI from "pixi.js";
import { connect } from "react-redux";
import { IStore } from "../../store/IStore";
import { Dispatch } from "redux";
import { actions as winpresentationAction } from "../../reducers/winPresentationReducer";
import { isMobile } from "react-device-detect";
import { actions as buttonActions } from "../../reducers/buttonPanelReducer";
import { actions as asyncActions } from "../../reducers/asyncServerResponseReducer";
import KeyboardEventHandler from 'react-keyboard-event-handler';
import { configGame } from "../../../data/config";
import { actions as reelsActions } from "../../reducers/reelsStateReducer";
import { actions as gridsActions } from "../../reducers/gridStateReducer";
import { actions as reelsGridActions } from "../../reducers/reelgridStateReducer";
import { actions as reelGridActions } from "../../../core/reducers/reelgridStateReducer";
import { actions as baseGameActions } from "../../../core/reducers/baseGameReducer";
import { TIMER } from "../../utills";

interface IProps {
    [x: string]: any;
}

interface IState {

}

interface IState {
    isGameLoaded: boolean,
    enableOk: boolean,
    width: number | string,
    height: number | string,
    pixelRatio: number,
    buttonSelected: any,
    selectedautoplayCount: number,
    toggleOn: boolean,

}

interface IStateToProps {
}

interface IDispatchToProps {
}

class KeyboardListener extends Component<IProps, IState> {
    protected app: PIXI.Application;
    protected autoplayContainer: any;
    private isSpinStart: boolean = false;
    private isSpaceBarActive:boolean = false;

    constructor(props: IProps) {
        super(props);
        this.app = props.app;
        // this.autoplayContainer = React.createRef();
        this.autoplayContainer = {};
        this.state = {
            width: this.props.width,
            height: this.props.height,
            buttonSelected: "",
            selectedautoplayCount: 0,
            pixelRatio: 1,
            enableOk: false,
            isGameLoaded: false,
            toggleOn: true
        }
    }

    reset() {
        this.props.setValueOfNumberButton(0)
        this.setState((prevState) => {
            return {
                ...prevState,
                buttonSelected: "",
                enableOk: false,
            }
        })
    }

    onStopSpin() {
       
            if(this.isSpaceBarActive){
                this.props.removeKeyBoardEvent(true);
                this.isSpinStart = false;
                this.isSpaceBarActive = false;
            }
        
    }

    updateDimensions = () => {
        this.setState((prevState) => {
            return {
                ...prevState,
                width: isMobile && window.screen.availWidth || window.innerWidth,
                height: isMobile && window.screen.availHeight || window.innerHeight,
                pixelRatio: window.devicePixelRatio
            }
        })
    };

    componentDidMount() {
        window.addEventListener('resize', this.updateDimensions);
        this.updateDimensions();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateDimensions);
    }

    shouldComponentUpdate(nextProps: Readonly<IProps>, nextState: Readonly<IState>, nextContext: any): boolean {
        if (nextProps.currentBetIndex !== this.props.currentBetIndex) {

        }
        return true;
    }

    onSpin() {
        this.props.setStopActive(true);
        this.props.getApplicationSpinResponse();
        this.props.stopWinPresentation();
        this.props.setAllButtonDisable();
        this.props.resetReelState();

    }

    render() {
        if (this.props.winCelebrationForKeyBoardListener || this.props.showPaytable) {
            return (<></>)
        }
        if ((!this.props.spinWithSpaceBar) || (this.props.showSettingPanelUI)) {
            return (<></>)
        }
        if (this.props.isRemoveKeyBoardEvent) {
            return (<></>)
        }
        return (
            <div>
                <KeyboardEventHandler
                    handleKeys={['space']}
                    handleEventType={'keydown'}
                    onKeyEvent={(key, e) => {

                        if (!this.props.inFreeGame) {
                            if (this.props.featureJustReTriggered == false) {
                                if (this.props.allSpinComplete && this.props.allButtonEnable) {
                                    //this.onSpin();
                                    this.isSpinStart = true;
                                    this.isSpaceBarActive = false;
                                    this.props.setStartSpinBySpaceBar(true);
                                    let timer = TIMER.TimerManager.createTimer(750);
                                    timer.on('end', (e: any) => {
                                        e.remove();
                                        this.isSpaceBarActive = true;
                                    });
                                    timer.start();

                                } else if (this.isSpaceBarActive) {
                                   
                                    this.onStopSpin();
                                }

                            }
                        }
                    }
                    } />
            </div>
        )
    }
}

export default withPixiApp(connect(
    (state: Pick<IStore, 'buttonPanelState' | 'paytableState' | 'autoplayState' | 'freegameState' | 'desktopSettingPanelState' |
        'basegameState' | 'winpresentationState' | 'applicationState' | 'gridsState' | 'reelgridState' | 'reelsState' | 'keyboardListenerState'>): IStateToProps =>
    ({
        showPaytable: state.paytableState.showPaytable,
        featureJustReTriggered: state.freegameState.featureJustReTriggered,
        inFreeGame: state.freegameState.inFreeGame,
        scaleY: state.applicationState.scaleY,
        spinWithSpaceBar: state.keyboardListenerState.spinWithSpaceBar,
        winCelebrationForKeyBoardListener: state.keyboardListenerState.winCelebrationForKeyBoardListener,
        winPresentationStart: state.winpresentationState.winPresentationStart,
        showSettingPanelUI: state.desktopSettingPanelState.showSettingPanel,
        phaseCount: state.winpresentationState.phaseCount,
        allButtonEnable: state.buttonPanelState.allButtonEnable,
        isSlamSpin: state.reelgridState.isSlamSpin,
        isActiveAll: state.basegameState.isActiveAll,
        isRemoveKeyBoardEvent: state.basegameState.isRemoveKeyBoardEvent,

        allSpinComplete: Number(configGame["SPIN_TYPE"]) === 1 && state.gridsState.allSpinComplete || Number(configGame["SPIN_TYPE"]) === 2 && state.reelgridState.allSpinComplete || Number(configGame["SPIN_TYPE"]) === 0 && state.reelsState.allSpinComplete,
    }),
    (dispatch: Dispatch): IDispatchToProps => ({
        getApplicationSpinResponse: (): any => dispatch(asyncActions.getApplicationSpinResponse()),
        setAllButtonDisable: (exceptBtnList: Array<string>): any => dispatch(buttonActions.setAllButtonDisable(exceptBtnList)),
        resetReelState: (): any => dispatch(Number(configGame["SPIN_TYPE"]) === 0 && reelsActions.resetReelState() || Number(configGame["SPIN_TYPE"]) === 1 && gridsActions.resetReelState() || Number(configGame["SPIN_TYPE"]) === 2 && reelsGridActions.resetReelState()),
        stopWinPresentation: (): any => dispatch(winpresentationAction.stopWinPresentation()),
        setPhaseCount: (phasecount: number): any => dispatch(winpresentationAction.setPhaseCount(phasecount)),
        startSpin: (): any => dispatch(reelsActions.startSpin()),
        startRGSpin: (): any => dispatch(reelGridActions.startSpin()),
        startGridSpin: (): any => dispatch(gridsActions.startSpin()),

        setSlamSpin: (isSlamSpin: any): any => dispatch(reelGridActions.setSlamSpin(isSlamSpin)),
        setStopActive: (stopActive: boolean): any => dispatch(buttonActions.setStopActive(stopActive)),
        setActiveall: (isActiveAll: boolean): any => dispatch(baseGameActions.setActiveall(isActiveAll)),
        removeKeyBoardEvent: (isRemoveKeyBoardEvent: boolean): any => dispatch(baseGameActions.removeKeyBoardEvent(isRemoveKeyBoardEvent)),
        setStartSpinBySpaceBar: (startSpinBySpaceBar: boolean): any => dispatch(baseGameActions.setStartSpinBySpaceBar(startSpinBySpaceBar)),

    }))(withKeyboardListenerConfiguration(KeyboardListener)));