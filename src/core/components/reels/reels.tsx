import React, { Component } from "react";
import withReelsConfiguration from "../reels/configuration/withReelsConfiguration";
import { TIMER } from "../../utills";
import * as PIXI from "pixi.js";
import Symbol from "../symbol/symbol";
import { Container, Graphics, withPixiApp } from "@inlet/react-pixi";
import { connect } from 'react-redux'
import { Dispatch } from 'redux';
import { IStore } from "../../store/IStore";
import { MotionBlurFilter } from "@pixi/filter-motion-blur"
import UIManager from "../ui/UiBuilder";
import { actions as winpresentationAction } from "../../reducers/winPresentationReducer";
import { actions as reelsActions } from "../../reducers/reelsStateReducer";
import { actions as symbolActions } from "../../reducers/symbolStateReducer";
import { actions as buttonActions } from "../../reducers/buttonPanelReducer";
import { actions as basegameAction } from "../../reducers/baseGameReducer";
import { actions as freegameAction } from "../../reducers/freeGameReducer";
import { actions as landingSymbolAction } from "../../reducers/landingsymbolreducer";
import { actions as flowManagerAction } from "../../reducers/flowManagerReducer";

window.PIXI = PIXI;

interface IStateToProps {

    featureType: any
    basegameState: any
    updatedSymbol: any
    reel_data: any
    winningList: any
    stoppingReel: number
    isSpinning: boolean
    spinStart: boolean
    spinStop: boolean
    forceSpinStop: boolean
    spinResponseReceived: boolean,
    reelStrips: any,
    stopable: any,
    currentReelStripIndex: number,
    anticipationOnReelPlaying: number,
    anticipationOnReel: any,

    displayReelGridSymbolCount: any,
    countStopReels: any,
}

interface IDispatchToProps {
    [x: string]: any;

}

interface IProps extends IStateToProps {
    [x: string]: any;

}

interface IState {
    symbolList: any
    stickysymbolList: any
}

class Reels extends Component<IProps, IState> {
    protected app: PIXI.Application;
    protected subReelContainer: any;
    protected eventEmitter: any;
    protected REEL_STOPS: Array<Array<number>>;
    protected tweening: any;
    protected serverResponseReceived: Boolean;
    protected updateSymbol: Boolean;
    protected reelRunning: Boolean;
    protected blurReel: Boolean;
    protected spinMidCalled: Boolean;
    protected minimummSpinTimeComplete: Boolean;

    protected SPIN_MOVE_VALUE: number;
    protected totalCascadeCount: number;
    private gamePause: boolean;
    private tickupRequest: any;
    stoppingReelSequence: any;
    protected symbolHeightMappingList: any = [];


    //new var
    reelStripSymbolIndex: number;
    symbolInViewCount: number;
    spinSymbolLength: number;
    anticipationSymbolLength: number;
    reelstate: number;
    fps: number;
    fpsInterval: number;
    frameCount: number;
    startTime: number;
    now: number;
    stopTick: boolean;

    then: number;
    spinSpeed: number;
    anticipationSpinSpeed: number;
    elapsed: number;
    yOffset: number;
    spinSymbolCount: number;
    reelStopDifference: number;
    totalSpinSymbolLength: number;
    turbospinSymbolLength: number;
    symbolNumberOffset: number;
    symbolsBetweenStop: number;
    windSpeed: number;
    windHeight: number;
    wobbleSpeed: number;
    currentWobbleHeight: number;
    wobbleHeight: number;
    juststoppedReelId: number;
    countStopReel: number;
    stopable: any;
    spinning: boolean;
    enabled: boolean;

    symbols: any;
    symbolsToDisplay: any;
    popSymbols: any;
    popDropSymbols: any;
    setSymbolFinalPosition: boolean;
    forceSpinStopReels: boolean;
    reelShouldMove: boolean;
    responseReceivedAfterBlast: boolean;

