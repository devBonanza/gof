import React, {Component, Ref} from "react";
import {_ReactPixi, withPixiApp} from "@inlet/react-pixi";
import {connect} from "react-redux";
import {IStore} from "../../store/IStore";
import {Dispatch} from "redux";
import withPlayerMessageConfiguration from "./configuration/withPlayerMessageConfiguration";
import UIManager from "../ui/UiBuilder";
import PIXI from "pixi.js";
import {actions as layoutssActions} from "../../reducers/layoutsStateReducer";
import {isMobile} from "react-device-detect";

import {actions as showMessageActions} from "../../reducers/playerMessageReducer";

interface IProps {
    [x: string]: any;

}

interface IStateToProps {
    layoutMode: string
}

interface IDispatchToProps {
}

interface IState {
    [x: string]: any;
}

class PlayerMessage extends Component<IProps, IState> {
    protected app: PIXI.Application;
    protected playerMessageContainer: _ReactPixi.IContainer | Ref<any>;
    protected ui_mode: string;
    protected displayUI: any;
    protected leftContainerChildCurrentIndex: number
    protected rightContainerChildCurrentIndex: number
    protected leftInterval: any
    protected rightInterval: any
    protected messagesRunInLoopLeftContainer: any
    protected messagesNotRunInLoopLeftContainer: any
    protected messagesRunInLoopRightContainer: any
    protected messagesNotRunInLoopRightContainer: any

    constructor(props: IProps) {
        super(props);
     
        this.app = props.app;
        this.state = {
            leftContainer: false,
            rightContainer: false,
            uiElements: [],
            lang: "en"
        }

        // this.playerMessageContainer = React.createRef();
        this.playerMessageContainer ={};
        if (isMobile) {
            this.ui_mode = "mobile"
        } else {
            this.ui_mode = "desktop"
        }

        this.displayUI = this.props.data.COMPONENTS.filter(this.checkUiMode.bind(this))
        this.leftContainerChildCurrentIndex = 0
        this.rightContainerChildCurrentIndex = 0
        this.messagesRunInLoopLeftContainer = []
        this.messagesNotRunInLoopLeftContainer = []
        this.messagesRunInLoopRightContainer = []
        this.messagesNotRunInLoopRightContainer = []
        this.displayUI.map((data: any) => {
            if (data.name === "leftInfoContainer") {
                for (let i = 0; i < data.child.length; i++) {
                    if (data.child[i].messageInLoop) {
                        this.messagesRunInLoopLeftContainer.push(data.child[i])
                    } else {
                        this.messagesNotRunInLoopLeftContainer.push(data.child[i])
                    }
                }
            } else if (data.name === "rightInfoContainer") {
                for (let i = 0; i < data.child.length; i++) {
                    if (data.child[i].messageInLoop) {
                        this.messagesRunInLoopRightContainer.push(data.child[i])
                    } else {
                        this.messagesNotRunInLoopRightContainer.push(data.child[i])
                    }
                }
            }
        })

    }

    checkUiMode(uimodeobj: any) {

        if (uimodeobj.uimode === undefined) {
            uimodeobj.uimode = "both"
        }
        if (uimodeobj.uimode === "both" || uimodeobj.uimode === this.ui_mode) {
            return uimodeobj;
        }
    }


    bindUI() {
        this.layoutChange(this.props.layoutMode)
    }


    componentDidMount() {
        this.bindUI();
    }

    changeLeftContent() {
        if (this.state.leftContainer) {
            this.setState((prevState) => {
                return {
                    ...prevState,
                    leftContainer: false,
                }
            })
        } else {
            this.setState((prevState) => {
                return {
                    ...prevState,
                    leftContainer: true,
                }
            })
        }
    }

    changeRightContent() {
        if (this.state.rightContainer) {
            this.setState((prevState) => {
                return {
                    ...prevState,
                    rightContainer: false,
                }
            })
        } else {
            this.setState((prevState) => {
                return {
                    ...prevState,
                    rightContainer: true,
                }
            })
        }
    }

    layoutChange(currentLayout: string) {
        this.displayUI.map((data: any, j: number) => {
                if (data.layout === true) {
                    this.props.setApplicationLayoutObject(data.name)
                }
            }
        )
    }

