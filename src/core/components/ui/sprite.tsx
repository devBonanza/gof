import { Sprite, Text} from '@inlet/react-pixi'
import React from "react";
import { Circle, Rectangle } from "pixi.js";

interface IProps {
    [x: string]: any;
}

interface IState {
    currentState: string;
}

class UISprite extends React.Component<IProps, IState> {
    protected spriteObj: any;
    protected Layer: any;
    protected textObj: any;

    constructor(props: IProps) {
        super(props);

        this.spriteObj = {};
        this.state = { currentState: this.props.buttonState && (this.props.disabled && this.props.buttonState['disable'] || this.props.buttonState['up']) }
        // this.Layer = props.Layers[props.uiDetails.parentLayer || "baseLayer"];
    }


    componentDidMount() {
        this.createtext();
        this.addText();
        let measuredWidth = 0;
        if (this.props.scaleToFit === true && this.props.width > 0) {
            measuredWidth = this.textObj.getLocalBounds().width;
            if (measuredWidth > this.props.width) {
                while (measuredWidth > this.props.width) {
                    let newStyle = this.textObj.style;
                    newStyle.fontSize -= 1;
                    this.textObj.textStyle = newStyle;
                    // this.context.font = newStyle.font;
                    // this._text = text;
                    // this.dirty = true;
                    measuredWidth = this.textObj.getLocalBounds().width;
                    if (newStyle.fontSize === this.textObj.minFontSize) {
                        break;
                    }
                }
            } else {
                this.textObj.width = measuredWidth;
            }

        }
    }

    shouldComponentUpdate(nextProps: Readonly<IProps>, nextState: Readonly<IState>, nextContext: any): boolean {
        // if(nextProps.disabled){
        //     this.state = {currentState:this.props.buttonState['disable']};
        // }

        return true;
    }

    addText() {

    }

    createtext() {

    }

    componentWillUnmount() {

    }

    hitArea() {

        if (this.props.shape === undefined || Object.keys(this.props.shape).length === 0) {
            return {};
        }
        let shape: any = {}
        switch (this.props.shape.type) {
            case "rectangle":
                shape = new Rectangle(this.props.shape.x, this.props.shape.y, this.props.shape.w, this.props.shape.h)
                break
            case "circle":

                shape = new Circle(this.props.shape.x, this.props.shape.y, this.props.shape.r)

                break
            default:
        }
        return shape;
    }

    static getDerivedStateForomProps(props: IProps, state: IState): IState {

        if (props.disabled) {
            return {
                ...state,
                currentState: props.buttonState['disable']
            }
        }
        if (props.enable) {
            return {
                ...state,
                currentState: props.buttonState['enable']
            }
        }
        return state;
    }


    render() {
        const hitArea = this.hitArea();
        const hitAreaExist = !(Object.keys(hitArea).length === 0)
        const btnIntrectivity = !this.props.disabled;
        //  if(this.props.name === "image_commongame-potrait-bg"){
        //
        //  }
        let linkImage = this.props.image
        let re: any = ""
        let replaceToBe = ""

        if (linkImage) {
            if (linkImage.indexOf("@mobile") > -1) {
                re = /\@mobile/gi;
                replaceToBe = "mobile";
            }
            if (linkImage.indexOf("@desktop") > -1) {
                re = /\@desktop/gi;
                replaceToBe = "desktop";
            }
            if (replaceToBe) {
                //this.app.loader.add(subkey, linkImage.replace(re, replaceToBe))
                linkImage = linkImage.replace(re, replaceToBe)
            }


        }

        return (<Sprite
            ref={i => {
                this.props.addRef(this.props.name, i);
                this.spriteObj = i;
                return i;
            }}
            anchor={this.props.anchor || [0, 0]}
            x={this.spriteObj.x || this.props.x || 0}
            y={this.spriteObj.y || this.props.y || 0}
            scale={this.props.scale || 1}

            width={this.props.width}
            height={this.props.height}
            image={this.props.buttonState && (this.state.currentState) || this.props.imageState && this.props.imageState['frame'] || linkImage}
            name={this.props.name}

            interactive={btnIntrectivity}
            buttonMode={this.props.buttonMode || false}
            hitArea={hitAreaExist && hitArea}
            visible={this.props.visible || false}
            click={(e) => {
                if (this.props.buttonState) {
                    this.props.ClickHandler && this.props.ClickHandler(e, this.props.scope || this);
                }

                //this.props.disabled = true;
            }}
            touchend={(e) => {
                if (this.props.buttonState) {
                    this.props.ClickHandler && this.props.ClickHandler(e, this.props.scope || this);
                }
            }}
            // pointerdown={(e) => {
            //  if (this.props.buttonState) {
            //         this.props.ClickHandler && this.props.ClickHandler(e, this.props.scope || this);
            //     }
            // }}
           
            mousedown={() => {
                if (this.props.buttonState) {
                    this.setState({
                        currentState: this.props.buttonState['down']
                    })
                }


            }}
            mouseup={() => {
                if (this.props.buttonState) {
                    this.setState({
                        currentState: this.props.buttonState['up']
                    })
                }
            }}
            mouseover={() => {
                if (this.props.buttonState) {
                    this.setState({
                        currentState: this.props.buttonState['hover']
                    })
                }

            }}
            mouseout={() => {
                if (this.props.buttonState) {
                    this.setState({
                        currentState: this.props.buttonState['out']
                    })
                }
            }}
        >

            {this.props.text != "" && this.props.text != undefined &&
                <Text ref={i => {
                    this.props.addRef(this.props.name, i);
                    return this.textObj = i;
                }} text={this.props.langObj[this.props.text] || this.props.text} style={this.props.textStyle} name = {this.props.name}
                    anchor={this.props.anchor} x={0} visible={this.props.visible || false}
                    y={0}></Text>}
        </Sprite>)
        // return (<Text ref={i => this.textObj = i} text={this.props.text} style={this.props.textStyle}
        //               anchor={this.props.anchor} x={this.props.x}
        //               y={this.props.y}></Text>)
    }

}

//export default withPixiApp(withButtonPanelConfiguration(ButtonStaticImage));
export default UISprite;