    constructor(props: IProps) {
        super(props);
        this.app = props.app;
        this.REEL_STOPS = [];
        this.tweening = [];
        this.popSymbols = [];
        this.popDropSymbols = [];
        this.gamePause = false;
        this.stoppingReelSequence = [0, 1, 2, 3, 4, 5]
        this.minimummSpinTimeComplete = false;
        this.spinMidCalled = false;
        this.serverResponseReceived = false;
        this.updateSymbol = false;
        this.reelRunning = false;
        this.responseReceivedAfterBlast = false;
        this.blurReel = false;
        this.forceSpinStopReels = false;
        this.setSymbolFinalPosition = false;
        this.reelShouldMove = false;
        this.SPIN_MOVE_VALUE = 0;
        this.countStopReel = 0;
        //this.subReelContainer = React.createRef();
        this.subReelContainer = {};
        this.totalCascadeCount = this.props.totalCascadeCount;

        //new var
        this.reelStripSymbolIndex = 0;
        this.wobbleHeight = this.props.data.WOBBLE_HEIGHT[this.props.ReelIndex];
        this.wobbleSpeed = this.props.data.WOBBLE_SPEED[this.props.ReelIndex];
        this.currentWobbleHeight = this.props.data.CURRENT_WOBBLE_HEIGHT[this.props.ReelIndex];
        this.windSpeed = this.props.data.WIND_SPEED[this.props.ReelIndex];
        this.windHeight = this.props.data.WIND_HEIGHT[this.props.ReelIndex];
        this.symbolNumberOffset = this.props.data.SYMBOL_NUMBER_OFFSET[this.props.ReelIndex];
        this.reelStopDifference = this.props.data.REEL_STOP_DIFFERENCE[this.props.ReelIndex];
        this.spinSymbolCount = this.props.data.SPIN_SYMBOL_COUNT[this.props.ReelIndex];
        this.symbolInViewCount = this.props.data.SYMBOL_IN_VIEW_COUNT[this.props.ReelIndex];
        this.spinSymbolLength = this.props.data.SPIN_SYMBOL_LENGTH[this.props.ReelIndex];
        this.turbospinSymbolLength = this.props.data.TURBO_SPIN_SYMBOL_LENGTH[this.props.ReelIndex];
        this.anticipationSymbolLength = this.props.data.ANTICIPATION_SYMBOL_LENGTH[this.props.ReelIndex];
        this.reelstate = Reels.REEL_STATE_STATIC;
        this.symbols = [];
        this.fps = this.props.data.FPS[this.props.ReelIndex];
        this.fpsInterval = this.props.data.FPS_INTERVAL[this.props.ReelIndex];
        this.frameCount = this.props.data.FRAME_COUNT[this.props.ReelIndex];
        this.startTime = this.props.data.START_TIME[this.props.ReelIndex];
        this.now = this.props.data.NOW[this.props.ReelIndex];
        this.spinSpeed = this.props.data.SPIN_SPEED[this.props.ReelIndex] / 2;
        this.anticipationSpinSpeed = this.props.data.ANTICIPATION_SPIN_SPEED[this.props.ReelIndex] / 2;
        this.then = this.props.data.THEN[this.props.ReelIndex];
        this.yOffset = this.props.data.Y_OFFSET[this.props.ReelIndex];

        this.stopTick = this.props.data.STOP_TICK[this.props.ReelIndex];
        this.elapsed = this.props.data.ELAPSED[this.props.ReelIndex];
        this.symbolsToDisplay = [];
        this.stopable = this.props.data.STOPABLE;
        this.juststoppedReelId = 0;
        this.totalSpinSymbolLength = this.spinSymbolLength;
        this.symbolsBetweenStop = this.props.data.SYMBOLS_BETWEEN_STOP[this.props.ReelIndex];
        this.spinning = this.props.data.SPINNING[this.props.ReelIndex];
        this.enabled = this.props.data.ENABLED[this.props.ReelIndex];
        this.state = {
            symbolList: [],
            stickysymbolList: []
        };
        this.symbolHeightMappingList = this.props.data.SYMBOL_HEIGHT_MAPPING_LIST;
        this.init();

    }

    static get REEL_STATE_STATIC() {
        return 0;
    }

    static get REEL_STATE_WINDING() {
        return 1;
    }

    static get REEL_STATE_SPINNING() {
        return 2;
    }

    static get REEL_STATE_WOBBLE_UP() {
        return 3;
    }

    static get REEL_STATE_WOBBLE_DOWN() {
        return 4;
    }

    static get REEL_STATE_NUDGE() {
        return 5;
    }

    static get REEL_STATE_NUDGE_WOBBLE_UP() {
        return 6;
    }

    static get REEL_STATE_NUDGE_WOBBLE_DOWN() {
        return 7;
    }

    static get REEL_STATE_WINDING_BACKWARDS() {
        return 8;
    }

    static get REEL_STATE_SPINNING_BACKWARDS() {
        return 9;
    }

    static get REEL_STATE_WOBBLE_UP_BACKWARDS() {
        return 10;
    }

    static get REEL_STATE_WOBBLE_DOWN_BACKWARDS() {
        return 11;
    }

    init() {
        this.bindEvent();
        this.props.setSpinType();
        this.onInitializeReelStop();
    }

    destroy() {
    }

    bindEvent() {

    }

    onGameResume() {
        this.gamePause = false;
        this.then = Date.now()
    }

    onGamePause() {
        this.gamePause = true;
        this.then = Date.now()
    }

    onInitializeReelStop() {
        this.REEL_STOPS = this.props.reel_data.stopReels;
    }

