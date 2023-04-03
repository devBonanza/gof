import { BitmapText, Text } from '@inlet/react-pixi'
import React from "react";
import { Tween } from "../effect/tween"


interface IProps {
    [x: string]: any;
}

interface IState {
    textElement: any
}

class UINumberText extends React.Component<IProps, IState> {
    protected textObj: any;
    protected ticking: boolean;
    private tickupRequest: any;
    private tweening: any;
    private fpsInterval: any;
    private then: any;
    private roughArr:any[] = [];

    constructor(props: IProps) {
        super(props);
        this.textObj = {};
        this.tweening = [];
        this.ticking = false;
        this.fpsInterval = 1000 / this.props.tickupspeed;
        this.tick();
    }

    componentDidMount() {
        this.fitText();
        this.createtext();
        this.addText();
    }

    toFixed(num: number, fixed: number) {
        fixed = fixed || 0;
        fixed = Math.pow(10, fixed);
        return ((num * fixed) / fixed).toFixed(2);
    };

    reset() {
        this.textObj.count = 0;
        this.textObj.value = this.props.value;
        this.textObj.text = this.props.prefix + this.props.value + this.props.postfix;
        while(this.roughArr.length){
            let req = this.roughArr.pop();
            cancelAnimationFrame(req);
            req ='';
        }
    }

    startTickup(finalvalue: number = 0) {
        this.ticking = true;
        const now = Date.now();
        this.then = now;
        if (this.props.numberaddup) {
            this.textObj.value = this.textObj.value;
        } else {
            this.reset();
        }

        if (this.props.runonvalue) {
            this.tweenTo(this.textObj, "value", finalvalue, this.textObj.tickuptime, this.easeInSine(1), (e: any) => {
                this.textObj && (e.time = this.textObj.tickuptime);
                const now = Date.now();
                const elapsed = now - this.then;
                if (elapsed > this.fpsInterval && this.textObj) {
                    if (this.toFixed(this.textObj.count, 0) >= e.target) {
                        this.textObj.count = e.target;
                    } else {
                        this.textObj.count += this.toFixed(this.props.tickupvalue, this.props.decimaldigit)
                    }
                    this.textObj.value = this.textObj.count;
                    if (this.textObj.updateTextFromOutside == undefined || this.textObj.updateTextFromOutside == false) {
                        this.textObj.text = this.props.prefix + this.toFixed(this.textObj.value, this.props.decimaldigit) + this.props.postfix;

                    }
                    this.fitText();
                    this.props.tickupupdate && this.props.tickupupdate(this.textObj)
                    this.then = now - (elapsed % this.fpsInterval);
                }
            }, (e: any) => {
                const now = Date.now();
                if (this.textObj) {
                    if (this.textObj.updateTextFromOutside == undefined || this.textObj.updateTextFromOutside == false) {
                        this.textObj.text = this.props.prefix + this.toFixed(e.target, this.props.decimaldigit) + this.props.postfix;

                    }
                }
                this.stopTickup();
            });
        } else {
            this.tweenTo(this.textObj, "value", finalvalue, this.textObj.tickuptime, this.easeInSine(1), (e: any) => {
                this.textObj && (e.time = this.textObj.tickuptime);
                const now = Date.now();
                const elapsed = now - this.then;
                if (elapsed > this.fpsInterval && this.textObj) {
                    if (this.toFixed(this.textObj.value, 0) >= e.target) {
                        this.textObj.value = e.target;
                    }
                    this.props.tickupupdate && this.props.tickupupdate(this.textObj)
                    if (this.textObj.updateTextFromOutside == undefined || this.textObj.updateTextFromOutside == false) {
                        this.textObj.text = this.props.prefix + this.toFixed(this.textObj.value, this.props.decimaldigit) + this.props.postfix;

                    }
                    this.fitText();
                    this.then = now - (elapsed % this.fpsInterval);
                }
            }, (e: any) => {
                const now = Date.now();
                if (this.textObj) {
                    if (this.textObj.updateTextFromOutside == undefined || this.textObj.updateTextFromOutside == false) {
                        this.textObj.text = this.props.prefix + this.toFixed(e.target, this.props.decimaldigit) + this.props.postfix;
                    }
                }
                this.stopTickup();
            });
        }
    }
    stopTickup() {
        this.ticking = false;
        if (this.textObj) {
            this.props.tickupComplete && this.props.tickupComplete(this.textObj);
        }
    }
    addText() {

    }

