import React, { Component } from "react";
import withSymbolConfiguration from "../symbol/configuration/withSymbolConfiguration";
import { actions as overlayActions } from "../../reducers/overlayreducer";
import { withPixiApp } from "@inlet/react-pixi";
import UIManager from "../ui/UiBuilder";
import { connect } from "react-redux";
import { IStore } from "../../store/IStore";
import { Dispatch } from "redux";
import { configGame } from "../../data/config";

interface IState {
}

interface IProps {
    [x: string]: any;
}

interface IStateToProps {
}

interface IDispatchToProps {
}

class Symbol extends Component<IProps> {
    protected app: PIXI.Application;
    protected symbolImage: any = [];
    protected symbolAnimations: any = [];
    protected symbolcontainer: any;
    protected symbolcontainerobj: any;
    protected symbolId: any;
    protected rowId: any;
    protected reelId: any;
    protected reel: any;
    protected symbolVisibility: boolean;
    protected playAnimation: boolean;
    protected startBlastAnim: boolean;
    protected animationName: string;

    constructor(props: IProps) {
        super(props);
        this.app = props.app;
        this.symbolId = props.SYMBOL_ID;
        this.rowId = props.ROW_ID;
        this.reelId = props.REEL_ID;
        this.reel = props.REEL;
        this.playAnimation = false;
        this.symbolVisibility = true;
        this.startBlastAnim = false;
        this.animationName = "";
       // this.symbolcontainer = React.createRef();
        this.symbolcontainer = {};

        this.symbolcontainerobj = [];
        this.init();
    }

    init() {
        for (let i = 0; i < this.props.data.symbols.length; i++) {
            this.symbolImage.push(this.props.data.symbols[i]);
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

        this.symbolId = newSymbolId;
        this.symbolcontainer.symbolId = this.symbolId;
        this.getSymbolIndex(this.symbolId);
        let symbolContainer = this.symbolcontainerobj;//this.symbolImage[symbolIndex];
       

        symbolContainer.child.map((data: any, m: number) => {
            this.symbolcontainer.width = symbolContainer.width;
            this.symbolcontainer.height = symbolContainer.height;
            this.symbolcontainer.offsetX = symbolContainer.offsetX || 0;
            this.symbolcontainer.offsetY = symbolContainer.offsetY || 0;
            this.symbolcontainer.anchor = symbolContainer.anchor || [0, 0];
        });
    }

    onUpdateSymbolAnimationName(symbol: any, animationName: string) {
        if (symbol.rowId === this.rowId && symbol.reelId === this.reelId) {
            this.animationName = animationName;
            if (this.animationName === "blast") {
                this.startBlastAnim = true;
            }
        }
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

    componentDidMount() {
        this.symbolcontainer.rowId = this.rowId;
        this.symbolcontainer.reelId = this.reelId;
        this.symbolcontainer.symbolId = this.symbolId;
        this.symbolcontainer.visible = true;
        this.reel.symbols.push(this.symbolcontainer);
        this.props.setOverlaySymbolList(this.props.data.OVERLAY_SYMBOL_LIST)
    }

    shouldComponentUpdate(nextProps: Readonly<IProps>, nextState: Readonly<IState>, nextContext: any): boolean {
        if (nextProps.updatedSymbol.reelId == this.symbolcontainer.reelId && nextProps.updatedSymbol.rowId == this.symbolcontainer.rowId && !this.props.stickyWild) {
            //this.symbolVisibility = false;
            this.rowId = nextProps.updatedSymbol.rowId;
            this.onUpdateSymbolOnReel(nextProps.updatedSymbol, nextProps.updatedSymbolId, nextProps.randomSymbol);
            return true
        }
        return false
    }

    onCompleteCallBack(e: any, scope: any) {
        scope.playAnimation = false;
        scope.startBlastAnim = false;
        scope.animationName = "";
    }

    getSymbolIndex(symbolId: number) {
        let symbolIndex = -1;
        this.symbolImage.map((data: any, m: number) => {
            if (data.id == symbolId) {
                symbolIndex = m;
                this.symbolcontainerobj = data
                return m;
            }
        });
        return symbolIndex;
    }
 private anchor:any;
    render() {
        this.playAnimation = false;
        const symbolChild_array: any = [];
        let symbolHeight = 0;
        let symbolWidth = 0;
        let offsetX = 0;
        let offsetY = 0;
        let anchor = 0;
        if (this.symbolImage.length > 0 && this.symbolId > -1) {
            // if(this.symbolId>90){
            //     this.symbolId=32;
            // }
            this.getSymbolIndex(this.symbolId);
            let symbolContainer = this.symbolcontainerobj;//this.symbolImage[symbolIndex];
            symbolContainer.child.map((data: any, m: number) => {
                symbolWidth = symbolContainer.width;
                symbolHeight = symbolContainer.height;
                offsetX = symbolContainer.offsetX || 0;
                offsetY = symbolContainer.offsetY || 0;
                 anchor =symbolContainer.anchor;

                symbolChild_array.push(
                    <UIManager
                        key={`UIManager-${Math.random()}`}  {...symbolContainer.child[m]}
                        playanimname={this.animationName}
                        name={"symbol_block" + this.symbolId}
                        playing={this.playAnimation} onComplete={this.onCompleteCallBack} scope={this}
                        // y ={this.props.yoffset || this.rowId * symbolHeight}
                        // visible={true}
                         anchor ={symbolContainer.child[m].anchor}

                        app={this.app} configGame={configGame} />
                );
            });
        }
       

        if (symbolHeight === 0) {
            symbolHeight = this.props.data.SYMBOL_HEIGHT
        }
       
        return (<UIManager ref={i => this.symbolcontainer = i} type={"Container"} id={"symbolcontainer"} app={this.app}
            configGame={this.props.configGame === undefined?configGame:this.props.configGame} symbolId={this.symbolId}  
            name={"symbolcontainer"} offsetX={offsetX} offsetY={offsetY} x={0}   anchor ={this.props.anchor}
            y={this.props.yoffset || this.rowId * symbolHeight - offsetY * this.rowId} visible={this.symbolVisibility}>
            {symbolChild_array}
        </UIManager>
        )
    }
}

// export default withPixiApp(withSymbolConfiguration(Symbol));
export default withPixiApp(connect(
    (state: Pick<IStore, 'symbolState' | 'winpresentationState'>): IStateToProps =>
    ({
        updatedSymbol: state.symbolState.updatedSymbol,
        updatedSymbolId: state.symbolState.updatedSymbolId,
        randomSymbol: state.symbolState.randomSymbol,
    }),
    (dispatch: Dispatch): IDispatchToProps => ({
        setOverlaySymbolList: (overlaysymbolList: any): any => dispatch(overlayActions.setOverlaySymbolList(overlaysymbolList)),
    }))(withSymbolConfiguration(Symbol)));