    shouldComponentUpdate(nextProps: Readonly<IProps>, nextState: Readonly<IState>, nextContext: any): boolean {
        if (nextProps.leftMessageIndex !== this.props.leftMessageIndex || nextProps.rightMessageIndex !== this.props.rightMessageIndex) {
            this.leftContainerChildCurrentIndex = nextProps.leftMessageIndex
            this.rightContainerChildCurrentIndex = nextProps.rightMessageIndex
        }
        if (nextProps.startInterval && nextProps.startInterval !== this.props.startInterval) {
            if (nextProps.selectContainer === "both" || nextProps.selectContainer === "left") {
                this.changeLeftContent.call(this)
                this.leftInterval = setInterval(this.changeLeftContent.bind(this), this.props.leftContainerIntervalTime);
            }
            if (nextProps.selectContainer === "both" || nextProps.selectContainer === "right") {
                this.changeRightContent.call(this)
                this.rightInterval = setInterval(this.changeRightContent.bind(this), this.props.rightContainerIntervalTime);
            }

        }
        if (nextState.leftContainer != this.state.leftContainer) {
            this.messagesRunInLoopLeftContainer.map((data: any, index: number) => {
                data.visible = false
                if (this.leftContainerChildCurrentIndex === this.messagesRunInLoopLeftContainer.length) {
                    this.leftContainerChildCurrentIndex = 0;
                }
            })
            this.messagesRunInLoopLeftContainer[this.leftContainerChildCurrentIndex].visible = true
            this.leftContainerChildCurrentIndex++;
        }

        if (nextState.rightContainer != this.state.rightContainer) {

            this.messagesRunInLoopRightContainer.map((data: any, index: number) => {
                data.visible = false
                if (this.rightContainerChildCurrentIndex === this.messagesRunInLoopRightContainer.length) {
                    this.rightContainerChildCurrentIndex = 0;
                }
            })
            this.messagesRunInLoopRightContainer[this.rightContainerChildCurrentIndex].visible = true
            this.rightContainerChildCurrentIndex++;
        }


        if (nextProps.pauseInterval && nextProps.pauseInterval !== this.props.pauseInterval) {
            if (nextProps.selectContainer === "both" || nextProps.selectContainer === "left") {
                clearInterval(this.leftInterval)
                this.displayUI.map((data: any) => {
                    if (data.name === "leftInfoContainer") {
                        for (let i = 0; i < data.child.length; i++) {
                            data.child[i].visible = false
                        }
                        data.child[this.leftContainerChildCurrentIndex].visible = true
                    }
                })
            }
            if (nextProps.selectContainer === "both" || nextProps.selectContainer === "right") {
                clearInterval(this.rightInterval)
                this.displayUI.map((data: any) => {
                    if (data.name === "rightInfoContainer") {
                        for (let i = 0; i < data.child.length; i++) {
                            data.child[i].visible = false
                        }
                        data.child[this.rightContainerChildCurrentIndex].visible = true

                    }
                })
            }
            this.props.pauseTheInterval(false)
        }


        if (nextProps.resumeInterval !== this.props.resumeInterval) {
            this.displayUI.map((data: any) => {
                if (nextProps.selectContainer === "both" || nextProps.selectContainer === "left") {
                    if (data.name === "leftInfoContainer") {
                        for (let i = 0; i < data.child.length; i++) {
                            data.child[i].visible = false
                        }

                        this.changeLeftContent.call(this)
                        this.leftInterval = setInterval(this.changeLeftContent.bind(this), this.props.leftContainerIntervalTime);
                    }
                }
                if (nextProps.selectContainer === "both" || nextProps.selectContainer === "right") {
                    if (data.name === "rightInfoContainer") {
                        for (let i = 0; i < data.child.length; i++) {
                            data.child[i].visible = false
                        }
                        this.changeRightContent.call(this)
                        this.rightInterval = setInterval(this.changeRightContent.bind(this), this.props.rightContainerIntervalTime);
                    }
                }
            })
        }
        if (nextProps.layoutMode !== this.props.layoutMode) {
            this.layoutChange(nextProps.layoutMode)
            return false;
        }

        return true;
    }

    render() {
        return (
            <UIManager id={"playerMessageContainer"} type={"Container"} ref={i => this.playerMessageContainer = i}
                       app={this.app}>
                <UIManager id={"playerMessage"} type={"Container"} name={"playerMessage"} app={this.app}>
                    {
                        this.displayUI && this.displayUI.map((i: any) =>
                            <UIManager key={`UIManager-${Math.random()}`} langObj={this.props.langObj} type={i.type}
                                       id={i.id} {...i} app={this.app}/>
                        )
                    }
                </UIManager>
            </UIManager>)
    }

}

export default withPixiApp(connect(
    (state: Pick<IStore, 'basegameState' | 'applicationState' | 'playerMessageState'>): IStateToProps =>
        ({
            layoutMode: state.applicationState.layoutMode,



        }),
    (dispatch: Dispatch): IDispatchToProps => ({
        setApplicationLayoutObject: (layoutobjectlist: any): any => dispatch(layoutssActions.setApplicationLayoutObject(layoutobjectlist)),
        startTheInterval: (startInterval: boolean, leftMessageIndex: number, rightMessageIndex: number, selectContainer: string): any => dispatch(showMessageActions.startTheInterval(startInterval, leftMessageIndex, rightMessageIndex, selectContainer)),
        pauseTheInterval: (pauseInterval: boolean, leftMessageIndex: number, rightMessageIndex: number, selectContainer: string): any => dispatch(showMessageActions.pauseTheInterval(pauseInterval, leftMessageIndex, rightMessageIndex, selectContainer)),
        resumeTheInterval: (resumeInterval: boolean, leftMessageIndex: number, rightMessageIndex: number, selectContainer: string): any => dispatch(showMessageActions.resumeTheInterval(resumeInterval, leftMessageIndex, rightMessageIndex, selectContainer)),
    }))(withPlayerMessageConfiguration(PlayerMessage)));