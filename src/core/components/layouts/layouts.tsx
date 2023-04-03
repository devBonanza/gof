import React, { Component } from "react";
import { withPixiApp } from "@inlet/react-pixi";
import { connect } from "react-redux";
import { IStore } from "../../store/IStore";
import { Dispatch } from "redux";
import withLayoutsConfiguration from "../layouts/configuration/withLayoutsConfiguration";
import { actions as layoutssActions } from "../../reducers/layoutsStateReducer";
import UIManager from "../ui/UiBuilder";
import { isMobile } from "react-device-detect";

interface IProps {
    [x: string]: any;

}

interface IStateToProps {

}

interface IDispatchToProps {


}

interface IState {
    index: number,

    width: number | string,
    height: number | string,


}

class Layouts extends Component<IProps, IState> {
    protected app: PIXI.Application;
    protected propertyUsed: any;
    protected ui_mode: string;

    constructor(props: IProps) {
        super(props);

        this.app = props.app;
        this.propertyUsed = {
            x: 0, y: 0, visible: false
        };
        this.state = {
            index: 0,
            width: this.props.width,
            height: this.props.height,
        }
        if (isMobile) {
            this.ui_mode = "mobile"
        } else {
            this.ui_mode = "desktop"
        }
    }

    shouldComponentUpdate(nextProps: Readonly<IProps>, nextState: Readonly<IState>, nextContext: any): boolean {
        if (nextProps.layoutObjName.length !== 0 && nextProps.layoutObjName !== this.props.layoutObjName) {

            this.reArrangeUI(nextProps.layoutObjName, nextProps);
            return false;
        }
        return true;
    }

    reArrangeUI(layoutObjList: any, updatedProps: any) {
        updatedProps.data.layouts.map((data: any, j: number) => {
            if (layoutObjList.indexOf(data.name) > -1) {
                if (data.handMode == undefined) {
                    data.handMode = "right"
                }
                data.propertyTobeSet = false;
                if (data.screenMode !== updatedProps.layoutMode && data.handMode === updatedProps.handMode && data.uiMode === this.ui_mode) {
                    for (let key in this.propertyUsed) {


                        if (key == "scale") {

                        } else {
                            // UIManager.getRef(data.name)[key] = this.propertyUsed[key];
                            UIManager.getRef(data.name) && (UIManager.getRef(data.name)[key] = this.propertyUsed[key]);

                        }

                    }
                }
                if (data.screenMode === updatedProps.layoutMode && data.handMode === updatedProps.handMode && data.uiMode === this.ui_mode) {

                    data.propertyTobeSet = true;

                }

            }
        }
        )

        updatedProps.data.layouts.map((data: any, j: number) => {
            if (layoutObjList.indexOf(data.name) > -1 && data.propertyTobeSet == true) {
                if (data.handMode == undefined) {
                    data.handMode = "right"
                }


                if (data.screenMode === updatedProps.layoutMode && data.handMode === updatedProps.handMode && data.uiMode === this.ui_mode) {


                    for (let key in this.propertyUsed) {
                        if (key == "scale") {
                            // UIManager.getRef(data.name)[key].x = data[key];
                            // UIManager.getRef(data.name)[key].y = data[key];
                        } else {
                            UIManager.getRef(data.name) && (UIManager.getRef(data.name)[key] = data[key]);

                        }


                    }
                }

            }
        }
        )
        this.props.clearApplicationLayoutObject();
    }

    render() {


        return (<div></div>)
    }

}

export default withPixiApp(connect(
    (state: Pick<IStore, 'layoutsState' | 'applicationState'>): IStateToProps =>
    ({
        handMode: state.applicationState.handMode,
        layoutMode: state.applicationState.layoutMode,
        layoutObjName: state.layoutsState.layoutObjName,
    }),
    (dispatch: Dispatch): IDispatchToProps => ({
        clearApplicationLayoutObject: (): any => dispatch(layoutssActions.clearApplicationLayoutObject()),
    }))(withLayoutsConfiguration(Layouts)));