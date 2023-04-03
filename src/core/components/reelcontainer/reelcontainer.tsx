import React, { Component } from "react";
import withReelContainerConfiguration from "./configuration/withReelContainerConfiguration";
import Reels from "./../reels/reels"
import StickyWild from "./../reels/stickyWild"
import { _ReactPixi, Container, withPixiApp } from "@inlet/react-pixi";
import UIManager from "../ui/UiBuilder";
import { isMobile } from "react-device-detect";
import { connect } from "react-redux";
import { IStore } from "../../store/IStore";
import { Dispatch } from "redux";
import Symbolanimation from "../symbol/symbolanimation";
import LandingSymbolAnimation from "../landingsymbol/landingsymbol"

interface IDispatchToProps {

}

interface IStateToProps {

}

interface IProps {
    [x: string]: any;

}

interface IState {

}

class Reelcontainer extends Component<IProps, IState> {

    protected app: PIXI.Application;
    protected reelContainer: any;
    protected reelList: Array<any>;
    protected ui_mode: string;
    protected displayUI: any;

    constructor(props: IProps) {
        super(props);

        this.app = props.app;
        this.reelList = [];
        if (isMobile) {
            this.ui_mode = "mobile"
        } else {
            this.ui_mode = "desktop"
        }
        this.displayUI = this.props.data.child.filter(this.checkUiMode.bind(this))
    }

    checkUiMode(uimodeobj: any) {

        if (uimodeobj.uimode === undefined) {
            uimodeobj.uimode = "both"
        }
        if (uimodeobj.uimode === "both" || uimodeobj.uimode === this.ui_mode) {
            return uimodeobj;
        }
    }

    componentDidMount() {
        this.onReelMaskOn()
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

    shouldComponentUpdate(nextProps: Readonly<IProps>, nextState: Readonly<IState>, nextContext: any): boolean {
        if (nextProps.layoutMode !== this.props.layoutMode) {
            this.layoutChange(nextProps.layoutMode)

        }
        return true
    }

    layoutChange(currentLayout: string) {
        this.displayUI.map((data: any, j: number) => {
            if (data.layout === true) {
                this.props.setApplicationLayoutObject(data.name)
            }
        }
        )
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
            let PROPS_TO_SEND_Reels = {
                key: "reel" + i,
                canvasApp: this.app,
                ReelIndex: i,
                reelList: this.reelList,
                reelHeight: this.props.data.REEL_HEIGHT,
            }
            reels_array.push(<Reels {...PROPS_TO_SEND_Reels} />);
        }
        const sticky_reels_array: any = [];
        for (let i = 0; i < this.props.data.REEL_COLUMN; i++) {

            let PROPS_TO_SEND_StickyWild = {
                key: "reel" + i,
                canvasApp: this.app,
                ReelIndex: i,

                reelHeight: this.props.data.REEL_HEIGHT,
            }

            this.props.data.IS_STICKY_WILD_PRESENT && sticky_reels_array.push(<StickyWild {...PROPS_TO_SEND_StickyWild} />);
        }
        return (<>
            {this.displayUI && this.displayUI.map((i: any) => <UIManager key={`UIManager-${Math.random()}`}
                type={i.type}
                id={i.id} {...i} />)}
            <Container ref={i => this.reelContainer = i} x={reelContainerX} y={reelContainerY}
                scale={scalingOfReelContainer} key={`Container-${Math.random()*10000}`} >
                {reels_array}
                {sticky_reels_array}
            </Container>
            <Symbolanimation configGame={this.props.configGame} posx={reelContainerX} posy={reelContainerY}
                scale={scalingOfReelContainer} REEL_WIDTH={this.props.data.REEL_WIDTH} key={`Symbolanimation-${Math.random()*10000}`}
                REEL_GAP={this.props.data.REEL_GAP}></Symbolanimation>


            <LandingSymbolAnimation configGame={this.props.configGame} posx={reelContainerX} posy={reelContainerY}
                scale={scalingOfReelContainer} REEL_WIDTH={this.props.data.REEL_WIDTH}   key={`LandingSymbolAnimation-${Math.random()*10000}`}
                REEL_GAP={this.props.data.REEL_GAP}></LandingSymbolAnimation>

        </>)
    }
}


export default withPixiApp(connect(
    (state: Pick<IStore, 'winpresentationState' | 'applicationState' | 'basegameState'>, ownProps?: any): IStateToProps =>
    ({
        layoutMode: state.applicationState.layoutMode,

    }),
    (dispatch: Dispatch, ownProps): IDispatchToProps => ({

    }))(withReelContainerConfiguration(Reelcontainer)));