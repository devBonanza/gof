import {BitmapText} from '@inlet/react-pixi'
import React from "react";


interface IProps {
    [x: string]: any;

    // loader: {
    //     config: {string:string}
    // }
}

interface IState {
    textElement: any
}

class UINumberBitMapText extends React.Component<IProps, IState> {
    protected textObj: any;
    protected ticking: boolean;
    private tickupRequest: any;
    private tweening: any;
    private fpsInterval: any;
    private then: any;

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
        this.startTickup(10000);


    }

    toFixed(num: number, fixed: number) {
        fixed = fixed || 0;
        fixed = Math.pow(10, fixed);
        return Math.floor(num * fixed) / fixed;
    };

    reset() {
        this.textObj.count = 0;
        this.textObj.value = this.props.value;
        this.textObj.text = this.props.prefix + this.props.value + this.props.postfix;
    }

    startTickup(finalvalue: number = 0) {
        this.ticking = true;
        // this.textObj.text = this.props.prefix + this.props.value + this.props.postfix;
        // this.textObj.value = this.props.value;

        const now = Date.now();
        this.then = now;
        if (this.props.numberaddup) {
            this.textObj.value = this.textObj.value;
        } else {
            this.reset();
        }
        if (this.props.runonvalue) {
            this.tweenTo(this.textObj, "value", finalvalue,  this.textObj.tickuptime, this.backout(0.5), (e: any) => {

                if (this.toFixed(this.textObj.count, 0) >= e.target) {
                    this.textObj.count = e.target;
                } else {
                    this.textObj.count += this.toFixed(this.props.tickupvalue, this.props.decimaldigit)
                }
                this.textObj.value = this.textObj.count;

                this.textObj.text = this.props.prefix + this.toFixed(this.textObj.count, this.props.decimaldigit) + this.props.postfix;
                this.fitText();


            }, (e: any) => {
                const now = Date.now();
                this.textObj.text = this.props.prefix + this.toFixed(e.target, this.props.decimaldigit) + this.props.postfix;
                this.stopTickup();
            })
        } else {
            this.tweenTo(this.textObj, "value", finalvalue,  this.textObj.tickuptime, this.backout(0.5), (e: any) => {
                if (this.toFixed(this.textObj.value, 0) >= e.target) {
                    this.textObj.value = e.target;
                }
                this.textObj.text = this.props.prefix + this.toFixed(this.textObj.value, this.props.decimaldigit) + this.props.postfix;
                this.fitText();
            }, (e: any) => {
                const now = Date.now();
                this.textObj.text = this.props.prefix + this.toFixed(e.target, this.props.decimaldigit) + this.props.postfix;
                this.stopTickup();
            })
        }

    }


    stopTickup() {
        this.ticking = false;
    }

    addText() {

    }

    backout(amount: number): any {
        return (t: number) => (--t * t * ((amount + 1) * t + amount) + 1);
    }

    fitText() {
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
    }

    createtext() {
        this.textObj.propsdata = this.props
        this.textObj.count = this.props.tickupvalue;
        this.textObj.tickupvalue = this.props.tickupvalue;
        this.textObj.runonvalue = this.props.runonvalue;
        this.textObj.skiptickup = this.props.skiptickup;
        this.textObj.tickuptime = this.props.tickuptime;
        this.reset();
    }

    componentWillUnmount() {
        cancelAnimationFrame(this.tickupRequest);
    }

    private tweenTo(object: any, property: any, target: any, time: any, easing: any, onchange: any, oncomplete: any, start?: number) {
        const tween: any = {
            object,
            property,
            propertyBeginValue: object[property],
            target,
            easing,
            time,
            change: onchange,
            complete: oncomplete,
            start: start || Date.now(),
        };

        this.tweening.push(tween);
        return tween;
    }

    tick = () => {

        this.tickupRequest && window.cancelAnimationFrame(this.tickupRequest);
        this.tickupRequest ='';
        this.tickupRequest = requestAnimationFrame(this.tick);
        const now = Date.now();
        const remove = [];
        const elapsed = now - this.then;
        if (elapsed > this.fpsInterval) {
            this.then = now - (elapsed % this.fpsInterval);
            for (let i = 0; i < this.tweening.length; i++) {
                const t = this.tweening[i];
                if (t.object.runonvalue) {
                    const phase = Math.min(t.object.tickupvalue, (now - t.start) / t.time);
                    if (t.change) t.change(t);
                    if (t.object.value >= t.target || t.object.skiptickup) {
                        t.object[t.property] = t.target;
                        if (t.complete) t.complete(t);
                        remove.push(t);
                    }
                } else {
                    const phase = Math.min(1, (now - t.start) / t.time);
                    t.object[t.property] = this.lerp(t.propertyBeginValue, t.target, t.easing(phase));
                    if (t.change) t.change(t);
                    if (phase === 1 || t.object.skiptickup) {
                        t.object[t.property] = t.target;
                        if (t.complete) t.complete(t);
                        remove.push(t);
                    }
                }

            }
            for (let i = 0; i < remove.length; i++) {
                this.tweening.splice(this.tweening.indexOf(remove[i]), 1);
            }
        }
    }

    lerp(a1: number, a2: number, t: number) {
        return a1 * (1 - t) + a2 * t;
    }

    render() {
        return (<BitmapText ref={i => {
            this.props.addRef(this.props.name, i);
            return this.textObj = i;
        }} text={this.props.langObj[this.props.text] || this.props.text}
                            style={this.props.textStyle}
                            anchor={this.props.anchor} x={this.props.x}
                            y={this.props.y}></BitmapText>)
    }

}

export default UINumberBitMapText;