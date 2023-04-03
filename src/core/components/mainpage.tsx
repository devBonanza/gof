import React, { Ref } from "react";
import * as PIXI from 'pixi.js'
import Loader from "./loader/loader";
import ButtonPanel from "./buttonpanel/buttonpanel"
import Basegame from "./basegame/basegame"
import Freegame from "./freegame/freegame"
import Bonus from "./bonus/bonus"
import Commongame from "./commongame/commongame"
import { _ReactPixi, withPixiApp } from "@inlet/react-pixi";
import { actions as applicationActions } from '../reducers/applicationStateReducer'
import { connect } from "react-redux";
import { IStore } from "../store/IStore";
import { Dispatch } from "redux";
import Banner from "./banner/banner";
import Sounds from "./sounds/sounds";
import GAMESounds from "./../../components/sounds/sounds";
import PlayerMessage from "./playerMessage/playerMessage"
import UIManager from "./ui/UiBuilder";
import MenuInCanvas from "../../core/components/menu/menuInCanvas"
import AutoplayInCanvas from "../../core/components/autoplay/autoplayInCanvas"
import { isTablet, isMobile, isIOS, isAndroid } from "react-device-detect";
import Overlay from "../components/overlay/overlay"
import SymbolTray from "../../core/components/symbol/symbolTray";
import FlowManager from "../../core/components/flowManager/flowManager";
import { alllanguage, lanAssetConfig } from "../../data/lang";
import IntroductionScreen from "../../core/components/introductionScreen/introductionScreen";
import Paytable from "../../core/components/paytable/paytable";
import Detectdevices from "../../core/components/device/detectdevices";
import CheatPanel from "../../cheatPanel/cheatPanel";
import { TIMER } from "../../core/utills";
import { toggleFullScreen } from "./fullscreen/fullScreen";


interface IProps {
    app: PIXI.Application
    [x: string]: any;
}

interface IStateToProps {
    [x: string]: any;
}

interface IDispatchToProps {
    [x: string]: any;
}

interface IState {
    isGameLoaded: boolean,
    GameType: string,
    width: number | string,
    height: number | string,
    pixelRatio: number,
    resizing: boolean,
    lang: string
}


class MAINPAGE extends React.Component<IProps, IState> {
    protected app: PIXI.Application;
    protected mainPageContainer: _ReactPixi.IContainer | Ref<any>;
    constructor(props: any) {
        super(props);
        this.app = props.app;
        this.state = {
            width: this.props.width,
            height: this.props.height,
            pixelRatio: window.devicePixelRatio,
            isGameLoaded: false,
            resizing: false,
            GameType: "BASE",
            lang: this.props.langcode
        }
        // this.mainPageContainer = React.createRef();
        this.mainPageContainer = {};
        (window as any).__PIXI_APP__ = this.app;
    }

    bindEvent() {
    }

    onLoadComplete = () => {
        this.props.setApplicationLoading(true);
        let timer = TIMER.TimerManager.createTimer(1500);
        timer.on('end', (e: any) => {
            e.remove();
            this.props.setApplicationLoading(false);
            this.handleTouchFullScreen();
        });
        timer.start();
        this.setState((prevState) => {
            return {
                ...prevState,
                isGameLoaded: true,
            }
        });
    }
    handleTouchFullScreen() {
        let element: any = document.getElementById('mainDiv');
        let touchStart: any, touchEnd: any;
        if (element) {
            if ((isTablet && isAndroid) || (isMobile && isAndroid)) {
                element.addEventListener('touchstart', (e: any) => {
                    touchStart = e.touches[0].clientY;
                });
                element.addEventListener('touchmove', (e: any) => {
                    if (!this.props.showHelpText) {
                        e.preventDefault();
                        e.stopImmediatePropagation();
                    }
                });
                element.addEventListener('touchend', (e: any) => {
                    touchEnd = e.changedTouches[0].clientY;
                    if ((touchStart - touchEnd >= 100) || (touchStart - touchEnd <= -100)) {
                        if ((!this.props.showAutoplay) && (!this.props.showPaytable)) {
                            toggleFullScreen();
                        }
                    }
                });
            }
        }
    }