    onServerReelStop(data?: any) {
        this.serverResponseReceived = true;
    }

    componentDidMount() {
        const reel = {
            container: this.getSubReelContainer(),
            Id: this.props.ReelIndex,
            symbols: [],
            position: 0,
            previousPosition: 0,
            blur: new MotionBlurFilter([0, 65], 0),
        };
        reel.blur.kernelSize = 0;

        if (this.props.InTurboMode) {
            this.forceSpinStopReels = true;
        } else {
            this.forceSpinStopReels = false;
        }
        this.props.reelList.push(reel);
        this.randomizeSymbols(reel);


        let timer = TIMER.TimerManager.createTimer(100);
        timer.on('end', (e: any) => {
            e.remove();

            let reels = this.props.reelList[this.props.ReelIndex];

            if (reels) {
                const r = reels;

                for (let j = 0; j < r.symbols.length; j++) {

                    const s = r.symbols[j].COMPONENT;
                    if (s.parent != null) {
                        for (let k = 0; k < s.children.length; k++) {

                            s.children[k].visible = true
                        }
                    }
                }
            }

        });
        timer.start();
    }


    shouldComponentUpdate(nextProps: Readonly<IProps>, nextState: Readonly<IState>, nextContext: any): boolean {
        if (nextProps.reel_data != this.props.reel_data) {
            if (nextProps.reel_data) {
                let array = nextProps.data.STOPABLE
                for (let n = 0; n < this.props.reelList.length; n++) {
                    array[n] = false
                }
                this.props.setReelStopable(array);
                this.REEL_STOPS = nextProps.reel_data.stopReels;
            }
        }
        if (nextProps.totalCascadeCount != this.props.totalCascadeCount) {
            if (nextProps.totalCascadeCount) {
                this.totalCascadeCount = nextProps.totalCascadeCount
            }
        }
        if (nextProps.gamePause != this.props.gamePause) {
            if (!nextProps.gamePause) {
                this.onGameResume();
            } else {
                this.onGamePause()
            }
        }


        if (nextProps.stopNextReelId != this.props.stopNextReelId) {
            if (nextProps.stopNextReelId > -1 && nextProps.stopNextReelId < this.props.reelList.length - 1) {

            }
        }
        if (nextProps.InTurboMode != this.props.InTurboMode) {
            if (nextProps.InTurboMode) {
                let timer = TIMER.TimerManager.createTimer(500);
                timer.on('end', (e: any) => {
                    e.remove();
                    this.forceSpinStopReels = true;
                });
                timer.start();
            } else {
                !this.forceSpinStopReels && (this.forceSpinStopReels = false);
            }
        }


        if (nextProps.isSpinning != this.props.isSpinning || nextProps.spinStart != this.props.spinStart || nextProps.spinStop != this.props.spinStop
            || nextProps.forceSpinStop != this.props.forceSpinStop || nextProps.spinResponseReceived != this.props.spinResponseReceived
            || nextProps.spinStopID != this.props.spinStopID
            || nextProps.spinStartID != this.props.spinStartID
            || nextProps.stoppingReel != this.props.stoppingReel
            || nextProps.playAnticipation != this.props.playAnticipation
            || nextProps.countStopReels != this.props.countStopReels
        ) {

            if (nextProps.spinStart && nextProps.spinStart != this.props.spinStart) {
                if (nextProps.InTurboMode) {
                    this.forceSpinStopReels = true;
                } else {
                    this.forceSpinStopReels = false;
                }
                this.countStopReel = 0;
                this.onReelSpinStart(nextProps);
            }

            if (nextProps.stoppingReel == nextProps.ReelIndex && nextProps.stoppingReel != this.props.stoppingReel && this.forceSpinStopReels == false) {
                this.spinSymbolCount = 0;
                let array = this.props.data.STOPABLE;
                array[nextProps.ReelIndex] = true
                this.countStopReel = nextProps.ReelIndex;
                this.props.setReelStopable(array)
                if (this.props.anticipationOnReel[nextProps.ReelIndex] === true) {
                    this.totalSpinSymbolLength = this.anticipationSymbolLength;
                    this.spinSpeed = this.anticipationSpinSpeed;
                    let timer = TIMER.TimerManager.createTimer(1200);
                    timer.on('end', (e: any) => {
                        e.remove();
                    });
                    timer.start();
                }
            }

            if (nextProps.spinResponseReceived) {
                this.onServerReelStop();
            }
            if (nextProps.forceSpinStop != this.props.forceSpinStop) {
                if (nextProps.forceSpinStop) {
                    this.tweening = [];
                    let timer = TIMER.TimerManager.createTimer(500);
                    timer.on('end', (e: any) => {
                        e.remove();
                        this.forceSpinStopReels = true;
                    });
                    timer.start();
                } else {
                    !this.forceSpinStopReels && (this.forceSpinStopReels = false);
                }
            }
            if (nextProps.countStopReels === nextProps.data.REEL_COLUMN) {
                if (nextProps.winningList.length == 0) {
                    this.props.stopWinPresentation();
                }
                nextProps.setSpinComplete(true);
                if (nextProps.winningList.length == 0) {
                    cancelAnimationFrame(this.tickupRequest);
                    this.onResetGrid(nextProps);
                    this.props.flowManagerCalled(true);
                }
            }
            return false;
        }
        return false;
    }
    onResetGrid(PROPS: any) {
        PROPS.setWinSymbolCoOrdinate([]);

        let gridSymbols = PROPS.reelList[this.props.ReelIndex].symbols;

        for (let i = this.popDropSymbols.length - 1; i >= 0; i--) {
            gridSymbols.push(this.popDropSymbols[i]);

        }
        for (let j = PROPS.data.REEL_ROWS; j >= 0; j--) {
            gridSymbols[j].COMPONENT.gridPosition = j;
            gridSymbols[j].COMPONENT.rowId = j;
            gridSymbols[j].COMPONENT.blasted = false;
            gridSymbols[j].COMPONENT.shiftCount = 0;
            gridSymbols[j].shifted = false
        }
        this.popDropSymbols = [];
        PROPS.app.ticker.remove(this.tick)
    }

