import React, { Component } from "react";
import { connect } from 'react-redux'
import { Dispatch } from 'redux';
import withLoaderConfiguration from "../loader/configuration/withLoaderConfiguration";
import * as PIXI from 'pixi.js'
import { Graphics, Text, withPixiApp } from '@inlet/react-pixi'
import { Container, Sprite } from '@inlet/react-pixi'
import { IStore } from "../../store/IStore";
import { actions as applicationActions } from '../../reducers/applicationStateReducer'
import { actions as asyncActions } from '../../reducers/asyncInitAction'
import { alllanguage } from "../../data/lang/index"
import { Ilanguage } from "../../interface/Icommon"
import { isMobile } from "react-device-detect";
import { Tween } from "../effect/tween";
import { TIMER } from "../../utills";


interface IStateToProps {
    loading: boolean;
    result: object;
    isInitResponseReceived: boolean;
    resizeWidth: number;
    resizeHeight: number;
    scaleX: number;
    scaleY: number;
}

interface IDispatchToProps {
    getLoading: any;
    getApplicationInitResponse: Function;
    setLoadingPercent: Function;
}


interface IProps extends IStateToProps, IDispatchToProps {
    [x: string]: any;
    onloadingComplete: any,
    intropagevisible: any;
}

interface IState {
    isLoadComplete: boolean,
    showLoader: boolean,
    width: number,
    height: number,
    showPopUp: boolean,
}

class Loader extends Component<IProps, IState> {
    protected app: PIXI.Application;
    protected loaderConfig: any;
    protected manifest: any;
    protected soundsSprite: any;
    protected screen: any;
    protected loaderRectBase: any;
    protected loaderRect: any;
    protected loadingText: any;
    protected loaderContainer: any;
    protected eventEmitter: any;
    protected handleClick: any;
    protected loadedImageBG: string;
    protected loadedBarImage: string;
    protected loadedBarImageBG: string;
    private alllanguage: Ilanguage;
    private minFullHDWidth: number;
    private HDReadyWidth: number;
    private minFullHDPxRatio: number;
    private loadHD = false;
    private resolutionPath = "";
    private tweenTimer: number = 0.001;
    private _isMounted = false;


    constructor(props: IProps) {
        super(props);
        this.state = {
            showLoader: false,
            isLoadComplete: false,
            width: this.props.width,
            height: this.props.height,
            showPopUp: false,
        }
        this.alllanguage = alllanguage;
        this.app = props.app;
        this.loadedImageBG = '';
        this.loadedBarImage = '';
        this.loadedBarImageBG = '';
        this.loaderConfig = props.data.loader;
        this.manifest = this.loaderConfig.manifest;

        this.handleClick = this.hideLoader.bind(this);
        this.props.getLoading();

        this.minFullHDWidth = 1024;
        //screenResolutionWidthForHDReady
        this.HDReadyWidth = 1280;
        //minimumPixelRatioForFullHD
        this.minFullHDPxRatio = 2;
        this.init();
    }


    init() {

        this.loadHD = this.checkDeviceResolution();
        this.resolutionPath = this.loadHD ? "HD/" : "LD/"
        this.app.loader.baseUrl = this.loaderConfig.baseUrl;
        const { loader } = this.props.data;
        for (const key in loader.config) {

            this.app.loader.add(key, this.resolutionPath + loader.config[key])
        }
        this.app.loader.onProgress.once(this.showProgress, this);
        this.app.loader.onComplete.once(this.loadScreenAssetDone, this);
        this.app.loader.onError.once(this.reportError, this);
        this.app.loader.load();
    }
    checkDeviceResolution() {
        let screen = window.screen

        let isFullHD = false;
        // FullHD atlas will be loaded on devices whose base resolution is greater than 1024px width and its pixel ratio (density) is greater than 1 (https://mydevice.io/devices/)
        // In the case of computer screens which normally have a pixel ratio of 1, it will be checked if the base resolution is HDReady or FullHD to load the fullHD atlas
        if (((screen.width >= this.minFullHDWidth || screen.height >= this.minFullHDWidth) && window.devicePixelRatio >= this.minFullHDPxRatio) ||
            (screen.width >= this.HDReadyWidth || screen.height >= this.HDReadyWidth)) {
            isFullHD = true;
        }

        return isFullHD;
    }
    showProgress(e: any) {
    }

