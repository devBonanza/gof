import React, { Component } from "react";
import WithGridConfiguration from "../grid/configuration/withGridConfiguration";
import { TIMER } from "../../utills";
import * as PIXI from "pixi.js";
import Symbol from "../symbol/symbol";
import { withPixiApp } from "@inlet/react-pixi";
import { connect } from 'react-redux'
import { Dispatch } from 'redux';
import { IStore } from "../../store/IStore";
import UIManager from "../ui/UiBuilder";
import { actions as winpresentationAction } from "../../reducers/winPresentationReducer";
import { actions as gridActions } from "../../reducers/gridStateReducer";
import { actions as symbolActions } from "../../reducers/symbolStateReducer";
import { actions as buttonActions } from "../../reducers/buttonPanelReducer";
import { actions as basegameAction } from "../../reducers/baseGameReducer";
import { actions as freegameAction } from "../../reducers/freeGameReducer";
import { actions as flowManagerAction } from "../../reducers/flowManagerReducer";
import _ from "lodash";
import { actions as layoutssActions } from "../../reducers/layoutsStateReducer";
import { GlitchFilter } from '@pixi/filter-glitch';
import { Tween } from "../effect/tween";

window.PIXI = PIXI;
interface IStateToProps {
    blastPosition: any
    reel_data: any
    winningList: any
    isSpinning: boolean
    spinStart: boolean
    blastStart: boolean
    spinStop: boolean
    forceSpinStop: boolean
    spinResponseReceived: boolean
    layoutMode: string
    startDropCompleteCount: number,
    currentCascadeCount: number,
    totalCascadeCount: number,
    countStopReels: number,
    setReelDurationStart: number,
    setReelDurationSingle: number,
    setReelDurationColumn: number,
}

interface IDispatchToProps {

}

interface IProps extends IStateToProps {
    [x: string]: any;
}

interface IState {

}

class Grids extends Component<IProps, IState> {
    protected app: PIXI.Application;
    protected subGridContainer: any;
    protected eventEmitter: any;
    protected GRID_STOPS: Array<Array<number>>;
    protected newPositions: any;
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
    private gridPositions: any;
    private createPosition: any;
    private endPosition: any;
    private leftTilt: any
    private T50: number = 50;
    private T1000: number = 1000;
    private toConvertInSec: number = 1000;

    constructor(props: IProps) {
        super(props);
        this.app = props.app;
        this.GRID_STOPS = [];
        this.newPositions = [];
        this.tweening = [];
        this.gamePause = false;
        this.minimummSpinTimeComplete = false;
        this.spinMidCalled = false;
        this.serverResponseReceived = false;
        this.updateSymbol = false;
        this.reelRunning = false;
        this.blurReel = false;
        this.SPIN_MOVE_VALUE = 0;
        this.totalCascadeCount = this.props.totalCascadeCount;
        // this.subGridContainer = React.createRef();
        this.subGridContainer = {};
        this.init();
    }

    init() {
        this.bindEvent();
        this.gridPositions = [{ x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }];
        this.createPosition = { x: 0, y: 0 };
        this.endPosition = { x: 0, y: 0 };
        this.props.setSpinType();
        this.onInitializeReelStop();
    }

    destroy() {
    }

    bindEvent() {

    }

    onGameResume(data: any) {
        this.gamePause = false;

    }

    onGamePause(data: any) {
        this.gamePause = true;

    }

    onInitializeReelStop() {
        this.GRID_STOPS = this.props.reel_data.stopReels;
    }

    onServerReelStop(data?: any) {
        this.serverResponseReceived = true;
    }