    getSubReelContainer() {
        return this.subReelContainer;
    }

    onReelSpinStart(nextProps: any) {
        if (this.reelRunning) return;
        this.stopTick = false;
        this.setSymbolFinalPosition = false;
        this.popSymbols = [];
        this.props.stopWinPresentation();
        this.reelStripSymbolIndex = Math.floor(Math.random() * (this.props.reelStrips[this.props.currentReelStripIndex][this.props.ReelIndex].length - 1) + 1);
        this.spinAndDisplay(nextProps, this.REEL_STOPS[this.props.ReelIndex], this.props.ReelIndex === 0 ? true : false, true, false, this.symbolsBetweenStop)
    }

    setLandingAnimationVisibility(reelId: any) {
        for (let i = 0; i < UIManager.getRef("landingsymbolanimationcontainer").children.length; i++) {
            this.props.landingAnimPositions.forEach((position: any, index: any) => {
                if (this.props.landingAnimPositions[index].reelId === reelId) {
                    let landingContainer = UIManager.getRef("landingsymbolanimationcontainer").children[i];
                    let reel = this.props.landingAnimPositions[index].reelId;
                    let row = this.props.landingAnimPositions[index].rowId
                    if (landingContainer.name === `landing_animation_${reel}_${row}`) {
                        landingContainer.visible = true;
                        let timer = TIMER.TimerManager.createTimer(this.props.configGame.LANDING_ANIM_HIDE_DURATION);
                        timer.on('end', (e: any) => {
                            e.remove();
                            landingContainer.visible = false;
                        });
                        timer.start();
                    }
                }
            });
        }
    }

    compare_prop_y(a: any, b: any) {
        // a should come before b in the sorted order
        if (a.COMPONENT.y < b.COMPONENT.y) {
            return -1;
            // a should come after b in the sorted order
        } else if (a.COMPONENT.y > b.COMPONENT.y) {
            return 1;
            // a and b are the same
        } else {
            return 0;
        }
    }
    reelsComplete() {
        this.props.setSpinning(false);
        this.reelRunning = false;
        this.serverResponseReceived = false;
        let reels = this.props.reelList[this.props.ReelIndex];
        if (reels) {
            const r = reels;
            this.props.playLandingAnim();
            let timer = TIMER.TimerManager.createTimer(1);
            timer.on('end', (e: any) => {
                e.remove();
                this.setLandingAnimationVisibility(this.props.ReelIndex)
            });
            timer.start();

            for (let i = 0; i < this.popSymbols.length; i++) {
                r.symbols.push(this.popSymbols[i]);

            }
        }
       
        this.props.setStoppedReel(this.props.ReelIndex);
        let symbolWiseHeight: any = []
        let symbolsCount = this.symbolHeightMappingList.map((data: any) => {
            symbolWiseHeight.push(data.height);
        })
        let countIndex = -1;
        let symbolslist = reels.symbols;
        for (let i = 0; i < symbolslist.length; i++) {
            let symbol = symbolslist[i];
            symbol.gridPosition = i;
            symbol.rowId = i;
            symbol.reelId = symbol.reelId;
            symbol.COMPONENT.gridPosition = i;
            symbol.COMPONENT.rowId = i;
            symbol.COMPONENT.reelId = symbol.reelId;
        }

        if (this.props.winningList.length == 0) {
            cancelAnimationFrame(this.tickupRequest);
        }
    }
   
