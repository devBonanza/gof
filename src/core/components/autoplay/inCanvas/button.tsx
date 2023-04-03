import React, { Component } from "react";
import { Sprite } from "@inlet/react-pixi";

interface IProps {
    [x: string]: any;
}

interface IStateToProps {

}

interface IDispatchToProps {

}

interface IState {
    selected: boolean

}

export class STARTBUTTONCODE extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

    }

    shouldComponentUpdate(nextProps: Readonly<IProps>, nextState: Readonly<IState>, nextContext: any): boolean {
        return true;
    }

    componentDidMount() {


    }

    render() {

        let numberImage = "";

        let selected = this.props.defaultstate;

        if (selected) {
            numberImage = this.props.imgeOfButton[1];
        } else {
            numberImage = this.props.imgeOfButton[0];
        }

        return (<>
            <Sprite anchor={0.5} image={numberImage} x={this.props.buttonX} y={this.props.buttonY}
                width={this.props.buttonWidth} height={this.props.buttonHeight}  name={this.props.name}
                interactive buttonMode
                mouseup={() => {

                    this.props.beforeClick && this.props.beforeClick.call(this.props.scope);

                }}
            />

        </>

        )
    }
}

