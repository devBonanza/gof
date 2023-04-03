import React, { Component } from "react";
import { withPixiApp } from "@inlet/react-pixi";
import { connect } from "react-redux";
import { IStore } from "../../store/IStore";
import { Dispatch } from "redux";
import withWrapperConfiguration from "../wrapper/configuration/withWrapperConfiguration";

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

class Wrapper extends Component<IProps, IState> {
    protected app: PIXI.Application;

    constructor(props: IProps) {
        super(props);
        this.app = props.app;

        this.state = {
            index: 0,
            width: this.props.width,
            height: this.props.height,
        }
    }

    render() {
        return (<div></div>)
    }


}

export default withPixiApp(connect(
    (state: Pick<IStore, 'paytableState'>): IStateToProps =>
        ({}),
    (dispatch: Dispatch): IDispatchToProps => ({
    }))(withWrapperConfiguration(Wrapper)));