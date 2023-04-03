import { Container } from '@inlet/react-pixi'
import React from "react";
import UIManager from "./UiBuilder";

interface IProps {
    [x: string]: any;
}

interface IState {
}

class UIContainer extends React.Component<IProps, IState> {
    protected containerObj: any;
    protected Layer: any;
    protected offsetX: any;
    protected offsetY: any;

    constructor(props: IProps) {
        super(props);
        this.containerObj = {};
        this.Layer = {};
        this.offsetX = this.props.offsetX;
        this.offsetY = this.props.offsetY;
    }


    componentDidMount() {
    }

    createContainer() {
        return (<Container ref={i => this.containerObj = i} x={this.props.x} y={this.props.y}  key={`Container-${Math.random()*10000}`}
            visible={this.props.visible || false}
            width={this.props.width} anchor={this.props.anchor}
            height={this.props.height}></Container>);
    }
    handlerEvent(){

    }

    componentWillUnmount() {
    }

    addRef = (name: string, ref: any) => {
        UIManager.ref[name] = ref
    }
    
    render() {
        if (this.props.child) {          
            return <Container {...this.props}  key={`Container-${Math.random()*10000}`} ref={i => {
                this.props.addRef(this.props.name, i);
                return this.containerObj = i;
            }}>
                {this.props.child.map((i: any) => <UIManager addRef={this.addRef} key={Math.floor(Math.random() * 100000)}
                    type={i.type} id={i.id} {...i} ClickHandler={this.props.ClickHandler === undefined ? this.handlerEvent.bind(this):this.props.ClickHandler} //mouseOver={this.props.mouseOver} mouseOut={this.props.mouseOut}
                    langObj={this.props.langObj} app={this.props.app} />)}
            </Container>
        } else {
            return <Container ref={i => {
                this.props.addRef(this.props.name, i);
                return this.containerObj = i;
            }} {...this.props} ></Container>
        }
    }
}
export default UIContainer;