    componentDidMount() {
        let gridCoulmn = UIManager.getRef("gridCoulmn" + this.props.GridIndex);
        this.gridPositions = _.cloneDeep(this.props.data.gridPositions);
        this.gridPositions.forEach((pos: any) => {
            pos.x = pos.x + gridCoulmn.x;
            pos.y = pos.y + gridCoulmn.y;
        });

        this.createPosition.x = _.cloneDeep(this.props.data.createPosition).x + gridCoulmn.x;
        this.createPosition.y = _.cloneDeep(this.props.data.createPosition).y + gridCoulmn.y;
        this.endPosition.x = _.cloneDeep(this.props.data.endPosition).x
        this.endPosition.y = _.cloneDeep(this.props.data.endPosition).y;
        this.endPosition.x += gridCoulmn.x;
        this.endPosition.y += gridCoulmn.y;

        let gridSymbols = this.props.gridList[this.props.GridIndex].symbols;
        gridSymbols.forEach((symbol: any, index: number) => {
            symbol.COMPONENT.gridPosition = index;
            symbol.COMPONENT.rowId = symbol.rowId;
            symbol.COMPONENT.reelId = symbol.reelId;
        });
    }


    layoutChange(currentLayout: string) {

    }
    shouldComponentUpdate(nextProps: Readonly<IProps>, nextState: Readonly<IState>, nextContext: any): boolean {
        if (nextProps.reel_data != this.props.reel_data) {
            if (nextProps.reel_data) {
                this.GRID_STOPS = nextProps.reel_data.stopReels
            }
        }
        if (nextProps.totalCascadeCount != this.props.totalCascadeCount) {
            if (nextProps.totalCascadeCount) {
                this.totalCascadeCount = nextProps.totalCascadeCount
            }
        }

        if (nextProps.isSpinning != this.props.isSpinning || nextProps.blastStart != this.props.blastStart || nextProps.spinStart != this.props.spinStart || nextProps.spinStop != this.props.spinStop
            || nextProps.forceSpinStop != this.props.forceSpinStop || nextProps.spinResponseReceived != this.props.spinResponseReceived
            || nextProps.layoutMode != this.props.layoutMode
            || nextProps.startDropCompleteCount != this.props.startDropCompleteCount
            || nextProps.countStopReels != this.props.countStopReels
        ) {
            if (nextProps.layoutMode !== this.props.layoutMode) {
                this.layoutChange(nextProps.layoutMode)
                return false;
            }

            if (nextProps.spinStart && nextProps.spinStart != this.props.spinStart) {
                this.props.droppingSymbolStart(false);
                let tiltDirection = (Math.floor(Math.random() * 30)) % 2
                tiltDirection ? (this.leftTilt = true) : (this.leftTilt = false)
                this.props.setCurrentCascadeCount(0);
                this.onReelSpinStart();
            }
            if (nextProps.startDropCompleteCount === nextProps.data.GRID_COLUMN && nextProps.startDropCompleteCount != this.props.startDropCompleteCount) {

                this.createNewSymbols()
            }
            if (nextProps.blastStart && nextProps.blastStart != this.props.blastStart) {

                nextProps.setSpinComplete(false);
                this.blastSymbol();
                this.startBlast();

            }
            if (nextProps.countStopReels === nextProps.data.GRID_COLUMN) {
                if (!nextProps.blastStart) {
                    nextProps.setSpinComplete(true);
                    if (nextProps.winningList.length == 0) {
                        cancelAnimationFrame(this.tickupRequest);
                        this.onResetGrid();
                        this.props.flowManagerCalled(true);
                    } else {
                        this.props.displayWinBox(true)
                    }
                }
            }
            if (nextProps.spinResponseReceived) {
                this.onServerReelStop();
            }
            if (nextProps.forceSpinStop) {
                this.tweening = [];
            }
            return false;
        }
        return false;
    }

    getSubReelContainer() {
        return this.subGridContainer;
    }


    onResetGrid() {
        this.props.setWinSymbolCoOrdinate([]);
        let gridSymbols = this.props.gridList[this.props.GridIndex].symbols;
        for (let j = this.props.data.GRID_ROWS - 1; j >= 0; j--) {
            gridSymbols[j].COMPONENT.blasted = false;
            gridSymbols[j].COMPONENT.gridPosition = j;
            gridSymbols[j].COMPONENT.rowId = j;
            gridSymbols[j].COMPONENT.blasted = false;
            gridSymbols[j].COMPONENT.shiftCount = 0;
            gridSymbols[j].shifted = false
        }
    }

