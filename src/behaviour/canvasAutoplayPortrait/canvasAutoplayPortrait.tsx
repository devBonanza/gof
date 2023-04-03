import React, { Component, Ref } from "react";
import { _ReactPixi, withPixiApp } from "@inlet/react-pixi";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import withCanvasAutoplayConfiguration from "./configuration/withCanvasAutoplayPortraitConfiguration";
import UIManager from "../../core/components/ui/UiBuilder";
import { isAndroid, isIOS, isMobile, isTablet } from "react-device-detect";
import { Texture } from "pixi.js";
import { actions as buttonActions } from "../../core/reducers/buttonPanelReducer";
import { actions as autoplayActions } from "../../core/reducers/autoplayReducer";
import { actions as behaviourAction } from "../../gamereducer/behaviourReducer";
import { actions as baseGameActions } from "../../core/reducers/baseGameReducer";
import { actions as asyncActions } from "../../core/reducers/asyncServerResponseReducer";
import { actions as winpresentationAction } from "../../core/reducers/winPresentationReducer";
import { configGame } from "../../data/config";
import { actions as gridsActions } from "../../core/reducers/gridStateReducer";
import { actions as reelgridActions } from "../../core/reducers/reelgridStateReducer";
import { actions as reelsActions } from "../../core/reducers/reelsStateReducer";
import { actions as layoutssActions } from "../../core/reducers/layoutsStateReducer";
import { actions as aplicationActions } from "../../core/reducers/applicationStateReducer";
import { actions as paytableGofActions } from "./../../gamereducer/paytableBMReducer";
import { actions as paytableActions } from "../../core/reducers/paytableReducer";
import { TIMER } from "../../core/utills";
import { CURRENCY } from "../../core/utills";


interface IStore {
    [x: string]: any;
}

interface IProps {
    [x: string]: any;
}

interface IStateToProps {

}

interface IDispatchToProps {

}

interface IState {
    [x: string]: any;
}

class CanvasAutoplayPortrait extends Component<IProps, IState> {
    protected app: PIXI.Application;
    protected canvasAutoplayPortraitContainer: _ReactPixi.IContainer | Ref<any>;
    protected ui_mode: string;
    protected displayUI: any;
    protected data: any;
    protected dragging: any;
    protected x: any;
    protected y: any;
    protected parent: any;
    protected autoplayMainContainer: any;
    protected button1: number = this.props.autoPlaySpinSteps[0];
    protected button2: number = this.props.autoPlaySpinSteps[1];
    protected button3: number = this.props.autoPlaySpinSteps[2];
    protected button4: number = this.props.autoPlaySpinSteps[3];
    protected button5: number = this.props.autoPlaySpinSteps[4];
    protected button6: number = this.props.autoPlaySpinSteps[5];
    protected button7: number = this.props.autoPlaySpinSteps[6];
    protected button8: number = this.props.autoPlaySpinSteps[7];
    protected button9: number = this.props.autoPlaySpinSteps[8];
    protected scrollerCounter: number = 0;
    protected storeLastClickedButtonValue: number = 0;
    protected sliderBarGraphicColor: any = 0xDE3249;
    protected sliderBarGraphicAlpha: any = 0.001;
    public initialXOfSliderDot: number = 95;
    public extraWidthValue: number = 9;
    protected valueMultiplierForFirstSlide: number = 500;
    protected valueMultiplierForSecondSlide: number = 5000;
    protected sliderLineHeight: number = 20;
    protected sliderLineY: number = 4;
    protected a: number = 0;
    public sliderDotName: any;
    public sliderLineName: any;
    public selectedInputName: any;
    public maxValue: any;
    public storingContainerArr: any = [];
    public lastHighlightedButton: any;
    public countButtonCLicked: boolean = false;
    public totalAutoPlayButtons: number = 9;
    // public setFirstDigit: number = this.props.currencyCode ? 1 : 100;
    // public setSecondDigit: number = this.props.currencyCode ? 1 : 100;
    // public setThirdDigit: number = this.props.currencyCode ? 1 : 100;
    public totalLengthOfBar: number = 743;
    private scrollbox: any
    protected storeValue: number = 0;
    protected storeValue1: number = 0;
    protected storeValue2: number = 0;
    protected storeFinalX: number = 827;
    private clickEventStart: boolean = false;
    private arbitraryArray = [0, 1, 2, 5, 10, 25, 50, 75, 100, 200, 300, 400, 500, 600, 700, 800];
    private currentIndex_1: number = 0;
    private currentIndex_2: number = 0;
    private currentIndex_3: number = 0;


    constructor(props: IProps) {
        super(props);
        this.app = props.app;
        this.state = {
            buttonPanelEnable: true,
            allContainerList: [],
            autoplayModeOn: false,
            showOverLay: false,
            isSpinning: false,
            pause: false,
            play: true,
            basegameIdleMode: true,
            basegamePlayMode: false,
            uiElements: [],
            lang: "en",
            toggleOn: false,
            slideAlpha: 0
        }
        this.canvasAutoplayPortraitContainer = {};
        if (isMobile) {
            this.ui_mode = "mobile";
        } else {
            this.ui_mode = "desktop";
        }
        this.displayUI = this.props.data.COMPONENTS.filter(this.checkUiMode.bind(this));

    }

    checkUiMode(uimodeobj: any) {
        if (uimodeobj.uimode === undefined) {
            uimodeobj.uimode = "both";
        }
        if (uimodeobj.uimode === "both" || uimodeobj.uimode === this.ui_mode) {
            return uimodeobj;
        }
    }

