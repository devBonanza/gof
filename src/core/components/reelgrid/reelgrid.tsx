import React, { Component } from "react";
import withReelGridConfiguration from "../reelgrid/configuration/withReelGridConfiguration";
import { TIMER } from "../../utills";
import * as PIXI from "pixi.js";
import Symbol from "../symbol/symbol";
import { withPixiApp } from "@inlet/react-pixi";
import { connect } from 'react-redux'
import { Dispatch } from 'redux';
import { IStore } from "../../store/IStore";
import UIManager from "../ui/UiBuilder";
import { actions as winpresentationAction } from "../../reducers/winPresentationReducer";
import { actions as reelgridAction, actions as reelsGridActions, actions as reelsActions, actionTypes } from "../../reducers/reelgridStateReducer";
import { actions as symbolActions } from "../../reducers/symbolStateReducer";
import { actions as buttonActions } from "../../reducers/buttonPanelReducer";
import { actions as basegameAction } from "../../reducers/baseGameReducer";
import { actions as freegameAction } from "../../reducers/freeGameReducer";
import { actions as flowManagerAction } from "../../reducers/flowManagerReducer";
import { actions as landingSymbolAction } from "../../reducers/landingsymbolreducer";
import { actions as overlayActions } from "../../reducers/overlayreducer";
import _ from "lodash";
import { MotionBlurFilter } from "@pixi/filter-motion-blur"
import { Tween } from "../effect/tween";
import { actions as winCelebrationActions } from "../../../gamereducer/winCelebrationReducer";
import { actions as behaviourAction } from "../../../gamereducer/behaviourReducer";


window.PIXI = PIXI;
interface IStateToProps {
    reactCompSymbolTrayList: any
    blastPosition: any
    updatedSymbol: any
    reel_data: any
    winningList: any
    stopable: any
    stopNextReelId: any
    stoppingReel: number
    anticipationOnReelPlaying: number
    previousReelStoppedId: number
    featureJustReTriggered: boolean
    isSpinning: boolean
    spinStart: boolean
    spinStop: boolean
    immediateResponseReceived: boolean
    forceSpinStop: boolean
    blastStart: boolean
    spinResponseReceived: boolean
    InTurboMode: boolean
    reelStrips: any,
    countStopReels: any,
    currentReelStripIndex: number,
    currentCascadeCount: number,
    totalCascadeCount: number,
    displayReelGridSymbolCount: any,
    anticipationOnReel: any,
    landingAnimPositions: any,
    playAnticipation: boolean,
    gamePause: boolean,
    inFreeGame: boolean,
    minimumGameDurationMs: number,
    isSlamSpin: boolean,
    isRemoveKeyBoardEvent: boolean,
}

interface IDispatchToProps {

}

interface IProps extends IStateToProps {
    [x: string]: any;
}

interface IState {
    symbolList: any
}

class Reelgrid extends Component<IProps, IState> {
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
    //spinSymbolCount: number;
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
    //countStopReel: number;

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
    //grid
    protected newPositions: any;
    private gridPositions: any;
    private createPosition: any;
    private endPosition: any;
    private landingAnimationSymbolIdList: any;
    private wageMult: number[] = [];
    private isSlamClick: boolean = false;
    private tweenArr: Tween[] = []

    private ALLTIMER: any[] = []
    stopReelIndexByForce: number[] = [];
    countStopReelByIndex: number[] = []
    customSpinSymbolCount: number[] = [];
    private roughArr: any[] = [];



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
        // this.countStopReel = 0;
        this.countStopReelByIndex = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.stopReelIndexByForce = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.customSpinSymbolCount = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
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
        //this.spinSymbolCount = this.props.data.SPIN_SYMBOL_COUNT[this.props.ReelIndex];
        this.symbolInViewCount = this.props.data.SYMBOL_IN_VIEW_COUNT[this.props.ReelIndex];
        this.spinSymbolLength = this.props.data.SPIN_SYMBOL_LENGTH[this.props.ReelIndex];
        this.turbospinSymbolLength = this.props.data.TURBO_SPIN_SYMBOL_LENGTH[this.props.ReelIndex];
        this.anticipationSymbolLength = this.props.data.ANTICIPATION_SYMBOL_LENGTH[this.props.ReelIndex];
        this.reelstate = Reelgrid.REEL_STATE_STATIC;
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
        this.state = { symbolList: [] };
        this.symbolHeightMappingList = this.props.data.SYMBOL_HEIGHT_MAPPING_LIST;
        this.landingAnimationSymbolIdList = this.props.data.LANDING_SYMBOL_ID_LIST;
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

        this.wobbleHeight = this.props.data.WOBBLE_HEIGHT[this.props.ReelIndex];
        this.wobbleSpeed = this.props.data.WOBBLE_SPEED[this.props.ReelIndex];
        this.currentWobbleHeight = this.props.data.CURRENT_WOBBLE_HEIGHT[this.props.ReelIndex];
        this.windSpeed = this.props.data.WIND_SPEED[this.props.ReelIndex];
        this.windHeight = this.props.data.WIND_HEIGHT[this.props.ReelIndex];
        this.symbolNumberOffset = this.props.data.SYMBOL_NUMBER_OFFSET[this.props.ReelIndex];
        this.reelStopDifference = this.props.data.REEL_STOP_DIFFERENCE[this.props.ReelIndex];
        //this.spinSymbolCount = this.props.data.SPIN_SYMBOL_COUNT[this.props.ReelIndex];
        this.symbolInViewCount = this.props.data.SYMBOL_IN_VIEW_COUNT[this.props.ReelIndex];
        this.spinSymbolLength = this.props.data.SPIN_SYMBOL_LENGTH[this.props.ReelIndex];
        this.turbospinSymbolLength = this.props.data.TURBO_SPIN_SYMBOL_LENGTH[this.props.ReelIndex];
        this.anticipationSymbolLength = this.props.data.ANTICIPATION_SYMBOL_LENGTH[this.props.ReelIndex];
        this.reelstate = Reelgrid.REEL_STATE_STATIC;
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
        this.state = { symbolList: [] };
        this.symbolHeightMappingList = this.props.data.SYMBOL_HEIGHT_MAPPING_LIST;
        this.landingAnimationSymbolIdList = this.props.data.LANDING_SYMBOL_ID_LIST;