    spinAndDisplay(nextProps: any, symbolIds: any, stopable: boolean, forward: boolean, substitute: boolean, reelStopDifference: number) {
        this.symbolsToDisplay = symbolIds || [];
        for (i = 0; i < this.symbolsToDisplay.length; i++) {
            this.symbolsToDisplay[i] = this.symbolsToDisplay[i] - this.symbolNumberOffset;
        }

        var anticipationSymbols = 0,
            i;

        if (this.forceSpinStopReels) {
            this.totalSpinSymbolLength = this.turbospinSymbolLength;
            if (this.props.ReelIndex == 0) {
                let timer = TIMER.TimerManager.createTimer(50 * this.props.ReelIndex);
                timer.on('end', (e: any) => {
                    e.remove();
                    this.spinSymbolCount = 0
                    this.totalSpinSymbolLength = this.turbospinSymbolLength;
                });
                timer.start();
            }
        } else {
            this.spinSymbolCount = 0
            this.totalSpinSymbolLength = this.spinSymbolLength;
        }
        this.totalSpinSymbolLength = this.totalSpinSymbolLength;
        this.reelStopDifference = reelStopDifference - this.symbolInViewCount;
        if (this.spinning === false) {
            this.spinning = true;
            if (forward !== null) {
                if (forward === true) {
                    this.startWind(nextProps);
                } else {
                    this.startWindBackwards();
                }
            } else {
                this.startWind(nextProps);
            }

            this.enabled = true;
        }
    }

    startWindBackwards() {
        this.reelstate = Reels.REEL_STATE_WINDING_BACKWARDS;
    }

    startWind(nextProps: any) {
        this.reelstate = Reels.REEL_STATE_WINDING;
        this.tick.call(this);
        this.props.setNextReelStoppedId(this.props.ReelIndex);
        let array: any = [];
        if (nextProps.stopable == 0) {
            for (let i = 0; i < this.props.reelList.length; i++) {
                array[i] = false;
            }
        } else {
            array = nextProps.stopable;
        }
        for (let n = 0; n < array.length; n++) {
            if (n == nextProps.ReelIndex) {
                if (this.forceSpinStopReels === true) {
                    let timer = TIMER.TimerManager.createTimer(300 * n);
                    timer.on('end', (e: any) => {
                        e.remove();
                        this.spinSymbolCount = 0;
                        array[n] = true
                        this.countStopReel = n;
                        this.props.setReelStopable(array);
                    });
                    timer.start(false);
                } else if (n == 0) {
                    let delayTime = 300 * n;
                    if (n == 0) {
                        delayTime = 0
                    }
                    let timer = TIMER.TimerManager.createTimer(1);
                    timer.on('end', (e: any) => {
                        e.remove();
                        this.spinSymbolCount = 0;
                        let array = this.props.data.STOPABLE;
                        array[n] = true
                        this.countStopReel = n;
                        this.props.setReelStopable(array)
                    });
                    timer.start(false, 1000 + delayTime);
                }
            }
        }
    }

    addExtraSymbolToEnd(blurred: boolean) {
        let reels = this.props.reelList[this.props.ReelIndex];
        if (reels) {
            const r = reels;
            for (let j = r.symbols.length; j < this.symbolInViewCount + 1; j++) {
                let symbolId = r.symbols[0].COMPONENT.symbolId;
                this.setState((prevState) => {
                    const symbolList = prevState.symbolList.concat(this.createSymbol(symbolId, j, r));
                    return {
                        symbolList,
                    };
                });
                this.forceUpdate();
            }
        }
    }

    startWobbleDown(symbolId: number, symbol: any) {
        this.addSymbolToStart(false, symbolId, symbol, true);
        this.currentWobbleHeight = 0;
        this.reelstate = Reels.REEL_STATE_WOBBLE_DOWN;
    }

    positionSymbolAtIndex(symbol: any, index: number) {
        symbol.COMPONENT.y = symbol.COMPONENT.height * index - (symbol.COMPONENT.offsetY * index);
        symbol.COMPONENT.y += this.yOffset;
    }

    repositionSymbols() {
        this.setSymbolFinalPosition = true;
        let reels = this.props.reelList[this.props.ReelIndex];
        var i = 0,
            symbols = reels.symbols,
            offset = 0;

        if (symbols.length > this.symbolInViewCount) {
            offset = this.symbolInViewCount - symbols.length;
        }

        for (i = 0; i < symbols.length; i++) {
            this.positionSymbolAtIndex(symbols[i], i + offset);
        }
    }

    stopSpin() {
        this.removeSymbolFromEnd();
        this.repositionSymbols();
    }

    removeSymbolFromEnd() {
        let reels = this.props.reelList[this.props.ReelIndex];
        if (reels) {
            const r = reels;
            let symbol = r.symbols.pop();
            if (this.setSymbolFinalPosition) {
                this.popSymbols.push(symbol)
            }
        }
    }