    layoutChange(currentLayout: string) {
        this.displayUI.map((data: any) => {
            if (data.layout === true) {
                this.props.setApplicationLayoutObject(data.name)
            }
        });
        if (isMobile && window.innerWidth > window.innerHeight) {
            this.addScrollBar();
            this.scrollerCounter = 0;
        }
        if (isMobile && window.innerWidth < window.innerHeight) {
            if (this.scrollerCounter == 0 && this.storingContainerArr.length) {
                this.scrollerCounter++;
                this.storingContainerArr.length && this.storingContainerArr[0].parent.removeChild(this.storingContainerArr[0])
                UIManager.getRef("canvasAutoplayPortraitContainer").visible = true;
                this.storingContainerArr.length && UIManager.getRef("canvasAutoplayPortraitContainer").addChild(this.storingContainerArr[0]);

            }
        }
        this.orientationChange();
    }
    orientationChange() {
        if (window.innerWidth > window.innerHeight) {
            UIManager.getRef("autoplayContent") && (UIManager.getRef("autoplayContent").scale.x = 1.4);
            UIManager.getRef("autoplayContent") && (UIManager.getRef("autoplayContent").scale.y = 1.4);
            UIManager.getRef("autoplayContent") && (UIManager.getRef("autoplayContent").y = -310);
            UIManager.getRef("autoplayContent") && (UIManager.getRef("autoplayContent").x = 200);
        } else {
            UIManager.getRef("autoplayContent") && (UIManager.getRef("autoplayContent").scale.x = 1);
            UIManager.getRef("autoplayContent") && (UIManager.getRef("autoplayContent").scale.y = 1);
            UIManager.getRef("autoplayContent") && (UIManager.getRef("autoplayContent").y = -11);
            UIManager.getRef("autoplayContent") && (UIManager.getRef("autoplayContent").x = -13);
        }
    }

    addScrollBar() {
        if (UIManager.getRef("autoplayContent") && UIManager.getRef("gameScrollComponentMobAutoPlay_landscape")) {
            let canvasAutoplayPortraitContainer: any = UIManager.getRef("autoplayContent");
            let gameScrollComponent: any = UIManager.getRef("gameScrollComponentMobAutoPlay_landscape");
            const Scrollbox = require('pixi-scrollbox').Scrollbox;
            this.scrollbox = new Scrollbox({ boxWidth: 1920, boxHeight: 650 })

            this.scrollbox.x = 0;
            this.scrollbox.y = 200;
            gameScrollComponent && gameScrollComponent.addChild(this.scrollbox);

            // add a sprite to the scrollbox's content
            const sprite = this.scrollbox.content.addChild(new PIXI.Sprite(PIXI.Texture.WHITE))
            sprite.width = 1920;
            sprite.height = 1600;
            isMobile && (sprite.alpha = 0.01);
            sprite.tint = 0x131313;

            this.scrollbox.dragScroll = true;
            this.scrollbox.overflowX = "none";
            // force an update of the scrollbox's calculations after updating the 
            this.storingContainerArr[0] = canvasAutoplayPortraitContainer;
            this.scrollbox.content.addChild(this.storingContainerArr[0]);
            // add the viewport to the stage
            this.scrollbox.update();
        }
    }

    bindUI() {
        this.layoutChange(this.props.layoutMode);
    }

    selectMaxValue(dotName: any) {
        if (dotName === "portrait_sliderDot") {
            let manWinValue = (this.props.maxWinMultiplier * this.props.autoPlaySingleWinLimitPercentage) / 100;
            this.maxValue = this.props.maxWinMultiplier ? (this.props.betList[this.props.currentBetIndex]) / 100 * manWinValue : (this.props.betList[this.props.currentBetIndex]) / 100 * this.valueMultiplierForFirstSlide;
        } else if (dotName === "portrait_sliderDot_2") {
            let manWinValue = (this.props.maxWinMultiplier * this.props.autoPlayWinLimitPercentage) / 100;
            this.maxValue = this.props.maxWinMultiplier ? (this.props.betList[this.props.currentBetIndex]) / 100 * manWinValue : (this.props.betList[this.props.currentBetIndex]) / 100 * this.valueMultiplierForSecondSlide;
        } else if (dotName === "portrait_sliderDot_3") {
            let storeValue1, storeValue2;
            storeValue1 = this.props.autoPlayLossLimitPercentage ? ((this.props.transitionBalance * this.props.autoPlayLossLimitPercentage) / 100) / 100 : this.props.transitionBalance / 100;
            storeValue2 = (this.props.betList[this.props.currentBetIndex]) / 100 * this.props.autoPlaySpinSteps[this.props.autoPlaySpinSteps.length - 1];
            storeValue1 > storeValue2 ? this.maxValue = storeValue2 : this.maxValue = storeValue1;
        }
    }

    rangeSlider(dotName: any, sliderName: any) {
        UIManager.getRef(dotName).off('pointerdown');
        UIManager.getRef(dotName).off('pointerup');
        UIManager.getRef(dotName).off('pointerupoutside');
        UIManager.getRef(dotName).off('pointermove');
        UIManager.getRef(dotName).on('pointerdown', this.onDragStart.bind(this))
            .on('pointerup', this.onDragEnd.bind(this))
            .on('pointerupoutside', this.onDragEnd.bind(this))
            .on('pointermove', (evt: any) => {
                this.onDragMove(evt, dotName, sliderName);
            });
    }

