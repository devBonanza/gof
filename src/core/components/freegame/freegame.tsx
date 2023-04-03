import React, { Component, Ref } from "react";
import * as PIXI from "pixi.js";
import ReelContainer from "../reelcontainer/reelcontainer"
import Gridcontainer from "../gridcontainer/gridcontainer"
import withFreeGameConfiguration from "./configuration/withFreeGameConfiguration";
import { _ReactPixi, withPixiApp } from '@inlet/react-pixi'
import UIManager from "../ui/UiBuilder";
import Payline from "../payline/payline";
import Winbox from "../winbox/winbox";
import { connect } from "react-redux";
import { IStore } from "../../store/IStore";
import { Dispatch } from "redux";
import { actions as freegameAction } from "../../reducers/freeGameReducer";
import { actions as winpresentationAction } from "../../reducers/winPresentationReducer";
import { actions as reelsActions } from "../../reducers/reelsStateReducer";
import { actions as asyncActions } from "../../reducers/asyncServerResponseReducer";
import { actions as layoutssActions } from "../../reducers/layoutsStateReducer";
import { isMobile } from "react-device-detect";
import Reelgridcontainer from "../reelgridcontainer/reelgridcontainer";
import { actions as gridAction } from '../../reducers/gridStateReducer';
import { actions as reelGridAction } from '../../reducers/reelgridStateReducer';
import { configGame } from "../../data/config";
interface IProps {
    [x: string]: any;
}

interface IStateToProps {
}

interface IDispatchToProps {
}

interface IState {
    [x: string]: any;
}

class Freegame extends Component<IProps, IState> {
    protected app: PIXI.Application;
    protected ui_mode: string;
    protected displayUI: any;
    protected freeGameContainer: _ReactPixi.IContainer | Ref<any>;
    protected baseLayer: _ReactPixi.IContainer | Ref<any>;
    protected reelLayer: _ReactPixi.IContainer | Ref<any>;
    protected lineLayer: _ReactPixi.IContainer | Ref<any>;
    protected reelgridLayer: _ReactPixi.IContainer | Ref<any>;
    protected gridLayer: _ReactPixi.IContainer | Ref<any>;
    protected winboxLayer: _ReactPixi.IContainer | Ref<any>;
    protected winAnimationLayer: _ReactPixi.IContainer | Ref<any>;
    protected specialAnimationLayer: _ReactPixi.IContainer | Ref<any>;

    constructor(props: IProps) {
        super(props);
        this.app = props.app;
        this.state = {
            allContainerList: [],
            showOverLay: false,
            isSpinning: false,
            pause: false,
            play: true,
            uiElements: [],
        }
        // this.alllanguage = alllanguage;
        // this.freeGameContainer = React.createRef();
        // this.baseLayer = React.createRef();
        // this.reelLayer = React.createRef();
        // this.lineLayer = React.createRef();
        // this.reelgridLayer = React.createRef();
        // this.gridLayer = React.createRef();
        // this.winboxLayer = React.createRef();
        // this.winAnimationLayer = React.createRef();
        // this.specialAnimationLayer = React.createRef();

        this.freeGameContainer = {};
        this.baseLayer = {};
        this.reelLayer = {};
        this.lineLayer = {};
        this.reelgridLayer = {};
        this.gridLayer = {};
        this.winboxLayer = {};
        this.winAnimationLayer = {};
        this.specialAnimationLayer = {};


        if (isMobile) {
            this.ui_mode = "mobile"
        } else {
            this.ui_mode = "desktop"
        }
        this.displayUI = this.props.data.COMPONENTS.filter(this.checkUiMode.bind(this))
    }

    checkUiMode(uimodeobj: any) {
        if (uimodeobj.uimode === undefined) {
            uimodeobj.uimode = "both"
        }
        if (uimodeobj.uimode === "both" || uimodeobj.uimode === this.ui_mode) {
            return uimodeobj;
        }
    }

    static getDerivedStateFromProps(newProp: IProps, newState: IState): IState {
        if (newProp.isSpinning) {
            return {
                ...newState,
                isSpinning: newProp.isSpinning
            }
        }
        return newState;
    }

    onSpin() {
        this.props.getApplicationFreeSpinResponse();
        this.props.stopWinPresentation();
    }

    layoutChange(currentLayout: string) {
        this.props.data.COMPONENTS.map((data: any, j: number) => {
            if (data.layout === true) {
                this.props.setApplicationLayoutObject(data.name)
            }
        }
        )
    }

    shouldComponentUpdate(nextProps: Readonly<IProps>, nextState: Readonly<IState>, nextContext: any): boolean {
        if (nextProps.inFreeGame != this.props.inFreeGame
            || nextProps.freegameSpinCountRemaining != this.props.freegameSpinCountRemaining
            || nextProps.spinResponseReceived != this.props.spinResponseReceived
            || nextProps.freegameNextSpin != this.props.freegameNextSpin
            || nextProps.layoutMode != this.props.layoutMode
        ) {
            if (nextProps.freegameNextSpin && nextProps.inFreeGame && nextProps.freegameNextSpin != this.props.freegameNextSpin) {
                this.onSpin();
            }
            if (nextProps.layoutMode !== this.props.layoutMode) {
                this.layoutChange(nextProps.layoutMode)
                return false;
            }
            if (nextProps.spinResponseReceived && nextProps.spinResponseReceived !== this.props.spinResponseReceived) {
                const {
                    startSpin
                } = nextProps;
                startSpin();
            }
            return false;
        }
        return true;
    }

