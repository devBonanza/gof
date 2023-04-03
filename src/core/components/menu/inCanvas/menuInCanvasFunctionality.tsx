import { _ReactPixi, Container, Graphics, withPixiApp } from '@inlet/react-pixi'
import React from "react";
import PIXI from "pixi.js";
import { connect } from 'react-redux'
import { Dispatch } from 'redux';
import { IStore } from "../../../store/IStore";
import { actions as buttonActions } from "../../../reducers/buttonPanelReducer";
import { actions as menuActions } from "../../../reducers/menuReducer";
import { Texture } from "pixi.js";
import { STARTBUTTONCODE } from "../../autoplay/inCanvas/button";
import { STARTTEXTCODE } from "./text";
import { actions as soundActions } from "../../../reducers/soundReducer";

interface IStateToProps {
}

interface IDispatchToProps {
}


interface IProps extends IStateToProps, IDispatchToProps {
    [x: string]: any;
}

interface IState {
    [x: string]: any;
}

class MenuInCanvasFunctionality extends React.Component<IProps, IState> {

    protected app: PIXI.Application;

    constructor(props: IProps) {
        super(props);
        this.app = props.app;
        this.state = {
            defaultState: false,
            toggleButtonState: false,
            toggleButtonTwoState: false,
            toggleButtonThreeState: false,
        }
    }


    clickFirstToogleButton(e: any) {
        if (this.state.toggleButtonState) {
            this.setState({
                toggleButtonState: false
            })
        } else {
            this.setState({
                toggleButtonState: true
            })
        }
    }

    clickSecondToogleButton(e: any) {
        if (this.state.toggleButtonTwoState) {
            this.setState({
                toggleButtonTwoState: false
            })
        } else {
            this.setState({
                toggleButtonTwoState: true
            })
        }
    }

    clickThirdToogleButton(e: any) {
        if (this.state.toggleButtonThreeState) {
            this.setState({
                toggleButtonThreeState: false
            })
        } else {
            this.setState({
                toggleButtonThreeState: true
            })
        }
    }

    resetButton() {
        this.setState({
            toggleButtonState: false,
            toggleButtonTwoState: false,
            toggleButtonThreeState: false
        })
    }


    shouldComponentUpdate(nextProps: Readonly<IProps>, nextState: Readonly<IState>, nextContext: any): boolean {


        return true;
    }


    componentDidMount() {


    }


    render() {

        let { defaultState, toggleButtonState, toggleButtonTwoState, toggleButtonThreeState } = this.state;


    let currentFrames: any = ["Off.png", "On.png"]
        let TextureList: any = []
        for (let i = 0; i < currentFrames.length; i++) {

            TextureList.push(Texture.from(currentFrames[i]))
        }

        return (<>

            <Container key={`Container-${Math.random()*10000}`}>

                <STARTBUTTONCODE buttonState={true} defaultstate={toggleButtonState} scope={this}
                    beforeClick={this.clickFirstToogleButton}
                    imgeOfButton={["Off.png", "On.png"]} buttonX={730}
                    buttonY={255} buttonWidth={70} buttonHeight={30}
                ></STARTBUTTONCODE>

                <STARTBUTTONCODE buttonState={true} defaultstate={toggleButtonTwoState} scope={this}
                    beforeClick={this.clickSecondToogleButton}
                    imgeOfButton={["On.png", "Off.png"]} buttonX={730}
                    buttonY={355} buttonWidth={70} buttonHeight={30}
                ></STARTBUTTONCODE>

                <STARTBUTTONCODE buttonState={true} defaultstate={toggleButtonThreeState} scope={this}
                    beforeClick={this.clickThirdToogleButton}
                    imgeOfButton={["On.png", "Off.png"]} buttonX={730}
                    buttonY={455} buttonWidth={70} buttonHeight={30}
                ></STARTBUTTONCODE>


                <Graphics draw={g => {
                    g.beginFill(0x55C606, 1)
                    g.drawRect(595, 570, 100, 40)
                    g.endFill()
                }}
                    interactive buttonMode mousedown={() => {
                        this.resetButton();
                        this.props.hideMenuUI();
                        this.props.setAllButtonEnable();
                    }}
                />

                <Graphics draw={g => {

                    g.beginFill(0xA3A4A2, 1)
                    g.drawRect(590, 150, 90, 40)

                    g.endFill()
                }}
                />
                <Graphics draw={g => {
                    g.beginFill(0xffffff, 1)
                    g.drawCircle(540, 170, 25)
                    g.beginFill(0x55C606, 1)
                    g.drawCircle(730, 170, 25)
                    g.endFill()
                }}
                    interactive buttonMode mousedown={() => {
                    }}
                />

                <STARTTEXTCODE xaxis="620" yaxis="581" textToDisplay="CLOSE" fontOfText={15}
                    colofOfText="#ffffff"></STARTTEXTCODE>
                <STARTTEXTCODE xaxis="532" yaxis="146" textToDisplay="-" fontOfText={36}
                    colofOfText="#000000"></STARTTEXTCODE>
                <STARTTEXTCODE xaxis="720" yaxis="152" textToDisplay="+" fontOfText={35}
                    colofOfText="#ffffff"></STARTTEXTCODE>


            </Container>
        </>

        )
    }
}


export default withPixiApp(connect(
    (state: Pick<IStore, 'reelsState' | 'buttonPanelState' | 'basegameState' | 'gridsState' | 'autoplayState'>, ownProps?: any) =>
        ({}),
    (dispatch: Dispatch): IDispatchToProps => ({


        setAllButtonEnable: (exceptBtnList: Array<string>): any => dispatch(buttonActions.setAllButtonEnable(exceptBtnList)),
        hideMenuUI: (): any => dispatch(menuActions.hideMenuUI()),
        stopAllBGMSound: (stopAllBgSound: boolean): any => dispatch(soundActions.stopAllBGMSound(stopAllBgSound)),
        stopAllSFXSound: (stopAllSfxSound: boolean): any => dispatch(soundActions.stopAllSFXSound(stopAllSfxSound)),

    })
)(MenuInCanvasFunctionality));


