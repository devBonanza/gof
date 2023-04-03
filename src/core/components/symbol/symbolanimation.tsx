import React, { Component } from "react";
import withSymbolConfiguration from "../symbol/configuration/withSymbolConfiguration";
import { actions as symbolActions } from "../../reducers/symbolStateReducer";
import { withPixiApp } from "@inlet/react-pixi";
import UIManager from "../ui/UiBuilder";
import { connect } from "react-redux";
import { IStore } from "../../store/IStore";
import { Dispatch } from "redux";
import { GlitchFilter } from '@pixi/filter-glitch';
import { TIMER } from "../../utills";
import { Tween } from "../effect/tween";
import easing from "../effect/easing";


interface IState {
    listOfanimationSymbol: any,
    [x: string]: any;
}

interface IProps {
    [x: string]: any;
}

interface IStateToProps {

}

interface IDispatchToProps {

}

class SymbolAnimation extends Component<IProps, IState> {
    protected app: PIXI.Application;
    protected symbolImage: any = [];
    protected symbolAnimations: any = [];
    protected symbolanimationcontainer: any;
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
    private T50: number = 50;
    private T5000: number = 5000;
    private storeSymbolScaleX: number = 1;
    private storeSymbolScaleY: number = 1;
    private forCleanMask:any[]= [];

    constructor(props: IProps) {
        super(props);
        this.app = props.app;
        this.symbolId = props.SYMBOL_ID;
        this.rowId = props.ROW_ID;
        //this.reelId = props.REEL.Id;
        this.reelId = props.REEL_ID;
        this.reel = props.REEL;
        this.playAnimation = false;
        this.startBlastAnim = false;
        this.animationName = "anim";
        this.SINGLE_SYMBOL_DELAY_IN_ANIM = this.props.data.SINGLE_SYMBOL_DELAY_IN_ANIM;
        this.SHOW_GROUP_WIN_SYMBOL_DELAY = this.props.configGame.SHOW_GROUP_WIN_SYMBOL_DELAY;
        this.SYMBOL_ANIMATION_GRP_WISE = this.props.data.SYMBOL_ANIMATION_GRP_WISE;
        this.LOOP = false;
        // this.symbolanimationcontainer = React.createRef();
        this.symbolanimationcontainer = {};
        this.state = {
            listOfanimationSymbol: []
        }
        this.init();
    }

    init() {
        for (let i = 0; i < this.props.data.symbolsAnimation.length; i++) {
            this.symbolImage.push(this.props.data.symbolsAnimation[i]);
        }
        this.props.setChangeAnimationConfig(this.LOOP, this.SINGLE_SYMBOL_DELAY_IN_ANIM, this.SHOW_GROUP_WIN_SYMBOL_DELAY, this.SYMBOL_ANIMATION_GRP_WISE, 'anim')
        this.bindEvent();
    }

    bindEvent() {
    }

    changeSymbolConfig(nextProps: any) {
        this.SINGLE_SYMBOL_DELAY_IN_ANIM = nextProps.singleSymbolAnimDelay || this.props.data.SINGLE_SYMBOL_DELAY_IN_ANIM;
        this.SHOW_GROUP_WIN_SYMBOL_DELAY = nextProps.groupSymbolAnimDelay || this.props.configGame.SHOW_GROUP_WIN_SYMBOL_DELAY;
        this.SYMBOL_ANIMATION_GRP_WISE = nextProps.symbolAnimGroupWise || this.props.data.SYMBOL_ANIMATION_GRP_WISE;
        // this.SINGLE_SYMBOL_DELAY_IN_ANIM = this.props.data.SINGLE_SYMBOL_DELAY_IN_ANIM;
        // this.SHOW_GROUP_WIN_SYMBOL_DELAY = this.props.configGame.SHOW_GROUP_WIN_SYMBOL_DELAY;
        // this.SYMBOL_ANIMATION_GRP_WISE = this.props.data.SYMBOL_ANIMATION_GRP_WISE;
        this.LOOP = nextProps.animLoop;
        this.animationName = nextProps.animationName;
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

        if (symbol && symbol.animationSpeed) {
            symbol.loop = this.LOOP;

            if (symbol.effectType === "zoomIn") {
                this.playZoomInOutAnim(symbol)
            }
            if (symbol.maskHeight) {
                this.addMaskToSymbolAnimations(symbol)
            }
            if (symbol.spineAnimName) {
                //symbol.play()
                symbol.children[0].state.setAnimation(0, symbol.spineAnimName, false);
                symbol.children[0].state.onComplete = () => {
                    symbol.visible = false;

                }
            } else {
                this.playAnimationWithEffects(symbol)
            }
            if (this.props.data.SYMBOL_ANIMATION_EFFECT[0] === "glitch" && symbol) {
                //this.addGlitch(symbol)
            }
        }
    }