    sliderIncreaseAndDecreaseBtButtonClick(dotName: any) {
        UIManager.getRef(dotName).off('pointerdown');
        UIManager.getRef(dotName).off('pointerup');
        UIManager.getRef(dotName).off('pointerupoutside');
        UIManager.getRef(dotName).on('pointerdown', this.onMouseDown.bind(this))
            .on('pointerup', () => this.clickEventStart = false)
            .on('pointerupoutside', () => this.clickEventStart = false)

    }
    setCurrencyOperator(storeValue: any, textName: any) {
        if (storeValue < 1) {
            UIManager.setText(textName, '∞');
        }
        else {
            if (textName === 'portrait_sliderDot_3_inputBoxText') {
                if (this.props.currencyCode) {
                    UIManager.setText(textName, CURRENCY.CurrencyManager.formatCurrencyString(storeValue, true, true, true, true));
                } else {
                    UIManager.setText(textName, storeValue.toFixed(2));
                }
            } else {
                if (this.props.currencyCode) {
                    UIManager.setText(textName, CURRENCY.CurrencyManager.formatCurrencyString(Math.round(storeValue), true, true, true, true));
                } else {
                    UIManager.setText(textName, Math.round(storeValue).toFixed(2));
                }
            }
        }

    }
    private onMouseDown(event: any): void {
        switch (event.currentTarget.name) {
            case "countMinus_1":
                if (this.currentIndex_1 >= 1) {
                    this.clickEventStart = true;
                    this.continuesMinusOne();
                    this.currentIndex_1--;
                    this.selectMaxValue("portrait_sliderDot");
                    let currentValue = (this.arbitraryArray[this.currentIndex_1]) * (this.props.betList[this.props.currentBetIndex]) / 100;
                    UIManager.getRef("portrait_sliderDot").x = UIManager.getRef("portrait_sliderDot").x - 57;
                    this.props.setSingleWinExceed((currentValue).toFixed(2));
                    this.setCurrencyOperator(currentValue, "portrait_sliderDot_inputBoxText");
                    this.sliderBarVisibility("portrait_sliderDot", "portrait_sliderDotLine");
                }
                break;
            case "countPlus_1":
                if (this.currentIndex_1 < 13) {
                    this.clickEventStart = true;
                    this.continuesPlusOne();
                    ++this.currentIndex_1;
                    console.log("countPlus_1", this.currentIndex_1);

                    this.selectMaxValue("portrait_sliderDot");
                    let currentValue = (this.arbitraryArray[this.currentIndex_1]) * (this.props.betList[this.props.currentBetIndex]) / 100;
                    UIManager.getRef("portrait_sliderDot").x = UIManager.getRef("portrait_sliderDot").x + 57;
                    this.props.setSingleWinExceed((currentValue).toFixed(2));
                    this.setCurrencyOperator(currentValue, "portrait_sliderDot_inputBoxText");
                    this.sliderBarVisibility("portrait_sliderDot", "portrait_sliderDotLine");
                }
                break;

            case "countMinus_2":
                if (this.currentIndex_2 >= 1) {
                    this.clickEventStart = true;
                    this.continuesMinusTwo();
                    this.currentIndex_2--;
                    this.selectMaxValue("portrait_sliderDot_2");
                    let currentValue = (this.arbitraryArray[this.currentIndex_2]) * (this.props.betList[this.props.currentBetIndex]) / 100;
                    UIManager.getRef("portrait_sliderDot_2").x = UIManager.getRef("portrait_sliderDot_2").x - 49;
                    this.props.setBalanceIncreasedBy((currentValue).toFixed(2));
                    this.setCurrencyOperator(currentValue, "portrait_sliderDot_2_inputBoxText");
                    this.sliderBarVisibility("portrait_sliderDot_2", "portrait_sliderDot_2Line");

                }

                break;
            case "countPlus_2":
                if (this.currentIndex_2 < 15) {
                    this.clickEventStart = true;
                    this.continuesPlusTwo();
                    ++this.currentIndex_2;
                    this.selectMaxValue("portrait_sliderDot_2");
                    let currentValue = (this.arbitraryArray[this.currentIndex_2]) * (this.props.betList[this.props.currentBetIndex]) / 100;
                    UIManager.getRef("portrait_sliderDot_2").x = UIManager.getRef("portrait_sliderDot_2").x + 49;
                    this.props.setBalanceIncreasedBy((currentValue).toFixed(2));
                    this.setCurrencyOperator(currentValue, "portrait_sliderDot_2_inputBoxText");
                    this.sliderBarVisibility("portrait_sliderDot_2", "portrait_sliderDot_2Line");
                }
                break;

            case "countMinus_3":
                if (this.currentIndex_3 >= 1) {
                    this.clickEventStart = true;
                    this.continuesMinusThree();
                    this.currentIndex_3--;
                    this.selectMaxValue("portrait_sliderDot_3");
                    let currentValue = ((this.maxValue * this.currentIndex_3) / 100);
                    UIManager.getRef("portrait_sliderDot_3").x = UIManager.getRef("portrait_sliderDot_3").x - 7.43;
                    this.props.setBalanceDecreasedBy((currentValue).toFixed(2));
                    this.setCurrencyOperator(currentValue, "portrait_sliderDot_3_inputBoxText");
                    this.sliderBarVisibility("portrait_sliderDot_3", "portrait_sliderDot_3Line");
                }
                break;
            case "countPlus_3":
                if (this.currentIndex_3 < 100) {
                    this.clickEventStart = true;
                    this.continuesPlusThree();
                    ++this.currentIndex_3;
                    this.selectMaxValue("portrait_sliderDot_3");
                    let currentValue = ((this.maxValue * this.currentIndex_3) / 100);
                    UIManager.getRef("portrait_sliderDot_3").x = UIManager.getRef("portrait_sliderDot_3").x + 7.43;
                    this.props.setBalanceDecreasedBy((currentValue).toFixed(2));
                    this.setCurrencyOperator(currentValue, "portrait_sliderDot_3_inputBoxText");
                    this.sliderBarVisibility("portrait_sliderDot_3", "portrait_sliderDot_3Line");
                }
                break;
        }
    }

    onDragStart(event: any) {
        this.sliderDotName = event.target.name;
        this.selectedInputName = (event.target.name + '_inputBoxText');
        this.sliderLineName = event.target.name + 'Line';
        this.selectMaxValue(this.sliderDotName);
        this.data = event.data;
        this.dragging = true;
        this.x = this.data.global.x;
        this.stopScrollBar();
    }


    stopScrollBar() {
        if (UIManager.getRef("autoplayContent") && UIManager.getRef("gameScrollComponentMobAutoPlay_landscape")) {
            if (isMobile && this.props.layoutMode !== "Portrait" && this.scrollbox) {
                this.scrollbox.dragScroll = false;
                this.scrollbox.overflowX = "none";
            }
        }
    }

    startScrollBar() {
        if (UIManager.getRef("autoplayContent") && UIManager.getRef("gameScrollComponentMobAutoPlay_landscape")) {
            if (isMobile && this.props.layoutMode !== "Portrait" && this.scrollbox) {
                this.scrollbox.dragScroll = true;
                this.scrollbox.overflowX = "none";
            }
        }
    }

    onDragEnd() {
        this.dragging = false;
        this.data = null;
        this.startScrollBar();
    }

