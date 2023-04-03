import React, {Component} from "react";
import {withPixiApp} from "@inlet/react-pixi";
import {connect} from "react-redux";
import {IStore} from "../../store/IStore";
import {Dispatch} from "redux";
import {isMobile} from "react-device-detect";
import {actions as betPanelActions} from "../../reducers/betPanelReducer";
import {actions as menuActions} from "../../reducers/menuReducer";
import {actions as autoplayActions} from "../../reducers/autoplayReducer";

interface IProps {
    [x: string]: any;
}

interface IStateToProps {
}

interface IDispatchToProps {
}

interface IState {
    index: number,
    isGameLoaded: boolean,
    GameType: string,
    width: number | string,
    height: number | string,
    pixelRatio: number,
    lang: string

}

class Betpanel extends Component<IProps, IState> {
    protected app: PIXI.Application;
    protected paytable: any;

    constructor(props: IProps) {
        super(props);

        this.app = props.app;

        this.state = {
            index: 0,
            width: this.props.width,
            height: this.props.height,
            pixelRatio: 1,
            isGameLoaded: false,
            GameType: "BASE",
            lang: "en"
        }
    }


    handleSelect = (selectedIndex: number, e: any) => {

        this.setState((prevState) => {
            return {
                ...prevState,
                index: selectedIndex
            }
        })
    };
    handleClick = (e: any) => {
        this.props.hidePaytable();

    };

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

    }

    bindUI() {


        let elements = document.getElementsByClassName('btn-coin');


        for (let i = 0; i < elements.length; i++) {
            if (elements[i].classList.contains('active')) {
                elements[i].classList.remove('active');
            }
        }
        for (let i = 0; i < this.props.denominations.length; i++) {
            if (this.props.currentdenominationsvalue == this.props.denominations[i]) {
                if (i == 0) {

                    elements[2] && elements[2].classList.add('active');
                }
                if (i == 1) {
                    elements[3] && elements[3].classList.add('active');
                }
                if (i == 2) {
                    elements[4] && elements[4].classList.add('active');
                }
                if (i == 3) {
                    elements[5] && elements[5].classList.add('active');
                }

            }

        }

    }



    componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<IState>, snapshot?: any) {
        this.bindUI();
    }

    handleEvent = (e: any) => {

        let currentBet = this.props.currentbetvalue;
        let currentLine = this.props.currentlinevalue;
        let elements_bet_decrement: any = document.getElementById('bet_decrement');
        let elements_bet_increment: any = document.getElementById('bet_increment');
        let elements_line_decrement: any = document.getElementById('line_decrement');
        let elements_line_increment: any = document.getElementById('line_increment');

        switch (e.target.id) {

            case "bet_decrement":


                if (elements_bet_increment.classList.contains('disable')) {
                    elements_bet_increment.classList.remove('disable');
                    elements_bet_increment.classList.add('normal');
                }

                if (currentBet > this.props.minbetvalue) {
                    currentBet--;
                    this.props.setSelectedBet(currentBet);
                    if (elements_bet_decrement.classList.contains('disable')) {
                        elements_bet_decrement.classList.remove('disable');
                        elements_bet_decrement.classList.add('normal');
                    }
                } else {
                    if (elements_bet_decrement.classList.contains('normal')) {
                        elements_bet_decrement.classList.remove('normal');
                        elements_bet_decrement.classList.add('disable');
                    }
                }

                return;
            case "bet_increment":


                if (elements_bet_decrement.classList.contains('disable')) {
                    elements_bet_decrement.classList.remove('disable');
                    elements_bet_decrement.classList.add('normal');
                }
                if (currentBet < this.props.maxbetvalue) {
                    currentBet++;
                    this.props.setSelectedBet(currentBet);
                    if (elements_bet_increment.classList.contains('disable')) {
                        elements_bet_increment.classList.remove('disable');
                        elements_bet_increment.classList.add('normal');
                    }
                } else {
                    if (elements_bet_increment.classList.contains('normal')) {
                        elements_bet_increment.classList.remove('normal');
                        elements_bet_increment.classList.add('disable');
                    }

                }
                return;
            case "line_decrement":

                if (elements_line_increment.classList.contains('disable')) {
                    elements_line_increment.classList.remove('disable');
                    elements_line_increment.classList.add('normal');
                }


                if (currentLine > this.props.minlinevalue) {
                    currentLine--;
                    this.props.setSelectedLine(currentLine);
                    if (elements_line_decrement.classList.contains('disable')) {
                        elements_line_decrement.classList.remove('disable');
                        elements_line_decrement.classList.add('normal');
                    }
                } else {
                    if (elements_line_decrement.classList.contains('normal')) {
                        elements_line_decrement.classList.remove('normal');
                        elements_line_decrement.classList.add('disable');
                    }
                }

                return;
            case "line_increment":
                if (elements_line_decrement.classList.contains('disable')) {
                    elements_line_decrement.classList.remove('disable');
                    elements_line_decrement.classList.add('normal');
                }
                if (currentLine < this.props.maxlinevalue) {
                    currentLine++;
                    this.props.setSelectedLine(currentLine);
                    if (elements_line_increment.classList.contains('disable')) {
                        elements_line_increment.classList.remove('disable');
                        elements_line_increment.classList.add('normal');
                    }
                } else {
                    if (elements_line_increment.classList.contains('normal')) {
                        elements_line_increment.classList.remove('normal');
                        elements_line_increment.classList.add('disable');
                    }
                }
                return;
            default:
                return 'No buttons';
        }
    }

    handleCoinSelect(event: any, value: number) {



        let elements = document.getElementsByClassName('btn-coin');
        for (let i = 0; i < elements.length; i++) {
            if (elements[i].classList.contains('active')) {
                elements[i].classList.remove('active');
            }
        }
        event.target.classList.add('active');
        this.props.setSelectedCoin(value)
    }

    render() {
        if (!this.props.showBetpanel) {
            return (<></>)
        }
        return (<div className="container-fluid p-0 bet-main">
            <div className="bet-container">
                <div className="bet-content ">

                    <div className="bet_centered text-white">
                        <div className="bet-main-content" style={{pointerEvents: "auto"}}>
                            <div className="counter row">
                                <div className="w-50 text-center">
                                    <h2 className="text-uppercase text-purple heading-text">Bet:</h2>
                                    <div className="d-flex justify-content-center">
                                        <div id="bet_decrement" className="plus-minus-btn minus-btn normal"
                                             onClick={this.handleEvent}></div>
                                        <div className=" btn-coin d-inline"><span
                                            className=" coin-number">{this.props.currentbetvalue}</span></div>
                                        <div id="bet_increment" className="plus-minus-btn plus-btn normal"
                                             onClick={this.handleEvent}></div>
                                    </div>
                                </div>
                                <div className="w-50 text-center">
                                    <h2 className="text-uppercase text-purple heading-text">Lines:</h2>
                                    <div className="d-flex justify-content-center">
                                        <div id="line_decrement" className="plus-minus-btn minus-btn normal"
                                             onClick={this.handleEvent}></div>
                                        <div className=" btn-coin d-inline"><span
                                            className=" coin-number">{this.props.currentlinevalue}</span></div>
                                        <div id="line_increment" className="plus-minus-btn plus-btn normal"
                                             onClick={this.handleEvent}></div>
                                    </div>
                                </div>
                            </div>

                            <div className="coin-values margin-top-10 margin-top-sm-5">
                                <div className="text-center">
                                    <h2 className="text-uppercase text-purple heading-text">Set coin value:</h2>
                                </div>
                                <ul className="spin-ul coin-value margin-top-2">
                                    <li className="pos-relative">
                                        <button className=" btn-coin" onClick={event => {
                                            this.handleCoinSelect(event, this.props.denominations[0])
                                        }}><span
                                            className=" coin-number">{this.props.denominations[0]}</span></button>
                                    </li>
                                    <li className="pos-relative">
                                        <button className="btn-coin" onClick={event => {
                                            this.handleCoinSelect(event, this.props.denominations[1])
                                        }}><span
                                            className=" coin-number">{this.props.denominations[1]}</span></button>
                                    </li>
                                    <li className="pos-relative">
                                        <button className=" btn-coin active" onClick={event => {
                                            this.handleCoinSelect(event, this.props.denominations[2])
                                        }}><span
                                            className=" coin-number">{this.props.denominations[2]}</span></button>
                                    </li>
                                    <li className="pos-relative">
                                        <button className=" btn-coin" onClick={event => {
                                            this.handleCoinSelect(event, this.props.denominations[3])
                                        }}><span
                                            className=" coin-number">{this.props.denominations[3]}</span></button>
                                    </li>
                                </ul>
                            </div>

                            <div className="action-buttons text-center margin-top-10 margin-top-sm-5">
                                <button className=" btn-coin" onClick={() => {

                                    this.props.hideBetpanel();
                                    this.props.showMenuUI();
                                    this.props.showAutoplay();
                                }}>
                                    <img src="../../../assets/bet/autoplay_head_text.png"
                                         className="img-fluid d-inline bet-text-img"/>
                                    <h2 className="text-uppercase text-yellow d-inline notice-text">Open Auto play
                                        settings</h2>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>)
    }



}


