import React, { Component } from "react";
import { withPixiApp } from "@inlet/react-pixi";
import withPaytableConfiguration from "./configuration/withPaytableConfiguration";
import * as PIXI from "pixi.js";
import UIManager from "./../ui/UiBuilder";
import { connect } from "react-redux";
import { IStore } from "../../store/IStore";
import { Dispatch } from "redux";
import { actions as layoutssActions } from "../../reducers/layoutsStateReducer";
import { isMobile } from "react-device-detect";

interface IProps {
    [x: string]: any;

}

interface IState {

}

interface IStateToProps {


}

interface IDispatchToProps {


}

class Paytable extends Component<IProps, IState> {
    protected app: PIXI.Application;

    protected paytableContainer: any;
    protected ui_mode: string;
    protected displayUI: any;

    constructor(props: IProps) {
        super(props);

        this.app = props.app;
        // this.paytableContainer = React.createRef();
        this.paytableContainer ={};
        if (isMobile) {
            this.ui_mode = "mobile"
        } else {
            this.ui_mode = "desktop"
        }
        this.displayUI = this.props.data.COMPONENTS.filter(this.checkUiMode.bind(this));
    }

    layoutChange(currentLayout: string) {
        this.displayUI.map((data: any, j: number) => {
            if (data.layout === true) {
                this.props.setApplicationLayoutObject(data.name)
            }
        }
        )
    }
    checkUiMode(uimodeobj: any) {

        if (uimodeobj.uimode === undefined) {
            uimodeobj.uimode = "both"
        }
        if (uimodeobj.uimode === "both" || uimodeobj.uimode === this.ui_mode) {
            return uimodeobj;
        }
    }

    onClick(evt: any) {

    }

    shouldComponentUpdate(nextProps: Readonly<IProps>, nextState: Readonly<IState>, nextContext: any): boolean {

        if (nextProps.layoutMode !== this.props.layoutMode) {
            this.layoutChange(nextProps.layoutMode)
            return false;
        }
        return false;
    }

    render() {
        return (
            <UIManager i id={"paytableContainer"} name={"paytableContainer"} type={"Container"} ref={i => this.paytableContainer = i}
                configGame={this.props.configGame}
                app={this.app}>

                {
                    this.displayUI && this.displayUI.map((i: any) =>
                        <UIManager key={`UIManager-${Math.random()}`} langObj={this.props.langObj} type={i.type}
                            id={i.id} {...i} app={this.app} configGame={this.props.configGame} />
                    )
                }

            </UIManager>)
    }
}


export default withPixiApp(connect(
    (state: Pick<IStore, 'applicationState'>): IStateToProps =>
    ({
        layoutMode: state.applicationState.layoutMode,

    }),
    (dispatch: Dispatch): IDispatchToProps => ({
        setApplicationLayoutObject: (layoutobjectlist: string): any => dispatch(layoutssActions.setApplicationLayoutObject(layoutobjectlist)),

    }))(withPaytableConfiguration(Paytable)));