import React, {Component, Ref} from "react";
import {_ReactPixi, withPixiApp} from "@inlet/react-pixi";
import {connect} from "react-redux";
import {IStore} from "../../store/IStore";
import {Dispatch} from "redux";
import withFlowManagerConfiguration from "./configuration/withFlowManagerConfiguration";
import UIManager from "../ui/UiBuilder";
import PIXI from "pixi.js";
import {actions as layoutssActions} from "../../reducers/layoutsStateReducer";
import {isMobile} from "react-device-detect";

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

class FlowManager extends Component<IProps, IState> {
    protected app: PIXI.Application;
    protected flowManagerContainer: _ReactPixi.IContainer | Ref<any>;
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
            lang: "en"
        }
        // this.flowManagerContainer = React.createRef();
        this.flowManagerContainer = {};
        
        if (isMobile) {
            this.ui_mode = "mobile"
        } else {
            this.ui_mode = "desktop"
        }

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

    bindUI() {
        this.layoutChange(this.props.layoutMode);
       }


    componentDidMount() {
        this.bindUI();
    }

    layoutChange(currentLayout: string) {
        this.displayUI.map((data: any, j: number) => {
                if (data.layout === true) {
                    this.props.setApplicationLayoutObject(data.name)
                }
            }
        )
    }
componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<IState>, snapshot?: any) {

}
    flowStart(){

    }

    shouldComponentUpdate(nextProps: Readonly<IProps>, nextState: Readonly<IState>, nextContext: any): boolean {
        // if (nextProps.callFlowManager !== this.props.callFlowManager) {
        //     this.flowStart();
        //     return false;
        // }
        if (nextProps.layoutMode !== this.props.layoutMode) {
            this.layoutChange(nextProps.layoutMode)
            return false;
        }

        return false;
    }

    render() {
        // if(!this.props.callFlowManager){
        //     return (<></>);
        // }
        return (
            <UIManager id={"flowManagerContainer"} type={"Container"} ref={i => this.flowManagerContainer = i}
                       configGame={this.props.configGame}
                       app={this.app}>
                    {
                        this.displayUI && this.displayUI.map((i: any) =>
                            <UIManager key={`UIManager-${Math.random()}`} langObj={this.props.langObj} type={i.type}
                                       id={i.id} {...i} app={this.app} configGame={this.props.configGame}/>
                        )
                    }
            </UIManager>)
    }

}

export default withPixiApp(connect(
    (state: Pick<IStore, 'flowManagerState' | 'applicationState'>): IStateToProps =>
        ({
            layoutMode: state.applicationState.layoutMode,
           // callFlowManager: state.flowManagerState.callFlowManager,
        }),
    (dispatch: Dispatch): IDispatchToProps => ({
        setApplicationLayoutObject: (layoutobjectlist: any): any => dispatch(layoutssActions.setApplicationLayoutObject(layoutobjectlist)),

    }))(withFlowManagerConfiguration(FlowManager)));