    onDragMove(evt: any, dotName: any, sliderName: any) {
        if (this.dragging) {
            this.setState((prevState) => {
                return {
                    ...prevState,
                    slideAlpha: this.state.slideAlpha + 1
                }
            });
            const newPosition = this.data.global;
            if (newPosition.x < this.initialXOfSliderDot) {
                newPosition.x = this.initialXOfSliderDot;
            } else if (newPosition.x > (UIManager.getRef(sliderName).width - this.extraWidthValue) + this.initialXOfSliderDot) {
                newPosition.x = (UIManager.getRef(sliderName).width - this.extraWidthValue) + this.initialXOfSliderDot;
            }
            this.x = newPosition.x;
            this.customMoveSlider(evt);
        }
    }

    private customMoveSlider(evt: any): void {
        if (this.props.layoutMode === "Portrait") {
            this.forPortrait(evt)
        } else {
            this.forLandScap(evt)
        }
    }
    private forPortrait(evt: any): void {
        let counte = 0;
        if (evt.data.originalEvent.targetTouches[0].pageX > 150 && evt.data.originalEvent.targetTouches[0].pageX < 165) {
            counte = 30;
        } else if (evt.data.originalEvent.targetTouches[0].pageX > 165 && evt.data.originalEvent.targetTouches[0].pageX < 180) {
            counte = 50;
        } else if (evt.data.originalEvent.targetTouches[0].pageX > 180 && evt.data.originalEvent.targetTouches[0].pageX < 210) {
            counte = 100;
        } else if (evt.data.originalEvent.targetTouches[0].pageX > 210) {
            counte = 150;
        }

        if ((isTablet && isIOS)) {
            counte = counte - (274 + counte);
        }

        let posix = evt.data.originalEvent.targetTouches[0].pageX + (evt.data.originalEvent.changedTouches[0].offsetX + UIManager.getRef(this.sliderDotName).width / 2 + counte);
        if (posix < 826 && posix > 80) {
            let cal = 0;
            UIManager.getRef(this.sliderDotName).x = posix;
            if (this.sliderDotName === "portrait_sliderDot") {
                cal = this.arbitraryArray[Math.round((posix - 102) / 54)] * (this.props.betList[this.props.currentBetIndex]) / 100;
                this.currentIndex_1 = Math.round((posix - 102) / 54);
            } else if (this.sliderDotName === "portrait_sliderDot_2") {
                cal = this.arbitraryArray[Math.round((posix - 102) / 48)] * (this.props.betList[this.props.currentBetIndex]) / 100;
                this.currentIndex_2 = Math.round((posix - 102) / 48);
            } else if (this.sliderDotName === "portrait_sliderDot_3") {
                cal = (Math.round((posix - 80) / (this.totalLengthOfBar / (this.maxValue / ((this.props.betList[this.props.currentBetIndex]) / 100)))) * (this.props.betList[this.props.currentBetIndex]) / 100);
                this.currentIndex_3 = (cal / (this.props.betList[this.props.currentBetIndex] / 100));
            }

            this.setCurrencyOperator(cal, this.selectedInputName)
            this.selectVariable(cal);
        }
    }

    private forLandScap(evt: any): void {
        let posix = evt.data.originalEvent.targetTouches[0].clientX + ((evt.data.originalEvent.changedTouches[0].clientX + UIManager.getRef(this.sliderDotName).width / 2));
        if (isTablet) {
            posix = posix - 405;
        } else if (!isTablet && isIOS) {
            posix = posix - 200;
        } else {
            posix = posix - 350;
        }
        if (posix < 826 && posix > 80) {
            let cal = 0;
            if (this.sliderDotName === "portrait_sliderDot") {
                cal = this.arbitraryArray[Math.round((posix - 102) / 54)] * (this.props.betList[this.props.currentBetIndex]) / 100;
                this.currentIndex_1 = Math.round((posix - 102) / 54);
            } else if (this.sliderDotName === "portrait_sliderDot_2") {
                cal = this.arbitraryArray[Math.round((posix - 102) / 48)] * (this.props.betList[this.props.currentBetIndex]) / 100;
                this.currentIndex_2 = Math.round((posix - 102) / 48);
            } else if (this.sliderDotName === "portrait_sliderDot_3") {
                cal = (Math.round((posix - 80) / (this.totalLengthOfBar / (this.maxValue / ((this.props.betList[this.props.currentBetIndex]) / 100)))) * (this.props.betList[this.props.currentBetIndex]) / 100);
                this.currentIndex_3 = (cal / (this.props.betList[this.props.currentBetIndex] / 100));
            }
            this.setCurrencyOperator(cal, this.selectedInputName);
            UIManager.getRef(this.sliderDotName).x = posix;
            this.selectVariable(cal);
        }
    }

    private selectVariable(cal: any) {
        switch (this.sliderDotName) {
            case "portrait_sliderDot":
                this.storeValue = cal;
                break;
            case "portrait_sliderDot_2":
                this.storeValue1 = cal;
                break;
            case "portrait_sliderDot_3":
                this.storeValue2 = cal;
                break;
            default:
                return '';
        }
    }


    sliderBarVisibilityOnOff() {
        this.sliderBarVisibility("portrait_sliderDot", "portrait_sliderDotLine");
        this.sliderBarVisibility("portrait_sliderDot_2", "portrait_sliderDot_2Line");
        this.sliderBarVisibility("portrait_sliderDot_3", "portrait_sliderDot_3Line");
    }

    buttonModeOnForDots() {
        UIManager.getRef("portrait_sliderDot").buttonMode = true;
        UIManager.getRef("portrait_sliderDot_2").buttonMode = true;
        UIManager.getRef("portrait_sliderDot_3").buttonMode = true;
    }
    setExtraButtonsvisibilityFalse() {
        for (let i = this.props.autoPlaySpinSteps.length + 1; i <= this.totalAutoPlayButtons; i++) {
            UIManager.getRef("portraitAutoplayButton" + i).visible = false;
        }
    }

    componentDidMount(): void {
        let timer = TIMER.TimerManager.createTimer(1500);
        timer.on('end', (e: any) => {
            e.remove();
            window.addEventListener('touchend', () => {
                this.clickEventStart = false;
                this.startScrollBar();
            });
            window.addEventListener('touchmove', () => {
                this.clickEventStart = false;
            });
        });
        timer.start();

    }
    setTextInitialValue(textName: string) {
        UIManager.setText(textName, '∞');
        this.props.setSingleWinExceed(Number.POSITIVE_INFINITY);
        this.props.setBalanceIncreasedBy(Number.POSITIVE_INFINITY);
        this.props.setBalanceDecreasedBy(Number.POSITIVE_INFINITY);
    }