    playAnimationWithEffects(topSymbol: any) {
        let counter = 0;
        if (topSymbol.effectType === "topLoop") {
            topSymbol.play()
            topSymbol.onComplete = () => {
                counter++
                if (counter === 1) {
                    this.addZoomFadeIn(topSymbol)
                }
                if (counter < 3) {
                    topSymbol.gotoAndPlay(0);
                }

            }
        } else if (topSymbol.effectType == "bgBreak") {
            let timer = TIMER.TimerManager.createTimer(800);
            timer.on('end', (e: any) => {
                e.remove();
                topSymbol.play();
            });
            timer.start();

        } else {
          
            this.hidebackGroundSymbol(topSymbol)
            topSymbol.play();
            topSymbol.onComplete = (e:any, obj:any) => {
                topSymbol.onComplete = null;
                topSymbol.onFrameChange = null; 
                topSymbol.onLoop = null;
                topSymbol.visible = false;    
                topSymbol.parent && topSymbol.parent.removeChild(topSymbol);   
                topSymbol = null;                              
            }
        }

    }
    hidebackGroundSymbol(topSymbol:any) {
        let splitName = topSymbol.name.split("_");
        if (this.props.gridSymbols) {
            this.props.gridSymbols.forEach((symbolContainer: any) => {
                if (symbolContainer.reelId === Number(splitName[2]) && symbolContainer.rowId === Number(splitName[3])) {
                    symbolContainer.visible = false;
                }
            })
        }
    }

    addZoomFadeIn(symbolObj: any) {
        let storeSymbolScaleX: any = symbolObj.scale.x
        let storeSymbolScaleY: any = symbolObj.scale.y
        symbolObj && symbolObj.anchor.set(0.5)
        symbolObj.x = symbolObj.x + symbolObj.width / 2
        symbolObj.y = symbolObj.y + symbolObj.height / 2
        if (symbolObj.children.length && symbolObj.children[0].name == "mask") {
            symbolObj.children[0].position.set(-(this.props.data.SYMBOL_WIDTH / 2), -symbolObj.height / 2)
        }
       let _tween1 =  new Tween([symbolObj.scale],
            {
                'y': { start: symbolObj.scale.y, end: symbolObj.scale.y + 0.3 },
                'x': { start: symbolObj.scale.x, end: symbolObj.scale.x + 0.3 },
            }, 0.3, easing.easeLinear, false, null, null, null, null, false, (e: any) => {
                if (symbolObj.children[0]) {
                    symbolObj.children[0].position.set(-(this.props.data.SYMBOL_WIDTH / 2), -(symbolObj.height / 2) / symbolObj.scale.y)
                }
            }, () => {
                if (symbolObj) {
                    symbolObj.anchor.set(0)
                    symbolObj.scale.set(storeSymbolScaleX, storeSymbolScaleY)
                    symbolObj.x = symbolObj.x - symbolObj.width / 2
                    symbolObj.y = symbolObj.y - symbolObj.height / 2
                }
                _tween1.dispose();
            }
        )

       let _tween =  new Tween([symbolObj],
            {
                'alpha': { start: 1, end: 0 }
            }, 0.2, easing.easeLinear, false, null, null, null, null, false, onchange, () => {
                //symbolObj.alpha = 1
                _tween.dispose();
                
            }
        )



    }
    addMaskToSymbolAnimations(symbolObj: any) {
        let symbolHeight: number = symbolObj.maskHeight;
        const animMask = new PIXI.Graphics();
        animMask.beginFill(0xDE3249);
        animMask.name = "mask"
        animMask.drawRect(0, 0, this.props.data.SYMBOL_WIDTH, symbolHeight);
        animMask.endFill();
        symbolObj.children.pop();
        symbolObj.addChild(animMask);
        symbolObj.mask = animMask
        this.forCleanMask.push(animMask);
    }
    playZoomInOutAnim(symbolObj: any) {
        this.addScaleTween(symbolObj);
    }