export default withPixiApp(connect(
    (state: Pick<IStore, 'betPanelState'>): IStateToProps =>
        ({
            showBetpanel: state.betPanelState.showBetpanel,
            currentbetvalue: state.betPanelState.currentbetvalue,
            currentlinevalue: state.betPanelState.currentlinevalue,
            currentdenominationsvalue: state.betPanelState.currentdenominationsvalue,

            denominations: state.betPanelState.denominations,
            maxbetvalue: state.betPanelState.maxbetvalue,
            minbetvalue: state.betPanelState.minbetvalue,
            maxlinevalue: state.betPanelState.maxlinevalue,
            minlinevalue: state.betPanelState.minlinevalue,
        }),
    (dispatch: Dispatch): IDispatchToProps => ({
        hideBetpanel: (): any => dispatch(betPanelActions.hideBetpanel()),
        setSelectedBet: (selectedBet: number): any => dispatch(betPanelActions.setSelectedBet(selectedBet)),
        setSelectedLine: (selectedLine: number): any => dispatch(betPanelActions.setSelectedLine(selectedLine)),
        setSelectedCoin: (selectedCoin: number): any => dispatch(betPanelActions.setSelectedCoin(selectedCoin)),
        showMenuUI: (): any => dispatch(menuActions.showMenuUI()),
        showAutoplay: (): any => dispatch(autoplayActions.showAutoplayUI()),
        // setDefaultDenominationValue: (defaultdenominationvalue: number): any => dispatch(betPanelActions.setDefaultDenominationValue(defaultdenominationvalue)),
    }))(Betpanel));

// export default withPaytableConfiguration(Paytable);
