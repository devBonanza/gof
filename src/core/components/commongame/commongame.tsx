import React, {Component, Ref} from "react";
import {_ReactPixi, withPixiApp} from "@inlet/react-pixi";
import {connect} from "react-redux";
import {IStore} from "../../store/IStore";
import {Dispatch} from "redux";
import withCommonGameConfiguration from "./configuration/withCommonGameConfiguration";
import UIManager from "../ui/UiBuilder";
import PIXI from "pixi.js";
import {actions as layoutssActions} from "../../reducers/layoutsStateReducer";
import {isMobile} from "react-device-detect";


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

class Commongame extends Component<IProps, IState> {
    protected app: PIXI.Application;
    protected commonGameContainer: _ReactPixi.IContainer | Ref<any>;
    protected ui_mode: string;
    protected displayUI: any;

    constructor(props: IProps) {
        super(props);
        this.app = props.app;
        this.state = {
            buttonPanelEnable: true,
            allContainerList: [],
            autoplayModeOn: false,
            showOverLay: false,
            isSpinning: false,
            pause: false,
            play: true,
            basegameIdleMode: true,
            basegamePlayMode: false,
            uiElements: [],
            lang: "en"
        }
        // this.commonGameContainer = React.createRef();
        this.commonGameContainer = {}
        if (isMobile) {
            this.ui_mode = "mobile"
        } else {
            this.ui_mode = "desktop"
        }

        this.displayUI = this.props.data.COMPONENTS.filter(this.checkUiMode.bind(this))

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
        this.layoutChange(this.props.layoutMode);
       }


    componentDidMount() {
        this.bindUI();
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
        if (nextProps.layoutMode !== this.props.layoutMode) {
            this.layoutChange(nextProps.layoutMode)
            return true;
        }
        if (nextProps.winAmount !== this.props.winAmount) {
            return false;
        }
        return true;
    }

    render() {

        return (
            <UIManager id={"commonGameContainer"} type={"Container"} ref={i => this.commonGameContainer = i}
                       configGame={this.props.configGame}
                       app={this.app}>
                <UIManager id={"commonLayer"} type={"Container"} name={"commonLayer"} app={this.app}
                           configGame={this.props.configGame}>
                    {
                        this.displayUI && this.displayUI.map((i: any) =>
                            <UIManager key={`UIManager-${Math.random()}`} langObj={this.props.langObj} type={i.type}  name={"commonLayer"}
                                       id={i.id} {...i} app={this.app} configGame={this.props.configGame}/>
                        )
                    }
                </UIManager>
            </UIManager>)
    }

}

export default withPixiApp(connect(
    (state: Pick<IStore, 'basegameState' | 'applicationState'>): IStateToProps =>
        ({

        }),
    (dispatch: Dispatch): IDispatchToProps => ({
        setApplicationLayoutObject: (layoutobjectlist: any): any => dispatch(layoutssActions.setApplicationLayoutObject(layoutobjectlist)),
    }))(withCommonGameConfiguration(Commongame)));