    addScaleTween(symbolObj: any) {
        symbolObj.anchor.set(0.5)
        symbolObj.x = symbolObj.x + symbolObj.width / 2;
        symbolObj.y = symbolObj.y + symbolObj.height / 2;
        let _tween:Tween = new Tween([symbolObj.scale],
            {
                'y': { start: symbolObj.scale.y, end: symbolObj.scale.y + 0.1 },
                'x': { start: symbolObj.scale.x, end: symbolObj.scale.x + 0.1 }

            }, 0.3, easing.easeLinear, false, null, null, null, null, false, onchange, () => {
                _tween.dispose();
                let _tween1:Tween = new Tween([symbolObj.scale],
                    {
                        'y': { start: symbolObj.scale.y, end: symbolObj.scale.y - 0.1 },
                        'x': { start: symbolObj.scale.x, end: symbolObj.scale.x - 0.1 }

                    }, 0.3, easing.easeLinear, false, null, null, null, null, false, onchange, () => {
                        symbolObj.parent && this.increaseD(symbolObj);
                        _tween1.dispose();
                    }
                )
            }
        );
    }

    private increaseD(symbolObj: any): void {
       let _twen =  new Tween([symbolObj.scale],
            {
                'y': { start: symbolObj.scale.y, end: symbolObj.scale.y + 0.1 },
                'x': { start: symbolObj.scale.x, end: symbolObj.scale.x + 0.1 }

            }, 0.3, easing.easeLinear, false, null, null, null, null, false, onchange, () => {
                symbolObj.parent && this.decreaseD(symbolObj);
                _twen.dispose();
            }
        )
    }

    private decreaseD(symbolObj: any): void {
        this.storeSymbolScaleX = symbolObj.scale.x;
        this.storeSymbolScaleY = symbolObj.scale.y;
       let _twen =  new Tween([symbolObj.scale],
            {
                'y': { start: symbolObj.scale.y, end: symbolObj.scale.y - 0.1 },
                'x': { start: symbolObj.scale.x, end: symbolObj.scale.x - 0.1 }
            }, 0.3, easing.easeLinear, false, null, null, null, null, false, onchange, () => {
                symbolObj.parent && this.symbolsetOrginalPostion(symbolObj);
                _twen.dispose();
            }
        )
    }
    private symbolsetOrginalPostion(symbolObj: any): void {
        // if needed some reset position 
    }


    componentDidUpdate() {
        if (!this.props.playSymbolAnimation) {
            return;
        }
        if (!this.showSymbolsAnmation) {
            return;
        }
        //this.LOOP = false;
        if (this.SYMBOL_ANIMATION_GRP_WISE) {
            this.props.SymbolAnimationPositions.forEach((data: any, index: number) => {
                let timer = TIMER.TimerManager.createTimer(1 + index * this.SHOW_GROUP_WIN_SYMBOL_DELAY);
                timer.on('end', (e: any) => {
                    e.remove();
                    data.forEach((subdata: any, subindex: any) => {
                        for (let i = 0; i < UIManager.getRef("symbolanimationcontainer").children.length; i++) {
                            if (UIManager.getRef("symbolanimationcontainer").children[i].name == "symbol_animation_" + subdata[0] + "_" + subdata[1]) {
                                this.playSymbolAnimation(UIManager.getRef("symbolanimationcontainer").children[i]);
                            }
                        }
                    });

                });
                timer.start();
            })

        } else {

            for (let i = 0; i < UIManager.getRef("symbolanimationcontainer").children.length; i++) {
                if (this.SINGLE_SYMBOL_DELAY_IN_ANIM == 1) {
                    this.playSymbolAnimation(UIManager.getRef("symbolanimationcontainer").children[i]);
                } else {
                    let timer = TIMER.TimerManager.createTimer(i * 150);
                    timer.on('end', (e: any) => {
                        e.remove();
                        this.playSymbolAnimation(UIManager.getRef("symbolanimationcontainer").children[i]);
                    });
                    timer.start();
                }


            }
        }

    }

    addGlitch(symbol: any) {
        let glitchProperties = {
            "seed": 0,
            "slices": 0,
            "offset": 100,
            "fillMode": 3,
            "average": false,
            "red": [5, 5],
            "green": [5, 5],
            "blue": [5, 5],
            "minSize": 8,
            "sampleSize": 512
        }
        symbol.filters = [new GlitchFilter(glitchProperties)];
        symbol.filters[0].enabled = true;
        let symbolShaking = setInterval(() => {
            symbol && (symbol.filters && (symbol.filters[0].seed = Math.floor(20 * Math.random()) / 10));
        }, this.T50)

        setTimeout(() => {
            symbol && (symbol.filters && (symbol.filters[0].enabled = false));
            clearInterval(symbolShaking)
        }, this.T5000);
    }

    private showSymbolsAnmation:boolean = false;

