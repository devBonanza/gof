import React from 'react';
import MAINPAGE from "./components/mainpage";
import { Provider } from 'react-redux'
import { Stage } from '@inlet/react-pixi';
import { alllanguage } from "./data/lang/index"
import { lanAssetConfig } from "./data/lang/index"
import Wrapper from "./components/wrapper/wrapper";
import Layouts from "./components/layouts/layouts";
import Detectdevices from "./components/device/detectdevices";
import { isMobile } from "react-device-detect";
import HtmlElement from "./components/htmlElementPanel/htmlElement";
import ServerComm from "../serverComm/serverComm";
import KeyboardListener from "./components/keyboardListeners/keyboardListener";


interface IProps {
    [x: string]: any;
}

interface IState {
    [x: string]: any;
    width: number,
    height: number,
}

export default class App extends React.Component<IProps, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            width: this.props.width,
            height: this.props.height,
        }
    }

    componentDidMount() {
        window.addEventListener('resize', this.updateDimensions.bind(this));
    }

    updateDimensions() {
        if (isMobile) {
            if (window.innerHeight > window.innerWidth) {
                this.setState((prevState) => {
                    return {
                        ...prevState,
                        width: this.props.constant.configGame.portraitCanvasWidth,
                        height: this.props.constant.configGame.portraitCanvasHeight,
                    }
                });
            } else {
                this.setState((prevState) => {
                    return {
                        ...prevState,
                        width: this.props.constant.configGame.landscapeCanvasWidth,
                        height: this.props.constant.configGame.landscapeCanvasHeight,
                    }
                });
            }
        } else {
            this.setState((prevState) => {
                return {
                    ...prevState,
                    width: this.props.constant.configGame.canvasWidth,
                    height: this.props.constant.configGame.canvasHeight,
                }
            });
        }
    }

    getGameStart(langcode: string = "en") {
        const langObj: Record<any, any> = alllanguage[langcode as keyof typeof alllanguage];
        let { width, height } = this.state
        let PROPS_TO_SEND_MAINPAGE = {
            langcode: langcode,
            langObj: langObj,
            constant: this.props.constant,
            detectDevices: new Detectdevices(),
            lanAssetConfig: lanAssetConfig,
            width: width,
            height: height,
            configGame: this.props.configGame,
        }
        let PROPS_TO_SEND_HtmlElement = {
            langcode: langcode,
            langObj: langObj,
            constant: this.props.constant,
            detectDevices: new Detectdevices(),
            lanAssetConfig: lanAssetConfig,
            width: this.props.configGame.CANVAS_WIDTH,
            height: this.props.configGame.CANVAS_HEIGHT,
            configGame: this.props.configGame,
        }
        return (<div>
            <Stage width={width} height={height}>
                <Provider store={this.props.Gamestore}>
                    <MAINPAGE {...PROPS_TO_SEND_MAINPAGE} />
                </Provider>
            </Stage>
            <Provider store={this.props.Gamestore}>
                <HtmlElement {...PROPS_TO_SEND_HtmlElement}></HtmlElement>
                <Wrapper {...PROPS_TO_SEND_HtmlElement}></Wrapper>
                <ServerComm></ServerComm>
                <Layouts></Layouts>
                <KeyboardListener {...PROPS_TO_SEND_HtmlElement}></KeyboardListener>
            </Provider>
        </div >);
    }

    render() {
        return (this.getGameStart());
    }
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();

//https://www.youtube.com/watch?v=CVpUuw9XSjY

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
