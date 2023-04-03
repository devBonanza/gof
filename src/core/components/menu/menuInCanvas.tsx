import React, {Component, Ref} from "react";
import {_ReactPixi, withPixiApp} from "@inlet/react-pixi";
import {connect} from "react-redux";
import {IStore} from "../../store/IStore";
import {Dispatch} from "redux";
import UIManager from "../ui/UiBuilder";
import {alllanguage} from "../../data/lang/index"
import {Ilanguage} from "../../interface/Icommon";
import PIXI from "pixi.js";
import withMenuConfiguration from "./configuration/withMenuConfiguration";
import MenuInCanvasFunctionality from "./inCanvas/menuInCanvasFunctionality";

interface IProps {
    [x: string]: any;

}

interface IStateToProps {
    [x: string]: any;

}

interface IDispatchToProps {

}

interface IState {
    [x: string]: any;
}

class MenuInCanvas extends Component<IProps, IState> {
    protected app: PIXI.Application;
    protected menuInCanvas_Container: _ReactPixi.IContainer | Ref<any>;
    private alllanguage: Ilanguage;

    constructor(props: IProps) {
        super(props);
        this.app = props.app;
        this.state = {
            uiElements: [],
            lang: "en",
        }
        this.alllanguage = alllanguage;
        //this.menuInCanvas_Container = React.createRef();

        this.menuInCanvas_Container = {};

    }


    render() {
        if (!this.props.showMenu || this.props.InCanvas === 0) {
            return (<></>)
        }
        const langObj: Record<any, any> = this.alllanguage[this.state.lang as keyof typeof alllanguage];
        return (
            <UIManager id={"menuInCanvas_Container"} type={"Container"} ref={i => this.menuInCanvas_Container = i}>
                <UIManager id={"commonLayer"} type={"Container"} name={"commonLayer"}>
                    {
                        this.props.data.COMPONENTS && this.props.data.COMPONENTS.map((i: any) =>
                            <UIManager key={`UIManager-${Math.random()}`} langObj={this.props.langObj} type={i.type}
                            name={"commonLayer"}
                                       id={i.id} {...i} app={this.app}/>)
                    }

                    {this.props.data.ButtonsInCanvas &&
                    <MenuInCanvasFunctionality key={"buttonInCanvasUI"}
                                               {...this.props} ></MenuInCanvasFunctionality>
                    }
                </UIManager>
            </UIManager>
        )
    }

}

export default withPixiApp(connect(
    (state: Pick<IStore, 'basegameState' | 'autoplayState' | 'menuState'>): IStateToProps =>
        ({
            showMenu: state.menuState.showMenu,


        }),
    (dispatch: Dispatch): IDispatchToProps => ({}))(withMenuConfiguration(MenuInCanvas)));