    reportError(e: any) {
        console.error("show error:", e.message);
    }

    loadScreenAssetDone(e: any) {
        this.loadedImageBG = this.app.loader.resources.loaderLandscapeBG.url;
        this.loadedBarImage = this.app.loader.resources.loaderloadingBar && this.app.loader.resources.loaderloadingBar.url;
        this.loadedBarImageBG = this.app.loader.resources.loaderloadingBarBG && this.app.loader.resources.loaderloadingBarBG.url;
        this.setState((prevState) => {
            return {
                ...prevState,
                showLoader: true,
            }
        })
        this.startManifestLoading();
    }

    startManifestLoading() {
        this.app.loader.baseUrl = "";

        for (const key in this.manifest) {
            let str: any = this.manifest[key];
            for (const subkey in this.manifest[key]) {
                let re: any = ""
                let replaceToBe = ""
                if (isMobile) {
                    if (this.manifest[key][subkey].indexOf("@mobile") > -1) {
                        re = /\@mobile/gi;
                        replaceToBe = "mobile";
                    }
                    if (this.manifest[key][subkey].indexOf("@desktop") > -1) {
                        continue;
                    }
                } else {
                    if (this.manifest[key][subkey].indexOf("@mobile") > -1) {
                        continue;
                    }
                    if (this.manifest[key][subkey].indexOf("@desktop") > -1) {
                        re = /\@desktop/gi;
                        replaceToBe = "desktop";
                    }
                }
                if (replaceToBe) {
                    this.app.loader.add(subkey, this.resolutionPath + this.manifest[key][subkey].replace(re, replaceToBe))
                } else {
                    this.app.loader.add(subkey, this.resolutionPath + this.manifest[key][subkey])
                }

            }
        }
        for (const key in this.props.lanAssetConfig) {
            let str: any = this.props.lanAssetConfig[key];
            let re = /\langCode/gi;
            this.app.loader.add(key, this.resolutionPath + str.replace(re, this.props.langcode))
        }
        this.loaderRect && (this.loaderRect.visible = false);
        this.app.loader.onProgress.add(this.showAssetProgress, this)
        this.app.loader.onComplete.once(this.gameAssetLoaded, this);
        this.app.loader.onError.once(this.reportError);
        this.app.loader.load();
    }

    showAssetProgress(e: any) {
        this.loadingText && (this.loadingText.text = (this.props.langObj[this.loaderConfig.loadingScreenType1.progressBar.displayTextOne.text] || this.loaderConfig.loadingScreenType1.progressBar.displayTextOne.text) + " " + Math.floor(e.progress) + "%");
        this.loaderRect && (this.loaderRect.visible = true);
        this.loaderRect && (this.loaderRect.width = this.props.constant.configGame.loaderBarWidth * Math.floor(e.progress) / 100);
        const thing = new PIXI.Graphics();
        thing.beginFill(0xDE3249);
        thing.drawRect(0, 0, this.props.constant.configGame.loaderBarWidth, this.props.constant.configGame.loaderBarHeight);
        thing.endFill();
        this.loaderRect.addChild(thing);
        thing.x = 0;
        thing.y = 0;
        thing.alpha = 0.0001
        this.loaderRect.mask = thing;
        this.props.setLoadingPercent(Math.floor(e.progress));
    }

    gameAssetLoaded() {
        this.setState((prevState) => {
            return {
                ...prevState,
                isLoadComplete: true,
            }
        })
        this.props.getApplicationInitResponse();
    }
    tweenTo(object: any, property: any, target: any, time: any, easing: any, onchange: any, oncomplete: any, start?: number) {

        new Tween(
            [object],
            {
                [property]: { start: object[property], end: target }
            },
            time || this.tweenTimer,
            easing,
            false, null, null, null, null, false, onchange, oncomplete
        );

    }
    hideLoader(nextProps:any) {
        if (!this.props.loading && this.loaderContainer.alpha >0 && this.loaderContainer) {
           this.loaderContainer && (this.loaderContainer.alpha = 0);
           this.loaderContainer && this.props.onloadingComplete();
         }
    }


    shouldComponentUpdate(nextProps: Readonly<IProps>, nextState: Readonly<IState>, nextContext: any): boolean {
        if (nextProps.isInitResponseReceived !== this.props.isInitResponseReceived) {           
            this.hideLoader(nextProps);
        }
        return true;
    }