    componentDidUpdate() {
        this.bindUI();
        if (this.props.showAutoplay && isMobile) {
            this.setTextInitialValue("portrait_sliderDot_inputBoxText");
            this.setTextInitialValue("portrait_sliderDot_2_inputBoxText");
            this.setTextInitialValue("portrait_sliderDot_3_inputBoxText");
            UIManager.getRef("radioButtonOffPortrait") && (UIManager.getRef("radioButtonOffPortrait").visible = false);
            for (let i = 1; i <= this.props.autoPlaySpinSteps.length; i++) {
                UIManager.setText("portrait_autoplayButtonText" + i, this.props.autoPlaySpinSteps[i - 1] == -1 ? '∞' : this.props.autoPlaySpinSteps[i - 1]);
                if (this.props.autoPlaySpinStartValue == this.props.autoPlaySpinSteps[i - 1] && this.props.autoPlaySpinResetToStartValue) {
                    (UIManager.getRef("portraitAutoplayButton" + i).texture = Texture.from("landautoplay_box.png"));
                    this.props.setValueOfNumberButton(this.props.autoPlaySpinSteps[i - 1]);
                }
            }
            !this.props.autoPlaySpinResetToStartValue && (UIManager.getRef("portraitAutoplayButton1").texture = Texture.from("landautoplay_box_up.png"));
            !this.props.autoPlaySpinResetToStartValue && this.props.setValueOfNumberButton(0);

            if (this.props.autoPlayWinLimitMandatory && this.props.autoPlayLossLimitMandatory && this.props.autoPlaySpinStartValue <= 0) {
                (UIManager.getRef("autoplayStartButtonPortrait").interactive = false);
                (UIManager.getRef("autoplayStartButtonPortrait").texture = Texture.from("landstart_disable.png"));
            }
            this.rangeSliderCall();
            this.sliderBarVisibilityOnOff();
            this.buttonModeOnForDots();
            this.setExtraButtonsvisibilityFalse();

            this.slider()

            UIManager.getRef("autoplayStartButtonPortrait").interactive = true;
            UIManager.getRef("portrait_sliderDot").x = this.initialXOfSliderDot;

            if (this.props.stopAutoplayOnAnyWin) {
                UIManager.getRef("radioButtonOffPortrait").visible = false;
                UIManager.getRef("radioButtonOnPortrait").visible = true;
            } else {
                UIManager.getRef("radioButtonOffPortrait").visible = true;
                UIManager.getRef("radioButtonOnPortrait").visible = false;
            }

            this.sliderIncreaseAndDecreaseBtButtonClick("countPlus_1");
            this.sliderIncreaseAndDecreaseBtButtonClick("countPlus_2");
            this.sliderIncreaseAndDecreaseBtButtonClick("countPlus_3");
            this.sliderIncreaseAndDecreaseBtButtonClick("countMinus_1");
            this.sliderIncreaseAndDecreaseBtButtonClick("countMinus_2");
            this.sliderIncreaseAndDecreaseBtButtonClick("countMinus_3");
        }

    }
    slider() {
        this.rangeSlider("portrait_sliderDot", "portrait_sliderDotLine");
        this.rangeSlider("portrait_sliderDot_2", "portrait_sliderDot_2Line");
        this.rangeSlider("portrait_sliderDot_3", "portrait_sliderDot_3Line");
    }

    rangeSliderCall() {
        if (!this.props.autoPlayLossLimitEnabled || this.props.autoPlaySimpleMode) {
            UIManager.getRef("portrait_sliderDot_3_disable").visible = true;
        }
        if (!this.props.autoPlaySingleWinLimitEnabled || this.props.autoPlaySimpleMode) {
            UIManager.getRef("portrait_sliderDot_disable").visible = true;
        }
        if (!this.props.autoPlayWinLimitEnabled || this.props.autoPlaySimpleMode) {
            UIManager.getRef("portrait_sliderDot_2_disable").visible = true;
        }

    }

    sliderBarVisibility(sliderDot: any, sliderLine: any) {
        const thing = new PIXI.Graphics();
        thing.beginFill(this.sliderBarGraphicColor);
        thing.drawRect(0, this.sliderLineY, UIManager.getRef(sliderDot).x - this.initialXOfSliderDot, this.sliderLineHeight);
        thing.endFill();
        UIManager.getRef(sliderLine).addChild(thing);
        thing.x = 0;
        thing.y = 0;
        thing.alpha = this.sliderBarGraphicAlpha;
        UIManager.getRef(sliderLine).mask = thing;
    }

    shouldComponentUpdate(nextProps: Readonly<IProps>, nextState: Readonly<IState>, nextContext: any): boolean {
        if (nextProps.showAutoplay !== this.props.showAutoplay) {
            this.storeValue = 0;
            this.storeValue1 = 0;
            this.storeValue2 = 0;

            this.currentIndex_1 = 0;
            this.currentIndex_2 = 0;
            this.currentIndex_3 = 0;
            return true;
        }
        if (nextProps.layoutMode !== this.props.layoutMode) {
            this.layoutChange(this.props.layoutMode);
            return false;
        }
        if (nextProps.autoplayCount !== this.props.autoplayCount) {
            if (nextProps.autoplayCount === 0) {
                this.props.setBalanceIncreasedBy(-1);
                this.props.setBalanceDecreasedBy(-1);
                this.props.setSingleWinExceed(-1);
            }
            return false;
        }
        if (nextState.slideAlpha !== this.state.slideAlpha) {
            this.sliderBarVisibility(this.sliderDotName, this.sliderLineName);
            return false;
        }
        return false;
    }