    addSymbolToStart(blurred: boolean, symbolId: number, symbol: any, israndom: boolean) {
        this.props.onUpdateSymbolOnReel(symbol, symbolId, israndom)
        symbol.COMPONENT.visible = true;
        let reels = this.props.reelList[this.props.ReelIndex];
        if (reels) {
            const r = reels;
            symbol.COMPONENT.y = r.symbols[0].COMPONENT.y - (symbol.COMPONENT.height) + (symbol.COMPONENT.offsetY);
            r.symbols.unshift(symbol);
        }
        if (blurred === false) {

        }
    }

    tick = () => {
        this.fpsInterval = 1000 / this.fps;
        this.then = Date.now();
        this.startTime = this.then;
        this.onUpdateTick.call(this);
    }

    onUpdateTick() {
         this.tickupRequest && window.cancelAnimationFrame(this.tickupRequest);
        this.tickupRequest ='';
        this.tickupRequest = requestAnimationFrame(this.onUpdateTick.bind(this));
        if (this.gamePause) {
            return;
        }

        this.now = Date.now();
        this.elapsed = this.now - this.then;
        if (this.elapsed > this.fpsInterval) {
            this.then = this.now - (this.elapsed % this.fpsInterval);
            let delta = this.spinSpeed * this.elapsed;
            let reels = this.props.reelList[this.props.ReelIndex];
            switch (this.reelstate) {
                case Reels.REEL_STATE_WINDING:
                    this.updateWind(reels);
                    break;

                case Reels.REEL_STATE_SPINNING:
                    this.updateSpin(reels);
                    break;

                case Reels.REEL_STATE_WOBBLE_UP:
                    this.updateWobbleUp(reels);
                    break;

                case Reels.REEL_STATE_WOBBLE_DOWN:
                    this.updateWobbleDown(reels);
                    break;
            }
        }
    }

    updateWobbleUp(reels: any) {
        var i = 0,
            symbols = this.symbols,
            decVal = this.wobbleSpeed * this.elapsed,
            curWobbleHeight = this.currentWobbleHeight;

        this.currentWobbleHeight -= decVal;
        if (this.currentWobbleHeight > 0) {
            if (reels) {
                const r = reels;
                for (let j = 0; j < r.symbols.length; j++) {
                    const s = r.symbols[j].COMPONENT;
                    if (s.parent != null && !this.forceSpinStopReels) {
                        s.y -= decVal;
                    }
                }
            }
        } else {
            let reels = this.props.reelList[this.props.ReelIndex];
            if (reels) {
                const r = reels;
                for (let j = 0; j < r.symbols.length; j++) {
                    const s = r.symbols[j].COMPONENT;
                    if (s.parent != null && !this.forceSpinStopReels) {
                        s.y -= curWobbleHeight;
                    }
                }
            }
            this.currentWobbleHeight = 0;
            this.stopWobbleUp();
        }
    }

    stopWobbleUp() {
        this.reelstate = Reels.REEL_STATE_STATIC;
        this.spinning = false;
        this.enabled = false;
        this.reelsComplete();
    }

    updateWind(reels: any) {
        let delta = -(this.windSpeed * this.elapsed);
        let calculateDiff = 0;
        if (reels) {
            let r = reels;
            for (let j = 0; j < r.symbols.length; j++) {
                let s = r.symbols[j].COMPONENT;
                s.visible = true;
                if (s.parent != null) {
                    s.y += delta;
                }
            }

        }

        if (reels.symbols[0].COMPONENT.y * -1.0 + reels.symbols[0].COMPONENT.offsetY >= this.windHeight - this.yOffset + calculateDiff) {
            this.spinSpeed = this.props.data.SPIN_SPEED[this.props.ReelIndex] / 2;
            let timer = TIMER.TimerManager.createTimer(100);
            timer.on('end', (e: any) => {
                e.remove();
                this.startSpin();
            });
            timer.start();
        }
    }

    startSpin() {
        this.reelRunning = true;
        this.reelstate = Reels.REEL_STATE_SPINNING;
        let timer = TIMER.TimerManager.createTimer(200);
        timer.on('end', (e: any) => {
            e.remove();
            this.spinSpeed = this.props.data.SPIN_SPEED[this.props.ReelIndex];
        });
        timer.start();
    }


