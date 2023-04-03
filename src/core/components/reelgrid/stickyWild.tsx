import React, {Component} from "react";
import withReelsConfiguration from "../reels/configuration/withReelsConfiguration";
import * as PIXI from "pixi.js";
import Symbol from "../symbol/symbol";
import {withPixiApp} from "@inlet/react-pixi";
import {connect} from 'react-redux'
import {Dispatch} from 'redux';
import {IStore} from "../../store/IStore";
import UIManager from "../ui/UiBuilder";
import {actions as winpresentationAction} from "../../reducers/winPresentationReducer";
import {actions as reelsActions} from "../../reducers/reelsStateReducer";
import {actions as symbolActions} from "../../reducers/symbolStateReducer";
import {actions as buttonActions} from "../../reducers/buttonPanelReducer";
import {actions as basegameAction} from "../../reducers/baseGameReducer";
import {actions as freegameAction} from "../../reducers/freeGameReducer";

window.PIXI = PIXI;

interface IStateToProps {
    reel_data: any
    stickyWildData: any
    stickyWildId: number
    createStickyWildData: boolean
    clearStickyWildData: boolean


}

interface IDispatchToProps {

}

interface IProps extends IStateToProps {
    [x: string]: any;
}

interface IState {
    stickysymbolList: any
}

class StickyWild extends Component<IProps, IState> {
    protected app: PIXI.Application;
    protected subReelContainer: any;
    protected eventEmitter: any;
    protected REEL_STOPS: Array<Array<number>>;
    protected tweening: any;

    private tickupRequest: any;
    symbols: any;
    stickysymbols: any;
    symbolsToDisplay: any;
    //grid
    protected newPositions: any;
    private gridPositions: any;
    private createPosition: any;
    private endPosition: any;
    private lockedSymbolPosition: any;


