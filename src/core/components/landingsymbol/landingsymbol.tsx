import React, { Component } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { withPixiApp } from "@inlet/react-pixi";
import _ from "lodash";
import UIManager from "../ui/UiBuilder";
import withlandingsymbolconfiguration from "./configuration/withlandingsymbolconfiguration";
import { actions as landingSymbolAction } from "../../reducers/landingsymbolreducer";
import { IStore } from "../../store/IStore";

interface IProps {
    [x: string]: any;
}

interface IStateToProps {
    [x: string]: any;
}

interface IDispatchToProps {
}

interface IState {
    [x: string]: any;
}

class LandingSymbolAnimation extends Component<IProps, IState> {
    protected app: PIXI.Application;
    protected symbolImage: any = [];
    protected symbolAnimations: any = [];
    protected landingsymbolanimationcontainer: any;

    protected symbolId: any;
    protected rowId: any;
    protected reelId: any;
    protected reel: any;
    protected playAnimation: boolean;
    protected startBlastAnim: boolean;
    protected animationName: string;
    protected SINGLE_SYMBOL_DELAY_IN_ANIM: number;
    protected SHOW_GROUP_WIN_SYMBOL_DELAY: number;
    protected SYMBOL_ANIMATION_GRP_WISE: boolean;
    protected LOOP: boolean;

    constructor(props: IProps) {
        super(props);
        this.app = props.app;

        this.symbolId = props.SYMBOL_ID;
        this.rowId = props.ROW_ID;
        this.reelId = props.REEL_ID;
        this.reel = props.REEL;
        this.playAnimation = false;
        this.startBlastAnim = false;
        this.animationName = "anim";
        this.SINGLE_SYMBOL_DELAY_IN_ANIM = this.props.data.SINGLE_SYMBOL_DELAY_IN_ANIM;
        this.SHOW_GROUP_WIN_SYMBOL_DELAY = this.props.configGame.SHOW_GROUP_WIN_SYMBOL_DELAY;
        this.SYMBOL_ANIMATION_GRP_WISE = this.props.data.SYMBOL_ANIMATION_GRP_WISE;
        this.LOOP = false;
       // this.landingsymbolanimationcontainer = React.createRef();
        this.landingsymbolanimationcontainer = {};

        this.state = {
            listOfanimationSymbol: []
        }
        this.init();
    }

    init() {
        for (let i = 0; i < this.props.data.symbolsAnimation.length; i++) {
            this.symbolImage.push(this.props.data.symbolsAnimation[i]);

        }
        this.bindEvent();
    }

    bindEvent() {
    }

    onDeletesymbolonreel(symbol: any) {

    }

    onUpdateRandomSymbolOnReel(symbol: any) {
        let randomSymbolIndex = Math.floor(Math.random() * this.symbolImage.length);
        let randomSymbolId = this.symbolImage[randomSymbolIndex].id;
        this.onUpdateSymbolOnReel(symbol, randomSymbolId);
    }

    onUpdateSymbolOnReel(symbol: any, newSymbolId: number, random?: boolean) {
        if (random === undefined) {
            random = false;
        }

        if (random) {

            if (symbol.rowId === this.rowId && symbol.reelId === this.reelId) {

                let randomSymbolIndex = Math.floor(Math.random() * this.symbolImage.length);
                this.symbolId = this.symbolImage[randomSymbolIndex].id;
            }
        } else {
            if (symbol.rowId === this.rowId && symbol.reelId === this.reelId) {
                this.symbolId = newSymbolId;
            }
        }
    }

    onUpdateSymbolAnimationName(animationName: string) {
        this.animationName = animationName;
    }

    isObject(obj: any) {
        let type = typeof obj;
        return type === 'function' || type === 'object' && !!obj;
    };

    iterationCopy(src: any) {
        let target: any = {};
        for (let prop in src) {
            if (src.hasOwnProperty(prop)) {
                // if the value is a nested object, recursively copy all it's properties
                if (this.isObject(src[prop])) {
                    target[prop] = this.iterationCopy(src[prop]);
                } else {
                    target[prop] = src[prop];
                }
            }
        }
        return target;
    }

    playSymbolAnimation(symbol: any) {
        symbol.playing=true

      //  symbol.loop = true;
    }

    playZoomInOutAnim(symbolObj: any) {

    }

    componentDidMount() {

    }
    componentDidUpdate() {
        if (!this.props.playLandingAnimation) {
            return;
        }

        for (let i = 0; i < UIManager.getRef("landingsymbolanimationcontainer").children.length; i++) {
            this.playSymbolAnimation(UIManager.getRef("landingsymbolanimationcontainer").children[i]);
        }
    }

    addGlitch(symbol: any) {
    }

