import React, { Component, Ref } from "react";
import withReelGridContainerConfiguration from "./configuration/withReelGridContainerConfiguration";
import Reelgrid from "./../reelgrid/reelgrid"
import { _ReactPixi, Container, withPixiApp } from "@inlet/react-pixi";
import UIManager from "../ui/UiBuilder";
import { connect } from "react-redux";
import { IStore } from "../../store/IStore";
import { Dispatch } from "redux";
import { actions as layoutssActions } from "../../reducers/layoutsStateReducer";
import { isMobile } from "react-device-detect";
import Symbolanimation from "./../symbol/symbolanimation"
import StickyWild from "../reelgrid/stickyWild";
import OverlaySymbol from "../reelgrid/overlaysymbol";
import LandingSymbolAnimation from "../landingsymbol/landingsymbol"


interface IStateToProps {

    layoutMode: string,
    stoppedReel: number

}

interface IDispatchToProps {


}

interface IProps {
    [x: string]: any;


}

interface IState {

}

class ReelGridcontainer extends Component<IProps, IState> {

    protected app: PIXI.Application;
    protected reelContainer: any;
    protected reelContainerForSpinningReels: any;
    protected reelList: Array<any>;

    constructor(props: IProps) {
        super(props);
        this.app = props.app;
        this.reelList = [];
    }

    componentDidMount() {
        this.onReelMaskOn();
    }


    bindEvent() {

    }

    onReelMaskOn() {

        const thing = new PIXI.Graphics();
        thing.beginFill(0xDE3249);
        thing.drawRect(0, 0, (this.props.data.REEL_WIDTH + this.props.data.REEL_GAP) * this.props.data.REEL_COLUMN, this.props.data.SYMBOL_HEIGHT * this.props.data.REEL_ROWS);
        thing.endFill();
        this.reelContainer.addChild(thing);
        thing.x = 0;
        thing.y = 0;
        this.reelContainer.mask = thing;
    }


    onReelMaskOff() {
        this.reelContainer.mask = null;
    }

    layoutChange(currentLayout: string) {

    }

    shouldComponentUpdate(nextProps: Readonly<IProps>, nextState: Readonly<IState>, nextContext: any): boolean {

        if (nextProps.layoutMode !== this.props.layoutMode) {
            this.layoutChange(nextProps.layoutMode)
            return false;
        }
        if (nextProps.stoppedReel !== this.props.stoppedReel) {
            // stoppedReel          
            this.reelContainerForSpinningReels.addChild(this.reelContainerForSpinningReels.children[nextProps.stoppedReel])
            return false;
        }

        return true;
    }

    render() {
        let reelContainerX = this.props.data.REEL_CONTAINER_X, reelContainerY = this.props.data.REEL_CONTAINER_Y,
            scalingOfReelContainer = this.props.data.REEL_CONTAINER_SCALE
        if (isMobile) {
            if (window.innerHeight > window.innerWidth) {
                reelContainerX = this.props.data.REEL_CONTAINER_X_IN_PORTRAIT
                reelContainerY = this.props.data.REEL_CONTAINER_Y_IN_PORTRAIT
                scalingOfReelContainer = this.props.data.REEL_CONTAINER_SCALE_IN_PORTRAIT
            }
        }
        const reels_array: any = [];
        for (let i = 0; i < this.props.data.REEL_COLUMN; i++) {
            reels_array.push(<Reelgrid key={"reelgrid" + i} app={this.app} configGame={this.props.configGame}
                ReelIndex={i}
                reelList={this.reelList} reelHeight={this.props.data.REEL_HEIGHT} />);
        }
        const sticky_reels_array: any = [];
        for (let i = 0; i < this.props.data.REEL_COLUMN; i++) {

            let PROPS_TO_SEND_StickyWild = {
                key: "reelgrid" + i,
                canvasApp: this.app,
                ReelIndex: i,

                reelHeight: this.props.data.REEL_HEIGHT,
            }
            this.props.data.IS_STICKY_WILD_PRESENT && sticky_reels_array.push(<StickyWild {...PROPS_TO_SEND_StickyWild} />);
        }

        const overlay_symbol_array: any = [];
        for (let i = 0; i < this.props.data.REEL_COLUMN; i++) {

            let PROPS_TO_SEND_OverlaySymbol = {
                key: "reelgrid" + i,
                canvasApp: this.app,
                ReelIndex: i,
                configGame: this.props.configGame,
                reelHeight: this.props.data.REEL_HEIGHT,
            }
            overlay_symbol_array.push(<OverlaySymbol {...PROPS_TO_SEND_OverlaySymbol} />);
        }
      
        return (<>
            {this.props.data.child && this.props.data.child.map((i: any) => <UIManager
                key={`UIManager-${Math.random()}`} type={i.type}
                id={i.id} {...i} app={this.app} configGame={this.props.configGame} />)}
            <Container ref={i => this.reelContainer = i} x={reelContainerX} y={reelContainerY} key={`Container-${Math.random()*10000}`}
                scale={scalingOfReelContainer === undefined ? 1:scalingOfReelContainer}>
                {/*<Graphics*/}

                {/*    x={0}*/}
                {/*    y={0}*/}
                {/*    draw={g => {*/}


                {/*        g.beginFill(0xff00bb, 1)*/}
                {/*        g.drawRoundedRect(0, 0, 1000, 1000, 1)*/}
                {/*        g.endFill()*/}

                {/*    }}*/}
                {/*/>*/}

                {<Container ref={i => this.reelContainerForSpinningReels = i}   key={`Container-${Math.random()*10000}`} >
                    {reels_array}
                </Container>}

                {sticky_reels_array}
                {overlay_symbol_array}


            </Container>
            <Symbolanimation configGame={this.props.configGame} posx={reelContainerX} posy={reelContainerY}
                 scale={scalingOfReelContainer === undefined ? 1:scalingOfReelContainer} REEL_WIDTH={this.props.data.REEL_WIDTH}
                REEL_GAP={this.props.data.REEL_GAP}></Symbolanimation>

            <LandingSymbolAnimation configGame={this.props.configGame} posx={reelContainerX} posy={reelContainerY}
                 scale={scalingOfReelContainer === undefined ? 1:scalingOfReelContainer} REEL_WIDTH={this.props.data.REEL_WIDTH}
                REEL_GAP={this.props.data.REEL_GAP}></LandingSymbolAnimation>

        </>)
    }
}

// export default withPixiApp(withReelGridContainerConfiguration(ReelGridcontainer));
export default withPixiApp(connect(
    (state: Pick<IStore, 'applicationState' | 'reelgridState'>): IStateToProps =>
    ({
        layoutMode: state.applicationState.layoutMode,
        stoppedReel: state.reelgridState.stoppedReel,
    }),
    (dispatch: Dispatch): IDispatchToProps => ({
        setApplicationLayoutObject: (layoutobjectlist: string): any => dispatch(layoutssActions.setApplicationLayoutObject(layoutobjectlist)),
    }))(withReelGridContainerConfiguration(ReelGridcontainer)));