    constructor(props: IProps) {
        super(props);

        this.app = props.app;
        this.REEL_STOPS = [];
        this.lockedSymbolPosition = this.props.stickyWildData
        //this.state = Reel.REEL_STATE_STATIC;
        // this.subReelContainer = React.createRef();
        this.subReelContainer = {};
        


        this.stickysymbols = []
        this.state = {

            stickysymbolList: []
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
        this.REEL_STOPS = this.props.reel_data.stopReels;
    }

    onServerReelStop(data?: any) {

    }

    getSubReelContainer() {
        return this.subReelContainer;
    }

    shouldComponentUpdate(nextProps: Readonly<IProps>, nextState: Readonly<IState>, nextContext: any): boolean {
        if (nextProps.reel_data !== this.props.reel_data) {
            return false;
        }
        if (nextProps.createStickyWildData && nextProps.createStickyWildData !== this.props.createStickyWildData) {
            this.lockedSymbolPosition = nextProps.stickyWildData
            const reel = {
                container: this.getSubReelContainer(),
                Id: this.props.ReelIndex,
                symbols: [],
                position: 0,
                previousPosition: 0,
                blur: new PIXI.filters.BlurFilter(),
            };
            this.randomizeSymbols(reel);
            return false;
        }
        if (nextProps.clearStickyWildData && nextProps.clearStickyWildData !== this.props.clearStickyWildData) {
            this.lockedSymbolPosition = [];
            const reel = {
                container: this.getSubReelContainer(),
                Id: this.props.ReelIndex,
                symbols: [],
                position: 0,
                previousPosition: 0,
                blur: new PIXI.filters.BlurFilter(),
            };
            this.randomizeSymbols(reel);
            return false;
        }
        return true
    }

    componentDidMount() {

        const reel = {
            container: this.getSubReelContainer(),
            Id: this.props.ReelIndex,
            symbols: [],
            position: 0,
            previousPosition: 0,
            blur: new PIXI.filters.BlurFilter(),
        };
        this.randomizeSymbols(reel);
    }








    // new code
    createSymbol(symbolId: number, row: number, reel: any, yoffset: number = 0) {


        // let symbolId = Math.floor(Math.random() * (8 - 1) + 1);
        let PROPS_TO_SEND_Symbol = {
            key: "Stickysymbol_" + Math.random() + this.props.ReelIndex + "_" + row,
            yoffset: yoffset,
        
            configGame: this.props.configGame,
            SYMBOL_ID: symbolId,
            ROW_ID: row,
            REEL_ID: this.props.ReelIndex,
            REEL: reel,
            anchor : [0,0]
          
        }
        return <Symbol {...PROPS_TO_SEND_Symbol}>

        </Symbol>;
    }

    randomizeSymbols(reel: any) {
        this.stickysymbols = [];
        if (this.lockedSymbolPosition.length > 0) {
            for (let j = 0; j < this.lockedSymbolPosition[this.props.ReelIndex].length; j++) {
                // for (let j = 0; j < this.props.data.REEL_ROWS + 1; j++) {
                if (1 === this.lockedSymbolPosition[this.props.ReelIndex][j]) {

                    let symbolId = this.props.stickyWildId;
                    this.stickysymbols.push(this.createSymbol(symbolId, j, reel));
                }

            }
        }


        this.setState((prevState) => {
            return {
                ...prevState,
                stickysymbolList: this.stickysymbols,
            }
        })
        //this.forceUpdate();
    }

    render() {
        if (this.REEL_STOPS.length === 0) {
            console.error("reels are empty")
            return <></>;
        }

        let {stickysymbolList} = this.state;

        return (<UIManager type={"Container"} ref={(i: any) => this.subReelContainer = i}
                           id={"Stickyreels" + this.props.ReelIndex} name={"Stickyreels" + this.props.ReelIndex}
                           app={this.app}
                           x={this.props.ReelIndex * this.props.data.REEL_WIDTH + this.props.ReelIndex * this.props.data.REEL_GAP}>

            {stickysymbolList}
        </UIManager>);
    }


    ticker() {

    }
}


export default withPixiApp(connect(
    (state: Pick<IStore, 'reelsState' | 'buttonPanelState' | 'symbolState'>): IStateToProps =>
        ({
            // updatedSymbol: state.symbolState.updatedSymbol,
            // previousReelStoppedId: state.reelsState.previousReelStoppedId,
            // isSpinning: state.reelsState.isSpinning,
            // spinStart: state.reelsState.spinStart,
            // spinStop: state.reelsState.spinStop,
            // forceSpinStop: state.reelsState.forcespinStop,
            // spinResponseReceived: state.reelsState.spinResponseReceived,
            //
            // winningList: state.reelsState.winningList,
            reel_data: state.reelsState.reel_data,
            stickyWildData: state.reelsState.stickyWildData,
            stickyWildId: state.reelsState.stickyWildId,
            createStickyWildData: state.reelsState.createStickyWildData,
            clearStickyWildData: state.reelsState.clearStickyWildData
        }),
    (dispatch: Dispatch): IDispatchToProps => ({
        // startSpin: (): any => (this.onReelSpinStart),
        stopSpin: (): any => dispatch(reelsActions.stopSpin()),
        setSpinType: (): any => dispatch(reelsActions.setSpinType()),
        setSpinningReelStart: (reelId: number): any => dispatch(reelsActions.setSpinningReelStart(reelId)),
        setSpinningReelStop: (reelId: number): any => dispatch(reelsActions.setSpinningReelStop(reelId)),
        setPreviousReelStoppedId: (previousReelStoppedId: number): any => dispatch(reelsActions.setPreviousReelStoppedId(previousReelStoppedId)),
        //forcestopSpin: (): any => dispatch(reelsActions.forceStopSpin()),
        nextAutoplay: (): any => dispatch(basegameAction.nextAutoplay()),
        nextFreegame: (): any => dispatch(freegameAction.nextFreegame()),
        setAllButtonEnable: (exceptBtnList: Array<string>): any => dispatch(buttonActions.setAllButtonEnable(exceptBtnList)),
        stopWinPresentation: (): any => dispatch(winpresentationAction.stopWinPresentation()),
        // setSpinResponseReceived: (): any => dispatch(reelsActions.spinResponseReceived()),
        setSpinning: (spinning: boolean): any => dispatch(reelsActions.setSpinningState(spinning)),
        setSpinComplete: (allSpinComplete: boolean): any => dispatch(reelsActions.setSpinComplete(allSpinComplete)),
        setStoppedReel: (stoppedReel: number): any => dispatch(reelsActions.setStoppingReel(stoppedReel)),
        onUpdateSymbolOnReel: (symbol: any, symbolId: number, randomSymbol: boolean): any => dispatch(symbolActions.setUpdatedSymbol(symbol, symbolId, randomSymbol))
    }))(withReelsConfiguration(StickyWild)));