    onClick(e: any, buttonName: any, value: number) {
        this.countButtonCLicked = true;
        this.props.setApplicationButtonClicked(true);
        this.props.setApplicationButtonClicked(false);
        for (let i = 1; i <= 9; i++) {
            UIManager.getRef("portraitAutoplayButton" + i).texture = Texture.from("landautoplay_box.png");
        }
        e.target.texture = Texture.from("landautoplay_box_up.png");
        if ((this.props.autoPlayLossLimitMandatory && this.props.stopIfBalanceDecreasedBy > -1) || (this.props.autoPlaySingleWinLimitMandatory && this.props.stopIfSingleWinExceed > -1) || (this.props.autoPlayWinLimitMandatory && this.props.stopIfBalanceIncreasedBy > -1)) {
            UIManager.getRef("autoplayStartButtonPortrait").interactive = true;
        } else if (!this.props.autoPlayLossLimitMandatory && !this.props.autoPlaySingleWinLimitMandatory && !this.props.autoPlayWinLimitMandatory) {
            UIManager.getRef("autoplayStartButtonPortrait").interactive = true;
            UIManager.getRef("autoplayStartButtonPortrait").texture = Texture.from("landstart_up.png");
        }
        if (value > 0) {
            this.props.setValueOfNumberButton(value - 1);
        } else if (value == 0) {
            this.props.setValueOfNumberButton(0);
        } else {
            this.props.setValueOfNumberButton(-1);
        }

        this.props.interactivityOfStartButton(true);
        this.storeLastClickedButtonValue = this.props.numberButtonValue;
        this.setExtraButtonsvisibilityFalse();
    }

    radioButtonClicked(currentButtonName: any, nextButtonName: any) {
        this.props.stoppedAutoplayOnWin();
        UIManager.getRef(currentButtonName).visible = false;
        UIManager.getRef(nextButtonName).visible = true;
    }

    handleEvent = (e: any) => {
        this.props.setApplicationButtonClicked(true);
        this.props.setApplicationButtonClicked(false);
        switch (e.target.name) {
            case "portraitAutoplayButton1":
                this.onClick(e, e.target.name, this.button1);
                break;
            case "portraitAutoplayButton2":
                this.onClick(e, e.target.name, this.button2);
                break;
            case "portraitAutoplayButton3":
                this.onClick(e, e.target.name, this.button3);
                break;
            case "portraitAutoplayButton4":
                this.onClick(e, e.target.name, this.button4);
                break;
            case "portraitAutoplayButton5":
                this.onClick(e, e.target.name, this.button5);
                break;
            case "portraitAutoplayButton6":
                this.onClick(e, e.target.name, this.button6);
                break;
            case "portraitAutoplayButton7":
                this.onClick(e, e.target.name, this.button7);
                break;
            case "portraitAutoplayButton8":
                this.onClick(e, e.target.name, this.button8);
                break;
            case "portraitAutoplayButton9":
                this.onClick(e, e.target.name, this.button9);
                break;
            case "radioButtonOnPortrait":
                this.radioButtonClicked("radioButtonOnPortrait", "radioButtonOffPortrait");
                break;
            case "radioButtonOffPortrait":
                this.radioButtonClicked("radioButtonOffPortrait", "radioButtonOnPortrait");
                break;
            case "portrait_sliderDotLine":
                (this.props.autoPlaySingleWinLimitEnabled) && this.sliderBarVisibility("portrait_sliderDot", "portrait_sliderDotLine");
                break;
            case "portrait_sliderLineBG":
                (this.props.autoPlaySingleWinLimitEnabled) && this.sliderBarVisibility("portrait_sliderDot", "portrait_sliderDotLine");
                break;
            case "portrait_sliderDot_2Line":
                (this.props.autoPlayWinLimitEnabled) && this.sliderBarVisibility("portrait_sliderDot_2", "portrait_sliderDot_2Line");
                break;
            case "portrait_sliderLine_2BG":
                (this.props.autoPlayWinLimitEnabled) && this.sliderBarVisibility("portrait_sliderDot_2", "portrait_sliderDot_2Line");
                break;
            case "portrait_sliderDot_3Line":
                (this.props.autoPlayLossLimitEnabled) && this.sliderBarVisibility("portrait_sliderDot_3", "portrait_sliderDot_3Line");
                break;
            case "portrait_sliderLine_3BG":
                (this.props.autoPlayLossLimitEnabled) && this.sliderBarVisibility("portrait_sliderDot_3", "portrait_sliderDot_3Line");
                break;
            case "autoplayStartButtonPortrait":
                this.startAutoplay();
                break;
            case "autoplay_CancelButton":
                this.reset();
                break;
            default:
                return 'No buttons';
        }

    }
    private continuesMinusOne(): void {
        if (!this.clickEventStart) {
            return;
        } let timer = TIMER.TimerManager.createTimer(300);
        timer.on('end', (e: any) => {
            e.remove();
            if (this.currentIndex_1 >= 1) {
                this.continuesMinusOne();
                if (this.clickEventStart) {
                    this.currentIndex_1--;
                    this.selectMaxValue("portrait_sliderDot");
                    let currentValue = (this.arbitraryArray[this.currentIndex_1]) * (this.props.betList[this.props.currentBetIndex]) / 100;
                    UIManager.getRef("portrait_sliderDot").x = UIManager.getRef("portrait_sliderDot").x - 57;
                    this.props.setSingleWinExceed((currentValue).toFixed(2));
                    this.setCurrencyOperator(currentValue, "portrait_sliderDot_inputBoxText");
                    this.sliderBarVisibility("portrait_sliderDot", "portrait_sliderDotLine");
                }
            }
        });
        timer.start();
    }

    private continuesPlusOne(): void {
        if (!this.clickEventStart) {
            return;
        }
        let timer = TIMER.TimerManager.createTimer(300);
        timer.on('end', (e: any) => {
            e.remove();
            if (this.currentIndex_1 < 13) {
                this.continuesPlusOne();
                if (this.clickEventStart) {
                    ++this.currentIndex_1;
                    console.log("continuesPlusOne", this.currentIndex_1);
                    this.selectMaxValue("portrait_sliderDot");
                    let currentValue = (this.arbitraryArray[this.currentIndex_1]) * (this.props.betList[this.props.currentBetIndex]) / 100;
                    UIManager.getRef("portrait_sliderDot").x = UIManager.getRef("portrait_sliderDot").x + 57;
                    this.props.setSingleWinExceed((currentValue).toFixed(2));
                    this.setCurrencyOperator(currentValue, "portrait_sliderDot_inputBoxText");
                    this.sliderBarVisibility("portrait_sliderDot", "portrait_sliderDotLine");
                }

            }
        });
        timer.start();
    }

