import React, { Component, Ref } from "react";
import * as PIXI from "pixi.js";
import ReelContainer from "../reelcontainer/reelcontainer"
import Reelgridcontainer from "../reelgridcontainer/reelgridcontainer"
import withBaseGameConfiguration from "./configuration/withBaseGameConfiguration";
import { _ReactPixi, withPixiApp } from '@inlet/react-pixi'
import UIManager from "../ui/UiBuilder";
import Payline from "../payline/payline";
import Winbox from "../winbox/winbox";
import { connect } from "react-redux";
import { IStore } from "../../store/IStore";
import { Dispatch } from "redux";
import { actions as soundActions } from "../../reducers/soundReducer";
import { actions as aplicationActions } from "../../reducers/applicationStateReducer";
import Gridcontainer from "../gridcontainer/gridcontainer";
import { actions as layoutssActions } from "../../reducers/layoutsStateReducer";
import { isMobile } from "react-device-detect";

interface IProps {
    [x: string]: any;

}

interface IStateToProps {
}

interface IDispatchToProps {

}


interface IState {
}

class Basegame extends Component<IProps, IState> {
    protected app: PIXI.Application;
    protected baseGameContainer: _ReactPixi.IContainer | Ref<any>;
    protected baseLayer: _ReactPixi.IContainer | Ref<any>;
    protected reelLayer: _ReactPixi.IContainer | Ref<any>;
    protected gridLayer: _ReactPixi.IContainer | Ref<any>;
    protected reelgridLayer: _ReactPixi.IContainer | Ref<any>;
    protected lineLayer: _ReactPixi.IContainer | Ref<any>;
    protected winboxLayer: _ReactPixi.IContainer | Ref<any>;
    protected winAnimationLayer: _ReactPixi.IContainer | Ref<any>;
    protected specialAnimationLayer: _ReactPixi.IContainer | Ref<any>;
    protected ui_mode: string;
    protected displayUI: any;


    constructor(props: IProps) {
        super(props);

        this.app = props.app;
        this.state = {
            buttonPanelEnable: true,
            allContainerList: [],
            autoplayModeOn: false,
            showOverLay: false,
            isSpinning: false,
            pause: false,
            play: true,
            basegameIdleMode: true,
            basegamePlayMode: false,
            uiElements: [],

        }

        // this.baseGameContainer = React.createRef();
        // this.baseLayer = React.createRef();
        // this.reelLayer = React.createRef();
        // this.gridLayer = React.createRef();

        // this.reelgridLayer = React.createRef();
        // this.lineLayer = React.createRef();
        // this.winboxLayer = React.createRef();
        // this.winAnimationLayer = React.createRef();
        // this.specialAnimationLayer = React.createRef();

        this.baseGameContainer = {};
        this.baseLayer = {};
        this.reelLayer = {};
        this.gridLayer = {};

        this.reelgridLayer = {};
        this.lineLayer = {};
        this.winboxLayer = {};
        this.winAnimationLayer = {};
        this.specialAnimationLayer = {};
        if (isMobile) {
            this.ui_mode = "mobile"
        } else {
            this.ui_mode = "desktop"
        }
        this.displayUI = this.props.data.COMPONENTS.filter(this.checkUiMode.bind(this))
        this.props.setApplicationButtonpanelVisibility(true)

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

    checkUiMode(uimodeobj: any) {

        if (uimodeobj.uimode === undefined) {
            uimodeobj.uimode = "both"
        }
        if (uimodeobj.uimode === "both" || uimodeobj.uimode === this.ui_mode) {
            return uimodeobj;
        }
    }

    componentDidMount() {

        this.layoutChange(this.props.layoutMode);

    }


    shouldComponentUpdate(nextProps: Readonly<IProps>, nextState: Readonly<IState>, nextContext: any): boolean {

        if (nextProps.layoutMode !== this.props.layoutMode) {
            this.layoutChange(nextProps.layoutMode)
            return false;
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


    render() {

        let PROPS_TO_SEND_Gridcontainer = {
            app: this.app,
            configGame: this.props.configGame
        }
        return (
            <UIManager id={"baseGameContainer"} type={"Container"} ref={i => this.baseGameContainer = i}
                x={this.props.data.POS_X} y={this.props.data.POS_Y} configGame={this.props.configGame}
                name={"baseGameContainer"} app={this.app}>
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
                        <ReelContainer {...PROPS_TO_SEND_Gridcontainer} />}
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
    (state: Pick<IStore, 'basegameState' | 'applicationState' | 'autoplayState' | 'betPanelState' | 'reelsState'>): IStateToProps =>
    ({

        layoutMode: state.applicationState.layoutMode,

    }),
    (dispatch: Dispatch): IDispatchToProps => ({

        setVolume: (soundName: any): any => dispatch(soundActions.setVolume(soundName)),
        playSound: (soundName: any): any => dispatch(soundActions.playSound(soundName)),
        stopSound: (soundName: any): any => dispatch(soundActions.stopSound(soundName)),
        fadeOutSound: (soundName: any): any => dispatch(soundActions.fadeOutSound(soundName)),
        setApplicationLayoutObject: (layoutobjectlist: string): any => dispatch(layoutssActions.setApplicationLayoutObject(layoutobjectlist)),
        setApplicationButtonpanelVisibility: (visible: boolean): any => dispatch(aplicationActions.setApplicationButtonpanelVisibility(visible)),


    }))(withBaseGameConfiguration(Basegame)));