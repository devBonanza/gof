import { withPixiApp} from '@inlet/react-pixi'
import React from "react";
import withButtonPanelConfiguration from "../configuration/withButtonPanelConfiguration";

import PIXI from "pixi.js";

interface IProps {
    [x: string]: any;
}

interface IState {
    showButtonPanel: boolean,
}

class ButtonPanelInReact extends React.Component<IProps, IState> {

    protected app: PIXI.Application;
    constructor(props: IProps) {
        super(props);
        this.app = props.app;
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render() {
        return (<div></div>)
    }
}

export default withPixiApp(withButtonPanelConfiguration(ButtonPanelInReact));