    iPhoneFullScreen() {
        let element2: any = document.getElementById('gameCanvas');
        let chromeAgent = window.navigator.userAgent.indexOf("CriOS") > -1;
        let sbHeight = window.innerHeight * (window.innerHeight / document.body.offsetHeight);
        if (!isTablet && (isMobile && isIOS) && (window.innerHeight < window.innerWidth)) {
            if (!chromeAgent) {
                if (sbHeight > 350) {
                    element2.classList.add('override');
                }
                else if (sbHeight < 350) {
                    element2.classList.remove('override');
                }
            }
        } else {
            element2.classList.remove('override');
        }
    }

    updateDimensions = (arg: any) => {
        this.iPhoneFullScreen();
        if (arg === "Resized") {
            this.setState((prevState) => {
                return {
                    ...prevState,
                    width: window.outerWidth,
                    height: window.outerHeight,
                    pixelRatio: window.devicePixelRatio || 1
                }
            })
            this.calculateCanvas();
        }
    };

    componentDidMount() {
        this.updateDimensions("Resized");
        window.addEventListener("resize", () => {
            this.updateDimensions("Resized");
        });

    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateDimensions);
    }

    iniFrame() {
        if (window.location !== window.parent.location) {
            return true
        } else {
            return false
        }
    }

    handleResizeChangeInIframe() {
        let
            width = 0,
            height = 0,
            scaleX = 0,
            scaleY = 0,
            scaleFactor = 0,
            viewWidth,
            viewHeight;
        let viewportWidth, viewportHeight: any, dpr: any;

        if (this.props.detectDevices.isAndroidMobile() || this.props.detectDevices.isTablet()) {
            if (window.devicePixelRatio > 2) {
                dpr = 1;// Math.min(window.devicePixelRatio, 2);
            } else {
                dpr = window.devicePixelRatio;
            }

        } else {
            dpr = window.devicePixelRatio;
        }

        // pixel ratios greater that 2 on some android devices mess up
        if (isMobile) {
            if (window.outerHeight > window.outerWidth) {
                this.props.setApplicationLayoutMode("Portrait");
                viewportWidth = this.props.constant.configGame.portraitCanvasWidth * dpr;
                viewportHeight = this.props.constant.configGame.portraitCanvasHeight * dpr;
            } else {
                this.props.setApplicationLayoutMode("Landscape");
                viewportWidth = this.props.constant.configGame.landscapeCanvasWidth * dpr;
                viewportHeight = this.props.constant.configGame.landscapeCanvasHeight * dpr;
            }
        } else {
            this.props.setApplicationLayoutMode("Landscape");
            viewportWidth = this.props.constant.configGame.canvasWidth;
            viewportHeight = this.props.constant.configGame.canvasHeight;
        }

        //isMobile
        if (this.props.detectDevices.isHandheld() === true && this.props.detectDevices.isSafariBrowser() === false) {
            if (this.props.detectDevices.isIOS9Mobile() === true) {
                viewWidth = window.outerWidth;
                viewHeight = window.outerHeight;
            } else {
                viewWidth = Math.min(document.documentElement.clientWidth, window.outerWidth || 0);
                viewHeight = Math.min(document.documentElement.clientHeight, window.outerHeight || 0);
            }
        } else {
            if (isMobile) {
                viewWidth = Math.min(document.documentElement.clientWidth, window.outerWidth || 0);
                viewHeight = Math.min(document.documentElement.clientHeight, window.outerHeight || 0);
            } else {
                viewWidth = window.innerWidth;
                viewHeight = window.innerHeight;
            }
        }

        scaleFactor = viewHeight / viewportHeight;
        if (Math.round(scaleFactor * viewportWidth) > viewWidth) {
            width = viewWidth;
            scaleX = viewWidth / viewportWidth;

            height = Math.ceil(scaleX * viewportHeight);
            scaleY = scaleX;
        } else {
            height = viewHeight;
            scaleY = viewHeight / viewportHeight;

            width = Math.ceil(scaleY * viewportWidth);
            scaleX = scaleY;
        }


        if (isMobile) {
            let Can_Width, Can_Height;
            if (window.innerHeight > window.innerWidth) {
                this.props.setApplicationLayoutMode("Portrait");
                Can_Width = this.props.constant.configGame.portraitCanvasWidth;
                Can_Height = this.props.constant.configGame.portraitCanvasHeight;
            } else {
                this.props.setApplicationLayoutMode("Landscape");
                Can_Width = this.props.constant.configGame.landscapeCanvasWidth;
                Can_Height = this.props.constant.configGame.landscapeCanvasHeight;
            }
            UIManager.getRef("mainPageOuterContainer").scale.x = (width * dpr) / Can_Width
            UIManager.getRef("mainPageOuterContainer").scale.y = (height * dpr) / Can_Height
            this.props.app.renderer.resize(viewportWidth / dpr * (width * dpr) / Can_Width, viewportHeight / dpr * (height * dpr) / Can_Height);
        }
        this.props.app.view.style.width = width + "px";
        this.props.app.view.style.height = height + "px";

        this.props.setApplicationResizeState(viewportWidth, viewportHeight, scaleX, scaleY);
        if (this.props.constant.configGame.centered === true) {
            this.props.app.view.style.position = "fixed";
            if (viewHeight > height) {
                this.props.app.view.style.top = (viewHeight / 2 - height / 2) + "px";
            } else {
                this.props.app.view.style.top = 0 + "px";
            }
            if (viewWidth > width) {
                this.props.app.view.style.left = (viewWidth / 2 - width / 2) + "px";
            } else {
                this.props.app.view.style.left = 0 + "px";
            }
        }
    }

    handleResizeChange() {
        let
            width = 0,
            height = 0,
            scaleX = 0,
            scaleY = 0,
            scaleFactor = 0,
            viewWidth,
            viewHeight;
        let viewportWidth, viewportHeight: any, dpr;
        if (this.props.detectDevices.isAndroidMobile() || this.props.detectDevices.isTablet()) {
            if (window.devicePixelRatio > 2) {
                dpr = 1;// Math.min(window.devicePixelRatio, 2);
            } else {
                dpr = window.devicePixelRatio;
            }
        } else {
            dpr = window.devicePixelRatio;
        }
        if (isMobile) {
            if (window.innerHeight > window.innerWidth) {
                this.props.setApplicationLayoutMode("Portrait");
                viewportWidth = this.props.constant.configGame.portraitCanvasWidth * dpr;
                viewportHeight = this.props.constant.configGame.portraitCanvasHeight * dpr;
            } else {
                this.props.setApplicationLayoutMode("Landscape");
                viewportWidth = this.props.constant.configGame.landscapeCanvasWidth * dpr;
                viewportHeight = this.props.constant.configGame.landscapeCanvasHeight * dpr;
            }
        } else {
            this.props.setApplicationLayoutMode("Landscape");
            viewportWidth = this.props.constant.configGame.canvasWidth;
            viewportHeight = this.props.constant.configGame.canvasHeight;
        }

        //isMobile
        if (this.props.detectDevices.isHandheld() === true && this.props.detectDevices.isSafariBrowser() === false) {
            if (this.props.detectDevices.isIOS9Mobile() === true) {
                viewWidth = window.innerWidth;
                viewHeight = window.innerHeight;
            } else {
                viewWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
                viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
            }
        } else {
            if (isMobile) {
                viewWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
                viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
            } else {
                viewWidth = window.innerWidth;
                viewHeight = window.innerHeight;
            }
        }
        scaleFactor = viewHeight / viewportHeight;
        if (Math.round(scaleFactor * viewportWidth) > viewWidth) {
            width = viewWidth;
            scaleX = viewWidth / viewportWidth;
            height = Math.ceil(scaleX * viewportHeight);
            scaleY = scaleX;
        } else {
            height = viewHeight;
            scaleY = viewHeight / viewportHeight;
            width = Math.ceil(scaleY * viewportWidth);
            scaleX = scaleY;
        }

        if (isMobile) {
            let Can_Width, Can_Height;
            if (window.innerHeight > window.innerWidth) {
                this.props.setApplicationLayoutMode("Portrait");
                Can_Width = this.props.constant.configGame.portraitCanvasWidth;
                Can_Height = this.props.constant.configGame.portraitCanvasHeight;
            } else {
                this.props.setApplicationLayoutMode("Landscape");
                Can_Width = this.props.constant.configGame.landscapeCanvasWidth;
                Can_Height = this.props.constant.configGame.landscapeCanvasHeight;
            }
            UIManager.getRef("mainPageOuterContainer").scale.x = (width * dpr) / Can_Width;
            UIManager.getRef("mainPageOuterContainer").scale.y = (height * dpr) / Can_Height;
            this.props.app.renderer.resize((((viewportWidth / dpr) * (width * dpr)) / Can_Width), (((viewportHeight / dpr) * (height * dpr)) / Can_Height));
        }

        this.props.app.view.style.width = width + "px";
        this.props.app.view.style.height = height + "px";
        this.props.setApplicationResizeState(viewportWidth, viewportHeight, scaleX, scaleY);
        if (this.props.constant.configGame.centered === true) {
            this.props.app.view.style.position = "fixed";
            if (viewHeight > height) {
                this.props.app.view.style.top = ((viewHeight / 2) - (height / 2)) + "px";
            } else {
                this.props.app.view.style.top = 0 + "px";
            }
            if (viewWidth > width) {
                this.props.app.view.style.left = ((viewWidth / 2) - (width / 2)) + "px";
            } else {
                this.props.app.view.style.left = 0 + "px";
            }
        }
    }

    calculateCanvas() {
        if (this.iniFrame()) {
            this.handleResizeChange();
        } else {
            let timerVal;
            if (isTablet) {
                timerVal = 350;
            }
            else {
                timerVal = 150;
            }
            let timer = TIMER.TimerManager.createTimer(timerVal);
            timer.on('end', (e: any) => {
                e.remove();
                this.handleResizeChangeInIframe();
            });
            timer.start();
        }
    }

    render() {
        //https://webglfundamentals.org/webgl/lessons/webgl-resizing-the-canvas.html
        const { width, height, isGameLoaded } = this.state;
        let langCode = (this.props.languageCode).toLowerCase();
        const langObj: Record<any, any> =
            alllanguage[langCode as keyof typeof alllanguage];
        if (typeof langObj === 'undefined') {
            this.props.setApplicationLanguageCode("en");
            const langObj: Record<any, any> =
                alllanguage["en" as keyof typeof alllanguage];
        }

        let PROPS_TO_SEND_INTROSCREEN = {
            langCode: langCode,
            langObj: langObj,
            constant: this.props.constant,
            detectDevices: new Detectdevices(),
            lanAssetConfig: lanAssetConfig,
            width: width,
            height: height,
            configGame: this.props.configGame,
            LOADERUI: this.props.LOADERUI,
        };
        let PROPS_TO_SEND_AutoplayInCanvas = {
            app: this.app,
            langObj: langObj,
            configGame: this.props.configGame,
            InCanvas: this.props.configGame.AUTOPLAY_UI_IN_CANVAS
        }
        let PROPS_TO_SEND_intro = {
            app: this.app,
            langObj: langObj,
            configGame: this.props.configGame,
            bannerType: "Intro"
        }
        let PROPS_TO_SEND_outro = {
            app: this.app,
            langObj: langObj,
            configGame: this.props.configGame,
            bannerType: "Outro"
        }
        let PROPS_TO_SEND_Commongame = {
            app: this.app,
            langObj: langObj,
            configGame: this.props.configGame,
        }
        let PROPS_TO_SEND_Menu = {
            width: this.props.width,
            height: this.props.height,
            langcode: langCode,
            app: this.app,
            lanAssetConfig: lanAssetConfig,
            langObj: langObj,
            constant: this.props.constant,
            onloadingComplete: this.onLoadComplete,
            configGame: this.props.configGame,
            LOADERUI: this.props.LOADERUI,
        }
        return (
            <UIManager type={"Container"} name={"mainPageOuterContainer"} id={"mainPageOuterContainer"} app={this.app}
                configGame={this.props.configGame}>
                <UIManager type={"Container"} id={"backgroundContainer"} app={this.app} name={"backgroundContainer"}
                    configGame={this.props.configGame}>
                </UIManager>
                <UIManager id={"mainPageContainer"} name={"mainPageContainer"} type={"Container"}
                    configGame={this.props.configGame}
                    ref={i => this.mainPageContainer = i} app={this.app}>
                    {!isGameLoaded && <Loader  {...PROPS_TO_SEND_Menu} />}
                    {isGameLoaded && this.props.startRendering && <Commongame {...PROPS_TO_SEND_Commongame} />}
                    {isGameLoaded && this.props.basegamestate && this.props.startRendering && <Basegame {...PROPS_TO_SEND_Commongame} />}
                    {isGameLoaded && this.props.startRendering && !this.props.basegamestate && this.props.featureType === "FREEGAME" && <Freegame {...PROPS_TO_SEND_Commongame} />}
                    {isGameLoaded && this.props.startRendering && !this.props.basegamestate && this.props.featureType === "BONUS" && <Bonus {...PROPS_TO_SEND_Commongame} />}
                    {isGameLoaded && this.props.startRendering && !this.props.showPaytable && <ButtonPanel {...PROPS_TO_SEND_Commongame} />}
                    {isGameLoaded && this.props.startRendering && !this.props.showPaytable && <PlayerMessage {...PROPS_TO_SEND_Commongame} />}
                    {isGameLoaded && this.props.startRendering && !this.props.showPaytable && <AutoplayInCanvas {...PROPS_TO_SEND_AutoplayInCanvas} />}
                    {isGameLoaded && this.props.startRendering && !this.props.showPaytable && <MenuInCanvas {...PROPS_TO_SEND_AutoplayInCanvas} />}
                    {isGameLoaded && this.props.startRendering && <FlowManager {...PROPS_TO_SEND_Commongame} />}
                    {isGameLoaded && this.props.startRendering && !this.props.showPaytable && <Overlay {...PROPS_TO_SEND_Commongame} />}
                    {isGameLoaded && this.props.startRendering && this.props.featureJustFinished && <Banner {...PROPS_TO_SEND_outro}></Banner>}
                    {isGameLoaded && this.props.startRendering && this.props.featureJustTriggered && <Banner {...PROPS_TO_SEND_intro}></Banner>}
                    {isGameLoaded && this.props.startRendering && <GAMESounds {...PROPS_TO_SEND_Commongame}></GAMESounds>}
                    {<Sounds {...PROPS_TO_SEND_Commongame}></Sounds>}
                    {isGameLoaded && this.props.startRendering && <IntroductionScreen {...PROPS_TO_SEND_INTROSCREEN} ></IntroductionScreen>}
                    {isGameLoaded && this.props.startRendering && <Paytable {...PROPS_TO_SEND_INTROSCREEN}></Paytable>}
                    {isGameLoaded && this.props.startRendering && <SymbolTray {...PROPS_TO_SEND_Commongame}></SymbolTray>}
                    {isGameLoaded && this.props.startRendering && this.props.cheatingEnabled && <CheatPanel {...PROPS_TO_SEND_Commongame}></CheatPanel>}
                </UIManager>
            </UIManager>)
    }
}

