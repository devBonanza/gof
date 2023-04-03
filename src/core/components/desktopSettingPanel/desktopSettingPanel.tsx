import React, {Component} from "react";
import {withPixiApp} from "@inlet/react-pixi";
import withDesktopSettingPanelConfiguration from "./configuration/withDesktopSettingPanelConfiguration";
import * as PIXI from "pixi.js";
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {isMobile} from "react-device-detect";
import {actions as buttonActions} from "../../reducers/buttonPanelReducer";


interface IStore {
    [x: string]: any;
}

interface IProps {
    [x: string]: any;

}

interface IState {

}

interface IState {
    width: number | string,
    height: number | string,
    pixelRatio: number,
    toggleOn: boolean,
    toggleButtonName: number | string,
}

interface IStateToProps {

}

interface IDispatchToProps {

}

class DesktopSettingPanel extends Component<IProps, IState> {
    protected app: PIXI.Application;
    protected DesktopSettingPanelContainer: any;
    protected scope: any;
    protected mainContainerBgColor: any;
    protected textColor: any;
    protected mainOuterBorderColor: any;
    protected borderColorForInsideBoxContainers: any;
    protected bgColorOfInsideBoxContainers: any;
    protected toggleButtonShowIntroScreen: any;
    protected toggleButtonFullScreen: any;
    protected toggleButtonMusic: any;
    protected toggleButtonSpaceBarToSpin: any;
    protected toggleButtonTurboSpin: any;

    constructor(props: IProps) {
        super(props);
        this.app = props.app;
        // this.DesktopSettingPanelContainer = React.createRef();
        this.DesktopSettingPanelContainer = {};
        this.state = {
            width: this.props.width,
            height: this.props.height,
            pixelRatio: 1,
            toggleOn: true,
            toggleButtonName: ""

        }
        this.mainContainerBgColor = 'transparent'
        this.textColor = '#f5f3ec'
        this.mainOuterBorderColor = '#ffffff'
        this.borderColorForInsideBoxContainers = 'transparent'
        this.bgColorOfInsideBoxContainers = 'transparent'
        this.toggleButtonShowIntroScreen = this.props.data.toggleButtonOffImage
        this.toggleButtonFullScreen = this.props.data.toggleButtonOnImage
        this.toggleButtonMusic = this.props.data.toggleButtonOnImage
        this.toggleButtonSpaceBarToSpin = this.props.data.toggleButtonOnImage
        this.toggleButtonTurboSpin = this.props.data.toggleButtonOffImage
    }


    updateDimensions = () => {

        this.setState((prevState) => {
            return {
                ...prevState,
                width: isMobile && window.screen.availWidth || window.innerWidth,
                height: isMobile && window.screen.availHeight || window.innerHeight,
                pixelRatio: window.devicePixelRatio
            }
        })


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
        return true;
    }


    toggleController = (name: any) => {
        this.setState((prevState) => {
            return {
                ...prevState,
                toggleOn: !this.state.toggleOn,
                toggleButtonName: name
            }
        })
    }


    render() {
        const {
            toggleOn
        } = this.state;
        if (!this.props.showSettingPanelUI) {
            return (
                <></>
            )
        }

        if (toggleOn) {
            if (this.state.toggleButtonName === "firstToggle") {
                this.toggleButtonShowIntroScreen = this.props.data.toggleButtonOffImage
            } else if (this.state.toggleButtonName === "secondToggle") {
                this.toggleButtonFullScreen = this.props.data.toggleButtonOnImage
            } else if (this.state.toggleButtonName === "thirdToggle") {
                this.toggleButtonMusic = this.props.data.toggleButtonOnImage
            } else if (this.state.toggleButtonName === "forthToggle") {
                this.toggleButtonSpaceBarToSpin = this.props.data.toggleButtonOnImage
            } else if (this.state.toggleButtonName === "fifthToggle") {
                this.toggleButtonTurboSpin = this.props.data.toggleButtonOffImage
            }

        } else {
            if (this.state.toggleButtonName === "firstToggle") {
                this.toggleButtonShowIntroScreen = this.props.data.toggleButtonOnImage
            } else if (this.state.toggleButtonName === "secondToggle") {
                this.toggleButtonFullScreen = this.props.data.toggleButtonOffImage
            } else if (this.state.toggleButtonName === "thirdToggle") {
                this.toggleButtonMusic = this.props.data.toggleButtonOffImage
            } else if (this.state.toggleButtonName === "forthToggle") {
                this.toggleButtonSpaceBarToSpin = this.props.data.toggleButtonOffImage
            } else if (this.state.toggleButtonName === "fifthToggle") {
                this.toggleButtonTurboSpin = this.props.data.toggleButtonOnImage
            }
        }

        return (
          <></>
        )
    }

}


export default withPixiApp(connect(
    (state: Pick<IStore, 'desktopSettingPanelState' | 'applicationState'>): IStateToProps =>
        ({
            showSettingPanelUI: state.desktopSettingPanelState.showSettingPanel,
            scaleY: state.applicationState.scaleY,
            showFullScreenButton: state.applicationState.showFullScreenButton,

        }),
    (dispatch: Dispatch): IDispatchToProps => ({
        setAllButtonDisable: (exceptBtnList: Array<string>): any => dispatch(buttonActions.setAllButtonDisable(exceptBtnList)),


    }))(withDesktopSettingPanelConfiguration(DesktopSettingPanel)));