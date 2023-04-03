import React, {Component} from "react";
import {withPixiApp} from "@inlet/react-pixi";
import {connect} from "react-redux";
import {IStore} from "../../store/IStore";
import {Dispatch} from "redux";
import withHistoryConfiguration from "../history/configuration/withHistoryConfiguration";

interface IProps {
    [x: string]: any;

}

interface IStateToProps {


}

interface IDispatchToProps {


}

interface IState {
    index: number,

    width: number | string,
    height: number | string,

}

class History extends Component<IProps, IState> {
    protected app: PIXI.Application;
    gameHistoryData: any;
    listClicked: boolean = false;
    currentListId: any;

    constructor(props: IProps) {
        super(props);

        this.app = props.app;

        this.state = {
            index: 0,
            width: this.props.width,
            height: this.props.height,
        }
    }

    shouldComponentUpdate(nextProps: Readonly<IProps>, nextState: Readonly<IState>, nextContext: any): boolean {

        this.gameHistoryData = nextProps.historyData;
        return true
    }



    clickHandler = (linesWon: any, id: any) => {
        this.currentListId = id;
        this.listClicked = true;
        this.setState({});
    }

    backBtnClicked = () => {
        this.listClicked = false;
        this.setState({});
    }

    componentWillUnmount() {
        this.listClicked = false;
    }

    render() {
        if (!this.props.showHistory || this.gameHistoryData.length == 0) {
            return (<></>)
        }

        let tableHead;
        let tableBody;
        let imgData;
        let lineImgData;

        if (this.listClicked) {
            this.listClicked = false;
            let lineHistory = this.gameHistoryData[this.currentListId];

            tableHead = <tr>
                <th className="text-yellow text-uppercase">
                    <button className="btn p-0" onClick={() => this.setState({})}><img
                        src="../../../assets/history/triangle-btn-left.png"/></button>
                </th>
                <th colSpan={7}
                    className="text-yellow text-uppercase">{lineHistory.freeSpinWon == 0 ? ('NORMAL') : ('FREE')} round
                    - id {lineHistory.roundId} <br/>{lineHistory.hour.slice(0, 5)} - {lineHistory.date}
                </th>
            </tr>;

            tableBody = lineHistory.linesWon.map((linesWon: any) => {
                return (
                    <tr key={linesWon.id}>
                        <td className="text-uppercase">{lineHistory.denomination / 100}<br/>COIN VALUE</td>
                        <td className="text-uppercase">15<br/>OPEN LINES</td>
                        <td className="text-uppercase">{lineHistory.freeSpinWon}<br/>FREESPINS</td>
                        <td className="text-uppercase">{lineHistory.bonusIdWon}<br/>BONUS</td>
                        <td className="text-uppercase">{lineHistory.bet * lineHistory.linesBet}<br/>BET</td>
                        <td className="text-uppercase">{lineHistory.win}<br/>WIN</td>
                        <td className="text-uppercase">{linesWon.bonus}<br/>BALANCE</td>
                    </tr>
                )
            });

            imgData = lineHistory.symbols.map((symbols: any, idx: number) => {
                let source = '../../../assets/paytable/' + symbols.id + '.png';
                return idx != 0 && idx % 5 == 0 ?
                    (
                        <React.Fragment key={idx}>
                            <br/>
                            <img key={idx} src={source} className="img-fluid symbol-img table-gift-img"/>
                        </React.Fragment>
                    ) :
                    (
                        <img key={idx} src={source} className="img-fluid symbol-img table-gift-img"/>
                    )
            });

            lineImgData = lineHistory.linesWon.map((linesWon: any) => {
                let source = '../../../assets/history/lines' + linesWon.id + '.png';
                return (
                    <React.Fragment key={linesWon.id}>
                        <img key={linesWon.id} src={source} className="img-fluid img-line margin-top-4"/>
                        <p style={{textAlign: "center"}}>LINE {linesWon.id}</p>
                    </React.Fragment>
                )
            });

        } else {

            tableHead = <tr>
                <th className="text-yellow text-uppercase">Day/Hour<br></br>({this.gameHistoryData[0].hour.slice(6)})
                </th>
                <th className="text-yellow text-uppercase">Round ID</th>
                <th className="text-yellow text-uppercase">Spin</th>
                <th className="text-yellow text-uppercase">Coin value</th>
                <th className="text-yellow text-uppercase">bet ({this.props.currencyCode})</th>
                <th className="text-yellow text-uppercase">win ({this.props.currencyCode})</th>
                <th></th>
            </tr>

            tableBody = this.gameHistoryData.map((gameHistory: any, id: any) => {
                // if (gameHistory.linesWon > 0) {
                //     gameHistory.linesWon = gameHistory.linesWon - 1;
                // }

                return (
                    <tr key={gameHistory.roundId}>
                        <td>{gameHistory.hour.slice(0, 5)}<br/>{gameHistory.date} </td>
                        <td>{gameHistory.roundId}</td>
                        <td>{gameHistory.freeSpinWon == 0 ? ('NORMAL') : ('FREE')}</td>
                        <td>{gameHistory.denomination / 100}</td>
                        <td>{gameHistory.bet * gameHistory.linesBet}</td>
                        <td>{gameHistory.win}</td>
                        <td>
                            <div className="td-border-left">
                                <button className="btn p-0"
                                        onClick={this.clickHandler.bind(this, gameHistory.linesWon, id)}><img
                                    src="../../../assets/history/triangle-btn.png"/></button>
                            </div>
                        </td>
                    </tr>
                )

            });
        }

        return (
            <div className="container-fluid p-0 history-main">
                <div className="history-container">
                    <div className="history-content pos-relative">
                        <div className="centered text-white">
                            <div className="text-center">
                                <img src="../../../assets/history/history-text.png" className="img-fluid mb-2"/>
                            </div>
                            <div className="overflow-history">
                                <div className="history-main-content">
                                    <div className="table-responsive"></div>
                                    <table className="table table-striped text-center">
                                        <thead>
                                        {tableHead}
                                        </thead>
                                        <tbody>
                                        {tableBody}
                                        </tbody>
                                    </table>
                                </div>
                                <div style={{display: "table", margin: "0 auto"}} className="margin-top-4">
                                    {imgData}
                                </div>
                                <div style={{display: "table", margin: "0 auto"}} className="margin-top-4">
                                    {lineImgData}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default withPixiApp(connect(
    (state: Pick<IStore, 'historyState' | 'applicationState'>): IStateToProps =>
        ({
            showHistory: state.historyState.showHistory,
            historyData: state.historyState.historyData,
            currencyCode: state.applicationState.currencyCode,
        }),
    (dispatch: Dispatch): IDispatchToProps => ({
        //  hidePaytable: (): any => dispatch(paytableActions.hidePaytable()),
    }))(withHistoryConfiguration(History)));