export default withPixiApp(connect(
    (state: Pick<IStore, 'asyncInitAction' | 'applicationState' | 'basegameState' | 'freegameState' | 'menuState' | 'autoplayState' | 'paytableState'>): IStateToProps =>
    ({
        showPaytable: state.paytableState.showPaytable,
        layoutMode: state.applicationState.layoutMode,
        featureJustFinished: state.freegameState.featureJustFinished,
        featureJustTriggered: state.basegameState.featureJustTriggered,
        basegamestate: state.basegameState.basegamestate,
        featureType: state.basegameState.featureType,
        startRendering: state.asyncInitAction.startRendering,
        cheatingEnabled: state.applicationState.cheatingEnabled,
        languageCode: state.applicationState.languageCode,
        showAutoplay: state.autoplayState.showAutoplay,
        showMenu: state.menuState.showMenu,
        showHelpText: state.applicationState.showHelpText,
    }),
    (dispatch: Dispatch): IDispatchToProps => ({
        setApplicationLayoutMode: (layout: string): any => dispatch(applicationActions.setApplicationLayoutMode(layout)),
        setApplicationLoading: (isLoading: boolean): any => dispatch(applicationActions.setApplicationLoading(isLoading)),
        setApplicationLanguageCode: (languageCode: string): any => dispatch(applicationActions.setApplicationLanguageCode(languageCode)),
        setApplicationResizeState: (resizewidth: number, resizeheight: number, scalex: number, scaley: number): any => dispatch(applicationActions.setApplicationResizeState(resizewidth, resizeheight, scalex, scaley)),

    }))(MAINPAGE));