    backout(amount: number): any {
        return "backout";
    }
    easeInSine(amount: number): any {
        return "easeInSine";
    }


    fitText() {

        if (this.props.textType === "BitMapText") {
            let measuredWidth = 0;
            if (this.props.scaleToFit === true && this.props.width > 0) {
                measuredWidth = this.textObj.getLocalBounds().width;
                while (measuredWidth > this.props.width) {
                    let newStyle = this.textObj.style;
                    newStyle.fontSize -= 1;
                    this.textObj.fontSize = newStyle.fontSize;
                    measuredWidth = this.textObj.getLocalBounds().width;
                    if (newStyle.fontSize === this.textObj.minFontSize) {
                        break;
                    }
                }
            }
        } else {
            let measuredWidth = 0;
            if (this.props.scaleToFit === true && this.props.width > 0) {
                measuredWidth = this.textObj.getLocalBounds().width;
                while (measuredWidth > this.props.width) {
                    let newStyle = this.textObj.style;
                    newStyle.fontSize -= 1;
                    this.textObj.textStyle = newStyle;
                    measuredWidth = this.textObj.getLocalBounds().width;
                    if (newStyle.fontSize === this.textObj.minFontSize) {
                        break;
                    }
                }
            }
        }

    }

    createtext() {
        this.textObj.propsdata = this.props
        this.textObj.count = this.props.tickupvalue;
        this.textObj.tickupvalue = this.props.tickupvalue;
        this.textObj.runonvalue = this.props.runonvalue;
        this.textObj.skiptickup = this.props.skiptickup;
        this.textObj.tickuptime = this.props.tickuptime;
        this.textObj.objectInstance = this;
        this.reset();
    }

    componentWillUnmount() {
        cancelAnimationFrame(this.tickupRequest);
    }

    private tweenTo(object: any, property: any, target: any, time: any, easing: any, onchange: any, oncomplete: any, start?: number) {
        let Tweenlist = new Tween(
            [object],
            {

                [property]: { start: object[property], end: target }
            },
            time / 1000,
            easing,
            false, null, null, null, null, false, onchange, oncomplete
        );
        this.tweening.push(Tweenlist);
    }

    tick = () => {
        // this.roughArr.push(requestAnimationFrame(this.tick))
        // this.tickupRequest = this.roughArr[this.roughArr.length-1];
        let req =  this.tickupRequest = requestAnimationFrame(this.tick)
        this.roughArr.push(req);    
    }

    lerp(a1: number, a2: number, t: number) {
        return a1 * (1 - t) + a2 * t;
    }

    render() {
        if (this.props.textType === "BitMapText") {
            return (<BitmapText ref={i => {
                this.props.addRef(this.props.name || this.props.id, i);
                return this.textObj = i;
            }} text={this.props.langObj[this.props.text] || this.props.text}
                name={this.props.name}
                style={this.props.textStyle}
                anchor={this.props.anchor || [0.5, 0.5]} x={this.props.x} visible={this.props.visible || false}
                y={this.props.y}></BitmapText>)
        }
        return (<Text ref={i => {
            this.props.addRef(this.props.name, i);
            return this.textObj = i;
        }} text={this.props.langObj[this.props.text] || this.props.text}
            name={this.props.name}
            style={this.props.textStyle}
            anchor={this.props.anchor} x={this.props.x} visible={this.props.visible || false}
            y={this.props.y}></Text>)
    }

}

export default UINumberText;