    shouldComponentUpdate(nextProps: Readonly<IProps>, nextState: Readonly<IState>, nextContext: any): boolean {
        if (nextProps.winSymbolCoOrdinate.length !== this.props.winSymbolCoOrdinate.length
            || nextProps.reel_data !== this.props.reel_data || nextProps.SymbolAnimationPositions !== this.props.SymbolAnimationPositions
            || nextProps.playSymbolAnimation !== this.props.playSymbolAnimation || nextProps.animLoop !== this.props.animLoop
            || nextProps.resetAnimConfig && nextProps.resetAnimConfig !== this.props.resetAnimConfig || nextProps.singleSymbolAnimDelay !== this.props.singleSymbolAnimDelay
            || nextProps.groupSymbolAnimDelay !== this.props.groupSymbolAnimDelay || nextProps.symbolAnimGroupWise !== this.props.symbolAnimGroupWise
            || nextProps.animLoop !== this.props.animLoop || nextProps.singleSymbolAnimDelay !== this.props.singleSymbolAnimDelay
            || nextProps.groupSymbolAnimDelay !== this.props.groupSymbolAnimDelay || nextProps.symbolAnimGroupWise !== this.props.symbolAnimGroupWise
            || nextProps.animationName != this.props.animationName) {
            let animationInfo: any = [];
            if (nextProps.animLoop !== this.props.animLoop || nextProps.singleSymbolAnimDelay !== this.props.singleSymbolAnimDelay
                || nextProps.groupSymbolAnimDelay !== this.props.groupSymbolAnimDelay || nextProps.symbolAnimGroupWise !== this.props.symbolAnimGroupWise
                || nextProps.animationName !== this.props.animationName
            ) {
                this.changeSymbolConfig(nextProps);
                //return false;
            }
            if (nextProps.resetAnimConfig && nextProps.resetAnimConfig !== this.props.resetAnimConfig) {
                this.SINGLE_SYMBOL_DELAY_IN_ANIM = this.props.data.SINGLE_SYMBOL_DELAY_IN_ANIM;
                this.SHOW_GROUP_WIN_SYMBOL_DELAY = this.props.configGame.SHOW_GROUP_WIN_SYMBOL_DELAY;
                this.SYMBOL_ANIMATION_GRP_WISE = this.props.data.SYMBOL_ANIMATION_GRP_WISE;
                this.animationName = "anim";
                this.props.setChangeAnimationConfig(this.LOOP, this.SINGLE_SYMBOL_DELAY_IN_ANIM, this.SHOW_GROUP_WIN_SYMBOL_DELAY, this.SYMBOL_ANIMATION_GRP_WISE, 'anim')

            }

            if (nextProps.animationName !== this.props.animationName) {
                this.onUpdateSymbolAnimationName(nextProps.animationName);
            }

            if (nextProps.winSymbolCoOrdinate.length !== this.props.winSymbolCoOrdinate.length) {
                //this.symbolanimationcontainer.visible = true;               
               // UIManager.getRef("symbolanimationcontainer").visible = true;
                this.showSymbolsAnmation = true;
                if (nextProps.winSymbolCoOrdinate.length == 0) {
                    animationInfo = [];
                    this.symbolanimationcontainer.COMPONENT.removeChildren();
                    this.symbolanimationcontainer.visible = false;
                    UIManager.getRef("symbolanimationcontainer").visible = false;
                    this.clearAllChild();

                }
            
                nextProps.winSymbolCoOrdinate.forEach((data: any, index: number) => {
                    animationInfo.push({
                        symbolRow: data.rowId,
                        symbolColumn: data.reelId,
                        symbolId: nextProps.reel_data.stopReels[data.reelId][data.rowId]
                    })

                })
            }
            if (nextProps.playSymbolAnimation) {
                // let animationInfo: any = []
                // nextProps.winSymbolCoOrdinate.forEach((data: any, index: number) => {
                //     animationInfo.push({
                //         symbolRow: data.rowId,
                //         symbolColumn: data.reelId,
                //         symbolId: nextProps.reel_data.stopReels[data.reelId][data.rowId]
                //     })

                // })
                this.setState((prevState) => {
                    return {
                        ...prevState,
                        listOfanimationSymbol: animationInfo,
                    }
                })
            }
            return false;
        }
        return true;
    }

