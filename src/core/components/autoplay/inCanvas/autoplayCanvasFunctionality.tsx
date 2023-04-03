import {_ReactPixi, Container, Sprite, withPixiApp} from '@inlet/react-pixi'
import React from "react";
import PIXI from "pixi.js";
import {connect} from 'react-redux'
import {Dispatch} from 'redux';
import {IStore} from "../../../store/IStore";
import {actions as baseGameActions} from "../../../reducers/baseGameReducer";
import {actions as buttonActions} from "../../../reducers/buttonPanelReducer";
import {actions as autoplayActions} from "../../../reducers/autoplayReducer";
import {actions as asyncActions} from "../../../reducers/asyncServerResponseReducer";
import {actions as _autoplayActions} from "../../../reducers/autoplayReducer"
import {STARTBUTTONCODE} from "./button"
import {Texture} from "pixi.js";


interface IState {
    selectedautoplayCount: number,

}

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

class AutoplayCanvasFunctionality extends React.Component<IProps, IState> {

    protected app: PIXI.Application;


    constructor(props: IProps) {
        super(props);


        this.app = props.app;
        this.state = {
            resetAllButton: false,
            defaultState: false,
            buttonState: false,
            buttonStateTwo: false,
            numberButtonFourState: false,
            numberButtonFiveState: false,
            numberButtonThreeState: false,
            okButtonState: true,
            toggleButtonState: false,
            toggleButtonTwoState: false,
            cancelButtonState: false,
            selectedautoplayCount: 0,
            enableOk: false,
        }
    }


    onClickValueOfButton(value: any) {
        this.setState((prevState) => {
            return {
                ...prevState,
                selectedautoplayCount: value,
            }
        })

    }

    clickTenbtn(e: any) {
        this.onClickValueOfButton(10);
        this.setState({
            buttonState: true,
            buttonStateTwo: false,
            numberButtonThreeState: false,
            umberButtonThreeState: false,
            numberButtonFourState: false,
            numberButtonFiveState: false,
            okButtonState: false,
            enableOk: true
        })
    }

    clickTwentybtn(e: any) {
        this.onClickValueOfButton(20);
        this.setState({
            buttonState: false,
            buttonStateTwo: true,
            numberButtonThreeState: false,
            numberButtonFourState: false,
            numberButtonFiveState: false,
            okButtonState: false,
            enableOk: true
        })

    }

    clickFiftybtn(e: any) {
        this.onClickValueOfButton(50);
        this.setState({
            buttonState: false,
            buttonStateTwo: false,
            numberButtonThreeState: true,
            numberButtonFourState: false,
            numberButtonFiveState: false,
            okButtonState: false,
            enableOk: true
        })
    }

    clickSeventyFivebtn(e: any) {
        this.onClickValueOfButton(75);
        this.setState({
            buttonStateTwo: false,
            buttonState: false,
            numberButtonThreeState: false,
            numberButtonFourState: true,
            numberButtonFiveState: false,
            okButtonState: false,
            enableOk: true
        })
    }

