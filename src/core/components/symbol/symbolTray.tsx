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


class SymbolTray extends Component<IProps> {
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

    render() {
        let symbolCreated: any = [];
        for (let i = 0; i < this.symbolImage.length; i++) {
            let symbolContainer: any = this.symbolImage[i];
            let subSymTrayContainer;
            let SYMBOL_TRAY = {
                container: subSymTrayContainer,
                Id: symbolContainer.id,
            }
            SYMBOL_TRAY.container =
                symbolCreated.push(
                    <UIManager ref={(i: any) => subSymTrayContainer = i}
                        key={Math.floor(Math.random() * 100000)}  {...symbolContainer}
                        playanimname={'anim'} type={'Container'}
                        name={"symbol_block" + symbolContainer.id}
                        Id={symbolContainer.id}
                        playing={false}
                        anchor ={symbolContainer.anchor}
                        app={this.app} configGame={this.props.configGame}>
                        {
                            symbolContainer.child && symbolContainer.child.map((data: any, i: any) => <UIManager
                                key={Math.floor(Math.random() * 1000)}  {...data}
                                playanimname={'anim'}
                                name={"symbol_block" + symbolContainer.id}
                                playing={false}
                                anchor ={data.anchor}
                                app={this.app} configGame={this.props.configGame} />)
                        }
                    </UIManager>
                );
        }
        return (<UIManager ref={i => this.symbolTraycontainer = i} type={"Container"} id={"symbolTraycontainer"}
            app={this.app}
            configGame={this.props.configGame} visible={false}
            name={"symbolTraycontainer"}
        >
            {symbolCreated}
        </UIManager>)
    }
}

export default withPixiApp(connect(
    (state: Pick<IStore, 'symbolState'>): IStateToProps =>
    ({
    }),
    (dispatch: Dispatch): IDispatchToProps => ({
        setReactSymbolTray: (reactCompSymbolTrayList: any): any => dispatch(symbolActions.setReactSymbolTray(reactCompSymbolTrayList)),
    }))(withSymbolConfiguration(SymbolTray)));