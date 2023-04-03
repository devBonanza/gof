import { Graphics } from '@inlet/react-pixi'
import React from "react";
import { Rectangle } from "pixi.js";


interface IProps {
    [x: string]: any;
}

interface IState {

}

class UIGraphic extends React.Component<IProps, IState> {
    protected graphicObj: any;
    protected Layer: any;

    constructor(props: IProps) {
        super(props);
        this.graphicObj = {};
        this.Layer = {};
    }


    componentDidMount() {
        this.createGraphic();
    }


    createGraphic() {
        return (<Graphics ref={i => this.graphicObj = i} ></Graphics>);
    }

    componentWillUnmount() {

    }

    hitArea() {

        if (this.props.hitarea === undefined || Object.keys(this.props.hitarea).length === 0) {
            return {};
        }
        let shape: any = {}
        switch (this.props.hitarea.type) {
            case "rectangle":
                shape = new Rectangle(this.props.hitarea.x - this.props.hitarea.w / 2, this.props.hitarea.y - this.props.hitarea.h / 2, this.props.hitarea.w, this.props.hitarea.h)
                break
            case "circle":
                break
            default:
        }
        return shape;
    }

    rectangle() {

    }

    circle() {

    }

    render() {
        let rectangle = false, circle = false, roundedRect = false, drawEllipse = false
        if (this.props.shape === "rectangle") {
            rectangle = true
        } else if (this.props.shape === "circle") {
            circle = true
        } else if (this.props.shape === "roundedRect") {
            roundedRect = true
        } else if (this.props.shape === "drawEllipse") {
            drawEllipse = true
        }

        // const hitArea = this.hitArea();
        // const hitAreaExist = !(Object.keys(hitArea).length === 0)
        // const btnIntrectivity = !this.props.disabled;
        return (<Graphics ref={i => {
            this.props.addRef(this.props.name, i);
            return i;
        }} {...this.props}
            anchor={this.props.anchor || [0, 0]}
            x={this.props.x}
            y={this.props.y}
            name={this.props.name}

            click={(e) => {
                this.props.ClickHandler(e, this.props.scope || this);
                //this.props.disabled = true;
            }}

            mouseover={(e) => {
                this.props.mouseOver(e, this.props.scope || this);

            }}
            touchend={(e) => {
                this.props.ClickHandler(e, this.props.scope || this);
                //this.props.disabled = true;
            }}
            mouseout={(e) => {
                this.props.mouseOut(e, this.props.scope || this);

            }}


            draw={g => {
                g.beginFill(this.props.color, this.props.alpha)
                {
                    rectangle && g.drawRect(0, 0, this.props.width, this.props.height)
                }
                {
                    circle && g.drawCircle(0, 0, this.props.radius)
                }
                {
                    roundedRect && g.drawRoundedRect(0, 0, this.props.width, this.props.height, this.props.radius)
                }
                {
                    drawEllipse && g.drawEllipse(0, 0, this.props.width, this.props.height)
                }
                g.endFill()
            }}


        ></Graphics>)
    }
}

//export default withPixiApp(withButtonPanelConfiguration(ButtonStaticImage));
export default UIGraphic;