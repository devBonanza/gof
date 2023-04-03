import React, {Component, Ref} from "react";
import {_ReactPixi, Graphics, withPixiApp} from "@inlet/react-pixi";
import {connect} from "react-redux";
import {IStore} from "../../store/IStore";
import {Dispatch} from "redux";
import withOverlayConfiguration from "./configuration/withOverlayConfiguration";
import UIManager from "../ui/UiBuilder";
import PIXI from "pixi.js";
import {actions as layoutssActions} from "../../reducers/layoutsStateReducer";
import {isMobile} from "react-device-detect";
import {actions as autoplayActions} from "../../reducers/autoplayReducer";
import {actions as buttonActions} from "../../reducers/buttonPanelReducer";
import {actions as baseGameActions} from "../../reducers/baseGameReducer";
import {actions as asyncActions} from "../../reducers/asyncServerResponseReducer";
import {actions as desktopSettingPanelActions} from "../../reducers/desktopSettingPanelReducer";

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

class Overlay extends Component<IProps, IState> {
    protected app: PIXI.Application;
    protected overlayContainer: _ReactPixi.IContainer | Ref<any>;
    protected ui_mode: string;
    protected displayUI: any;

    constructor(props: IProps) {
        super(props);
        this.app = props.app;
        this.state = {
            autoplayContentShow: true,
            buttonSelected: "",
            uiElements: [],
            lang: "en"
        }
        // this.overlayContainer = React.createRef();
        this.overlayContainer = {}
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

    bindUI() {

    }


    componentDidMount() {
    }

    layoutChange(currentLayout: string) {

        this.displayUI.map((data: any, j: number) => {
                if (data.layout === true) {

                    this.props.setApplicationLayoutObject(data.name)
                }
            }
        )

    }


    handleEvent = (e: any) => {

    }

    shouldComponentUpdate(nextProps: Readonly<IProps>, nextState: Readonly<IState>, nextContext: any): boolean {
        if (nextProps.layoutMode !== this.props.layoutMode) {
            this.layoutChange(nextProps.layoutMode)
            return false;

        }
        if (!isMobile) {

        }
        return true;
    }

    hideAutoplay() {

    }

    visibleAutoplay() {

    }

    visibleSettingPanel() {

    }

    hideSettingPanel() {
        this.props.data.COMPONENTS.map((i: any) => {
            i.visible = false
        })
        this.setState({
                autoplayContentShow: false
            }
        )
    }


    render() {
        if (isMobile) {
            return (<></>)
        }
        if (this.props.showAutoplay) {

        }
        if (this.props.showSettingPanelUI) {

        }

        return (
            <UIManager id={"overlayContainer"} type={"Container"} ref={i => this.overlayContainer = i} app={this.app}>
                <UIManager id={"overlayLayer"} type={"Container"} name={"overlayLayer"} app={this.app}>
                    {
                        this.props.data.COMPONENTS && this.props.data.COMPONENTS.map((i: any) =>
                            <UIManager key={`UIManager-Overlay-${Math.random()}`} langObj={this.props.langObj}
                                       type={i.type}
                                       disabled={!i.interactive}
                                       id={i.id} {...i} app={this.app} ClickHandler={this.handleEvent}/>)
                    }
                </UIManager>
            </UIManager>)
    }

}

export default withPixiApp(connect(
    (state: Pick<IStore, 'basegameState' | 'applicationState' | 'autoplayState' | 'desktopSettingPanelState'>): IStateToProps =>
        ({


        }),
    (dispatch: Dispatch): IDispatchToProps => ({
        setApplicationLayoutObject: (layoutobjectlist: any): any => dispatch(layoutssActions.setApplicationLayoutObject(layoutobjectlist)),
        hideAutoplay: (): any => dispatch(autoplayActions.hideAutoplayUI()),
        setAllButtonEnable: (exceptBtnList: Array<string>): any => dispatch(buttonActions.setAllButtonEnable(exceptBtnList)),
        setAutoplay: (autoplayCount: number): any => dispatch(autoplayActions.setAutoplayCount(autoplayCount)),
        startAutoplay: (): any => dispatch(baseGameActions.startAutoplay()),
        setApplicationAutoplayCount: (autoplaycount: number): any => dispatch(baseGameActions.setApplicationAutoplayCount(autoplaycount)),
        getApplicationSpinResponse: (): any => dispatch(asyncActions.getApplicationSpinResponse()),
        setAllButtonDisable: (exceptBtnList: Array<string>): any => dispatch(buttonActions.setAllButtonDisable(exceptBtnList)),
        stoppedAutoplayUI: (autoplayStopped: boolean): any => dispatch(autoplayActions.stoppedAutoplayUI(autoplayStopped)),
        // getNameOfSelectedButton: (selectedButtonName: number): any => dispatch(autoplayActions.getNameOfSelectedButton(selectedButtonName)),
        autoplayReset: (resetAutoplay: boolean): any => dispatch(autoplayActions.autoplayReset(resetAutoplay)),
        setValueOfNumberButton: (numberButtonValue: number): any => dispatch(autoplayActions.setValueOfNumberButton(numberButtonValue)),
        interactivityOfStartButton: (startButtonInteractivity: boolean): any => dispatch(autoplayActions.interactivityOfStartButton(startButtonInteractivity)),
        showDesktopSettingPanelUI: (showSettingPanel: boolean): any => dispatch(desktopSettingPanelActions.showDesktopSettingPanelUI(showSettingPanel)),


    }))(withOverlayConfiguration(Overlay)));