    updateWobbleDown(reels: any) {
        this.props.setSpinningReelStop(this.props.ReelIndex);
        var i = 0,
            difference = 0,
            incVal = this.spinSpeed * this.elapsed,
            curWobbleHeight = this.currentWobbleHeight;

        this.currentWobbleHeight += incVal;

        if (this.currentWobbleHeight < this.wobbleHeight) {
            if (reels) {
                const r = reels;
                for (let j = 0; j < r.symbols.length; j++) {
                    const s = r.symbols[j].COMPONENT;
                    if (s.parent != null && !this.forceSpinStopReels) {
                        s.y += incVal;
                    }
                }
            }
        } else {
            if (reels) {
                difference = this.wobbleHeight - curWobbleHeight;
                const r = reels;
                for (let j = 0; j < r.symbols.length; j++) {
                    const s = r.symbols[j].COMPONENT;
                    if (s.parent != null && !this.forceSpinStopReels) {
                        s.y += difference;
                    }
                }
                this.currentWobbleHeight = this.wobbleHeight;
            }
        }

        this.startWobbleUp();
        this.props.setStoppingReel(this.props.ReelIndex)
    }

    startWobbleUp() {
        this.reelstate = Reels.REEL_STATE_WOBBLE_UP;
    }


    updateSpin(reels: any) {
        let symbolsToEnd = 0, index = -1, symbolId = -1;
        let delta = this.spinSpeed * this.elapsed;

        if (reels) {
            const r = reels;
            for (let j = 0; j < r.symbols.length; j++) {

                const s = r.symbols[j].COMPONENT;
                if (s.parent != null) {
                    if (this.forceSpinStopReels === true) {
                        s.y += delta;
                    } else {
                        s.y += delta;
                    }
                }
            }

            while (!this.gamePause && r.symbols[r.symbols.length - 1] && r.symbols[r.symbols.length - 1].COMPONENT.y - this.yOffset > this.props.reelHeight && this.reelRunning) {
                if (this.props.ReelIndex === this.countStopReel) {
                    this.spinSymbolCount++;
                }
                this.reelStripSymbolIndex++;
                if (this.reelStripSymbolIndex >= this.props.reelStrips[this.props.currentReelStripIndex][this.props.ReelIndex].length) {
                    this.reelStripSymbolIndex = 0;
                }
                if (this.symbolsToDisplay.length === 0 || this.props.stopable[this.props.ReelIndex] === false) {
                    this.spinSymbolCount--;
                }

                let symbol = r.symbols[r.symbols.length - 1];
                if (this.spinSymbolCount === this.totalSpinSymbolLength) {
                    if (this.reelStopDifference > 0) {

                    }
                    this.reelRunning = false;
                    this.stopSpin();
                    this.startWobbleDown(this.props.reelStrips[this.props.currentReelStripIndex][this.props.ReelIndex][this.reelStripSymbolIndex], symbol);

                } else if (this.spinSymbolCount >= this.totalSpinSymbolLength - this.symbolInViewCount) {
                    this.removeSymbolFromEnd();
                    symbolsToEnd = this.totalSpinSymbolLength - this.spinSymbolCount - 1;
                    index = symbolsToEnd;
                    if (index >= 0 && index < this.symbolsToDisplay.length) {
                        symbolId = this.symbolsToDisplay[index];
                        const symbolChild = symbol.COMPONENT.children;
                        this.addSymbolToStart(true, symbolId, symbol, false);
                        for (let k = 0; k < symbolChild.length; k++) {
                            symbolChild[k].visible = true
                        }
                    } else {
                        this.removeSymbolFromEnd();
                        this.addSymbolToStart(true, symbol.symbolId, symbol, false);
                    }
                } else {
                    this.removeSymbolFromEnd();
                    this.addSymbolToStart(true, this.props.reelStrips[this.props.currentReelStripIndex][this.props.ReelIndex][this.reelStripSymbolIndex], symbol, true);
                }
            }
        }
    }

    // new code
    createSymbol(symbolId: number, row: number, reel: any, yoffset: number = 0) {
        let symbolWiseHeight: any = [];
        let symbolsCount = this.symbolHeightMappingList.map((data: any) => {
            symbolWiseHeight.push(data.height);
        })

        let PROPS_TO_SEND_Symbol = {
            key: "symbol_" + Math.random() + this.props.ReelIndex + "_" + row,
            yoffset: row * symbolWiseHeight[0],
            app: this.app,
            configGame: this.props.configGame,
            SYMBOL_ID: symbolId,
            ROW_ID: row,
            REEL_ID: this.props.ReelIndex,
            REEL: reel,
            filters: [reel.blur],
            anchor : [0,0]
        }

        return <Symbol {...PROPS_TO_SEND_Symbol} >

        </Symbol>;
    }

