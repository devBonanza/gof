import React, { Component} from "react";
import { withPixiApp } from "@inlet/react-pixi";
import withAutoplayConfiguration from "./configuration/withAutoplayConfiguration";
import * as PIXI from "pixi.js";
import { connect } from "react-redux";
import { IStore } from "../../store/IStore";
import { Dispatch } from "redux";
import { actions as baseGameActions } from "../../reducers/baseGameReducer";
import { isMobile } from "react-device-detect";
import { actions as buttonActions } from "../../reducers/buttonPanelReducer";
import { actions as autoplayActions } from "../../reducers/autoplayReducer";
import { actions as asyncActions } from "../../reducers/asyncServerResponseReducer";

interface IProps {
    [x: string]: any;
}

interface IState {
}

interface IState {
    isGameLoaded: boolean,
    enableOk: boolean,
    width: number | string,
    height: number | string,
    pixelRatio: number,
    buttonSelected: any,
    selectedautoplayCount: number,
    toggleOn: boolean,
}

interface IStateToProps {
}

interface IDispatchToProps {
}

class Autoplay extends Component<IProps, IState> {
    protected app: PIXI.Application;
    protected autoplayContainer: any;
    protected scope: any;
    protected showFixedPanelPage: boolean;
    protected outerBorderColor: any;
    protected textColor: any;
    protected colorOfButtonsWithoutCLick: any;
    protected colorOfButtonsOnCLick: any;
    protected mainContainerBgColor: any;
    protected partitioningLineBorderColor: any;
    protected clickedNumberButton: any;
    protected unclickedNumberButton: any;
    protected startbutton: any;
    protected enableAutoplayStartButtonX: number;
    protected enableAutoplayStartButtonY: number;
    protected disableAutoplayStartButtonX: number;
    protected disableAutoplayStartButtonY: number;

    constructor(props: IProps) {
        super(props);
        this.app = props.app;
        this.autoplayContainer = {};
        this.state = {
            width: this.props.width,
            height: this.props.height,
            buttonSelected: "",
            selectedautoplayCount: 0,
            pixelRatio: 1,
            enableOk: false,
            isGameLoaded: false,
            toggleOn: true
        }
        this.showFixedPanelPage = false
        this.outerBorderColor = '#FFFFFF'
        this.textColor = '#f5f3ec'
        this.colorOfButtonsWithoutCLick = '#808080'
        this.colorOfButtonsOnCLick = '#008000'
        this.mainContainerBgColor = 'transparent'
        this.partitioningLineBorderColor = '#808080'
        this.clickedNumberButton = this.props.data.clickedNumberButton
        this.unclickedNumberButton = this.props.data.unclickedNumberButton
        this.enableAutoplayStartButtonX = -1
        this.enableAutoplayStartButtonY = -63
        this.disableAutoplayStartButtonX = -1
        this.disableAutoplayStartButtonY = -1
    }

    reset() {
        this.props.setValueOfNumberButton(0)
        this.setState((prevState) => {
            return {
                ...prevState,
                buttonSelected: "",
                enableOk: false,
            }
        });
    }

    onClick(name: any, value: any) {
        this.props.setValueOfNumberButton(value)
        this.props.interactivityOfStartButton(true)
        this.setState((prevState) => {
            return {
                ...prevState,
                selectedautoplayCount: value,
                buttonSelected: name,
                enableOk: true,
            }
        });
    }
    updateDimensions = () => {
        this.setState((prevState) => {
            return {
                ...prevState,
                width: isMobile && window.screen.availWidth || window.innerWidth,
                height: isMobile && window.screen.availHeight || window.innerHeight,
                pixelRatio: window.devicePixelRatio
            }
        });
    };

    componentDidMount() {
        window.addEventListener('resize', this.updateDimensions);
        this.updateDimensions();
    }


    componentWillUnmount() {
        window.removeEventListener('resize', this.updateDimensions);
    }

    onMouseClick = (e: any) => {
    }

    shouldComponentUpdate(nextProps: Readonly<IProps>, nextState: Readonly<IState>, nextContext: any): boolean {
        if (nextProps.resetAutoplay && nextProps.resetAutoplay != this.props.resetAutoplay) {
            this.reset();
        }

        if (nextProps.inAutoplay !== this.props.inAutoplay) {
            this.reset();
        }
        return true;
    }

    toggleController = (e: any) => {
        this.setState((prevState) => {
            return {
                ...prevState,
                toggleOn: !this.state.toggleOn
            }
        });
    }

    mobileViewAutoplay() {
        const {
            enableOk, selectedautoplayCount
        } = this.state;
        let startButtonX, startButtonY;
        if (enableOk) {
            startButtonX = this.enableAutoplayStartButtonX
            startButtonY = this.enableAutoplayStartButtonY
        } else {
            startButtonX = this.disableAutoplayStartButtonX
            startButtonY = this.disableAutoplayStartButtonY
        }
        return (
           <></>
        )
    }

    desktopViewAutoplay() {

        const {
            enableOk, selectedautoplayCount, toggleOn
        } = this.state;
        let toggleButtonImage;

        if (toggleOn) {
            toggleButtonImage = this.props.data.toggleButtonOnImage
        } else {
            toggleButtonImage = this.props.data.toggleButtonOffImage
        }

        return (
        <></>)
            
    }


    render() {
        if (!this.props.showAutoplay) {
            return (<></>)
        }

        if (isMobile) {
            this.showFixedPanelPage = true
        }
    }
}


export default withPixiApp(connect(
    (state: Pick<IStore, 'autoplayState' | 'applicationState' | 'basegameState'>): IStateToProps =>
    ({
        showAutoplay: state.autoplayState.showAutoplay,
        autoplayStopped: state.autoplayState.autoplayStopped,
        scaleY: state.applicationState.scaleY,
        resetAutoplay: state.autoplayState.resetAutoplay,
        numberButtonValue: state.autoplayState.numberButtonValue,
        inAutoplay: state.basegameState.inAutoplay,
    }),
    (dispatch: Dispatch): IDispatchToProps => ({
        setAllButtonEnable: (exceptBtnList: Array<string>): any => dispatch(buttonActions.setAllButtonEnable(exceptBtnList)),
        hideAutoplay: (): any => dispatch(autoplayActions.hideAutoplayUI()),
        setAutoplay: (autoplayCount: number): any => dispatch(autoplayActions.setAutoplayCount(autoplayCount)),
        startAutoplay: (): any => dispatch(baseGameActions.startAutoplay()),
        setApplicationAutoplayCount: (autoplaycount: number): any => dispatch(baseGameActions.setApplicationAutoplayCount(autoplaycount)),
        getApplicationSpinResponse: (): any => dispatch(asyncActions.getApplicationSpinResponse()),
        setAllButtonDisable: (exceptBtnList: Array<string>): any => dispatch(buttonActions.setAllButtonDisable(exceptBtnList)),
        stoppedAutoplayUI: (autoplayStopped: boolean): any => dispatch(autoplayActions.stoppedAutoplayUI(autoplayStopped)),
        setValueOfNumberButton: (numberButtonValue: number): any => dispatch(autoplayActions.setValueOfNumberButton(numberButtonValue)),
        interactivityOfStartButton: (startButtonInteractivity: boolean): any => dispatch(autoplayActions.interactivityOfStartButton(startButtonInteractivity)),
    }))(withAutoplayConfiguration(Autoplay)));