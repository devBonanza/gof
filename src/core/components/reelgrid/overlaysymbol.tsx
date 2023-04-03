import React, { Component } from "react";
import withReelsConfiguration from "../reels/configuration/withReelsConfiguration";
import * as PIXI from "pixi.js";
import Symbol from "../symbol/symbol";
import { withPixiApp } from "@inlet/react-pixi";
import { connect } from 'react-redux'
import { Dispatch } from 'redux';
import { IStore } from "../../store/IStore";
import UIManager from "../ui/UiBuilder";
import { actions as winpresentationAction } from "../../reducers/winPresentationReducer";
import { actions as reelsActions } from "../../reducers/reelsStateReducer";
import { actions as symbolActions } from "../../reducers/symbolStateReducer";
import { actions as buttonActions } from "../../reducers/buttonPanelReducer";
import { actions as basegameAction } from "../../reducers/baseGameReducer";
import { actions as freegameAction } from "../../reducers/freeGameReducer";

window.PIXI = PIXI;

interface IStateToProps {
}

interface IDispatchToProps {
}

interface IProps extends IStateToProps {
    [x: string]: any;
}

interface IState {
    overlaysymbolList: any
}

class OverlaySymbol extends Component<IProps> {
    protected app: PIXI.Application;
    protected subReelContainer: any;
    protected REEL_GRID: Array<Array<any>>;

    symbols: any;
    overlaysymbols: any;
    symbolsToDisplay: any;
    //grid
    protected newPositions: any;

    private lockedSymbolPosition: any;

    constructor(props: IProps) {
        super(props);

        this.app = props.app;
        this.REEL_GRID = [];
        this.lockedSymbolPosition = [1, 1];// this.props.stickyWildData
        //this.state = Reel.REEL_STATE_STATIC;
        this.subReelContainer = React.createRef();

        this.overlaysymbols = []
        this.state = {
            overlaysymbolList: []
        }
        this.init();
    }

    init() {
        this.onInitializeReelStop();
    }

    destroy() {
    }

    onGameResume(data: any) {
    }

    onGamePause(data: any) {
    }

    onInitializeReelStop() {
    }

    onServerReelStop(data?: any) {

    }

    getSubReelContainer() {
        return this.subReelContainer;
    }
    shouldComponentUpdate(nextProps: Readonly<IProps>, nextState: Readonly<IState>, nextContext: any): boolean {

        if (nextProps.reel_data != this.props.reel_data) {
            if (nextProps.reel_data) {

                this.REEL_GRID = nextProps.reel_data;
            }
        }

        if (this.props.ReelIndex == nextProps.stoppedReel && nextProps.stoppedReel != this.props.stoppedReel
            ||
            nextProps.overlaysymbolData !== this.props.overlaysymbolData
        ) {
            const reel = {
                container: this.getSubReelContainer(),
                Id: this.props.ReelIndex,
                symbols: [],
                position: 0,
                previousPosition: 0,
                blur: new PIXI.filters.BlurFilter(),
            };
            this.randomizeSymbols(reel, nextProps);
        }
        if (nextProps.clearoverlaysymbolData && nextProps.clearoverlaysymbolData !== this.props.clearoverlaysymbolData
            ||
            nextProps.blastStart && nextProps.blastStart !== this.props.blastStart
            ||
            nextProps.spinStart && nextProps.spinStart !== this.props.spinStart
            ||
            nextProps.immediateResponseReceived && nextProps.immediateResponseReceived !== this.props.immediateResponseReceived
        ) {
            this.setState((prevState) => {
                return {
                    ...prevState,
                    overlaysymbolList: [],
                }
            })
            if (nextProps.blastStart && nextProps.immediateResponseReceived && nextProps.blastStart !== this.props.blastStart
                ||
                nextProps.blastStart && nextProps.immediateResponseReceived && nextProps.immediateResponseReceived !== this.props.immediateResponseReceived
            ) {

            }
        }
        return true
    }

    componentDidMount() {
        this.REEL_GRID = this.props.reel_data;
        (this.REEL_GRID as any).stopReelsAfterWin = this.props.reel_data.stopReels
        const reel = {
            container: this.getSubReelContainer(),
            Id: this.props.ReelIndex,
            symbols: [],
            position: 0,
            previousPosition: 0,
            blur: new PIXI.filters.BlurFilter(),
        };
        this.randomizeSymbols(reel, this.props);
    }