    private continuesMinusTwo(): void {
        if (!this.clickEventStart) {
            return;
        }
        let timer = TIMER.TimerManager.createTimer(300);
        timer.on('end', (e: any) => {
            e.remove();
            if (this.currentIndex_2 >= 1) {
                this.continuesMinusTwo();
                if (this.clickEventStart) {
                    this.currentIndex_2--;
                    this.selectMaxValue("portrait_sliderDot_2");
                    let currentValue = (this.arbitraryArray[this.currentIndex_2]) * (this.props.betList[this.props.currentBetIndex]) / 100;
                    UIManager.getRef("portrait_sliderDot_2").x = UIManager.getRef("portrait_sliderDot_2").x - 49;
                    this.props.setBalanceIncreasedBy((currentValue).toFixed(2));
                    this.setCurrencyOperator(currentValue, "portrait_sliderDot_2_inputBoxText");
                    this.sliderBarVisibility("portrait_sliderDot_2", "portrait_sliderDot_2Line");
                }

            }
        });
        timer.start();
    }

    private continuesPlusTwo(): void {
        if (!this.clickEventStart) {
            return;
        }
        let timer = TIMER.TimerManager.createTimer(300);
        timer.on('end', (e: any) => {
            e.remove();
            if (this.currentIndex_2 < 15) {
                this.continuesPlusTwo();
                if (this.clickEventStart) {
                    ++this.currentIndex_2;
                    this.selectMaxValue("portrait_sliderDot_2");
                    let currentValue = (this.arbitraryArray[this.currentIndex_2]) * (this.props.betList[this.props.currentBetIndex]) / 100;
                    UIManager.getRef("portrait_sliderDot_2").x = UIManager.getRef("portrait_sliderDot_2").x + 49;
                    this.props.setBalanceIncreasedBy((currentValue).toFixed(2));
                    this.setCurrencyOperator(currentValue, "portrait_sliderDot_2_inputBoxText");
                    this.sliderBarVisibility("portrait_sliderDot_2", "portrait_sliderDot_2Line");
                }

            }
        });
        timer.start();
    }
    private continuesMinusThree(): void {
        if (!this.clickEventStart) {
            return;
        }
        let timer = TIMER.TimerManager.createTimer(300);
        timer.on('end', (e: any) => {
            e.remove();
            if (this.currentIndex_3 >= 1) {
                this.continuesMinusThree();
                if (this.clickEventStart) {
                    this.currentIndex_3--;
                    this.selectMaxValue("portrait_sliderDot_3");
                    let currentValue = ((this.maxValue * this.currentIndex_3) / 100);
                    UIManager.getRef("portrait_sliderDot_3").x = UIManager.getRef("portrait_sliderDot_3").x - 7.43;
                    this.props.setBalanceDecreasedBy((currentValue).toFixed(2));
                    this.setCurrencyOperator(currentValue, "portrait_sliderDot_3_inputBoxText");
                    this.sliderBarVisibility("portrait_sliderDot_3", "portrait_sliderDot_3Line");
                }

            }
        });
        timer.start();
    }

    private continuesPlusThree(): void {
        if (!this.clickEventStart) {
            return;
        }
        let timer = TIMER.TimerManager.createTimer(200);
        timer.on('end', (e: any) => {
            e.remove();
            if (this.currentIndex_3 < 100) {
                this.continuesPlusThree();
                if (this.clickEventStart) {
                    ++this.currentIndex_3;
                    this.selectMaxValue("portrait_sliderDot_3");
                    let currentValue = ((this.maxValue * this.currentIndex_3) / 100);
                    UIManager.getRef("portrait_sliderDot_3").x = UIManager.getRef("portrait_sliderDot_3").x + 7.43;
                    this.props.setBalanceDecreasedBy((currentValue).toFixed(2));
                    this.setCurrencyOperator(currentValue, "portrait_sliderDot_3_inputBoxText");
                    this.sliderBarVisibility("portrait_sliderDot_3", "portrait_sliderDot_3Line");
                }

            }
        });
        timer.start();
    }

    reset() {
        this.props.setAllButtonEnable();
        this.props.hideAutoplay();
        this.props.setBalanceIncreasedBy(-1);
        this.props.setBalanceDecreasedBy(-1);
        this.props.setSingleWinExceed(-1);
        this.props.interactivityOfStartButton(false);
        this.props.setMobMenuVisibility(false);
        this.props.setApplicationButtonpanelVisibility(true);
    }

    startAutoplay() {
        this.props.setIsScreenOnOff(true);// let the screen turn on.
        this.props.mobilePaytableShow(false);
        this.props.hidePaytable();
        if (this.props.numberButtonValue !== 0 && (this.props.balance - this.props.coinList[this.props.selectedCoin]) - this.props.coinList[this.props.selectedCoin] > 0) {
            let numberValue;
            if (this.props.numberButtonValue === -1) {
                numberValue = Number.POSITIVE_INFINITY;
            } else {
                numberValue = this.props.numberButtonValue;
            }
            this.countButtonCLicked = false;
            this.props.setAmountForAutoplay(this.props.transitionBalance / 100);
            this.props.setAutoplay(numberValue);
            this.props.setApplicationAutoplayCount(numberValue);
            this.props.startAutoplay();
            this.props.getApplicationSpinResponse();
            this.props.stopWinPresentation();
            this.props.resetReelState();
            this.props.setAllButtonDisable();
            this.props.hideAutoplay();
            this.props.interactivityOfStartButton(false);
            this.props.setMobMenuVisibility(false);
            this.props.setApplicationButtonpanelVisibility(true);
        }
        else {
            this.reset();
        }
    }

    render() {
        if (!this.props.showAutoplay) {
            return (<></>);
        }
        return (
            <UIManager id={"canvasAutoplayPortraitContainer"} type={"Container"} name={"canvasAutoplayPortraitContainer"} ref={i => this.canvasAutoplayPortraitContainer = i}
                configGame={this.props.configGame}
                app={this.app}>
                {
                    this.displayUI && this.displayUI.map((i: any) =>
                        <UIManager key={`UIManager-${Math.random()}`} langObj={this.props.langObj} type={i.type}
                            id={i.id} {...i} app={this.app} configGame={this.props.configGame}
                            ClickHandler={this.handleEvent} scope={this} />
                    )
                }
            </UIManager>
        )
    }

}

