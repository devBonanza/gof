import React, { Component, Ref } from "react";
import * as PIXI from "pixi.js";
import withBonusConfiguration from "./configuration/withBonusConfiguration";
import { _ReactPixi, withPixiApp } from '@inlet/react-pixi'
import { actions as basegameActions } from "../../reducers/baseGameReducer";
import { actions as soundActions } from "../../reducers/soundReducer";
import { actions as bonusAction } from "../../reducers/bonusReducer";
import { actions as buttonActions } from "../../reducers/buttonPanelReducer";
import UIManager from "../ui/UiBuilder";
import { connect } from "react-redux";
import { IStore } from "../../store/IStore";
import { Dispatch } from "redux";
import { actions as basegameAction } from "../../reducers/baseGameReducer";
import { actions as asyncActions } from "../../reducers/asyncServerResponseReducer";
import { actions as layoutssActions } from "../../reducers/layoutsStateReducer";


interface IProps {
    [x: string]: any;
}

interface IStateToProps {
}

interface IDispatchToProps {
}

interface IState {
    [x: string]: any;
}

class Bonus extends Component<IProps, IState> {
    protected app: PIXI.Application;
    protected bonusGameContainer: _ReactPixi.IContainer | Ref<any>;

    constructor(props: IProps) {
        super(props);
        this.app = props.app;
        this.state = {
            allContainerList: [],
            showOverLay: false,
            isSpinning: false,
            pause: false,
            play: true,
            uiElements: [],
        }
       // this.bonusGameContainer = React.createRef();
        this.bonusGameContainer = {};
    }

    onCompleteCallBack(e: any, scope: any) {

    }

    layoutChange(currentLayout: string) {
        this.props.data.COMPONENTS.map((data: any, j: number) => {
            if (data.layout === true) {
                this.props.setApplicationLayoutObject(data.name)
            }
        }
        )
    }

    shouldComponentUpdate(nextProps: Readonly<IProps>, nextState: Readonly<IState>, nextContext: any): boolean {

        if (nextProps.layoutMode != this.props.layoutMode
        ) {
            if (nextProps.layoutMode !== this.props.layoutMode) {
                this.layoutChange(nextProps.layoutMode)
            }
            return false;
        }
        return true;
    }


    handleEvent = (e: any) => {

        switch (e.target.name) {
            case "btn_egg1":
                // e.target.interactive = false;
                return;
            case "btn_egg2":
                // e.target.interactive = false;
                return;
            case "btn_egg3":
                // e.target.interactive = false;
                return;
            case "btn_egg4":
                // e.target.interactive = false;
                return;
            case "btn_egg5":
                // e.target.interactive = false;
                this.props.setApplicationToBaseGameState();
                return;
        }
    }

    render() {


        return (
            <UIManager id={"bonusContainer"} type={"Container"} ref={i => this.bonusGameContainer = i}
                x={this.props.data.POS_X} y={this.props.data.POS_Y} app={this.app}>

                {
                    this.props.data.COMPONENTS.map((i: any) =>
                        <UIManager key={`UIManager-${Math.random()}`} langObj={this.props.langObj} type={i.type}
                            ClickHandler={this.handleEvent} onComplete={this.onCompleteCallBack} scope={this}
                            id={i.id} {...i} app={this.app} />
                    )
                }

            </UIManager>)
    }

}


export default withPixiApp(connect(
    (state: Pick<IStore, 'freegameState' | 'reelsState' | 'applicationState' | 'bonusState'>): IStateToProps =>
    ({

        isResponseReceived: state.bonusState.isResponseReceived,
        InGamble: state.bonusState.InGamble,
        gambleWon: state.bonusState.gambleWon,
        layoutMode: state.applicationState.layoutMode,
        isBonusFinished: state.bonusState.isBonusFinished,
        credits: state.bonusState.credits,
        totalCredits: state.bonusState.totalCredits,
        gambleCreditsWon: state.bonusState.gambleCreditsWon,
        multiplier: state.bonusState.multiplier,
        featureType: state.bonusState.featureType,
    }),
    (dispatch: Dispatch): IDispatchToProps => ({

        playSound: (soundName: any): any => dispatch(soundActions.playSound(soundName)),

        setApplicationWinAmount: (winAmount: number, wins: any): any => dispatch(basegameActions.setApplicationWinAmount(winAmount, wins)),
        setApplicationToBaseGameState: (basegamestate: boolean): any => dispatch(basegameAction.setApplicationToBaseGameState(basegamestate)),

        setAllButtonEnable: (exceptBtnList: Array<string>): any => dispatch(buttonActions.setAllButtonEnable(exceptBtnList)),
        getApplicationBonusResponse: (): any => dispatch(asyncActions.getApplicationBonusResponse()),
        getApplicationBonusResponseForColor: (): any => dispatch(asyncActions.getApplicationBonusResponseForColor()),
        getApplicationBonusOutroDone: (): any => dispatch(bonusAction.getApplicationBonusOutroDone()),
        resetBonus: (): any => dispatch(bonusAction.resetBonus()),
        resetGamble: (): any => dispatch(bonusAction.resetGamble()),

        setApplicationLayoutObject: (layoutobjectlist: string): any => dispatch(layoutssActions.setApplicationLayoutObject(layoutobjectlist)),
    }))(withBonusConfiguration(Bonus)));