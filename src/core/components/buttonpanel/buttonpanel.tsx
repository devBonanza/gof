import React, {Component} from "react";
import PIXI from "pixi.js";
import withButtonPanelConfiguration from "./configuration/withButtonPanelConfiguration";
import { withPixiApp} from '@inlet/react-pixi'
import {connect} from "react-redux";
import {IStore} from "../../store/IStore";
import {Dispatch} from "redux";
import ButtonPanelInCanvas from "./inCanvas/buttonPanelInCanvas";
import UIManager from "../ui/UiBuilder";
import {isMobile} from "react-device-detect";
import {actions as layoutssActions} from "../../reducers/layoutsStateReducer";


interface IProps {
    [x: string]: any;

}

interface IStateToProps {
    [x: string]: any;

}

interface IDispatchToProps {
    [x: string]: any;
}

interface IState {

    [x: string]: any;
}

class Buttonpanel extends Component<IProps, IState> {

    protected app: PIXI.Application;

    protected allButtonContainer: any;
    protected ui_mode: string;
    protected displayUI: any;


    constructor(props: IProps) {
        super(props);
        this.app = props.app;

        this.state = {
            showButtonPanel: true,
            layout: ""

        }
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
        //this.layoutChange(this.props.layoutMode)
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

    init() {

    }


    shouldComponentUpdate(nextProps: Readonly<IProps>, nextState: Readonly<IState>, nextContext: any): boolean {

        if (nextProps.layoutMode !== this.props.layoutMode) {
            this.layoutChange(nextProps.layoutMode)
            return false;

        }
        return true;
    }


    onHideLoader() {
        this.setState((prevState) => {
            return {
                ...prevState,
                showButtonPanel: true,
            }
        })
    }


    render() {
        const {showButtonPanel} = this.state;
        if (!showButtonPanel || !this.props.buttonPanelVisibility) return (<></>)
        return (<UIManager ref={i => this.allButtonContainer = i} type={"Container"} key={`UIManager-${Math.random()}`}
                           id={"allbuttonContainer"} name={"allbuttonContainer"} app={this.app}
                           configGame={this.props.configGame}>


            {this.props.data.COREBUTTONPANEL &&
            <ButtonPanelInCanvas key={"buttonInCanvasUI"} langObj={this.props.langObj} app={this.app}
                                 {...this.props} ></ButtonPanelInCanvas>
            }


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
    (state: Pick<IStore, 'applicationState' | 'basegameState' | 'asyncInitAction'>): IStateToProps =>
        ({

            layoutMode: state.applicationState.layoutMode,
            buttonPanelVisibility: state.applicationState.buttonPanelVisibility,

        }),
    (dispatch: Dispatch): IDispatchToProps => ({
        setApplicationLayoutObject: (layoutobjectlist: any): any => dispatch(layoutssActions.setApplicationLayoutObject(layoutobjectlist)),

    }))(withButtonPanelConfiguration(Buttonpanel)));