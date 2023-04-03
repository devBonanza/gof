import { Container } from '@inlet/react-pixi'
import React from "react";

interface IProps {
    [x: string]: any;
}

interface IState {
    textElement: any
}

class UISpine extends React.Component<IProps, IState> {
    protected spineContainerObj: any;
    constructor(props: IProps) {
        super(props);
    }

    componentDidMount() {

        const spineLine = new PIXI.spine.Spine(this.props.app.loader.resources[this.props.spinedata.spinename].spineData);
        this.spineContainerObj.spineAnimName = this.props.spinedata.animationname;
        this.spineContainerObj.animationSpeed = this.props.animationSpeed;
        if (spineLine.state.hasAnimation(this.props.spinedata.animationname)) {
            // run forever, little boy!
            spineLine.state.setAnimation(0, this.props.spinedata.animationname, this.props.spinedata.loop);
            // dont run too fast
            spineLine.state.timeScale = this.props.spinedata.timeScale;
        }
        this.spineContainerObj.addChild(spineLine)
    }


    render() {
        return (<Container ref={i => {
            this.props.addRef(this.props.name, i);
            return this.spineContainerObj = i;
        }}
            name={this.props.name}
            visible={this.props.visible || false}
            anchor={this.props.anchor} x={this.props.x}
            y={this.props.y}></Container>)
    }

}

//export default withPixiApp(withButtonPanelConfiguration(ButtonStaticImage));
export default UISpine;