    private clearAllChild():void{
        for (let i = 0; i < UIManager.getRef("symbolanimationcontainer").children.length; i++) {
            UIManager.getRef("symbolanimationcontainer").children[i].removeChildren();
        }
        UIManager.getRef("symbolanimationcontainer").removeChildren();
        UIManager.getRef("symbolanimationcontainer").visible = false;       
        this.symbolanimationcontainer.COMPONENT.children.length = 0; 
        this.symbolanimationcontainer.COMPONENT = null;
        this.showSymbolsAnmation = false;

        while(this.forCleanMask.length){
            let pop = this.forCleanMask.pop();
            pop && pop.parent && pop.parent.removeChild();
            pop =null;
        }
        this.forCleanMask  = [];
       
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

    private removeDuplicateCordinate(listOfanimationSymbol: any): Array<object> {
        let uniqueArr: any[] = [];
        listOfanimationSymbol.forEach((parentelement: any) => {
            let isDuplicateValue: boolean = false;
            uniqueArr.forEach((childelement: any) => {
                if (JSON.stringify(parentelement) === JSON.stringify(childelement)) {
                    isDuplicateValue = true;
                }
            });
            if (!isDuplicateValue) {
                uniqueArr.push(parentelement);
            }
        });
        return uniqueArr;
    }


    render() {

        if (!this.showSymbolsAnmation) {
            return (<></>)
        }


        let { listOfanimationSymbol } = this.state;
        let symbolChild_array: any = [];
        listOfanimationSymbol = this.removeDuplicateCordinate(listOfanimationSymbol);
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
                        key={`UIManager-${Math.random()*10000}`}   {...symbolContainer.child[j]}
                        playanimname={this.animationName || "anim"}
                        name={"symbol_animation_" + listOfanimationSymbol[i].symbolColumn + "_" + listOfanimationSymbol[i].symbolRow}
                        playing={this.playAnimation} scope={this}
                        x={symbolContainer.child[j].x + symbolContainer.offsetX + listOfanimationSymbol[i].symbolColumn * this.props.REEL_WIDTH + listOfanimationSymbol[i].symbolColumn * this.props.REEL_GAP}

                        reelId={listOfanimationSymbol[i].symbolColumn}
                        rowId={listOfanimationSymbol[i].symbolRow}
                        onComplete={this.onCompleteCallBack}
                        anchor ={symbolContainer.child[j].anchor=== undefined?[0,0]:symbolContainer.child[j].anchor}
                       
                        y={symbolContainer.child[j].y + symbolContainer.offsetY + symbolContainer.height * listOfanimationSymbol[i].symbolRow}
                        app={this.app} configGame={this.props.configGame} visible={true} />
                );
            });


        });

        return (
            <UIManager ref={i => this.symbolanimationcontainer = i} type={"Container"} id={"symbolanimationcontainer"}
                app={this.app}
                configGame={this.props.configGame}  
                name={"symbolanimationcontainer"} x={this.props.posx}
                y={this.props.posy} visible={true} scale={this.props.scale === undefined?1:this.props.scale}>
                {symbolChild_array}
            </UIManager>)
    }


}

// export default withPixiApp(withSymbolConfiguration(Symbol));
export default withPixiApp(connect(
    (state: Pick<IStore, 'symbolState' | 'winpresentationState' | 'reelgridState' | 'gridsState' | 'reelsState'>, ownProps?: any): IStateToProps =>
    ({
        SymbolAnimationPositions: state.winpresentationState.SymbolAnimationPositions,
        onComplete: state.symbolState.onComplete,
        onCompleteScope: state.symbolState.onCompleteScope,
        animationName: state.symbolState.animationName,
        resetAnimConfig: state.symbolState.resetAnimConfig,
        animLoop: state.symbolState.animLoop,
        singleSymbolAnimDelay: state.symbolState.singleSymbolAnimDelay,
        groupSymbolAnimDelay: state.symbolState.groupSymbolAnimDelay,
        symbolAnimGroupWise: state.symbolState.symbolAnimGroupWise,
        winSymbolCoOrdinate: state.winpresentationState.winSymbolCoOrdinate,
        playSymbolAnimation: state.winpresentationState.playSymbolAnimation,
        gridSymbols: state.winpresentationState.gridSymbols,
        reel_data: ownProps && ownProps.configGame["SPIN_TYPE"] === 1 && state.gridsState.reel_data || ownProps && ownProps.configGame["SPIN_TYPE"] === 2 && state.reelgridState.reel_data || state.reelsState.reel_data,

    }),
    (dispatch: Dispatch): IDispatchToProps => ({
        setChangeAnimationConfig: (animLoop: any, singleSymbolAnimDelay: any, groupSymbolAnimDelay: any, symbolAnimGroupWise: any, animationname: string): any => dispatch(symbolActions.setChangeAnimationConfig(animLoop, singleSymbolAnimDelay, groupSymbolAnimDelay, symbolAnimGroupWise, animationname)),

    }))(withSymbolConfiguration(SymbolAnimation)));