    // new code
    createSymbol(symbolId: number, row: number, reel: any, yoffset: number = 0) {
        let symbolWiseHeight: any = [];
        let SYMBOL_HEIGHT_MAPPING_LIST = [
            { symbolOnReel: 2, height: 336 },
            { symbolOnReel: 3, height: 224 },
            { symbolOnReel: 4, height: 168 },
            { symbolOnReel: 5, height: 135 },
            { symbolOnReel: 6, height: 112 },
            { symbolOnReel: 7, height: 96 },
        ]
        let symbolsCount = SYMBOL_HEIGHT_MAPPING_LIST.map((data: any) => {
            symbolWiseHeight.push(data.height);
        })
        let PROPS_TO_SEND_Symbol = {
            key: "Overlaysymbol_" + Math.random() + this.props.ReelIndex + "_" + row,
            yoffset: row * symbolWiseHeight[this.props.displayReelGridSymbolCount[this.props.ReelIndex] - 2],
            configGame: this.props.configGame,
            SYMBOL_ID: symbolId,
            ROW_ID: row,
            REEL_ID: this.props.ReelIndex,
            REEL: reel,

        }
        return <Symbol {...PROPS_TO_SEND_Symbol}>

        </Symbol>;
    }

    randomizeSymbols(reel: any, nextProps: any) {
        this.overlaysymbols = [];

        for (let i = 0; i < nextProps.displayReelGridSymbolCount[nextProps.ReelIndex]; i++) {
            let reelsSymbolId = nextProps.reel_data.stopReels && nextProps.reel_data.stopReels[nextProps.ReelIndex][i];
            if (nextProps.overlaysymbolData.indexOf(reelsSymbolId) > -1) {
                this.overlaysymbols.push(this.createSymbol(reelsSymbolId, i, reel));
            }
        }
        this.setState((prevState) => {
            return {
                ...prevState,
                overlaysymbolList: this.overlaysymbols,
            }
        })
    }

    render() {

        let { overlaysymbolList }: any = this.state;

        return (<UIManager type={"Container"} ref={(i: any) => this.subReelContainer = i}
            id={"Overlayreels" + this.props.ReelIndex} name={"Overlayreels" + this.props.ReelIndex}
            app={this.app} configGame={this.props.configGame}
            x={this.props.ReelIndex * this.props.configGame.REEL_WIDTH + this.props.ReelIndex * this.props.configGame.REEL_GAP}>

            {overlaysymbolList}
        </UIManager>);
    }
}

export default withPixiApp(connect(
    (state: Pick<IStore, 'overlaySymbolState' | 'reelgridState' | 'symbolState' | 'winpresentationState'>): IStateToProps =>
    ({

        overlaysymbolId: state.overlaySymbolState.overlaysymbolId,
        overlaysymbolData: state.overlaySymbolState.overlaysymbolData,
        createoverlaysymbolData: state.overlaySymbolState.createoverlaysymbolData,
        clearoverlaysymbolData: state.overlaySymbolState.clearoverlaysymbolData,
        reel_data: state.reelgridState.reel_data,
        stoppedReel: state.reelgridState.stoppedReel,
        spinStart: state.reelgridState.spinStart,
        displayReelGridSymbolCount: state.reelgridState.displayReelGridSymbolCount,
        blastStart: state.reelgridState.blastStart,
        winSymbolCoOrdinate: state.winpresentationState.winSymbolCoOrdinate,
        immediateResponseReceived: state.reelgridState.immediateResponseReceived,

    }),
    (dispatch: Dispatch): IDispatchToProps => ({
        stopSpin: (): any => dispatch(reelsActions.stopSpin()),
        setSpinType: (): any => dispatch(reelsActions.setSpinType()),
        setSpinningReelStart: (reelId: number): any => dispatch(reelsActions.setSpinningReelStart(reelId)),
        setSpinningReelStop: (reelId: number): any => dispatch(reelsActions.setSpinningReelStop(reelId)),
        setPreviousReelStoppedId: (previousReelStoppedId: number): any => dispatch(reelsActions.setPreviousReelStoppedId(previousReelStoppedId)),
        nextAutoplay: (): any => dispatch(basegameAction.nextAutoplay()),
        nextFreegame: (): any => dispatch(freegameAction.nextFreegame()),
        setAllButtonEnable: (exceptBtnList: Array<string>): any => dispatch(buttonActions.setAllButtonEnable(exceptBtnList)),
        stopWinPresentation: (): any => dispatch(winpresentationAction.stopWinPresentation()),
        setSpinning: (spinning: boolean): any => dispatch(reelsActions.setSpinningState(spinning)),
        setSpinComplete: (allSpinComplete: boolean): any => dispatch(reelsActions.setSpinComplete(allSpinComplete)),
        setStoppedReel: (stoppedReel: number): any => dispatch(reelsActions.setStoppingReel(stoppedReel)),
        onUpdateSymbolOnReel: (symbol: any, symbolId: number, randomSymbol: boolean): any => dispatch(symbolActions.setUpdatedSymbol(symbol, symbolId, randomSymbol))
    }))(withReelsConfiguration(OverlaySymbol)));