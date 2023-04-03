import React, {Component} from "react";
import {withPixiApp} from "@inlet/react-pixi";
import withBannerConfiguration from "./configuration/withBannerConfiguration";
import * as PIXI from "pixi.js";
import UIManager from "./../ui/UiBuilder";
import {connect} from "react-redux";
import {IStore} from "../../store/IStore";
import {Dispatch} from "redux";
import {actions as basegameActions} from "../../reducers/baseGameReducer";
import {actions as freegameActions} from "../../reducers/freeGameReducer";
import {actions as soundActions} from "../../reducers/soundReducer";
import {actions as buttonActions} from "../../reducers/buttonPanelReducer";
import {actions as winpresentationAction} from "../../reducers/winPresentationReducer";
import {actions as layoutssActions} from "../../reducers/layoutsStateReducer";
import {actions as reelsActions} from "../../reducers/reelsStateReducer";


interface IProps {
    [x: string]: any;
}

interface IState {

}

interface IStateToProps {
}

interface IDispatchToProps {
}

class Banner extends Component<IProps, IState> {
    protected app: PIXI.Application;
    protected bannerContainer: any;
    protected scope: any;

    constructor(props: IProps) {
        super(props);
        this.app = props.app;
        // this.bannerContainer = React.createRef();
        this.bannerContainer = {};
        this.props.stopWinPresentation();
    }

    layoutChange(currentLayout: string) {
        this.props.data.COMPONENTS.map((data: any, j: number) => {
                if (data.layout === true) {
                    this.props.setApplicationLayoutObject(data.name)
                }
            }
        )
    }

    onClick(evt: any) {

    }

    shouldComponentUpdate(nextProps: Readonly<IProps>, nextState: Readonly<IState>, nextContext: any): boolean {

        if (nextProps.layoutMode !== this.props.layoutMode) {
            this.layoutChange(nextProps.layoutMode)
            return false;
        }
        return true;
    }


    render() {
        return (
            <UIManager ref={i => this.bannerContainer = i} type={"Container"} x={this.props.data.BANNER_CONTAINER_X}
                       id={"bannerContainer"} name={"bannerContainer"} app={this.app} configGame={this.props.configGame}
                       y={this.props.data.BANNER_CONTAINER_Y}>

                {
                    this.props.data.COMPONENTS && this.props.data.COMPONENTS.filter((values: any) => (values.group === "" || values.group === this.props.bannerType)).map((i: any) =>
                        <UIManager key={`UIManager-${Math.random()}`} langObj={this.props.langObj} type={i.type} configGame={this.props.configGame}
                                   id={i.id} {...i} ClickHandler={this.onClick} scope={this} app={this.app}/>)
                }
            </UIManager>)
    }
}


export default withPixiApp(connect(
    (state: Pick<IStore, 'basegameState' | 'applicationState' | 'freegameState'>): IStateToProps =>
        ({

            totalwinAmount: state.freegameState.totalwinAmount,
            freegameSpinCount: state.freegameState.freegameSpinCount,
            scatterWinnings: state.freegameState.scatterWinnings,
            layoutMode: state.applicationState.layoutMode,
            winAmount: state.basegameState.winAmount,

        }),
    (dispatch: Dispatch): IDispatchToProps => ({

        playSound: (soundName: any): any => dispatch(soundActions.playSound(soundName)),
        clearStickyWild: (): any => dispatch(reelsActions.clearStickyWild()),
        setApplicationToBaseGameState: (basegamestate: boolean): any => dispatch(basegameActions.setApplicationToBaseGameState(basegamestate)),
        setIntroDone: (): any => dispatch(basegameActions.setIntroDone()),
        startFreegame: (): any => dispatch(freegameActions.startFreegame()),
        stopFreegame: (): any => dispatch(freegameActions.stopFreegame()),
        nextFreegame: (): any => dispatch(freegameActions.nextFreegame()),
        stopWinPresentation: (): any => dispatch(winpresentationAction.stopWinPresentation()),
        setApplicationLayoutObject: (layoutobjectlist: string): any => dispatch(layoutssActions.setApplicationLayoutObject(layoutobjectlist)),
        setAllButtonEnable: (exceptBtnList: Array<string>): any => dispatch(buttonActions.setAllButtonEnable(exceptBtnList)),
        setApplicationWinAmount: (winAmount: number, wins: any): any => dispatch(basegameActions.setApplicationWinAmount(winAmount, wins)),
    }))(withBannerConfiguration(Banner)));