    bindUI() {
    }

    componentDidMount() {
        this.bindUI();
    }

    render() {

        let PROPS_TO_SEND_Gridcontainer = {
            app: this.app,
            configGame: this.props.configGame
        }
        return (
            <UIManager id={"freeGameContainer"} type={"Container"} ref={i => this.freeGameContainer = i}
                x={this.props.data.POS_X} y={this.props.data.POS_Y} app={this.app}>
                <UIManager id={"baseLayer"} type={"Container"} ref={i => this.baseLayer = i} name={"baseLayer"}
                    configGame={this.props.configGame}
                    app={this.app}>
                    {
                        this.displayUI.filter((values: any) => values.parentLayer === "baseLayer").map((i: any) =>
                            <UIManager key={`UIManager-${Math.random()}`} langObj={this.props.langObj} type={i.type}
                                id={i.id} {...i} app={this.app} configGame={this.props.configGame} />)
                    }
                </UIManager>
                <UIManager id={"reelLayer"} type={"Container"} ref={i => this.reelLayer = i} name={"reelLayer"}
                    app={this.app} configGame={this.props.configGame}>
                    {this.props.configGame["SPIN_TYPE"] === 0 &&
                        <ReelContainer app={this.app} configGame={this.props.configGame} />}
                </UIManager>
                <UIManager id={"gridLayer"} type={"Container"} ref={i => this.gridLayer = i} name={"gridLayer"}
                    app={this.app} configGame={this.props.configGame}>
                    {this.props.configGame["SPIN_TYPE"] === 1 &&
                        <Gridcontainer {...PROPS_TO_SEND_Gridcontainer} />}
                </UIManager>
                <UIManager id={"reelgridLayer"} type={"Container"} ref={i => this.reelgridLayer = i}
                    name={"reelgridLayer"}
                    app={this.app} configGame={this.props.configGame}>
                    {this.props.configGame["SPIN_TYPE"] === 2 &&
                        <Reelgridcontainer {...PROPS_TO_SEND_Gridcontainer} />}
                </UIManager>
                <UIManager id={"lineLayer"} type={"Container"} ref={i => this.lineLayer = i} name={"lineLayer"}
                    app={this.app} configGame={this.props.configGame}>
                    <Payline app={this.app} configGame={this.props.configGame}></Payline>
                </UIManager>
                <UIManager id={"winboxLayer"} type={"Container"} ref={i => this.winboxLayer = i} name={"winboxLayer"}
                    app={this.app} configGame={this.props.configGame}>
                    <Winbox configGame={this.props.configGame}></Winbox>
                </UIManager>
                <UIManager id={"winAnimationLayer"} type={"Container"} ref={i => this.winAnimationLayer = i}
                    name={"winAnimationLayer"} app={this.app} configGame={this.props.configGame}>
                </UIManager>
                <UIManager id={"specialAnimationLayer"} type={"Container"} ref={i => this.specialAnimationLayer = i}
                    name={"specialAnimationLayer"} app={this.app} configGame={this.props.configGame}>
                    {
                        this.displayUI.filter((values: any) => values.parentLayer === "specialAnimationLayer").map((i: any) =>
                            <UIManager key={`UIManager-${Math.random()}`} langObj={this.props.langObj} type={i.type}
                                id={i.id} {...i} app={this.app} configGame={this.props.configGame} />)
                    }
                </UIManager>
            </UIManager>)
    }
}


export default withPixiApp(connect(
    (state: Pick<IStore, 'freegameState' | 'basegameState' | 'reelsState' | 'applicationState' | 'betPanelState'>): IStateToProps =>
    ({
        // freegameNextSpin: state.freegameState.freegameNextSpin,
        // inFreeGame: state.freegameState.inFreeGame,
        // spinResponseReceived: state.reelsState.spinResponseReceived,
        // layoutMode: state.applicationState.layoutMode,
    }),
    (dispatch: Dispatch): IDispatchToProps => ({
        // startSpin: (): any => dispatch(reelsActions.startSpin()),
        // stopSpin: (): any => dispatch(reelsActions.stopSpin()),
        startSpin: (): any => dispatch(Number(configGame["SPIN_TYPE"]) === 0 && reelsActions.startSpin() || Number(configGame["SPIN_TYPE"]) === 1 && gridAction.startSpin() || Number(configGame["SPIN_TYPE"]) === 2 && reelGridAction.startSpin()),
        stopSpin: (): any => dispatch(Number(configGame["SPIN_TYPE"]) === 0 && reelsActions.stopSpin() || Number(configGame["SPIN_TYPE"]) === 1 && gridAction.stopSpin() || Number(configGame["SPIN_TYPE"]) === 2 && reelGridAction.stopSpin()),
        setApplicationFreeGameCount: (freegameCount: number): any => dispatch(freegameAction.setApplicationFreeGameCount(freegameCount)),
        getApplicationFreeSpinResponse: (): any => dispatch(asyncActions.getApplicationFreeSpinResponse()),
        stopWinPresentation: (): any => dispatch(winpresentationAction.stopWinPresentation()),
        setApplicationLayoutObject: (layoutobjectlist: string): any => dispatch(layoutssActions.setApplicationLayoutObject(layoutobjectlist)),
    }))(withFreeGameConfiguration(Freegame)));