import React, {Component, Ref} from "react";
import {_ReactPixi, withPixiApp} from "@inlet/react-pixi";
import {connect} from "react-redux";
import {IStore} from "../../store/IStore";
import {Dispatch} from "redux";
import UIManager from "../ui/UiBuilder";
import {alllanguage} from "../../data/lang/index"
import {Ilanguage} from "../../interface/Icommon";
import PIXI from "pixi.js";
import AutoplayCanvasFunctionality from "./inCanvas/autoplayCanvasFunctionality";
import withAutoplayConfiguration from "./configuration/withAutoplayConfiguration";
import {actions as autoplayActions} from "../../reducers/autoplayReducer";
import {actions as baseGameActions} from "../../reducers/baseGameReducer";
import {actions as layoutssActions} from "../../reducers/layoutsStateReducer";
import {isMobile} from "react-device-detect";

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

class AutoplayInCanvas extends Component<IProps, IState> {
    protected app: PIXI.Application;
    protected autoplayInCanvas_Container: _ReactPixi.IContainer | Ref<any>;
    private alllanguage: Ilanguage;
    protected ui_mode: string;
    protected displayUI: any;

    constructor(props: IProps) {
        super(props);
        this.app = props.app;
        this.state = {
            uiElements: [],
            lang: "en",
        }
        this.alllanguage = alllanguage;
        this.autoplayInCanvas_Container = {};
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

    shouldComponentUpdate(nextProps: Readonly<IProps>, nextState: Readonly<IState>, nextContext: any): boolean {

        if (nextProps.lossLimit && nextProps.lossLimit !== this.props.lossLimit) {
            this.showAutoplayStopped();
            this.props.showAutoplayUI();
            return false;
        }
        if (nextProps.layoutMode !== this.props.layoutMode) {
            this.layoutChange(nextProps.layoutMode)
            return false;
        }

        return true;
    }

    layoutChange(currentLayout: string) {
        this.props.data.COMPONENTS.map((data: any, j: number) => {
                if (data.layout === true) {
                    this.props.setApplicationLayoutObject(data.name)
                }
            }
        )
    }

    showAutoplayStopped() {
        this.props.stoppedAutoplayUI(true);
    }

    render() {
        if (!this.props.showAutoplay || this.props.InCanvas === 0) {
            return (<></>)
        }
        if (!this.props.autoplayStopped) {
            this.displayUI.map((data: any) => {
                if (data.name === "autoplayTextContainer") {
                    data.visible = true
                }
                if (data.name === "autoplayStoppedContainer") {
                    data.visible = false
                }
            })
        } else {
            this.displayUI.map((data: any) => {
                if (data.name === "autoplayTextContainer") {
                    data.visible = false
                }
                if (data.name === "autoplayStoppedContainer") {
                    data.visible = true
                }
            })
        }

        return (
            <UIManager id={"autoplayContainer"} type={"Container"}>
                <UIManager id={"commonLayer"} type={"Container"} name={"commonLayer"}>
                    {
                        this.props.data.COMPONENTS && this.props.data.COMPONENTS.map((i: any) =>

                            <UIManager key={`UIManager-Autoplay-${Math.random()}`} langObj={this.props.langObj}
                                       type={i.type}  name={"commonLayer"}
                                       id={i.id} {...i} app={this.app}/>)
                    }

                    {this.props.data.ButtonsInCanvas &&
                    <AutoplayCanvasFunctionality key={"buttonInCanvasUI"}
                                                 {...this.props} ></AutoplayCanvasFunctionality>
                    }
                </UIManager>
            </UIManager>)
    }

}

export default withPixiApp(connect(
    (state: Pick<IStore, 'basegameState' | 'autoplayState' | 'applicationState'>): IStateToProps =>
        ({

            showAutoplay: state.autoplayState.showAutoplay,
            autoplayCount: state.basegameState.autoplayCount,
            autoplayStopped: state.autoplayState.autoplayStopped,
            lossLimit: state.autoplayState.lossLimit,
            layoutMode: state.applicationState.layoutMode,


        }),
    (dispatch: Dispatch): IDispatchToProps => ({
        stoppedAutoplayUI: (autoplayStopped: boolean): any => dispatch(autoplayActions.stoppedAutoplayUI(autoplayStopped)),
        showAutoplayUI: (): any => dispatch(autoplayActions.showAutoplayUI()),
        stopAutoplay: (): any => dispatch(baseGameActions.stopAutoplay()),
        setApplicationLayoutObject: (layoutobjectlist: string): any => dispatch(layoutssActions.setApplicationLayoutObject(layoutobjectlist)),

    }))(withAutoplayConfiguration(AutoplayInCanvas)));