    randomizeSymbols(reel: any) {
        var i = 0,
            symbol = null,
            linkedSymbolIndex;
        this.symbols = [];
        for (let j = 0; j < this.symbolInViewCount; j++) {

            let symbolId = this.REEL_STOPS[this.props.ReelIndex][j];
            if (symbolId == -1) {
                break;
            }
            if (symbolId == undefined) {

                symbolId = symbolId = this.props.reelStrips[this.props.currentReelStripIndex][this.props.ReelIndex][this.reelStripSymbolIndex];//Math.floor(Math.random() * (8 - 1) + 1);
            }
            this.symbols.push(this.createSymbol(symbolId, j, reel));

        }
        this.setState((prevState) => {
            return {
                ...prevState,
                symbolList: this.symbols,
            }
        })
        this.forceUpdate();
    }

    render() {
        if (this.REEL_STOPS.length === 0) {
            console.error("reels are empty")
            return <></>;
        }
        let { symbolList } = this.state;
        return (<UIManager type={"Container"} ref={(i: any) => this.subReelContainer = i}
            id={"reelgrid" + this.props.ReelIndex} name={"reelgrid" + this.props.ReelIndex}
            app={this.app} configGame={this.props.configGame}
            x={this.props.ReelIndex * this.props.data.REEL_WIDTH + this.props.ReelIndex * this.props.data.REEL_GAP}>
            {/* filters={[reel.blur]} */}
            {symbolList}
        </UIManager>);
    }
}

export default withPixiApp(connect(
    (state: Pick<IStore, 'basegameState' | 'reelsState' | 'buttonPanelState' | 'symbolState'>): IStateToProps =>
    ({
        featureType: state.basegameState.featureType,
        basegameState: state.basegameState.basegamestate,
        updatedSymbol: state.symbolState.updatedSymbol,
        isSpinning: state.reelsState.isSpinning,
        spinStart: state.reelsState.spinStart,
        spinStop: state.reelsState.spinStop,
        forceSpinStop: state.reelsState.forcespinStop,
        spinResponseReceived: state.reelsState.spinResponseReceived,
        winningList: state.reelsState.winningList,
        reel_data: state.reelsState.reel_data,
        reelStrips: state.reelsState.reelStrips,
        currentReelStripIndex: state.reelsState.currentReelStripIndex,
        stoppingReel: state.reelsState.stoppingReel,
        stopable: state.reelsState.stopable,
        displayReelGridSymbolCount: state.reelsState.displayReelGridSymbolCount,
        anticipationOnReel: state.reelsState.anticipationOnReel,
        anticipationOnReelPlaying: state.reelsState.anticipationOnReelPlaying,
        countStopReels: state.reelsState.countStopReels,
    }),
    (dispatch: Dispatch): IDispatchToProps => ({
        displayWinBox: (displayWinBox: boolean): any => dispatch(winpresentationAction.displayWinBox(displayWinBox)),
        setReelStopable: (stopable: any): any => dispatch(reelsActions.setReelStopable(stopable)),
        stopSpin: (): any => dispatch(reelsActions.stopSpin()),
        setSpinType: (): any => dispatch(reelsActions.setSpinType()),
        setSpinningReelStart: (reelId: number): any => dispatch(reelsActions.setSpinningReelStart(reelId)),
        setSpinningReelStop: (reelId: number): any => dispatch(reelsActions.setSpinningReelStop(reelId)),
        nextAutoplay: (): any => dispatch(basegameAction.nextAutoplay()),
        nextFreegame: (): any => dispatch(freegameAction.nextFreegame()),
        setAllButtonEnable: (exceptBtnList: Array<string>): any => dispatch(buttonActions.setAllButtonEnable(exceptBtnList)),
        stopWinPresentation: (): any => dispatch(winpresentationAction.stopWinPresentation()),
        playLandingAnim: (): any => dispatch(landingSymbolAction.playLandingAnim()),
        setStoppedReel: (stoppedReel: number): any => dispatch(reelsActions.setStoppedReel(stoppedReel)),
        setSpinning: (spinning: boolean): any => dispatch(reelsActions.setSpinningState(spinning)),
        setSpinComplete: (allSpinComplete: boolean): any => dispatch(reelsActions.setSpinComplete(allSpinComplete)),
        setStoppingReel: (stoppingReel: number): any => dispatch(reelsActions.setStoppingReel(stoppingReel)),
        setNextReelStoppedId: (stopNextReelId: number): any => dispatch(reelsActions.setNextReelStoppedId(stopNextReelId)),
        onUpdateSymbolOnReel: (symbol: any, symbolId: number, randomSymbol: boolean): any => dispatch(symbolActions.setUpdatedSymbol(symbol, symbolId, randomSymbol)),
        setWinSymbolCoOrdinate: (winSymbolCoOrdinate: any): any => dispatch(winpresentationAction.setWinSymbolCoOrdinate(winSymbolCoOrdinate)),
        flowManagerCalled: (callFlowManager: boolean): any => dispatch(flowManagerAction.flowManagerCalled(callFlowManager))
    }))(withReelsConfiguration(Reels)));