export default withPixiApp(connect(
    (state: Pick<IStore, 'buttonPanelState' | 'betPanelState' | 'autoplayState' | 'applicationState' | 'basegameState' | 'behaviourState' | 'autoplayKeyBoardListenerState'>): IStateToProps =>
    ({
        showAutoplay: state.autoplayState.showAutoplay,
        maxWinMultiplier: state.applicationState.maxWinMultiplier,
        autoplayCount: state.basegameState.autoplayCount,
        currentBetIndex: state.basegameState.currentBetIndex,
        betList: state.basegameState.betList,
        balance: state.basegameState.balance,
        selectedCoin: state.betPanelState.selectedCoin,
        coinList: state.betPanelState.coinList,
        numberButtonValue: state.autoplayState.numberButtonValue,
        stopAutoplayOnAnyWin: state.autoplayState.stopAutoplayOnAnyWin,
        transitionBalance: state.behaviourState.transitionBalance,
        autoPlayLossLimitMandatory: state.applicationState.autoPlayLossLimitMandatory,
        stopIfBalanceDecreasedBy: state.autoplayState.stopIfBalanceDecreasedBy,
        stopIfBalanceIncreasedBy: state.autoplayState.stopIfBalanceIncreasedBy,
        stopIfSingleWinExceed: state.autoplayState.stopIfSingleWinExceed,
        autoPlaySingleWinLimitMandatory: state.applicationState.autoPlaySingleWinLimitMandatory,
        autoPlayWinLimitMandatory: state.applicationState.autoPlayWinLimitMandatory,
        autoPlayLossLimitEnabled: state.applicationState.autoPlayLossLimitEnabled,
        autoPlaySingleWinLimitEnabled: state.applicationState.autoPlaySingleWinLimitEnabled,
        autoPlayWinLimitEnabled: state.applicationState.autoPlayWinLimitEnabled,
        autoPlaySpinSteps: state.applicationState.autoPlaySpinSteps,
        layoutMode: state.applicationState.layoutMode,
        autoPlaySimpleMode: state.applicationState.autoPlaySimpleMode,
        showMobileMenuPanel: state.behaviourState.showMobileMenuPanel,
        autoPlayLossLimitPercentage: state.applicationState.autoPlayLossLimitPercentage,
        autoPlayWinLimitPercentage: state.applicationState.autoPlayWinLimitPercentage,
        autoPlaySingleWinLimitPercentage: state.applicationState.autoPlaySingleWinLimitPercentage,
        currencyCode: state.applicationState.currencyCode,

    }),
    (dispatch: Dispatch): IDispatchToProps => ({
        setApplicationLayoutObject: (layoutobjectlist: any): any => dispatch(layoutssActions.setApplicationLayoutObject(layoutobjectlist)),
        setApplicationButtonClicked: (clicked: boolean): any => dispatch(buttonActions.setApplicationButtonClicked(clicked)),
        setValueOfNumberButton: (numberButtonValue: number): any => dispatch(autoplayActions.setValueOfNumberButton(numberButtonValue)),
        interactivityOfStartButton: (startButtonInteractivity: boolean): any => dispatch(autoplayActions.interactivityOfStartButton(startButtonInteractivity)),
        setAmountForAutoplay: (storeAmountForAutoplay: any): any => dispatch(behaviourAction.setAmountForAutoplay(storeAmountForAutoplay)),
        hideAutoplay: (): any => dispatch(autoplayActions.hideAutoplayUI()),
        setAutoplay: (autoplayCount: number): any => dispatch(autoplayActions.setAutoplayCount(autoplayCount)),
        setApplicationAutoplayCount: (autoplaycount: number): any => dispatch(baseGameActions.setApplicationAutoplayCount(autoplaycount)),
        startAutoplay: (): any => dispatch(baseGameActions.startAutoplay()),
        getApplicationSpinResponse: (): any => dispatch(asyncActions.getApplicationSpinResponse()),
        stopWinPresentation: (): any => dispatch(winpresentationAction.stopWinPresentation()),
        resetReelState: (): any => dispatch(Number(configGame["SPIN_TYPE"]) === 0 && reelsActions.resetReelState() || Number(configGame["SPIN_TYPE"]) === 1 && gridsActions.resetReelState() || Number(configGame["SPIN_TYPE"]) === 2 && reelgridActions.resetReelState()),
        setAllButtonDisable: (exceptBtnList: Array<string>): any => dispatch(buttonActions.setAllButtonDisable(exceptBtnList)),
        stoppedAutoplayOnWin: (): any => dispatch(autoplayActions.stoppedAutoplayOnWin()),
        setBalanceDecreasedBy: (value: any): any => dispatch(autoplayActions.setBalanceDecreasedBy(value)),
        setBalanceIncreasedBy: (value: any): any => dispatch(autoplayActions.setBalanceIncreasedBy(value)),
        setSingleWinExceed: (value: any): any => dispatch(autoplayActions.setSingleWinExceed(value)),
        setApplicationButtonpanelVisibility: (visible: boolean): any => dispatch(aplicationActions.setApplicationButtonpanelVisibility(visible)),
        setMobMenuVisibility: (showMobileMenuPanel: boolean): any => dispatch(behaviourAction.setMobMenuVisibility(showMobileMenuPanel)),
        setAllButtonEnable: (exceptBtnList: Array<string>): any => dispatch(buttonActions.setAllButtonEnable(exceptBtnList)),
        mobilePaytableShow: (showPaytableMobile: boolean): any => dispatch(paytableGofActions.mobilePaytableShow(showPaytableMobile)),
        hidePaytable: (): any => dispatch(paytableActions.hidePaytable()),
        setIsScreenOnOff: (screenOnOff: boolean): any => dispatch(buttonActions.setIsScreenOnOff(screenOnOff)),


    }))(withCanvasAutoplayConfiguration(CanvasAutoplayPortrait)));