    reArrangeGridBeforeNextCascade() {
        let gridSymbols = this.props.gridList[this.props.GridIndex].symbols;
        for (let j = this.props.data.GRID_ROWS - 1; j >= 0; j--) {
            let shiftCount = gridSymbols[j].COMPONENT.shiftCount;
            if (gridSymbols[j].COMPONENT.blasted) {
                shiftCount = 0;
            }
        }

        gridSymbols.sort(this.compare_prop_y);
        gridSymbols.forEach((data: any, index: number) => {
            data.rowId = index;
            data.gridPosition = index;
            data.COMPONENT.rowId = index;
            data.COMPONENT.gridPosition = index;
            data.COMPONENT.y = this.gridPositions[this.gridPositions.length - 1 - index].y
        })
    }

    onReelSpinStart() {
        if (this.reelRunning) return;
        let timer = TIMER.TimerManager.createTimer(1 + this.props.data.staggerColumnDelay * this.props.setReelDurationColumn * this.props.GridIndex);
        timer.on('end', (e: any) => {
            e.remove(); 
            this.startDrop(() => { }, () => {
            });
        });
        timer.start();

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
    compare_prop_rowId(a: any, b: any) {
        // a should come before b in the sorted order
        if (a.COMPONENT.rowId < b.COMPONENT.rowId) {
            return -1;
            // a should come after b in the sorted order
        } else if (a.COMPONENT.rowId > b.COMPONENT.rowId) {
            return 1;
            // a and b are the same
        } else {
            return 0;
        }
    }
    startDrop(onSymbolsCreated: any, onComplete: any) {
        let gridSymbols = this.props.gridList[this.props.GridIndex].symbols, count = 0;
        this.newPositions = [];
        gridSymbols.forEach((symbol: any, index: number) => {
            let timer = TIMER.TimerManager.createTimer(1 + this.props.data.staggerDropDelayReelStart * this.props.setReelDurationStart * (this.gridPositions.length - index));
            timer.on('end', (e: any) => {
                e.remove();
                symbol.COMPONENT.updatedTexture = false;
                this.tweenTo(symbol.COMPONENT, 'y',
                    this.endPosition.y, (this.props.data.singlePositionDropDuration * (this.props.setReelDurationStart / this.props.setReelDurationSingle)) / this.toConvertInSec, "easeInSine", () => {
                        if (symbol.COMPONENT.y >= this.endPosition.y - symbol.COMPONENT.height && !symbol.COMPONENT.updatedTexture) {
                            symbol.COMPONENT.updatedTexture = true;
                            this.props.onUpdateSymbolOnReel(symbol.COMPONENT, this.GRID_STOPS[this.props.GridIndex][symbol.COMPONENT.gridPosition], false);
                        }
                    }, () => {
                        count += 1;
                        symbol.COMPONENT.y = this.createPosition.y * count;
                        if (gridSymbols.length - 1 === count) {
                            this.props.setStartDropComplete();
                        }
                    });
            });
            timer.start();
        });
    }

    startDropAfterBlast() {
        this.GRID_STOPS = this.props.reel_data.stopReelsAfterWin;
        let gridSymbols = this.props.gridList[this.props.GridIndex].symbols, count = 0;
        this.newPositions = [];
        gridSymbols.forEach((symbol: any, index: number) => {
            if (symbol.COMPONENT.blasted) {
                this.props.onUpdateSymbolOnReel(symbol.COMPONENT, this.GRID_STOPS[this.props.GridIndex][count], false);
                count += 1;
                symbol.COMPONENT.y = this.createPosition.y * (count);
                symbol.COMPONENT.visible = true;
                const symbolChild = symbol.COMPONENT.children;
                for (let k = 0; k < symbolChild.length; k++) {
                    symbolChild[k].visible = true
                }
                this.tweenTo(symbol.COMPONENT, 'y',
                    this.gridPositions[this.gridPositions.length - count].y
                    , this.props.data.singlePositionDropDuration / this.toConvertInSec, "easeInCirc", null, () => {
                        this.addTiltTween(symbol, this.leftTilt ? -this.props.data.tiltAngle : this.props.data.tiltAngle, this.props.data.tiltDuration, this.props.data.reversetiltDuration);

                    });
            }
        });

        this.onResetGrid();
        let timer = TIMER.TimerManager.createTimer(500 + this.props.data.staggerDropDelay);
        timer.on('end', (e: any) => {
            e.remove();
            this.props.stopWinPresentation();
            this.reArrangeGridBeforeNextCascade();
            cancelAnimationFrame(this.tickupRequest);
            if (this.props.GridIndex + 1 === this.props.data.GRID_COLUMN) {
                if (this.totalCascadeCount - 1 == this.props.currentCascadeCount + 1) {
                    if (this.props.featureJustReTriggered) {
                        for (let n = 0; n < this.props.data.GRID_COLUMN; n++) {
                            const r = this.props.reelList[n];
                            for (let i = 0; i < r.symbols.length; i++) {
                                if (r.symbols[i].COMPONENT.y < 0) {
                                    r.symbols[i].COMPONENT.visible = false
                                }
                            }
                        }
                    }
                    this.props.setSpinComplete(true);
                    this.props.flowManagerCalled(true);
                } else {
                    this.props.setWinSymbolCoOrdinate([]);
                    this.props.setCurrentCascadeCount(this.props.currentCascadeCount + 1);
                    this.props.displayWinBox(true)
                }
            }
        });
        timer.start();
    }

    createNewSymbols(onSymbolsCreated?: any, onComplete?: any) {
        onSymbolsCreated && onSymbolsCreated();
        this.dropSymbols(onComplete);
        this.props.droppingSymbolStart(true);
    }

    dropSymbols(onComplete: any) {
        let gridSymbols = this.props.gridList[this.props.GridIndex].symbols;
        let timer = TIMER.TimerManager.createTimer(1 + this.props.data.delayDropDuration * this.props.GridIndex);
        timer.on('end', (e: any) => {
            e.remove();
            let counter = 0;
            gridSymbols.forEach((symbol: any, index: number) => {
                let duration = this.props.data.singlePositionDropDurationFromTop;
                let timer = TIMER.TimerManager.createTimer(1 + this.props.data.staggerDropDelay * (this.gridPositions.length - index));
                timer.on('end', (e: any) => {
                    e.remove();
                    symbol.COMPONENT.visible = true;
                    this.tweenTo(symbol.COMPONENT, 'y',
                        this.gridPositions[this.gridPositions.length - 1 - index].y
                        , duration / this.toConvertInSec, "easeInCirc", null, () => {
                            counter += 1;
                            this.addTiltTween(symbol, this.leftTilt ? -this.props.data.tiltAngle : this.props.data.tiltAngle, this.props.data.tiltDuration, this.props.data.reversetiltDuration)
                            symbol.COMPONENT.gridPosition = index;
                            symbol.COMPONENT.rowId = symbol.rowId;
                            symbol.COMPONENT.reelId = symbol.reelId;
                            if (counter === gridSymbols.length) {
                                this.reelsComplete();
                            }
                        });
                });
                timer.start();
            });
        });
        timer.start();
    }

    addTiltTween(symbol: any, angle: any, tiltduration: any, reverseDuration: any) {
        this.tweenTo(symbol.COMPONENT.children[0], 'rotation', angle, tiltduration / this.toConvertInSec, "easeInCubic", null, () => {
            this.tweenTo(symbol.COMPONENT.children[0], 'rotation', 0, reverseDuration / this.toConvertInSec, "easeInCubic", null, () => {
            });
        });
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
        let timer = TIMER.TimerManager.createTimer(this.T50);
        timer.on('repeat', (e: any) => {
            symbol.filters[0] && (symbol.filters[0].seed = Math.floor(20 * Math.random()) / 10)
        });
        timer.start(true);

        let timerEnd = TIMER.TimerManager.createTimer(this.T1000);
        timerEnd.on('end', (e: any) => {
            timer.remove();
            symbol.filters[0] && (symbol.filters[0].enabled = false)
        });
        timerEnd.start();
    }

    resetSymbolPivot() {
        let gridSymbols = this.props.gridList[this.props.GridIndex].symbols;
        gridSymbols.forEach((symbol: any, index: number) => {
            symbol.COMPONENT.children[0].pivot.set(0, 0)
        });
    }


    blastSymbol() {
        let gridSymbols = this.props.gridList[this.props.GridIndex];
        let symbolslist = gridSymbols.symbols;
        for (let i = 0; i < symbolslist.length; i++) {
            let symbol = symbolslist[i];
            symbol.COMPONENT.gridPosition = i;
            symbol.COMPONENT.rowId = symbol.rowId;
            symbol.COMPONENT.reelId = symbol.reelId;
            this.props.blastPosition.forEach((data: any, index: number) => {
                if (data.reelId === symbol.reelId && data.rowId === symbol.COMPONENT.gridPosition) {
                    symbol.COMPONENT.blasted = true;
                }
            });
        }
    }

    blastSymbol_(symbol: any) {
        this.props.blastPosition.forEach((data: any, index: number) => {
            if (data.reelId === symbol.COMPONENT.reelId && data.rowId === symbol.COMPONENT.rowId) {
                symbol.COMPONENT.blasted = true;
            }
        });
    }

    endBlast(symbol: any) {

    }


    startBlast() {
        let gridSymbols = this.props.gridList[this.props.GridIndex].symbols;
        let shiftCount = 0;
        for (let j = this.props.data.GRID_ROWS - 1; j >= 0; j--) {
            gridSymbols[j].COMPONENT.shiftCount = shiftCount;
            if (gridSymbols[j].COMPONENT.blasted) {
                let wincordinate: any = [];
                this.addGlitch(gridSymbols[j].COMPONENT);
                this.props.displayWinBox(false)
                let timer = TIMER.TimerManager.createTimer(this.props.data.delayInSymbolAnimationPlay);
                timer.on('end', (e: any) => {
                    e.remove();
                    let symbolContainer = gridSymbols[j].COMPONENT;
                    symbolContainer.visible = false;
                    this.props.setSymbolAnimationName("", "blast", null, null)
                    this.props.playSymbolAnim();
                    this.props.displayWinBox(false);
                    this.props.blastPosition.forEach((data: any, index: number) => {
                        wincordinate.push({
                            "reelId": data.reelId,
                            "rowId": data.rowId,
                        })
                    })
                    this.props.setWinSymbolCoOrdinate(wincordinate);
                });
                timer.start();
                shiftCount += 1;
            }
            if (shiftCount > 0) {
                gridSymbols[j].shifted = true
            } else {
                gridSymbols[j].shifted = false
            }

        }

        let duration = this.getDurationAccordingToBlastPosition(this.props.blastPosition.length);
        let blasttimertimer = TIMER.TimerManager.createTimer( duration-200); //(this.props.data.blastDuration +) remove delay drop duration after blast
        blasttimertimer.on('end', (e: any) => {
            e.remove();
            this.reArrangeGrid();
            this.startDropAfterBlast();
        });
        blasttimertimer.start();
       
        let timer = TIMER.TimerManager.createTimer(duration + this.props.data.blastDuration + this.props.data.delayDropDurationAfterBlast * (this.props.GridIndex + 1));
        timer.on('end', (e: any) => {
            e.remove();
            this.props.droppingSymbolAfterBlast(false);
            this.props.droppingSymbolAfterBlast(true);
        });
        timer.start();
    }

    private getDurationAccordingToBlastPosition(length: number): number {
        if (length > 14) {
            return 3000;
        } else if (length < 15 && length > 10) {
            return 1500;
        } else if (length < 6) {
            return 1000;
        }
        return 1500;
    }



    reArrangeGrid() {
        for (let i = 0; i < this.props.data.GRID_COLUMN; i++) {
            let gridSymbols = this.props.gridList[this.props.GridIndex].symbols;
            for (let j = this.props.data.GRID_ROWS - 1; j >= 0; j--) {
                let shiftCount = gridSymbols[j].COMPONENT.shiftCount;
                if (gridSymbols[j].COMPONENT.blasted) {
                    shiftCount = 0;
                }
                let moveY = gridSymbols[j].COMPONENT.y + this.props.data.SYMBOL_HEIGHT * shiftCount;
                if (moveY >= this.gridPositions[0].y) {
                    moveY = this.gridPositions[0].y
                } else if (moveY >= this.gridPositions[1].y && moveY < this.gridPositions[0].y) {
                    moveY = this.gridPositions[1].y
                } else {
                    moveY = this.gridPositions[2].y
                }

                if (shiftCount > 0) {
                    this.addTiltTween(gridSymbols[j], this.leftTilt ? -this.props.data.tiltAngle : this.props.data.tiltAngle, this.props.data.tiltDuration, this.props.data.reversetiltDuration);

                }
                this.tweenTo(gridSymbols[j].COMPONENT, 'y', moveY, (this.T50 * (this.gridPositions.length - j)) / this.toConvertInSec, "easeOutExpo", null, () => {
                    if (gridSymbols[j].COMPONENT.blasted) {

                    }
                });
            }
        }

    }

    reelsComplete() {
        this.props.setSpinning(false);
        this.reelRunning = false;
        this.serverResponseReceived = false;
        this.props.setStoppedReel(this.props.GridIndex);
    }


    private tweenTo(object: any, property: any, target: any, time: any, easing: any, onchange: any, oncomplete: any, start?: number) {
        new Tween(
            [object], {
            [property]: { start: object[property], end: target }
        }, time || 0.001, easing, false, null, null, null, null, false, onchange, oncomplete);
    }

    render() {
        if (this.GRID_STOPS.length === 0) {
            console.error("grid are empty")
            return <></>;
        }
        const reel = {
            container: this.getSubReelContainer(),
            Id: this.props.GridIndex,
            symbols: [],
            position: 0,
            previousPosition: 0,
            blur: new PIXI.filters.BlurFilter(),
        };
        reel.blur.blurX = 4;
        reel.blur.blurY = 4;
        this.props.gridList.push(reel);
        const symbols_array = [];
        for (let j = 0; j < this.props.data.GRID_ROWS; j++) {
            let symbolId = this.GRID_STOPS[this.props.GridIndex][j];
            let PROPS_TO_SEND_Symbol = {
                key: "symbol_" + this.props.GridIndex + "_" + j,
                SYMBOL_ID: symbolId,
                ROW_ID: j,
                REEL_ID: this.props.GridIndex,
                REEL: reel
            }
            symbols_array.push(
                <Symbol {...PROPS_TO_SEND_Symbol}>

                </Symbol>
            );

        }


        return (<UIManager type={"Container"} ref={(i: any) => this.subGridContainer = i} app={this.app}
            id={"gridCoulmn" + this.props.GridIndex} name={"gridCoulmn" + this.props.GridIndex}
            x={this.props.GridIndex * this.props.data.GRID_WIDTH + this.props.GridIndex * this.props.data.GRID_GAP}>
            {symbols_array}
        </UIManager>)
    }

    ticker() {

    }
}


export default withPixiApp(connect(
    (state: Pick<IStore, 'gridsState' | 'buttonPanelState' | 'symbolState' | 'applicationState'>): IStateToProps =>
    ({
        blastPosition: state.gridsState.blastPosition,
        isSpinning: state.gridsState.isSpinning,
        spinStart: state.gridsState.spinStart,
        blastStart: state.gridsState.blastStart,
        spinStop: state.gridsState.spinStop,
        forceSpinStop: state.gridsState.forcespinStop,
        spinResponseReceived: state.gridsState.spinResponseReceived,
        winningList: state.gridsState.winningList,
        reel_data: state.gridsState.reel_data,
        layoutMode: state.applicationState.layoutMode,
        startDropCompleteCount: state.gridsState.startDropCompleteCount,
        currentCascadeCount: state.gridsState.currentCascadeCount,
        totalCascadeCount: state.gridsState.totalCascadeCount,
        countStopReels: state.gridsState.countStopReels,
        setReelDurationStart: state.gridsState.setReelDurationStart,
        setReelDurationSingle: state.gridsState.setReelDurationSingle,
        setReelDurationColumn: state.gridsState.setReelDurationColumn,
    }),
    (dispatch: Dispatch): IDispatchToProps => ({
        playSymbolAnim: (): any => dispatch(winpresentationAction.playSymbolAnim()),
        displayWinBox: (displayWinBox: boolean): any => dispatch(winpresentationAction.displayWinBox(displayWinBox)),
        setWinSymbolCoOrdinate: (winSymbolCoOrdinate: any): any => dispatch(winpresentationAction.setWinSymbolCoOrdinate(winSymbolCoOrdinate)),
        nextAutoplay: (): any => dispatch(basegameAction.nextAutoplay()),
        nextFreegame: (): any => dispatch(freegameAction.nextFreegame()),
        setAllButtonEnable: (exceptBtnList: Array<string>): any => dispatch(buttonActions.setAllButtonEnable(exceptBtnList)),
        stopWinPresentation: (): any => dispatch(winpresentationAction.stopWinPresentation()),
        setSpinType: (): any => dispatch(gridActions.setSpinType()),
        setSpinning: (spinning: boolean): any => dispatch(gridActions.setSpinningState(spinning)),
        setSpinComplete: (allSpinComplete: boolean): any => dispatch(gridActions.setSpinComplete(allSpinComplete)),
        setStoppedReel: (stoppedReel: number): any => dispatch(gridActions.setStoppedReel(stoppedReel)),
        onUpdateSymbolOnReel: (symbol: any, symbolId: number, randomSymbol: boolean): any => dispatch(symbolActions.setUpdatedSymbol(symbol, symbolId, randomSymbol)),
        onDropSymbolOnReel: (symbol: any, symbolId: any): any => dispatch(symbolActions.setDropSymbol(symbol, symbolId)),
        setSymbolAnimationName: (symbol: any, animationname: string, callback: any, callbackScope: any): any => dispatch(symbolActions.setSymbolAnimationName(symbol, animationname, callback, callbackScope)),
        setApplicationLayoutObject: (layoutobjectlist: string): any => dispatch(layoutssActions.setApplicationLayoutObject(layoutobjectlist)),
        setStartDropComplete: (): any => dispatch(gridActions.setStartDropComplete()),
        flowManagerCalled: (callFlowManager: boolean): any => dispatch(flowManagerAction.flowManagerCalled(callFlowManager)),
        setCurrentCascadeCount: (currentCascadeCountAction: number): any => dispatch(gridActions.setCurrentCascadeCount(currentCascadeCountAction)),
        droppingSymbolStart: (symbolDropStart: boolean): any => dispatch(gridActions.droppingSymbolStart(symbolDropStart)),
        droppingSymbolAfterBlast: (dropSymbolAfterBlast: boolean): any => dispatch(gridActions.droppingSymbolAfterBlast(dropSymbolAfterBlast)),
    }))(WithGridConfiguration(Grids)));
