import React, { Component, Ref } from "react";
import { _ReactPixi, withPixiApp } from "@inlet/react-pixi";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import withNoInternetPopUpConfiguration from "./configuration/withNoInternetPopUpConfiguration";
import UIManager from "../../core/components/ui/UiBuilder";
import * as PIXI from 'pixi.js';
import { actions as layoutssActions } from "../../core/reducers/layoutsStateReducer";
import { actions as buttonActions } from "../../core/reducers/buttonPanelReducer";
import { actions as behaviourAction } from "../../gamereducer/behaviourReducer";
import { isMobile } from "react-device-detect";



interface IStore {
    [x: string]: any;
}

interface IProps {
    [x: string]: any;
}

interface IStateToProps {
    layoutMode: any;
    noInternetPopupVisible: boolean;
    text: string;
    closeButton: boolean;
    continueButton: boolean;
    spinStart: boolean;
}

interface IDispatchToProps {
}

interface IState {
    [x: string]: any;
}

class NoInternetPopUp extends Component<IProps, IState> {
    protected app: PIXI.Application;
    protected noInternetPopUpContainer: _ReactPixi.IContainer | Ref<any>;
    protected ui_mode: string;
    protected displayUI: any;
    protected xnoInternetPopUpContainerMobile: number = -480;
    protected ynoInternetPopUpContainerMobile: number = 250;
    protected xcloseButtonPopUp: number = 840;
    protected xcloseButtonPopUp_text: number = 960;

    constructor(props: IProps) {
        super(props);
        this.app = props.app;
        this.state = {
            uiElements: [],
            lang: "en"
        }
        // this.noInternetPopUpContainer = React.createRef();
        this.noInternetPopUpContainer = {};
        if (isMobile) {
            this.ui_mode = "mobile";
        } else {
            this.ui_mode = "desktop";
        }
        this.displayUI = this.props.data.COMPONENTS.filter(this.checkUiMode.bind(this));
    }

    checkUiMode(uimodeobj: any) {
        if (uimodeobj.uimode === undefined) {
            uimodeobj.uimode = "both";
        }
        if (uimodeobj.uimode === "both" || uimodeobj.uimode === this.ui_mode) {
            return uimodeobj;
        }
    }

    //this method will call after the first rendering for scaling and logo animation looping
    bindUI() {
        this.layoutChange(this.props.layoutMode);
    }

    componentDidMount() {
        this.bindUI();
    }

    layoutChange(currentLayout: string) {
        this.displayUI.map((data: any,) => {
            if (data.layout === true) {
                this.props.setApplicationLayoutObject(data.name);
            }
        }
        )
    }

    shouldComponentUpdate(nextProps: Readonly<IProps>, nextState: Readonly<IState>, nextContext: any): boolean {
        if (nextProps.layoutMode !== this.props.layoutMode) {
            this.layoutChange(nextProps.layoutMode);
            return false;
        }
        if (nextProps.spinStart != this.props.spinStart) {
            UIManager.getRef("noInternetPopUpContainer") && nextProps.spinStart && (UIManager.getRef("noInternetPopUpContainer").visible = false);
            return false;
        }
        return true;
    }
    openUrl(path: string) {
        (window as any).top.location.href = path;
    }

    componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<IState>, snapshot?: any) {
        if (this.props.noInternetPopupVisible) {
            UIManager.getRef("noInternetPopUpContainer").visible = true;
            if (isMobile && window.innerWidth < window.innerHeight) {
                UIManager.getRef("noInternetPopUpContainerMobile") && (UIManager.getRef("noInternetPopUpContainerMobile").x = this.xnoInternetPopUpContainerMobile);
                UIManager.getRef("noInternetPopUpContainerMobile") && (UIManager.getRef("noInternetPopUpContainerMobile").y = this.ynoInternetPopUpContainerMobile);
            }
            UIManager.setText("noInternetPopUpText2", this.props.langObj[this.props.text]);
            !this.props.closeButton && (UIManager.getRef("closeButtonPopUp").visible = false);
            !this.props.continueButton && (UIManager.getRef("continueButtonPopUp").visible = false);
            !this.props.continueButton && (UIManager.getRef("continueButtonPopUp_text").visible = false);
            this.props.noInternetPopupVisible && this.props.setAllButtonDisable();
           
            if (!this.props.continueButton) {
                UIManager.getRef("closeButtonPopUp") && (UIManager.getRef("closeButtonPopUp").x = this.xcloseButtonPopUp);
                UIManager.getRef("closeButtonPopUp_text") && (UIManager.getRef("closeButtonPopUp_text").x = this.xcloseButtonPopUp_text);
            }
           
        }
        else {
            UIManager.getRef("noInternetPopUpContainer").visible = false;
        }
        
    }
    handleEvent(e: any) {
        switch (e.currentTarget.name) {
            case "closeButtonPopUp":
                this.openUrl("http://www.spielen-mit-verantwortung.de/gluecksspielsucht.html");
                break;
            case "continueButtonPopUp":
                this.props.setAllButtonEnable();
                this.props.visibleNoInternetPopUp(false, "", false, false);
                break;



            default:
                return 'No buttons';
        }
    }
    render() {
        if (!this.props.noInternetPopupVisible) {
            return (<></>)
        }
        return (
            <UIManager id={"noInternetPopUpContainer"} name={"noInternetPopUpContainer"} type={"Container"}
                ref={i => this.noInternetPopUpContainer = i} configGame={this.props.configGame}
                app={this.app}>
                {
                    this.displayUI && this.displayUI.map((i: any) =>
                        <UIManager key={`UIManager-${Math.random()}`} langObj={this.props.langObj} type={i.type}
                            id={i.id} {...i} app={this.app} configGame={this.props.configGame}
                            scope={this} ClickHandler={this.handleEvent.bind(this)} />
                    )
                }
            </UIManager>)
    }
}

export default withPixiApp(connect(
    (state: Pick<IStore, 'behaviourState' | 'applicationState' | 'reelgridState'>): IStateToProps =>
    ({
        layoutMode: state.applicationState.layoutMode,
        noInternetPopupVisible: state.behaviourState.noInternetPopupVisible,
        text: state.behaviourState.text,
        closeButton: state.behaviourState.closeButton,
        continueButton: state.behaviourState.continueButton,
        spinStart: state.reelgridState.spinStart,
    }),
    (dispatch: Dispatch): IDispatchToProps => ({
        setApplicationLayoutObject: (layoutobjectlist: any): any => dispatch(layoutssActions.setApplicationLayoutObject(layoutobjectlist)),
        setAllButtonDisable: (exceptBtnList: Array<string>): any => dispatch(buttonActions.setAllButtonDisable(exceptBtnList)),
        setAllButtonEnable: (exceptBtnList: Array<string>): any => dispatch(buttonActions.setAllButtonEnable(exceptBtnList)),
        visibleNoInternetPopUp: (noInternetPopupVisible: boolean, text: string, closeButton: boolean, continueButton: boolean): any => dispatch(behaviourAction.visibleNoInternetPopUp(noInternetPopupVisible, text, closeButton, continueButton)),

    }))(withNoInternetPopUpConfiguration(NoInternetPopUp)));