        this.gridPositions = [{ x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }];
        this.createPosition = { x: 0, y: 0 };
        this.endPosition = { x: 0, y: 0 };
        this.props.setSpinType();
        this.onInitializeReelStop();

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
                this.resetAll();
                this.init();
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



        if (nextProps.isSpinning != this.props.isSpinning || nextProps.spinStart != this.props.spinStart || nextProps.spinStop != this.props.spinStop
            || nextProps.forceSpinStop != this.props.forceSpinStop || nextProps.spinResponseReceived != this.props.spinResponseReceived
            || nextProps.spinStopID != this.props.spinStopID || nextProps.spinStartID != this.props.spinStartID
            || nextProps.stoppingReel != this.props.stoppingReel || nextProps.blastStart != this.props.blastStart
            || nextProps.immediateResponseReceived != this.props.immediateResponseReceived
            || nextProps.countStopReels != this.props.countStopReels ||
            nextProps.playAnticipation != this.props.playAnticipation || nextProps.gamePause != this.props.gamePause
            || nextProps.isSlamSpin != this.props.isSlamSpin
        ) {
            if (nextProps.isSlamSpin && nextProps.isSlamSpin != this.props.isSlamSpin && nextProps.immediateResponseReceived) {
                this.clearReelsTimers();
                this.isSlamClicked = true;
                if (nextProps.ReelIndex === 5) {
                    this.stopReelOneByOne();
                }
                //this.customReelMotionFinished(nextProps);
                return false;
            }

            if (nextProps.gamePause != this.props.gamePause) {
                if (!nextProps.gamePause) {
                    this.onGameResume();
                } else {
                    this.onGamePause()
                }
            }
            if (nextProps.immediateResponseReceived && nextProps.immediateResponseReceived != this.props.immediateResponseReceived) {
                let timer = TIMER.TimerManager.createTimer(10 * nextProps.ReelIndex);
                timer.on('end', (e: any) => {
                    e.remove();
                    this.continueFlow(nextProps);
                });
                timer.start();
                return false;
            }
            if (nextProps.spinStart && nextProps.spinStart != this.props.spinStart) {
                this.props.setSlamSpin(false);
                this.clearBlastTimer();

                this.forceSpinStopReels = false;
                this.isSlamClick = false;
                this.props.setActiveall(false);
                //this.props.setSlamSpin(false);
                if (nextProps.InTurboMode) {
                    this.forceSpinStopReels = true;
                } else {
                    this.forceSpinStopReels = false;
                }
                this.wageMult = [];
                // this.countStopReel = 0;
                this.countStopReelByIndex[nextProps.ReelIndex] = 0;
                this.props.setCurrentCascadeCount(0);

                this.onReelSpinStart(nextProps);
                // let timer = TIMER.TimerManager.createTimer(1 * nextProps.ReelIndex);
                // timer.on('end', (e: any) => {
                //     e.remove();

                // });
                // timer.start();
                return false;

            }
            if (nextProps.stoppingReel == nextProps.ReelIndex && nextProps.stoppingReel != this.props.stoppingReel && this.forceSpinStopReels == false) {
                //this.spinSymbolCount = 0;
                this.customSpinSymbolCount[nextProps.ReelIndex] = 0;
                if (this.props.anticipationOnReel[nextProps.ReelIndex] === true) {
                    this.totalSpinSymbolLength = this.anticipationSymbolLength;
                    this.spinSpeed = this.anticipationSpinSpeed;
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

            if (nextProps.blastStart && nextProps.blastStart != this.props.blastStart) {
                this.blastSymbol(this.props.ReelIndex, nextProps)
                this.responseReceivedAfterBlast = false;
                this.startBlast(nextProps);
                return false;
            }
            if (nextProps.countStopReels === nextProps.data.REEL_COLUMN) {
                if (nextProps.winningList.length == 0) {
                    this.props.stopWinPresentation();
                }
                this.props.setStartSpinBySpaceBar(false);
                this.clearReelsTimers();
                this.clearSlamtimers();
                this.cancelledAllRequest();
                if (!nextProps.blastStart) {
                    nextProps.setSpinComplete(true);
                    this.nextPlayCommand(nextProps);
                }
            }

            return false;
        }
        return false;
    }

    private clearReelsTimers(): void {
        this.props.data.REELSTIMERS.length && this.props.data.REELSTIMERS.forEach((times: any) => {
            times && times.stop();
            times && times.remove();
            times = '';
        });
        this.props.data.REELSTIMERS = [];
    }


    private clearSlamtimers(): void {
        this.props.data.REELSTIMERSFORSLAM.length && this.props.data.REELSTIMERSFORSLAM.forEach((times: any) => {
            times && times.stop();
            times && times.remove();
            times = '';
        });
        this.props.data.REELSTIMERSFORSLAM = [];
    }


    private isSlamClicked: boolean = false;
    private resetAll(): void {
        this.fpsInterval = 0
        this.then = 0
        this.startTime = 0;
        this.now = 0;
        this.elapsed = 0;
        this.forceSpinStopReels = false;
        //this.spinSymbolCount = 0;
        this.customSpinSymbolCount = [0, 0, 0, 0, 0, 0, 0]

        this.tweenArr.length && this.tweenArr.forEach((tween: any) => {
            tween && tween.dispose();
        });
        this.tweenArr = [];
        this.stopReelIndexByForce = [0, 0, 0, 0, 0, 0, 0]
        this.props.app.ticker.remove(this.tick);

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
        // this.countStopReel = 0;
        this.countStopReelByIndex = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.stopReelIndexByForce = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.customSpinSymbolCount = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.props.data.REELSNO = 0;
        this.subReelContainer = {};
        this.totalCascadeCount = this.props.totalCascadeCount;
        this.reelStripSymbolIndex = 0;
        // this.cancelledAllRequest();
        this.isSlamClicked = false;

    }


    private cancelledAllRequest(): void {
        cancelAnimationFrame(this.tickupRequest);
        while (this.props.data.FRAMEANIMATIONREQUEST.length) {
            let req = this.props.data.FRAMEANIMATIONREQUEST.pop();

            window.cancelAnimationFrame(req);
            req = '';
        }
        this.props.data.FRAMEANIMATIONREQUEST = [];

    }


    private nextPlayCommand(nextProps: any): void {
        if (nextProps.winningList.length == 0) {
            this.props.inBetweenSpinning(false);
            this.props.setActiveall(true);
            this.onResetGrid(nextProps);
            this.props.flowManagerCalled(true);
            this.removeKeyBoradEvent();
        }
    }

    private removeKeyBoradEvent(): void {
        let timer = TIMER.TimerManager.createTimer(500);
        timer.on('end', (e: any) => {
            e.remove();
            this.props.removeKeyBoardEvent(false);

        });
        timer.start();
    }
    private clearBlastTimer(): void {
        this.props.data.TIMERS.length && this.props.data.TIMERS.forEach((times: any) => {
            times && times.stop();
            times && times.remove();
            times = '';

        });
        this.props.data.TIMERS = [];
    }




    startBlast(nextProps: any) {
        let reelGridPos: any = []
        this.newPositions = [];
        let gridSymbols = nextProps.reelList[nextProps.ReelIndex].symbols;
        gridSymbols.forEach((data: any, index: number) => {
            reelGridPos.push({ x: data.COMPONENT.x, y: data.COMPONENT.y })
        })
        let shiftCount = 0;
        for (let j = nextProps.data.REEL_ROWS; j >= 0; j--) {
            gridSymbols[j].COMPONENT.shiftCount = shiftCount;
            if (gridSymbols[j].COMPONENT.blasted) {
                let timer = TIMER.TimerManager.createTimer(150);
                timer.on('end', (e: any) => {
                    e.remove();
                    let symbolContainer = gridSymbols[j].COMPONENT;
                    symbolContainer.visible = false;
                    this.props.playSymbolAnim();
                    let wincordinate: any = [];
                    nextProps.blastPosition.forEach((data: any, index: number) => {
                        wincordinate.push({
                            "reelId": data.reelId,
                            "rowId": data.rowId - 1,
                        })
                    })
                    nextProps.setWinSymbolCoOrdinate(wincordinate);
                });
                timer.start();
                this.props.data.TIMERS.push(timer);

                shiftCount += 1;
            }
            if (shiftCount > 0) {
                gridSymbols[j].shifted = true

                let timer = TIMER.TimerManager.createTimer(1200);
                timer.on('end', (e: any) => {
                    e.remove();
                    this.tweenTo(gridSymbols[j].COMPONENT, 'y', gridSymbols[j].COMPONENT.y - 20, 1, "easeOutBounce", null, () => {
                        if (nextProps.playAnticipation) {
                            this.tweenTo(gridSymbols[j].COMPONENT, 'y', gridSymbols[j].COMPONENT.y + 20, 1, "easeOutExpo", null, () => {

                            });
                        }
                    });
                });
                timer.start();
                this.props.data.TIMERS.push(timer);
            } else {
                gridSymbols[j].shifted = false
            }
        }
        let resettimertimer = TIMER.TimerManager.createTimer(1800);
        resettimertimer.on('end', (e: any) => {
            e.remove();
            if (this.props.ReelIndex + 1 === this.props.data.REEL_COLUMN) {
                this.props.clearOverlaySymbol();
                this.props.resetDropAfterBlast();
            }
        });
        resettimertimer.start();
        this.props.data.TIMERS.push(resettimertimer);
        let blasttimertimer = TIMER.TimerManager.createTimer(1800);
        blasttimertimer.on('end', (e: any) => {
            e.remove();
            this.setUpCasCadeGrid(reelGridPos);
        });

        blasttimertimer.start();
        this.props.data.TIMERS.push(blasttimertimer);
        if (this.props.playAnticipation) {
            let timer = TIMER.TimerManager.createTimer(5000 + this.props.data.delayDropDuration);
            timer.on('end', (e: any) => {
                e.remove();
                this.props.setWinSymbolCoOrdinate([]);
                this.props.playSymbolAnim();
                this.responseReceivedAfterBlast = true;
                this.continueFlow(nextProps);
                this.reArrangeGrid();
                this.responseReceivedAfterBlast = true;
            });
            timer.start();
        } else {
            let timer = TIMER.TimerManager.createTimer(2000 + this.props.data.delayDropDuration);
            timer.on('end', (e: any) => {
                e.remove();
                this.responseReceivedAfterBlast = true;
                this.continueFlow(this.props);
            });
            timer.start();
            this.props.data.TIMERS.push(timer);
        }

    }

    continueFlow(nextProps: any) {
        if (this.responseReceivedAfterBlast == true && nextProps.immediateResponseReceived) {
            this.responseReceivedAfterBlast = false;
            this.reArrangeGrid();
            // this.startDropAfterBlast(nextProps);
            this.startDropAfterBlast(this.props);
        }
    }


    setUpCasCadeGrid(reelGridPos: any) {
        let gridCoulmn = UIManager.getRef("reelgrid" + this.props.ReelIndex);
        this.gridPositions = reelGridPos.sort(function (a: any, b: any) {
            return a.y - b.y;
        });
        let gridPositionTest = [];
        let symbolWiseHeight: any = [];
        let symbolsCount = this.symbolHeightMappingList.map((data: any) => {
            symbolWiseHeight.push(data.height);
        })
        let countIndex = -1;
        for (let i = 0; i <= this.gridPositions.length; i++) {
            gridPositionTest.push({
                x: 0,
                y: countIndex * symbolWiseHeight[this.props.displayReelGridSymbolCount[this.props.ReelIndex] - 2]
            });
            countIndex++;
        }
        this.gridPositions = gridPositionTest;
        this.createPosition.x = _.cloneDeep(this.props.data.createPosition).x + gridCoulmn.x;
        this.createPosition.y = -symbolWiseHeight[this.props.displayReelGridSymbolCount[this.props.ReelIndex] - 2] + gridCoulmn.children[1].offsetY;
        this.endPosition.x = _.cloneDeep(this.props.data.endPosition).x
        this.endPosition.y = _.cloneDeep(this.props.data.endPosition).y;
        this.endPosition.x += gridCoulmn.x;
        this.endPosition.y += gridCoulmn.y;
    }


    endBlast(symbol: any) {
        let symbolContainer = symbol.symbolcontainer;
        symbolContainer.visible = false;

    }

    reArrangeGrid() {
        let gridSymbols = this.props.reelList[this.props.ReelIndex].symbols;
        for (let j = this.props.data.REEL_ROWS - 1; j > 0; j--) {
            let shiftCount = gridSymbols[j].COMPONENT.shiftCount;
            if (gridSymbols[j].COMPONENT.blasted) {
                shiftCount = 0;
            }
            if (shiftCount > 0) {
                this.tweenTo(gridSymbols[j].COMPONENT, 'y',
                    gridSymbols[j].COMPONENT.y + gridSymbols[j].COMPONENT.height * shiftCount + 20, 0.4, "easeOutBounce", null, () => {
                        if (gridSymbols[j].COMPONENT.shiftCount > 0) {
                            gridSymbols[j].COMPONENT.y = gridSymbols[j].COMPONENT.y
                        } else {
                            if (this.props.playAnticipation) {
                                gridSymbols[j].COMPONENT.y = gridSymbols[j].COMPONENT.y - 20
                            }
                        }
                    });
            }
        }
    }

    reArrangeGridBeforeNextCascade() {
        let gridSymbols = this.props.reelList[this.props.ReelIndex].symbols;
        for (let j = this.props.data.REEL_ROWS - 1; j > 0; j--) {
            let shiftCount = gridSymbols[j].COMPONENT.shiftCount;
            if (gridSymbols[j].COMPONENT.blasted) {
                shiftCount = 0;
            }
            this.tweenTo(gridSymbols[j].COMPONENT, 'y',
                gridSymbols[j].COMPONENT.y + gridSymbols[j].COMPONENT.height * shiftCount
                , this.props.data.singlePositionDropDuration / 1000, "easeOutBounce", null, () => {
                });
        }

        gridSymbols.sort(this.compare_prop_y);
        gridSymbols.forEach((data: any, index: number) => {
            data.COMPONENT.rowId = index;
            data.COMPONENT.gridPosition = index;
        })
    }

    startDropAfterBlast(nextProps: any) {
        this.REEL_STOPS = nextProps.reel_data.stopReelsAfterWin;
        let gridSymbols = nextProps.reelList[nextProps.ReelIndex].symbols,
            count = 0;
        this.newPositions = [];
        for (let i = 0; i < this.popDropSymbols.length; i++) {
            gridSymbols.push(this.popDropSymbols[i]);
        }
        this.popDropSymbols = [];
        gridSymbols.forEach((symbol: any, index: number) => {
            if (symbol.COMPONENT.blasted) {
                this.props.onUpdateSymbolOnReel(symbol.COMPONENT, this.REEL_STOPS[nextProps.ReelIndex][count], false);
                count += 1;
                symbol.COMPONENT.y = this.createPosition.y * (count);
                symbol.COMPONENT.visible = false;
                const symbolChild = symbol.COMPONENT.children;
                for (let k = 0; k < symbolChild.length; k++) {
                    symbolChild[k].visible = true;
                }
                let timer = TIMER.TimerManager.createTimer(100);
                timer.on('end', (e: any) => {
                    symbol.COMPONENT.visible = true;
                });
                timer.start();
                this.props.data.TIMERS.push(timer);
                this.tweenTo(symbol.COMPONENT, 'y', this.gridPositions[count].y
                    , nextProps.data.singlePositionDropDuration * (this.gridPositions.length - index) / 1000, "easeOutBounce", null, () => {
                    });

            }
        });
        this.onResetGrid(nextProps);
        let timer = TIMER.TimerManager.createTimer(nextProps.data.singlePositionDropDuration * this.gridPositions.length);
        timer.on('end', (e: any) => {
            e.remove();
            this.reArrangeGridBeforeNextCascade();
            cancelAnimationFrame(this.tickupRequest);
            nextProps.winningList[0] && nextProps.winningList[0].positions.forEach((data: any, index: number) => {
                let wincordinate: any = [];
                wincordinate.push({
                    "reelId": data.reelId,
                    "rowId": data.rowId - 1,
                })
                nextProps.setWinSymbolCoOrdinate(wincordinate);
            })
            if (nextProps.ReelIndex + 1 === nextProps.data.REEL_COLUMN) {
                if (this.totalCascadeCount - 1 == nextProps.currentCascadeCount + 1) {

                    if (nextProps.featureJustReTriggered) {
                        for (let n = 0; n < nextProps.data.REEL_COLUMN; n++) {
                            const r = nextProps.reelList[n];
                            for (let i = 0; i < r.symbols.length; i++) {
                                if (r.symbols[i].COMPONENT.y < 0) {
                                    r.symbols[i].COMPONENT.visible = false
                                }
                                let displayObj = r.symbols[i].COMPONENT
                                if (r.symbols[i].COMPONENT.visible) {
                                    if (this.landingAnimationSymbolIdList.indexOf(r.symbols[i].symbolId) > -1) {
                                        for (let k = 0; k < displayObj.children.length; k++) {
                                            if (displayObj.children[k].animationSpeed) {
                                                displayObj.children[k] && (displayObj.children[k].loop = true)
                                                displayObj.children[k] && (displayObj.children[k].playing = true)
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    nextProps.flowManagerCalled(true);
                    this.props.inBetweenSpinning(false);
                } else {
                    nextProps.setWinSymbolCoOrdinate([]);
                    let timer = TIMER.TimerManager.createTimer(1000);
                    timer.on('end', (e: any) => {
                        e.remove();
                        nextProps.setCurrentCascadeCount(nextProps.currentCascadeCount + 1);
                    });
                    timer.start();
                    this.props.data.TIMERS.push(timer);
                }
            }

        });
        timer.start();
        this.props.data.TIMERS.push(timer);
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
        this.props.inBetweenSpinning(true);
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
        let symbolslist = reels.symbols;

        for (let i = 0; i < symbolslist.length; i++) {
            let symbol = symbolslist[i];
            symbol.COMPONENT.gridPosition = i;
            symbol.COMPONENT.rowId = symbol.rowId;
            symbol.COMPONENT.reelId = symbol.reelId;
            if (i - 1 > 0) {
                symbol.COMPONENT.y = (i - 1) * symbolWiseHeight[this.props.displayReelGridSymbolCount[this.props.ReelIndex] - 2]
            }

        }
        if (this.props.winningList.length == 0) {
            cancelAnimationFrame(this.tickupRequest);
        }
    }


    private tweenTo(object: any, property: any, target: any, time: any, easing: any, onchange: any, oncomplete: any, start?: number) {
        let _tween = new Tween(
            [object],
            {
                [property]: { start: object[property], end: target }
            },
            time || 0.001,
            easing,
            false, null, null, null, null, false, onchange, oncomplete
        );
        this.tweenArr.push(_tween);

    }



    spinAndDisplay(nextProps: any, symbolIds: any, stopable: boolean, forward: boolean, substitute: boolean, reelStopDifference: number) {

        this.symbolsToDisplay = symbolIds || [];
        for (let i = 0; i < this.symbolsToDisplay.length; i++) {
            this.symbolsToDisplay[i] = this.symbolsToDisplay[i] - this.symbolNumberOffset;
        }
        if (this.forceSpinStopReels) {
            this.totalSpinSymbolLength = this.turbospinSymbolLength;
            if (this.props.ReelIndex == 0) {
                let timer = TIMER.TimerManager.createTimer(50 * this.props.ReelIndex);
                timer.on('end', (e: any) => {
                    e.remove();
                    // this.spinSymbolCount = 0
                    this.customSpinSymbolCount[this.props.ReelIndex] = 0;
                    this.totalSpinSymbolLength = this.turbospinSymbolLength;
                });
                timer.start();
            }

        } else {
            //this.spinSymbolCount = 0
            this.customSpinSymbolCount[this.props.ReelIndex] = 0
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
        this.reelstate = Reelgrid.REEL_STATE_WINDING_BACKWARDS;
    }



    startWind(nextProps: any) {
        this.reelstate = Reelgrid.REEL_STATE_WINDING;
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
                if (this.forceSpinStopReels) {
                    let _time = 150;
                    for (let k = 0; k <= n; k++) {
                        //this.spinSymbolCount = 0;
                        this.customSpinSymbolCount[k] = 0
                        array[k] = true;
                        //this.countStopReel = k;
                        this.countStopReelByIndex[k] = k;
                        this.props.setReelStopable(array);
                    }
                }
                else {
                    let duration = nextProps.ReelIndex === 0 ? this.props.minimumGameDurationMs : 200;
                    let timer = TIMER.TimerManager.createTimer(duration);
                    timer.on('end', (e: any) => {
                        e.remove();
                        this.stopReelIndexByForce[this.props.data.REELSNO] = 1;
                        for (let k = 0; k <= this.props.data.REELSNO; k++) {
                            //this.spinSymbolCount = 0;
                            this.customSpinSymbolCount[k] = 0
                            let array = this.props.data.STOPABLE;
                            array[k] = true;
                            //this.countStopReel = k;
                            this.countStopReelByIndex[k] = k;
                            this.props.setReelStopable(array);
                        }
                        this.props.data.REELSNO = this.props.data.REELSNO + 1;
                        this.stopReelOneByOne();
                    });
                    this.props.data.REELSTIMERS[nextProps.ReelIndex] = timer;
                }
                this.setForSlamButtonTimes(nextProps);

            }
        }
        if (nextProps.ReelIndex === 5) {
            this.stopReelOneByOne();
        }
    }

    private setForSlamButtonTimes(nextProps: any): void {
        let timer = TIMER.TimerManager.createTimer(50);
        timer.on('end', (e: any) => {
            e.remove();
            this.stopReelIndexByForce[this.props.data.REELSNO] = 1;
            for (let k = 0; k <= this.props.data.REELSNO; k++) {
                this.customSpinSymbolCount[k] = 0;
                let array = this.props.data.STOPABLE;
                array[k] = true;
                this.countStopReelByIndex[k] = k;
                this.props.setReelStopable(array);
            }
            this.props.data.REELSNO = this.props.data.REELSNO + 1;
            this.stopReelOneByOne();
        });
        this.props.data.REELSTIMERSFORSLAM[nextProps.ReelIndex] = timer;
    }

    /* 
     store timer will execute one by one 
     if slam button clicked then all times will execute simultaneously 
    */
    private stopReelOneByOne(): void {
        if (this.props.data.REELSNO < 6) {
            if (this.isSlamClicked) {
                this.props.data.REELSTIMERSFORSLAM[this.props.data.REELSNO] && this.props.data.REELSTIMERSFORSLAM[this.props.data.REELSNO].start(false);
            }
            else {
                this.props.data.REELSTIMERS[this.props.data.REELSNO] && this.props.data.REELSTIMERS[this.props.data.REELSNO].start(false);
            }
        }
    }



    startWobbleDown(symbolId: number, symbol: any) {
        this.addSymbolToStart(false, symbolId, symbol, true);
        this.currentWobbleHeight = 0;
        this.reelstate = Reelgrid.REEL_STATE_WOBBLE_DOWN;

    }

    positionSymbolAtIndex(symbol: any, index: number) {
        symbol.COMPONENT.y = symbol.COMPONENT.height * index - (symbol.COMPONENT.offsetY * index);
        symbol.COMPONENT.y += this.yOffset;

    }

    repositionSymbols() {
        this.setSymbolFinalPosition = true;
        let reels = this.props.reelList[this.props.ReelIndex];
        let symbols = reels.symbols;
        let offset = 0;

        if (symbols.length > this.symbolInViewCount) {
            offset = this.symbolInViewCount - symbols.length;
        }

        for (let i = 0; i < symbols.length; i++) {
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
            // symbol.COMPONENT.removeChildren();
            // symbol.COMPONENT.visible = false;
            // symbol = '';
            if (this.setSymbolFinalPosition) {
                this.popSymbols.push(symbol);
            }
        }
    }


    addSymbolToStart(blurred: boolean, symbolId: number, symbol: any, israndom: boolean) {
        this.props.onUpdateSymbolOnReel(symbol, symbolId, israndom)
        symbol.COMPONENT.visible = true;
        let reels = this.props.reelList[this.props.ReelIndex];
        try {
            if (reels) {
                const r = reels;
                symbol.COMPONENT.y = r.symbols[0].COMPONENT.y - (symbol.COMPONENT.height + symbol.COMPONENT.offsetY);
                r.symbols.unshift(symbol);
            }

        } catch (error) {
           this.props.visibleNoInternetPopUp(true, "noInternetPopUpText5", true, false);
        }
    }

    blastSymbol(reelIndex: number, nextProps: any) {
        let reels = nextProps.reelList[reelIndex];
        let symbolslist = reels.symbols;
        for (let i = 0; i < symbolslist.length; i++) {
            let symbol = symbolslist[i];
            symbol.COMPONENT.gridPosition = i;
            symbol.COMPONENT.rowId = symbol.rowId;
            symbol.COMPONENT.reelId = symbol.reelId;
            nextProps.blastPosition.forEach((data: any, index: number) => {
                if (data.reelId === symbol.reelId && data.rowId === symbol.COMPONENT.gridPosition) {
                    symbol.COMPONENT.blasted = true;
                }
            })
        }
    }
    tick = () => {
        cancelAnimationFrame(this.tickupRequest);
        this.fpsInterval = 1000 / this.fps;
        this.then = Date.now();
        this.startTime = this.then;
        this.onUpdateTick.call(this);
    }

    onUpdateTick() {
        cancelAnimationFrame(this.tickupRequest);
        this.tickupRequest = ''
        let req = this.tickupRequest = window.requestAnimationFrame(this.onUpdateTick.bind(this));

        this.props.data.FRAMEANIMATIONREQUEST.push(req);

        if (this.gamePause) {
            return;
        }
        this.now = Date.now();
        this.elapsed = this.now - this.then;
        if (this.elapsed > this.fpsInterval) {
            this.then = this.now - (this.elapsed % this.fpsInterval);
            let reels = this.props.reelList[this.props.ReelIndex];
            switch (this.reelstate) {
                case Reelgrid.REEL_STATE_WINDING:
                    this.updateWind(reels);
                    break;
                case Reelgrid.REEL_STATE_SPINNING:
                    this.updateSpin(reels);
                    break;
                case Reelgrid.REEL_STATE_WOBBLE_UP:
                    this.updateWobbleUp(reels);
                    break;
                case Reelgrid.REEL_STATE_WOBBLE_DOWN:
                    this.updateWobbleDown(reels);
                    break;
            }
        }

    }

    updateWobbleUp(reels: any) {
        if (!this.forceSpinStopReels) {
            if (!this.wageMult.includes(this.props.ReelIndex)) {
                this.wageMult.push(this.props.ReelIndex);
                this.props.setSpinningReelStop(this.props.ReelIndex);
            }
        }
        let decVal = this.wobbleSpeed * this.elapsed, curWobbleHeight = this.currentWobbleHeight;
        this.currentWobbleHeight -= decVal;
        if (this.currentWobbleHeight > 0) {
            if (reels) {
                const r = reels;
                for (let j = 0; j < r.symbols.length; j++) {
                    const s = r.symbols[j].COMPONENT;
                    if (s.parent != null && !this.forceSpinStopReels || s.parent != null && this.isSlamClick) {
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
                    if (s.parent != null && !this.forceSpinStopReels || s.parent != null && this.isSlamClick) {
                        s.y -= curWobbleHeight;
                    }
                }
            }
            this.currentWobbleHeight = 0;
            this.stopWobbleUp();
        }
    }

    stopWobbleUp() {
        this.reelstate = Reelgrid.REEL_STATE_STATIC;
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
        this.reelstate = Reelgrid.REEL_STATE_SPINNING;
        this.spinSpeed = this.props.data.SPIN_SPEED[this.props.ReelIndex];
        // let timer = TIMER.TimerManager.createTimer(200);
        // timer.on('end', (e: any) => {
        //     e.remove();
        //     this.spinSpeed = this.props.data.SPIN_SPEED[this.props.ReelIndex];
        // });
        // timer.start();
    }

    updateWobbleDown(reels: any) {
        if (this.forceSpinStopReels) {
            this.props.setSpinningReelStop(this.props.ReelIndex);
        }
        let difference = 0, incVal = this.spinSpeed * this.elapsed, curWobbleHeight = this.currentWobbleHeight;
        this.currentWobbleHeight += incVal;
        if (this.currentWobbleHeight < this.wobbleHeight) {
            if (reels) {
                const r = reels;
                for (let j = 0; j < r.symbols.length; j++) {
                    const s = r.symbols[j].COMPONENT;
                    if (s.parent != null && !this.forceSpinStopReels || s.parent != null && this.isSlamClick) {
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
                    if (s.parent != null && !this.forceSpinStopReels || s.parent != null && this.isSlamClick) {
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
        this.reelstate = Reelgrid.REEL_STATE_WOBBLE_UP;
    }
    updateSpin(reels: any) {
        let symbolsToEnd = 0, index = -1, symbolId = -1;
        let delta
        if (this.stopReelIndexByForce[this.props.ReelIndex]) {
            this.spinSpeed = 50;
        }
        delta = this.spinSpeed * this.elapsed;
        if (reels) {
            const r = reels;
            for (let j = 0; j < r.symbols.length; j++) {
                const s = r.symbols[j].COMPONENT;
                if (s.parent != null) {
                    s.y += delta;
                }
            }

            while (!this.gamePause && r.symbols[r.symbols.length - 1] && r.symbols[r.symbols.length - 1].COMPONENT.y - this.yOffset > this.props.reelHeight && this.reelRunning) {

                // if (this.props.ReelIndex === this.countStopReel) {
                //     this.spinSymbolCount++;
                // }
                if (this.props.ReelIndex === this.countStopReelByIndex[this.props.ReelIndex]) {
                    // this.spinSymbolCount++;
                    this.customSpinSymbolCount[this.props.ReelIndex]++;
                }

                if (!this.stopReelIndexByForce[this.props.ReelIndex] && !this.props.isSlamSpin && !this.forceSpinStopReels) {
                    //this.spinSymbolCount--;
                    //this.spinSymbolCount--;
                    this.customSpinSymbolCount[this.props.ReelIndex] = this.customSpinSymbolCount[this.props.ReelIndex] - 1;
                    // this.customSpinSymbolCount[this.props.ReelIndex]--;
                    // this.customSpinSymbolCount[this.props.ReelIndex]--;
                }
                this.reelStripSymbolIndex++;
                if (this.reelStripSymbolIndex >= this.props.reelStrips[this.props.currentReelStripIndex][this.props.ReelIndex].length) {
                    this.reelStripSymbolIndex = 0;
                }
                if (this.symbolsToDisplay.length === 0 || this.props.stopable[this.props.ReelIndex] === false) {
                    //this.spinSymbolCount--;
                    this.customSpinSymbolCount[this.props.ReelIndex]--;
                }


                let symbol = r.symbols[r.symbols.length - 1];
                //  if (this.spinSymbolCount === this.totalSpinSymbolLength) {
                if (this.customSpinSymbolCount[this.props.ReelIndex] === this.totalSpinSymbolLength) {
                    this.reelRunning = false;
                    this.stopSpin();
                    this.startWobbleDown(this.props.reelStrips[this.props.currentReelStripIndex][this.props.ReelIndex][this.reelStripSymbolIndex], symbol);


                } else if (this.customSpinSymbolCount[this.props.ReelIndex] >= this.totalSpinSymbolLength - this.symbolInViewCount) {
                    this.removeSymbolFromEnd();
                    symbolsToEnd = this.totalSpinSymbolLength - this.customSpinSymbolCount[this.props.ReelIndex] - 1;
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
            yoffset: yoffset,
            app: this.app,
            configGame: this.props.configGame,
            SYMBOL_ID: symbolId,
            ROW_ID: row,
            REEL_ID: this.props.ReelIndex,
            REEL: reel,
            filters: [reel.blur],
            anchor: [0.5, 0.5],
        }
        return <Symbol {...PROPS_TO_SEND_Symbol} >    </Symbol>;
    }

    randomizeSymbols(reel: any) {
        this.symbols = [];
        for (let j = 0; j < this.symbolInViewCount; j++) {
            let symbolId = this.REEL_STOPS[this.props.ReelIndex][j];
            if (symbolId === -1) {
                break;
            }
            if (symbolId == undefined) {
                symbolId = symbolId = this.props.reelStrips[this.props.currentReelStripIndex][this.props.ReelIndex][this.reelStripSymbolIndex];//Math.floor(Math.random() * (8 - 1) + 1);
            }
            this.symbols.push(this.createSymbol(symbolId, j - 1, reel));
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
            {symbolList}
        </UIManager>);
    }
}


export default withPixiApp(connect(
    (state: Pick<IStore, 'applicationState' | 'reelgridState' | 'landingState' | 'buttonPanelState' | 'basegameState' |
        'symbolState' | 'freegameState'>, ownProps?: any): IStateToProps =>
    ({
        reactCompSymbolTrayList: state.symbolState.reactCompSymbolTrayList,
        updatedSymbol: state.symbolState.updatedSymbol,
        stopNextReelId: state.reelgridState.stopNextReelId,
        stopable: state.reelgridState.stopable,
        previousReelStoppedId: state.reelgridState.previousReelStoppedId,
        isSpinning: state.reelgridState.isSpinning,
        spinStart: state.reelgridState.spinStart,
        stoppingReel: state.reelgridState.stoppingReel,
        spinStop: state.reelgridState.spinStop,
        forceSpinStop: state.reelgridState.forcespinStop,
        spinResponseReceived: state.reelgridState.spinResponseReceived,
        blastStart: state.reelgridState.blastStart,
        featureJustReTriggered: state.freegameState.featureJustReTriggered,
        winningList: state.reelgridState.winningList,
        immediateResponseReceived: state.reelgridState.immediateResponseReceived,
        reel_data: state.reelgridState.reel_data,
        blastPosition: state.reelgridState.blastPosition,
        reelStrips: state.reelgridState.reelStrips,
        currentReelStripIndex: state.reelgridState.currentReelStripIndex,
        InTurboMode: state.reelgridState.InTurboMode,
        countStopReels: state.reelgridState.countStopReels,
        displayReelGridSymbolCount: state.reelgridState.displayReelGridSymbolCount,
        currentCascadeCount: state.reelgridState.currentCascadeCount,
        totalCascadeCount: state.reelgridState.totalCascadeCount,
        playAnticipation: state.reelgridState.playAnticipation,
        anticipationOnReel: state.reelgridState.anticipationOnReel,
        anticipationOnReelPlaying: state.reelgridState.anticipationOnReelPlaying,
        landingAnimPositions: state.landingState.landingAnimPositions,
        gamePause: state.applicationState.gamePause,
        inFreeGame: state.freegameState.inFreeGame,
        minimumGameDurationMs: state.applicationState.minimumGameDurationMs,
        isSlamSpin: state.reelgridState.isSlamSpin,
        isRemoveKeyBoardEvent: state.basegameState.isRemoveKeyBoardEvent,

    }),
    (dispatch: Dispatch, ownProps): IDispatchToProps => ({
        blastPositionSet: (blastPosition: any): any => dispatch(reelgridAction.blastPositionSet(blastPosition)),
        playSymbolAnim: (): any => dispatch(winpresentationAction.playSymbolAnim()),
        setReelStopable: (stopable: any): any => dispatch(reelsActions.setReelStopable(stopable)),
        stopSpin: (): any => dispatch(reelsActions.stopSpin()),
        setSpinType: (): any => dispatch(reelsActions.setSpinType()),
        setSpinningReelStart: (reelId: number): any => dispatch(reelsActions.setSpinningReelStart(reelId)),
        setSpinningReelStop: (reelId: number): any => dispatch(reelsActions.setSpinningReelStop(reelId)),
        setNextReelStoppedId: (stopNextReelId: number): any => dispatch(reelsActions.setNextReelStoppedId(stopNextReelId)),
        nextAutoplay: (): any => dispatch(basegameAction.nextAutoplay()),
        nextFreegame: (): any => dispatch(freegameAction.nextFreegame()),
        setAllButtonEnable: (exceptBtnList: Array<string>): any => dispatch(buttonActions.setAllButtonEnable(exceptBtnList)),
        stopWinPresentation: (): any => dispatch(winpresentationAction.stopWinPresentation()),
        setSpinning: (spinning: boolean): any => dispatch(reelgridAction.setSpinningState(spinning)),
        setSpinComplete: (allSpinComplete: boolean): any => dispatch(reelsActions.setSpinComplete(allSpinComplete)),
        setStoppingReel: (stoppingReel: number): any => dispatch(reelsActions.setStoppingReel(stoppingReel)),
        setStoppedReel: (stoppedReel: number): any => dispatch(reelsActions.setStoppedReel(stoppedReel)),
        setSymbolAnimationName: (symbol: any, animationname: string, callback: any, callbackScope: any): any => dispatch(symbolActions.setSymbolAnimationName(symbol, animationname, callback, callbackScope)),
        addSymbolInTray: (): any => dispatch(symbolActions.addSymbolInTray()),
        blastStartFire: (): any => dispatch(reelsGridActions.blastStart()),
        setWinSymbolCoOrdinate: (winSymbolCoOrdinate: any): any => dispatch(winpresentationAction.setWinSymbolCoOrdinate(winSymbolCoOrdinate)),
        setCurrentCascadeCount: (currentCascadeCountAction: number): any => dispatch(reelsActions.setCurrentCascadeCount(currentCascadeCountAction)),
        flowManagerCalled: (callFlowManager: boolean): any => dispatch(flowManagerAction.flowManagerCalled(callFlowManager)),
        setSymbolAnimationPosition: (symbolAnimationPosition: any): any => dispatch(winpresentationAction.setSymbolAnimationPosition(symbolAnimationPosition)),
        onUpdateSymbolOnReel: (symbol: any, symbolId: number, randomSymbol: boolean): any => dispatch(symbolActions.setUpdatedSymbol(symbol, symbolId, randomSymbol)),
        playLandingAnim: (): any => dispatch(landingSymbolAction.playLandingAnim()),
        anticipationPlay: (playAnticipation: boolean): any => dispatch(reelgridAction.anticipationPlay(playAnticipation)),
        inBetweenSpinning: (inSpinning: boolean): any => dispatch(reelgridAction.inBetweenSpinning(inSpinning)),
        resetDropAfterBlast: (): any => dispatch(reelgridAction.resetDropAfterBlast()),
        clearOverlaySymbol: (): any => dispatch(overlayActions.clearOverlaySymbol()),
        // setReelFast: (isFastReel: any): any => dispatch(reelgridAction.setReelFast(isFastReel)),
        setSlamSpin: (isSlamSpin: boolean): any => dispatch(reelgridAction.setSlamSpin(isSlamSpin)),
        winCelebrationShow: (showWinCelebration: boolean): any => dispatch(winCelebrationActions.winCelebrationShow(showWinCelebration)),
        setActiveall: (isActiveAll: boolean): any => dispatch(basegameAction.setActiveall(isActiveAll)),
        removeKeyBoardEvent: (isRemoveKeyBoardEvent: boolean): any => dispatch(basegameAction.removeKeyBoardEvent(isRemoveKeyBoardEvent)),
        setStartSpinBySpaceBar: (startSpinBySpaceBar: boolean): any => dispatch(basegameAction.setStartSpinBySpaceBar(startSpinBySpaceBar)),
        visibleNoInternetPopUp: (noInternetPopupVisible: boolean, text: string, closeButton: boolean, continueButton: boolean): any => dispatch(behaviourAction.visibleNoInternetPopUp(noInternetPopupVisible, text, closeButton, continueButton)),


    }))(withReelGridConfiguration(Reelgrid)));