    shouldComponentUpdate(nextProps: Readonly<IProps>, nextState: Readonly<IState>, nextContext: any): boolean {
        if (nextProps.reel_data !== this.props.reel_data
            || nextProps.playLandingAnimation !== this.props.playLandingAnimation
            || nextProps.countStopReels !== this.props.countStopReels
            || nextProps.spinStart !== this.props.spinStart
            || nextProps.landingAnimPositions !== this.props.landingAnimPositions
        ) {

            if (nextProps.landingAnimPositions !== this.props.landingAnimPositions) {
                if (nextProps.landingAnimPositions.length == 0) {
                    this.setState((prevState) => {
                        return {
                            ...prevState,
                            listOfanimationSymbol: [],
                        }
                    })
                }
            }
            if (nextProps.playLandingAnimation && nextProps.playLandingAnimation !== this.props.playLandingAnimation) {

                let animationInfo: any = []
                UIManager.getRef("landingsymbolanimationcontainer").visible = true;       
                nextProps.landingAnimPositions.forEach((data: any, index: number) => {


                    if (data.rowId < nextProps.displayReelGridSymbolCount[data.reelId]) {
                        animationInfo.push({
                            symbolRow: data.rowId,
                            symbolColumn: data.reelId,
                            symbolId: nextProps.reel_data.stopReels[data.reelId][data.rowId]
                        })
                    }


                })

                this.setState((prevState) => {
                    return {
                        ...prevState,
                        listOfanimationSymbol: animationInfo,
                    }
                })
            }

            if (nextProps.spinStart && nextProps.spinStart !== this.props.spinStart) {
                this.clearAllChild();
                this.setState((prevState) => {
                    return {
                        ...prevState,
                        listOfanimationSymbol: [],
                    }
                })

            }

            return false;
        }
        return true;
    }

    private clearAllChild():void{
        for (let i = 0; i < UIManager.getRef("landingsymbolanimationcontainer").children.length; i++) {
            UIManager.getRef("landingsymbolanimationcontainer").children[i].removeChildren();
        }
        UIManager.getRef("landingsymbolanimationcontainer").removeChildren();
        UIManager.getRef("landingsymbolanimationcontainer").visible = false;      
        this.landingsymbolanimationcontainer.COMPONENT = null;
       // this.showSymbolsAnmation = false;

        
       
    }


    onCompleteCallBack(e: any, scope: any) {

    }

    getSymbolIndex(symbolId: number) {

        let symbolIndex = -1;
        this.symbolImage.filter((data: any, index: number) => {
            if (data.id == symbolId) {
                symbolIndex = index;
                return index;
            }
        })
        return symbolIndex;
    }


    render() {
        let {
            listOfanimationSymbol
        } = this.state
        let symbolChild_array: any = [];
        listOfanimationSymbol.map((data: any, i: any) => {
            let symbolIndex = this.getSymbolIndex(data.symbolId);

            let symbolContainer = this.symbolImage[symbolIndex];

            symbolContainer && symbolContainer.child.map((data: any, j: any) => {

                if (symbolContainer.child[j].x == undefined) {
                    symbolContainer.child[j].x = 0;
                }
                if (symbolContainer.child[j].y == undefined) {
                    symbolContainer.child[j].y = 0;
                }
                this.LOOP = symbolContainer.loop;
                symbolChild_array.push(
                    <UIManager type="Container"
                        key={`UIManager-${Math.random()}`}   {...symbolContainer.child[j]}
                        playanimname={this.animationName || "anim"}
                        name={"landing_animation_" + listOfanimationSymbol[i].symbolColumn + "_" + listOfanimationSymbol[i].symbolRow}
                        playing={this.playAnimation} scope={this}
                        x={symbolContainer.child[j].x + symbolContainer.offsetX + listOfanimationSymbol[i].symbolColumn * this.props.REEL_WIDTH + listOfanimationSymbol[i].symbolColumn * this.props.REEL_GAP}
                        reelId={listOfanimationSymbol[i].symbolColumn}
                        rowId={listOfanimationSymbol[i].symbolRow}
                        onComplete={this.onCompleteCallBack}
                        anchor = {symbolContainer.anchor || [0, 0]}
                        y={symbolContainer.child[j].y + symbolContainer.offsetY + symbolContainer.height * listOfanimationSymbol[i].symbolRow}
                        app={this.app} configGame={this.props.configGame} visible={false} />
                );
            });
        });

        return (
            <UIManager ref={i => this.landingsymbolanimationcontainer = i} type={"Container"} id={"landingsymbolanimationcontainer"}
                app={this.app}
                configGame={this.props.configGame}
                name={"landingsymbolanimationcontainer"} x={this.props.posx}
                y={this.props.posy} visible={true} scale={this.props.scale === undefined?1:this.props.scale}>
                {symbolChild_array}
            </UIManager>)
    }


}

export default withPixiApp(connect(
    (state: Pick<IStore, 'landingState' | 'reelgridState' | 'gridsState' | 'reelsState'>, ownProps?: any): IStateToProps =>
    ({
        displayReelGridSymbolCount: state.reelgridState.displayReelGridSymbolCount,
        playLandingAnimation: state.landingState.playLandingAnimation,
        landingAnimPositions: state.landingState.landingAnimPositions,
        spinStart: state.reelgridState.spinStart,
        countStopReels: state.reelgridState.countStopReels,
        reel_data: ownProps && ownProps.configGame["SPIN_TYPE"] === 1 && state.gridsState.reel_data || ownProps && ownProps.configGame["SPIN_TYPE"] === 2 && state.reelgridState.reel_data || state.reelsState.reel_data,

    }),
    (dispatch: Dispatch): IDispatchToProps => ({
        playLandingAnim: (): any => dispatch(landingSymbolAction.playLandingAnim()),
    }))(withlandingsymbolconfiguration(LandingSymbolAnimation)));