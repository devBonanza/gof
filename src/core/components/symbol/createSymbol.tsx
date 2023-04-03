import React, { Component } from "react";
import withSymbolConfiguration from "../symbol/configuration/withSymbolConfiguration";
import { withPixiApp } from "@inlet/react-pixi";
import UIManager from "../ui/UiBuilder";
import { connect } from "react-redux";
import { IStore } from "../../store/IStore";
import { Dispatch } from "redux";
import { actions as symbolActions } from "../../reducers/symbolStateReducer";

interface IState {

}

interface IProps {
    [x: string]: any;
}

interface IStateToProps {

}

interface IDispatchToProps {

}

class CreateSymbol extends Component<IProps> {
    protected app: PIXI.Application;
    protected symbolImage: any = [];
    protected symbolAnimations: any = [];
    protected symbolTraycontainer: any;
    protected reactCompSymbolTrayList: any;

    constructor(props: IProps) {
        super(props);
        this.app = props.app;
        // this.symbolTraycontainer = React.createRef();
        this.symbolTraycontainer = {};
        this.reactCompSymbolTrayList = [];
        this.init();
    }

    init() {
        for (let i = 0; i < this.props.data.symbols.length; i++) {
            this.symbolImage.push(this.props.data.symbols[i]);
        }
        this.bindEvent();
    }

    bindEvent() {
    }

    onDeletesymbolonreel(symbol: any) {
    }

    componentDidMount() {
        this.props.setReactSymbolTray(this.reactCompSymbolTrayList);
    }

    shouldComponentUpdate(nextProps: Readonly<IProps>, nextState: Readonly<IState>, nextContext: any): boolean {
        if (nextProps.addSymbolInTray !== this.props.addSymbolInTray) {
            if (nextProps.addSymbolInTray) {
                return true
            }
            return false
        }
        return true
    }

    render() {
        let symbolCreated: any = [];
        let subSymTrayContainer;
        let symbolId = -1
        if (this.props.updatedSymbolId < 1) {
            symbolId = 1;
        } else {
            symbolId = this.props.updatedSymbolId - 1;
        }
        return (
            <UIManager ref={(i: any) => subSymTrayContainer = i}
                key={`UIManager-SymbolTray-Create-${Math.random() + Date.now()}`}  {...this.symbolImage[symbolId]}
                playanimname={'anim'} type={'Container'}
                name={"symbol_block" + this.symbolImage[symbolId].id}
                Id={this.symbolImage[symbolId].id}
                playing={false}
                visible={false}
                anchor ={this.props.anchor}
               
                app={this.app} configGame={this.props.configGame}>
                {
                    this.symbolImage[symbolId].child && this.symbolImage[symbolId].child.map((data: any) => <UIManager
                        key={`UIManager-Create-${Math.random()}`}  {...data}
                        playanimname={'anim'}
                        name={"symbol_block" + this.symbolImage[symbolId].id}
                        playing={false}
                        anchor ={this.props.anchor}
                        app={this.app} configGame={this.props.configGame} />)

                }
            </UIManager>
        )
    }
}
export default withPixiApp(connect(
    (state: Pick<IStore, 'symbolState' | 'winpresentationState'>): IStateToProps =>
    ({
        addSymbolInTray: state.symbolState.addSymbolInTray,
        updatedSymbolId: state.symbolState.updatedSymbolId,
    }),
    (dispatch: Dispatch): IDispatchToProps => ({
        setReactSymbolTray: (reactCompSymbolTrayList: any): any => dispatch(symbolActions.setReactSymbolTray(reactCompSymbolTrayList)),
    }))(withSymbolConfiguration(CreateSymbol)));