    componentDidMount() {
        window.addEventListener('resize', this.updateDimensions.bind(this));
        let timer = TIMER.TimerManager.createTimer(2000);
        timer.on("repeat", () => {
            if (navigator.onLine && this.state.showPopUp) {
                this.setState((prevState) => {
                    return {
                        ...prevState,
                        showPopUp: false,
                    }
                })
            } else if (!navigator.onLine) {
                this.setState((prevState) => {
                    return {
                        ...prevState,
                        showPopUp: true,
                    }
                })
            }
        });
        timer.start(true, 0);


    }
    componentWillUnmount() {
        this._isMounted = false;
    }

    updateDimensions() {
        if (isMobile) {
            if (this._isMounted) {
                if (window.innerHeight > window.innerWidth) {
                    this.loadedImageBG = this.app.loader.resources.loaderPortraitBg.url;
                    this.setState((prevState) => {
                        return {
                            ...prevState,
                            width: this.props.height,
                            height: this.props.width,

                        }
                    });
                } else {
                    this.loadedImageBG = this.app.loader.resources.loaderLandscapeBG.url;
                    this.setState((prevState) => {
                        return {
                            ...prevState,
                            width: this.props.width,
                            height: this.props.height,

                        }
                    });
                }
            }
        }
    }

    render() {
        const {
            loading
        } = this.props;
        const {
            showLoader,
            isLoadComplete,
            showPopUp
        } = this.state;

        let width, height, showInPortrait;
        width = this.props.width;
        height = this.props.height;
        if (isMobile) {
            if (window.innerHeight > window.innerWidth) {
                this.loadedImageBG = this.app.loader.resources.loaderPortraitBg.url;
                width = this.props.configGame.CANVAS_HEIGHT;
                height = this.props.configGame.CANVAS_WIDTH;
                showInPortrait = true;
            } else {
                width = this.props.width;
                height = this.props.height;
                this.loadedImageBG = this.app.loader.resources.loaderLandscapeBG.url;
                showInPortrait = false;
            }
        }

        return (
            <Container
                ref={i => this.loaderContainer = i} name={'loaderContainer'}>
                {showLoader &&
                    <Sprite x={width / 2} y={height / 2} width={width} name={"Sprite"}
                        height={height}
                        image={this.loadedImageBG} anchor={[0.5, 0.5]}></Sprite>
                }
                {this.props.LOADERUI}

                {!showInPortrait && showLoader && this.loadedBarImageBG &&
                    <Sprite name={"Sprite"}
                        x={width / 2 + this.loaderConfig.loadingScreenType1.progressBar.offsetX + this.props.constant.configGame.loaderBarBGX}
                        y={height / 2 + this.loaderConfig.loadingScreenType1.progressBar.offsetY + this.props.constant.configGame.loaderBarBGY}
                        image={this.loadedBarImageBG}></Sprite>
                }
                {showInPortrait && showLoader && this.loadedBarImageBG &&
                    <Sprite name={"Sprite"}
                        x={width / 2 + this.loaderConfig.loadingScreenType1.progressBar.offsetX + this.props.constant.configGame.loaderBarBGPortraitX}
                        y={height / 2 + this.loaderConfig.loadingScreenType1.progressBar.offsetY + this.props.constant.configGame.loaderBarBGPortraitY}
                        image={this.loadedBarImageBG}></Sprite>
                }


                {!showInPortrait && showLoader && this.loadedBarImage &&
                    <Sprite ref={i => this.loaderRect = i} name={"Sprite"}
                        x={width / 2 + this.loaderConfig.loadingScreenType1.progressBar.offsetX + this.props.constant.configGame.loaderBarX}
                        y={height / 2 + this.loaderConfig.loadingScreenType1.progressBar.offsetY + this.props.constant.configGame.loaderBarY}
                        image={this.loadedBarImage}></Sprite>
                }

                {showInPortrait && showLoader && this.loadedBarImage &&
                    <Sprite ref={i => this.loaderRect = i} name={"Sprite"}
                        x={width / 2 + this.loaderConfig.loadingScreenType1.progressBar.offsetX + this.props.constant.configGame.loaderBarPortraitX}
                        y={height / 2 + this.loaderConfig.loadingScreenType1.progressBar.offsetY + this.props.constant.configGame.loaderBarPortraitY}
                        image={this.loadedBarImage}></Sprite>
                }

                {
                    showLoader && !this.loadedBarImage &&
                    <Graphics
                        x={width / 2 + this.loaderConfig.loadingScreenType1.progressBar.offsetX}
                        y={height / 2 + this.loaderConfig.loadingScreenType1.progressBar.offsetY}
                        draw={g => {
                            g.beginFill(this.loaderConfig.loadingScreenType1.progressBar.baseRect.color, 1)
                            g.drawRoundedRect(0, 0, this.loaderConfig.loadingScreenType1.progressBar.baseRect.width, this.loaderConfig.loadingScreenType1.progressBar.baseRect.height, this.loaderConfig.loadingScreenType1.progressBar.baseRect.radius)
                            g.endFill()

                        }}
                    />
                }
                {
                    showLoader && !this.loadedBarImage &&
                    <Graphics ref={i => this.loaderRect = i}
                        x={width / 2 + this.loaderConfig.loadingScreenType1.progressBar.offsetX}
                        y={height / 2 + this.loaderConfig.loadingScreenType1.progressBar.offsetY}
                        pivot={1}
                        draw={g => {
                            g.beginFill(this.loaderConfig.loadingScreenType1.progressBar.rect.color, 1)
                            g.drawRoundedRect(0, 0, this.loaderConfig.loadingScreenType1.progressBar.baseRect.width, this.loaderConfig.loadingScreenType1.progressBar.baseRect.height, this.loaderConfig.loadingScreenType1.progressBar.baseRect.radius)
                            g.endFill()
                        }}
                    />
                }
                {
                    showLoader && this.props.constant.configGame.showLoaderText &&
                    <Text ref={i => this.loadingText = i}
                        anchor={[0.5, 0.5]} width={100} height={25}
                        style={this.loaderConfig.loadingScreenType1.progressBar.text.style}
                        x={this.props.width / 2 + this.loaderConfig.loadingScreenType1.progressBar.offsetX + this.loaderConfig.loadingScreenType1.progressBar.text.offsetX}
                        y={this.props.height / 2 + this.loaderConfig.loadingScreenType1.progressBar.offsetY + this.loaderConfig.loadingScreenType1.progressBar.text.offsetY}
                        text={isLoadComplete && (this.props.langObj[this.loaderConfig.loadingScreenType1.progressBar.displayTextTwo.text] || this.loaderConfig.loadingScreenType1.progressBar.displayTextTwo.text) || ""} />
                }




                {
                    showLoader && showPopUp &&
                    <Graphics
                        x={-4}
                        y={695}
                        pivot={1}
                        anchor={[0.5, 0.5]}
                        draw={g => {
                             g.beginFill(0x000000, 0.5)
                            g.drawRoundedRect(0, 0, this.loaderConfig.loadingScreenType1.progressBar.baseRect.width + 1400, this.loaderConfig.loadingScreenType1.progressBar.baseRect.height + 100, this.loaderConfig.loadingScreenType1.progressBar.baseRect.radius)
                            g.endFill()
                        }}
                    />
                }
                {
                    showLoader && showPopUp &&
                    <Text
                        anchor={[0.5, 0.5]} width={1013} height={41}
                        style={this.loaderConfig.loadingScreenType1.progressBar.text.style}
                        x={925}
                        y={745}
                        text={(this.props.langObj["noInternetPopUpText2"])} />
                }
            </Container>
        );
    }
}

export default withPixiApp(connect(
    (state: Pick<IStore, 'applicationState' | 'basegameState' | 'asyncInitAction'>): IStateToProps =>
    ({
        loading: state.applicationState.isLoading,
        resizeWidth: state.applicationState.resizeWidth,
        resizeHeight: state.applicationState.resizeHeight,
        scaleX: state.applicationState.scaleX,
        scaleY: state.applicationState.scaleY,
        result: state.asyncInitAction.result,
        isInitResponseReceived: state.asyncInitAction.isInitResponseReceived,
    }),
    (dispatch: Dispatch): IDispatchToProps => ({
        getLoading: (): any => dispatch(applicationActions.getApplicationLoading()),
        getApplicationInitResponse: (): any => dispatch(asyncActions.getApplicationInitResponse()),
        setLoadingPercent: (loadingPercent: number): any => dispatch(asyncActions.setLoadingPercent(loadingPercent)),
    }))(withLoaderConfiguration(Loader)));