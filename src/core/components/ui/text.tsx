import { Text } from '@inlet/react-pixi'
import React from "react";


interface IProps {
    [x: string]: any;
}

interface IState {
    textElement: any
}

class UIText extends React.Component<IProps, IState> {
    protected textObj: any;
    protected Layer: any;
    constructor(props: IProps) {
        super(props);
        this.textObj = {};
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


    addText() {

    }


    createtext() {
        this.textObj.propsdata = this.props
    }

    componentWillUnmount() {

    }


    render() {
        return (<Text ref={i => {
            this.props.addRef(this.props.name, i);
            return this.textObj = i;
        }} text={this.props.langObj[this.props.text] || this.props.text}
            style={this.props.textStyle}
            anchor={this.props.anchor || [0.5, 0.5]} x={this.props.x}
            y={this.props.y} visible={this.props.visible || false} width={this.props.width || 100}></Text>)
    }

}

//export default withPixiApp(withButtonPanelConfiguration(ButtonStaticImage));
export default UIText;