    clickHundredbtn(e: any) {
        this.onClickValueOfButton(100);
        this.setState({
            buttonStateTwo: false,
            buttonState: false,
            numberButtonThreeState: false,
            numberButtonFourState: false,
            numberButtonFiveState: true,
            okButtonState: false,
            enableOk: true
        })
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

    resetButton() {
        this.setState({

            buttonStateTwo: false,
            buttonState: false,
            numberButtonThreeState: false,
            numberButtonFourState: false,
            numberButtonFiveState: false,
            okButtonState: true,
            toggleButtonState: false,
            toggleButtonTwoState: false,
            enableOk: false
        })
    }


    render() {

        let {
            selectedautoplayCount,
            defaultState,
            enableOk,
            buttonState,
            buttonStateTwo,
            numberButtonThreeState,
            numberButtonFourState,
            numberButtonFiveState,
            okButtonState,
            toggleButtonState,
            cancelButtonState,
            toggleButtonTwoState
        } = this.state;

        let currentFrames: any = ["10_grey.png", "10_orange.png", "20_grey.png", "20_orange.png", "50 grey.png",
            "50 orange.png", "75_grey.png", "75_orange.png", "100_grey.png",
            "100_orange.png", "OK on off.png", "OK.png", "Off.png", "On.png", "Cancel off.png", "Cancel.png"]
        let TextureList: any = []
        for (let i = 0; i < currentFrames.length; i++) {

            TextureList.push(Texture.from(currentFrames[i]))
        }

        let okButtonImage, cancelButtonImage;

        if (okButtonState) {
            okButtonImage = currentFrames[10];
        } else {
            okButtonImage = currentFrames[11];
        }


        if (cancelButtonState) {
            cancelButtonImage = currentFrames[14];
        } else {
            cancelButtonImage = currentFrames[15];
        }

        if (this.props.autoplayStopped) {
            return (<>
                <Sprite anchor={0.5} image={currentFrames[11]} x={640} y={590} width={136} height={39}  name={"Sprite"}
                        interactive buttonMode
                        mousedown={() => {
                            this.props.stoppedAutoplayUI(false);
                            this.props.hideAutoplay();
                        }}
                />

            </>)
        }
        return (<>

                <Container>

                    <STARTBUTTONCODE buttonState={true} defaultstate={buttonState} scope={this}
                                     beforeClick={this.clickTenbtn}
                                     imgeOfButton={["10_grey.png", "10_orange.png"]} buttonX={450}
                                     buttonY={150} buttonWidth={67} buttonHeight={35}
                    ></STARTBUTTONCODE>

                    <STARTBUTTONCODE buttonState={true} defaultstate={buttonStateTwo} scope={this}
                                     beforeClick={this.clickTwentybtn}
                                     imgeOfButton={["20_grey.png", "20_orange.png"]} buttonX={550}
                                     buttonY={150} buttonWidth={67} buttonHeight={35}
                    ></STARTBUTTONCODE>


                    <STARTBUTTONCODE buttonState={true} defaultstate={numberButtonThreeState} scope={this}
                                     beforeClick={this.clickFiftybtn} imgeOfButton={["50 grey.png", "50 orange.png"]}
                                     buttonX={650} buttonY={150} buttonWidth={67} buttonHeight={35}
                    ></STARTBUTTONCODE>

                    <STARTBUTTONCODE buttonState={true} defaultstate={numberButtonFourState} scope={this}
                                     beforeClick={this.clickSeventyFivebtn}
                                     imgeOfButton={["75_grey.png", "75_orange.png"]} buttonX={750}
                                     buttonY={150} buttonWidth={67} buttonHeight={35}
                    ></STARTBUTTONCODE>

                    <STARTBUTTONCODE buttonState={true} defaultstate={numberButtonFiveState} scope={this}
                                     beforeClick={this.clickHundredbtn}
                                     imgeOfButton={["100_grey.png", "100_orange.png"]} buttonX={850}
                                     buttonY={150} buttonWidth={67} buttonHeight={35}
                    ></STARTBUTTONCODE>

                    <STARTBUTTONCODE buttonState={true} defaultstate={toggleButtonState} scope={this}
                                     beforeClick={this.clickFirstToogleButton}
                                     imgeOfButton={["On.png", "Off.png"]} buttonX={450}
                                     buttonY={253} buttonWidth={89} buttonHeight={39}
                    ></STARTBUTTONCODE>

                    <STARTBUTTONCODE buttonState={true} defaultstate={toggleButtonTwoState} scope={this}
                                     beforeClick={this.clickSecondToogleButton}
                                     imgeOfButton={["Off.png", "On.png"]} buttonX={450}
                                     buttonY={320} buttonWidth={89} buttonHeight={39}
                    ></STARTBUTTONCODE>

                    <Sprite anchor={0.5} image={cancelButtonImage} x={500} y={590} width={136} height={39}  name={"Sprite"}
                            interactive buttonMode mousedown={() => {
                        this.resetButton();
                        this.props.hideAutoplay();
                        this.props.setAllButtonEnable();
                    }}
                    />

                    <Sprite anchor={0.5} image={okButtonImage} x={730} y={590} width={136} height={39}  name={"Sprite"}
                            interactive={enableOk} buttonMode
                            mousedown={() => {
                                this.props.hideAutoplay();
                                this.props.setAutoplay(selectedautoplayCount);
                                this.props.setApplicationAutoplayCount(selectedautoplayCount);
                                this.props.startAutoplay();
                                this.props.getApplicationSpinResponse();
                                this.props.setAllButtonDisable();
                            }}
                    />

                </Container>
            </>

        )
    }
}


export default withPixiApp(connect(
    (state: Pick<IStore, 'reelsState' | 'buttonPanelState' | 'basegameState' | 'gridsState' | 'autoplayState'>, ownProps?: any) =>
        ({
            autoplayStopped: state.autoplayState.autoplayStopped,

        }),
    (dispatch: Dispatch): IDispatchToProps => ({

        setAllButtonEnable: (exceptBtnList: Array<string>): any => dispatch(buttonActions.setAllButtonEnable(exceptBtnList)),
        hideAutoplay: (): any => dispatch(autoplayActions.hideAutoplayUI()),
        setAutoplay: (autoplayCount: number): any => dispatch(autoplayActions.setAutoplayCount(autoplayCount)),
        startAutoplay: (): any => dispatch(baseGameActions.startAutoplay()),
        setApplicationAutoplayCount: (autoplaycount: number): any => dispatch(baseGameActions.setApplicationAutoplayCount(autoplaycount)),
        getApplicationSpinResponse: (): any => dispatch(asyncActions.getApplicationSpinResponse()),
        setAllButtonDisable: (exceptBtnList: Array<string>): any => dispatch(buttonActions.setAllButtonDisable(exceptBtnList)),
        stoppedAutoplayUI: (autoplayStopped: boolean): any => dispatch(autoplayActions.stoppedAutoplayUI(autoplayStopped)),

    })
)(AutoplayCanvasFunctionality));


