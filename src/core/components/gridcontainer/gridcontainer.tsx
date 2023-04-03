import React, { Component } from "react";
import withGridContainerConfiguration from "./configuration/withGridContainerConfiguration";
import Grid from "./../grid/grid"
import { Container, withPixiApp } from "@inlet/react-pixi";
import UIManager from "../ui/UiBuilder";
import { connect } from "react-redux";
import { IStore } from "../../store/IStore";
import { Dispatch } from "redux";
import { actions as layoutssActions } from "../../reducers/layoutsStateReducer";
import Symbolanimation from "../symbol/symbolanimation";


interface IProps {
    [x: string]: any;

}

interface IState {

}

interface IStateToProps {

    layoutMode: string

}

interface IDispatchToProps {

}


class Gridcontainer extends Component<IProps, IState> {

    protected app: PIXI.Application;
    protected gridContainer: any;
    protected gridList: Array<any>;

    constructor(props: IProps) {
        super(props);

        this.app = props.app;
        this.gridList = [];
    }

    componentDidMount() {
        if (!this.props.data.HIDE_MASK) {
            this.onReelMaskOn()
        }

    }

    layoutChange(currentLayout: string) {

    }

    shouldComponentUpdate(nextProps: Readonly<IProps>, nextState: Readonly<IState>, nextContext: any): boolean {

        if (nextProps.layoutMode !== this.props.layoutMode) {
            this.layoutChange(nextProps.layoutMode)
            return false;
        }

        return true;
    }

    bindEvent() {

    }

    onReelMaskOn() {

        const thing = new PIXI.Graphics();
        thing.beginFill(0xDE3249);
        thing.drawRect(0, 0, (this.props.data.GRID_WIDTH + this.props.data.GRID_GAP) * this.props.data.GRID_COLUMN, this.props.data.SYMBOL_HEIGHT * this.props.data.GRID_ROWS);
        thing.endFill();
        this.gridContainer.addChild(thing);
        thing.x = 0;
        thing.y = 0;
        this.gridContainer.mask = thing;
    }


    onReelMaskOff() {
        this.gridContainer.mask = null;
    }


    render() {
        let reelContainerX = this.props.data.GRID_CONTAINER_X, reelContainerY = this.props.data.GRID_CONTAINER_Y,
            scalingOfReelContainer = this.props.data.REEL_CONTAINER_SCALE

        const reels_array = [];
        for (let i = 0; i < this.props.data.GRID_COLUMN; i++) {
            let PROPS_TO_SEND_Grid = {
                key: "grid" + i,
                name: "grid" + i,
                canvasApp: this.app,
                GridIndex: i,
                gridList: this.gridList,
            }
            reels_array.push(<Grid {...PROPS_TO_SEND_Grid} />);
        }
        return (<>
            {this.props.data.child && this.props.data.child.map((i: any) => <UIManager
                key={`UIManager-${Math.random()}`} type={i.type}
                id={i.id} {...i} />)}
            <Container ref={i => this.gridContainer = i} x={reelContainerX} y={reelContainerY} key={`Container-${Math.random()*10000}`} >
                {reels_array}
            </Container>
            <Symbolanimation configGame={this.props.configGame} posx={reelContainerX} posy={reelContainerY}
                scale={scalingOfReelContainer || 1} REEL_WIDTH={this.props.data.GRID_WIDTH}
                REEL_GAP={this.props.data.GRID_GAP}></Symbolanimation>

        </>)
    }
}

export default withPixiApp(connect(
    (state: Pick<IStore, 'applicationState'>): IStateToProps =>
    ({
        layoutMode: state.applicationState.layoutMode,
    }),
    (dispatch: Dispatch): IDispatchToProps => ({
        setApplicationLayoutObject: (layoutobjectlist: string): any => dispatch(layoutssActions.setApplicationLayoutObject(layoutobjectlist)),
    }))(withGridContainerConfiguration(Gridcontainer)));